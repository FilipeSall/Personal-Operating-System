import { create } from 'zustand';
import { fetchForecast, fetchCurrentWeather, fetchReverseGeocode } from '../services/openWeatherService';
import { fetchHourlyForecast } from '../services/openMeteoService';
import { resolveWeatherCoordinates } from '../utils/weatherLocation';
import { groupForecastByDay, toForecastKey } from '../utils/forecastGrouper';
import { mapOpenMeteoToHourly, buildHourlyCacheKey } from '../utils/hourlyForecastMapper';
import { formatLocationLabel } from '../utils/formatLocationLabel';
import type { WeatherSnapshot, HourlyForecast, HourlySource } from '../types/weather';
import type { OpenWeatherCurrentResponse } from '../types/openWeather';

const HOURLY_CACHE_TTL_MS = 30 * 60 * 1000;
const HOURLY_CACHE_MAX_ENTRIES = 20;
const HOURLY_STORAGE_KEY = 'personal-os:weather-hourly-cache:v1';

type HourlyStatus = {
  isLoading: boolean;
  error: string | null;
};

/**
 * Remove entradas expiradas do cache horario.
 *
 * @param cache Cache horario atual.
 */
const pruneHourlyCache = (cache: Map<string, HourlyForecast>): Map<string, HourlyForecast> => {
  const now = Date.now();
  const next = new Map<string, HourlyForecast>();
  cache.forEach((entry, key) => {
    if (now - entry.fetchedAt < HOURLY_CACHE_TTL_MS) {
      next.set(key, entry);
    }
  });
  return next;
};

/**
 * Persiste o cache horario no localStorage.
 *
 * @param cache Cache horario atual.
 */
const persistHourlyCache = (cache: Map<string, HourlyForecast>): void => {
  if (typeof window === 'undefined') return;
  const payload = JSON.stringify(Array.from(cache.entries()));
  try {
    window.localStorage.setItem(HOURLY_STORAGE_KEY, payload);
  } catch {
    // Ignore quota errors.
  }
};

/**
 * Carrega o cache horario salvo no localStorage.
 */
const loadHourlyCache = (): Map<string, HourlyForecast> => {
  if (typeof window === 'undefined') return new Map();
  const raw = window.localStorage.getItem(HOURLY_STORAGE_KEY);
  if (!raw) return new Map();
  try {
    const parsed = JSON.parse(raw) as Array<[string, HourlyForecast]>;
    const cache = new Map(parsed);
    const pruned = pruneHourlyCache(cache);
    if (pruned.size !== cache.size) {
      persistHourlyCache(pruned);
    }
    return pruned;
  } catch {
    return new Map();
  }
};

type WeatherStoreState = {
  forecasts: Map<string, WeatherSnapshot>;
  hourlyForecasts: Map<string, HourlyForecast>;
  hourlyStatus: Map<string, HourlyStatus>;
  isLoading: boolean;
  error: string | null;
  locationLabel: string;
  coordinates: { lat: number; lon: number } | null;
  lastUpdatedAt: Date | null;
};

type FetchWeatherParams = {
  force?: boolean;
  signal?: AbortSignal;
};

type FetchHourlyParams = {
  dateKey: string;
  lat: number;
  lon: number;
  source: HourlySource;
  signal?: AbortSignal;
  force?: boolean;
};

type WeatherStoreActions = {
  fetchWeather: (params?: FetchWeatherParams) => Promise<void>;
  fetchHourly: (params: FetchHourlyParams) => Promise<HourlyForecast | null>;
  getSnapshotForDate: (date: Date) => WeatherSnapshot | null;
  getHourlyForDate: (cacheKey: string) => HourlyForecast | null;
  isHourlyStale: (cacheKey: string) => boolean;
  resetWeather: () => void;
};

export type WeatherStore = WeatherStoreState & WeatherStoreActions;

type MapCurrentToSnapshotOptions = {
  inheritedPop?: number;
  inheritedPrecipitation?: { rain: number; snow: number };
};

type DailyPopFromHourlyOptions = {
  onlyFutureHours?: boolean;
};

/**
 * Agrega a probabilidade de chuva diaria a partir do hourly (Open-Meteo).
 * Usa o maior valor do dia para manter consistencia com a timeline por hora.
 *
 * @param hourly Dados horarios do Open-Meteo.
 * @param options Opcoes de agregacao.
 * @returns Probabilidade diaria em escala 0-1.
 */
