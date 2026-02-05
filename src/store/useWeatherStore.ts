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
  /**
   * Probabilidade de precipitação herdada de um snapshot de forecast diário (opcional).
   */
  inheritedPop?: number;
};

/**
 * Converte a resposta do clima atual para WeatherSnapshot.
 *
 * @param data Resposta atual da OpenWeatherMap.
 * @param options Opções para herdar métricas adicionais do forecast.
 */
const mapCurrentToSnapshot = (
  data: OpenWeatherCurrentResponse,
  options?: MapCurrentToSnapshotOptions
): WeatherSnapshot => ({
  description: data.weather[0]?.description ?? 'Sem descricao',
  temperature: {
    current: data.main.temp,
    min: data.main.temp_min,
    max: data.main.temp_max,
  },
  feelsLike: data.main.feels_like,
  pop: Math.max(
    options?.inheritedPop ?? 0,
    (data.rain?.['1h'] ?? data.rain?.['3h'] ?? 0) > 0 ||
      (data.snow?.['1h'] ?? data.snow?.['3h'] ?? 0) > 0
      ? 1
      : 0
  ),
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
  precipitation: {
    rain: data.rain?.['1h'] ?? data.rain?.['3h'] ?? 0,
    snow: data.snow?.['1h'] ?? data.snow?.['3h'] ?? 0,
  },
});

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
        const place = reverse[0];
        locationLabel = formatLocationLabel({
          cityName: place?.name,
          stateName: place?.state,
          countryCode: place?.country,
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
        })
      );

      set((state) => ({
        ...state,
        forecasts: grouped,
        isLoading: false,
        error: null,
        locationLabel,
        coordinates: { lat: coordinates.lat, lon: coordinates.lon },
        lastUpdatedAt: new Date(),
      }));
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
    const isDev = import.meta.env.DEV;
    const cacheKey = buildHourlyCacheKey(lat, lon, dateKey, source);
    const { hourlyForecasts, hourlyStatus } = get();
    const status = hourlyStatus.get(cacheKey);

    if (status?.isLoading) return null;

    const cached = hourlyForecasts.get(cacheKey);
    const now = Date.now();

    if (cached && !force) {
      const age = now - cached.fetchedAt;
      if (age < HOURLY_CACHE_TTL_MS) {
        if (isDev) {
          console.log('[hourly] cache hit', { cacheKey, ageMs: age });
        }
        if (status?.error) {
          set((state) => ({
            hourlyStatus: updateHourlyStatus(state.hourlyStatus, cacheKey, {
              isLoading: false,
              error: null,
            }),
          }));
        }
        return cached;
      }
    }

    set((state) => ({
      hourlyStatus: updateHourlyStatus(state.hourlyStatus, cacheKey, {
        isLoading: true,
        error: null,
      }),
    }));
    if (isDev) {
      console.log('[hourly] fetch start', { cacheKey, dateKey, source, force: Boolean(force) });
    }

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

        const nextState = {
          hourlyForecasts: newMap,
          hourlyStatus: newStatusMap,
        };
        persistHourlyCache(newMap);
        return nextState;
      });
      if (isDev) {
        console.log('[hourly] fetch success', {
          cacheKey,
          points: hourly.points.length,
        });
      }

      return hourly;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        set((state) => ({
          hourlyStatus: updateHourlyStatus(state.hourlyStatus, cacheKey, {
            isLoading: false,
            error: null,
          }),
        }));
        if (isDev) {
          console.log('[hourly] fetch aborted', { cacheKey });
        }
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
      if (isDev) {
        console.log('[hourly] fetch error', { cacheKey, message });
      }
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