const getDailyPopFromHourly = (
  hourly: HourlyForecast,
  options?: DailyPopFromHourlyOptions
): number | null => {
  const onlyFutureHours = options?.onlyFutureHours ?? false;
  const nowHour = new Date().getHours();

  const points = onlyFutureHours
    ? hourly.points.filter((entry) => entry.hour >= nowHour)
    : hourly.points;
  const safePoints = points.length > 0 ? points : hourly.points;

  if (safePoints.length === 0) return null;

  const maxProbability = safePoints.reduce((currentMax, entry) => {
    return entry.precipProbability > currentMax ? entry.precipProbability : currentMax;
  }, 0);

  return Math.min(Math.max(maxProbability / 100, 0), 1);
};

/**
 * Busca a melhor entrada hourly em cache para uma data/coordenada.
 * Quando houver mais de uma fonte (forecast/archive), prioriza a mais recente.
 *
 * @param hourlyForecasts Cache hourly completo.
 * @param dateKey Data alvo no formato YYYY-MM-DD.
 * @param lat Latitude da localizacao atual.
 * @param lon Longitude da localizacao atual.
 * @returns Entrada hourly mais recente para a data/coordenada, se existir.
 */
const getLatestHourlyForDate = (
  hourlyForecasts: Map<string, HourlyForecast>,
  dateKey: string,
  lat: number,
  lon: number
): HourlyForecast | null => {
  const keyPrefix = `${lat.toFixed(2)}|${lon.toFixed(2)}|${dateKey}|`;
  let latest: HourlyForecast | null = null;

  hourlyForecasts.forEach((entry, key) => {
    if (!key.startsWith(keyPrefix)) return;
    if (!latest || entry.fetchedAt > latest.fetchedAt) {
      latest = entry;
    }
  });

  return latest;
};

/**
 * Recalcula o POP diario dos snapshots com base no cache hourly disponivel.
 *
 * @param forecasts Snapshots diarios atuais.
 * @param hourlyForecasts Cache hourly disponível.
 * @param lat Latitude da localizacao atual.
 * @param lon Longitude da localizacao atual.
 * @returns Novo mapa de snapshots com POP sincronizado quando houver hourly.
 */
const syncForecastsPopWithHourly = (
  forecasts: Map<string, WeatherSnapshot>,
  hourlyForecasts: Map<string, HourlyForecast>,
  lat: number,
  lon: number
): Map<string, WeatherSnapshot> => {
  const todayKey = toForecastKey(new Date());
  let updatedForecasts = forecasts;

  forecasts.forEach((snapshot, dateKey) => {
    const hourly = getLatestHourlyForDate(hourlyForecasts, dateKey, lat, lon);
    if (!hourly) return;

    const popFromHourly = getDailyPopFromHourly(hourly, {
      onlyFutureHours: dateKey === todayKey,
    });
    if (popFromHourly === null || snapshot.pop === popFromHourly) return;

    if (updatedForecasts === forecasts) {
      updatedForecasts = new Map(forecasts);
    }
    updatedForecasts.set(dateKey, { ...snapshot, pop: popFromHourly });
  });

  return updatedForecasts;
};

/**
 * Converte a resposta do clima atual para WeatherSnapshot.
 * Quando nao esta chovendo agora mas o forecast preve chuva,
 * herda a precipitacao do forecast para manter consistencia com o POP.
 *
 * @param data Resposta atual da OpenWeatherMap.
 * @param options Opções para herdar métricas adicionais do forecast.
 */
const mapCurrentToSnapshot = (
  data: OpenWeatherCurrentResponse,
  options?: MapCurrentToSnapshotOptions
): WeatherSnapshot => {
  const inheritedPop = options?.inheritedPop ?? 0;
  const rainVolume = data.rain?.['1h'] ?? data.rain?.['3h'] ?? 0;
  const snowVolume = data.snow?.['1h'] ?? data.snow?.['3h'] ?? 0;
  const isRainingNow = rainVolume > 0 || snowVolume > 0;
  const currentPop = isRainingNow ? 1 : 0;
  const finalPop = Math.max(inheritedPop, currentPop);

  const precipitation = isRainingNow
    ? { rain: rainVolume, snow: snowVolume }
    : options?.inheritedPrecipitation ?? { rain: 0, snow: 0 };

  return {
    description: data.weather[0]?.description ?? 'Sem descricao',
    temperature: {
      current: data.main.temp,
      min: data.main.temp_min,
      max: data.main.temp_max,
    },
    feelsLike: data.main.feels_like,
    pop: finalPop,
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
    },
    humidity: data.main.humidity,
    uvIndex: 0,
    clouds: data.clouds.all,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    alerts: [],
    precipitation,
  };
};

/**
 * Atualiza o status de uma chave hourly mantendo imutabilidade.
 *
 * @param currentStatus Map atual de status.
 * @param cacheKey Chave do cache hourly.
 * @param status Novo status da chave.
 */
const updateHourlyStatus = (
  currentStatus: Map<string, HourlyStatus>,
  cacheKey: string,
  status: HourlyStatus
): Map<string, HourlyStatus> => {
  const next = new Map(currentStatus);
  next.set(cacheKey, status);
  return next;
};

/**
 * Store global do clima para compartilhar dados no app.
 */
export const useWeatherStore = create<WeatherStore>((set, get) => ({
  forecasts: new Map(),
  hourlyForecasts: loadHourlyCache(),
  hourlyStatus: new Map(),
  isLoading: false,
  error: null,
  locationLabel: 'Localizacao atual',
  coordinates: null,
  lastUpdatedAt: null,

  /**
   * Carrega a previsao do tempo e atualiza o store.
   */
  fetchWeather: async (params) => {
    const { force = false, signal } = params ?? {};
    const { isLoading, forecasts } = get();

    if (isLoading || (forecasts.size > 0 && !force)) {
      return;
    }

    set((state) => ({
      ...state,
      isLoading: true,
      error: null,
    }));

    try {
      const coordinates = await resolveWeatherCoordinates();

      const [forecastData, currentData] = await Promise.all([
        fetchForecast({ lat: coordinates.lat, lon: coordinates.lon, signal }),
        fetchCurrentWeather({ lat: coordinates.lat, lon: coordinates.lon, signal }),
      ]);

      let locationLabel = coordinates.label;
      try {
        const reverse = await fetchReverseGeocode({
          lat: coordinates.lat,
          lon: coordinates.lon,
          signal,
        });
        const resolvedPlace = reverse[0];
        locationLabel = formatLocationLabel({
          cityName: resolvedPlace?.name,
          stateName: resolvedPlace?.state,
          countryCode: resolvedPlace?.country,
          fallback: coordinates.label,
        });
      } catch {
        locationLabel = coordinates.label;
      }

      const grouped = groupForecastByDay(forecastData);
      const todayKey = toForecastKey(new Date());
      const todaySnapshot = grouped.get(todayKey);

      grouped.set(
        todayKey,
        mapCurrentToSnapshot(currentData, {
          inheritedPop: todaySnapshot?.pop,
          inheritedPrecipitation: todaySnapshot?.precipitation,
        })
      );

      // Busca Open-Meteo hourly para hoje de forma sincrona
      // para que o primeiro render ja tenha POP diario coerente com a timeline.
      let todayHourly: HourlyForecast | null = null;
      try {
        const hourlyResponse = await fetchHourlyForecast({
          lat: coordinates.lat,
          lon: coordinates.lon,
          date: todayKey,
          signal,
          source: 'forecast',
        });
        const hourlyCacheKey = buildHourlyCacheKey(
          coordinates.lat,
          coordinates.lon,
          todayKey,
          'forecast'
        );
        todayHourly = mapOpenMeteoToHourly(hourlyResponse, todayKey, hourlyCacheKey);

        const popFromHourly = getDailyPopFromHourly(todayHourly, {
          onlyFutureHours: true,
        });
        if (popFromHourly !== null) {
          const current = grouped.get(todayKey)!;
          grouped.set(todayKey, { ...current, pop: popFromHourly });
        }
      } catch {
        // Falha no Open-Meteo nao bloqueia o fluxo principal.
      }

      set((state) => {
        let mergedHourlyMap = state.hourlyForecasts;
        let mergedStatusMap = state.hourlyStatus;

        if (todayHourly) {
          mergedHourlyMap = new Map(state.hourlyForecasts);
          mergedHourlyMap.set(todayHourly.cacheKey, todayHourly);
          mergedStatusMap = new Map(state.hourlyStatus);
          mergedStatusMap.set(todayHourly.cacheKey, { isLoading: false, error: null });
          persistHourlyCache(mergedHourlyMap);
        }

        const syncedForecasts = syncForecastsPopWithHourly(
          grouped,
          mergedHourlyMap,
          coordinates.lat,
          coordinates.lon
        );

        const nextState: Partial<WeatherStoreState> = {
          forecasts: syncedForecasts,
          isLoading: false,
          error: null,
          locationLabel,
          coordinates: { lat: coordinates.lat, lon: coordinates.lon },
          lastUpdatedAt: new Date(),
        };

        if (todayHourly) {
          nextState.hourlyForecasts = mergedHourlyMap;
          nextState.hourlyStatus = mergedStatusMap;
        }

        return { ...state, ...nextState };
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        set((state) => ({
          ...state,
          isLoading: false,
        }));
        return;
      }
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel carregar o clima.';

      set((state) => ({
        ...state,
        isLoading: false,
        error: message,
      }));
    }
  },

  /**
   * Retorna o snapshot de clima para uma data especifica.
   */
  getSnapshotForDate: (date: Date) => {
    const key = toForecastKey(date);
    return get().forecasts.get(key) ?? null;
  },

  /**
   * Busca forecast horario do Open-Meteo para um dia especifico.
   */
  fetchHourly: async ({ dateKey, lat, lon, source, signal, force }) => {
    const cacheKey = buildHourlyCacheKey(lat, lon, dateKey, source);
    const { hourlyForecasts, hourlyStatus } = get();
    const status = hourlyStatus.get(cacheKey);

    if (status?.isLoading) return null;

    const cached = hourlyForecasts.get(cacheKey);
    const now = Date.now();

    if (cached && !force) {
      const age = now - cached.fetchedAt;
      if (age < HOURLY_CACHE_TTL_MS) {
        set((state) => {
          const nextState: Partial<WeatherStoreState> = {};

          if (status?.error) {
            nextState.hourlyStatus = updateHourlyStatus(state.hourlyStatus, cacheKey, {
              isLoading: false,
              error: null,
            });
          }

          const current = state.forecasts.get(dateKey);
          if (current) {
            const todayKey = toForecastKey(new Date());
            const popFromHourly = getDailyPopFromHourly(cached, {
              onlyFutureHours: dateKey === todayKey,
            });
            if (popFromHourly !== null && current.pop !== popFromHourly) {
              const updatedForecasts = new Map(state.forecasts);
              updatedForecasts.set(dateKey, { ...current, pop: popFromHourly });
              nextState.forecasts = updatedForecasts;
            }
          }

          return nextState;
        });
        return cached;
      }
    }

    set((state) => ({
      hourlyStatus: updateHourlyStatus(state.hourlyStatus, cacheKey, {
        isLoading: true,
        error: null,
      }),
    }));
    try {
      const response = await fetchHourlyForecast({ lat, lon, date: dateKey, signal, source });
      const hourly = mapOpenMeteoToHourly(response, dateKey, cacheKey);

      set((state) => {
        const newMap = new Map(state.hourlyForecasts);
        const newStatusMap = new Map(state.hourlyStatus);
        if (newMap.size >= HOURLY_CACHE_MAX_ENTRIES) {
          let oldestKey = '';
          let oldestTime = Infinity;
          newMap.forEach((entry, key) => {
            if (entry.fetchedAt < oldestTime) {
              oldestTime = entry.fetchedAt;
              oldestKey = key;
            }
          });
          if (oldestKey) {
            newMap.delete(oldestKey);
            newStatusMap.delete(oldestKey);
          }
        }

        newMap.set(cacheKey, hourly);
        newStatusMap.set(cacheKey, { isLoading: false, error: null });

        const nextState: Partial<WeatherStoreState> = {
          hourlyForecasts: newMap,
          hourlyStatus: newStatusMap,
        };

        const current = state.forecasts.get(dateKey);
        if (current) {
          const todayKey = toForecastKey(new Date());
          const popFromHourly = getDailyPopFromHourly(hourly, {
            onlyFutureHours: dateKey === todayKey,
          });

          if (popFromHourly !== null) {
            const updated = { ...current, pop: popFromHourly };
            const updatedForecasts = new Map(state.forecasts);
            updatedForecasts.set(dateKey, updated);
            nextState.forecasts = updatedForecasts;
          }
        }

        persistHourlyCache(newMap);
        return nextState;
      });
      return hourly;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        set((state) => ({
          hourlyStatus: updateHourlyStatus(state.hourlyStatus, cacheKey, {
            isLoading: false,
            error: null,
          }),
        }));
        return null;
      }

      const message = error instanceof Error
        ? error.message
        : 'Dados horarios indisponiveis';

      set((state) => ({
        hourlyStatus: updateHourlyStatus(state.hourlyStatus, cacheKey, {
          isLoading: false,
          error: message,
        }),
      }));
      return null;
    }
  },

  /**
   * Retorna forecast horario do cache.
   */
  getHourlyForDate: (cacheKey) => {
    return get().hourlyForecasts.get(cacheKey) ?? null;
  },

  /**
   * Verifica se o cache hourly esta expirado.
   */
  isHourlyStale: (cacheKey) => {
    const cached = get().hourlyForecasts.get(cacheKey);
    if (!cached) return true;
    return Date.now() - cached.fetchedAt >= HOURLY_CACHE_TTL_MS;
  },

  /**
   * Limpa os dados de clima armazenados.
   */
  resetWeather: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(HOURLY_STORAGE_KEY);
    }
    set({
      forecasts: new Map(),
      hourlyForecasts: new Map(),
      hourlyStatus: new Map(),
      isLoading: false,
      error: null,
      lastUpdatedAt: null,
    });
  },
}));
