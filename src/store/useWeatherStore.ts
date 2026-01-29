import { create } from 'zustand';
import { fetchForecast, fetchCurrentWeather, fetchReverseGeocode } from '../services/openWeatherService';
import { resolveWeatherCoordinates } from '../utils/weatherLocation';
import { groupForecastByDay, toForecastKey } from '../utils/forecastGrouper';
import { formatLocationLabel } from '../utils/formatLocationLabel';
import type { WeatherSnapshot } from '../types/weather';
import type { OpenWeatherCurrentResponse } from '../types/openWeather';

type WeatherStoreState = {
  forecasts: Map<string, WeatherSnapshot>;
  isLoading: boolean;
  error: string | null;
  locationLabel: string;
  lastUpdatedAt: Date | null;
};

type FetchWeatherParams = {
  force?: boolean;
  signal?: AbortSignal;
};

type WeatherStoreActions = {
  fetchWeather: (params?: FetchWeatherParams) => Promise<void>;
  getSnapshotForDate: (date: Date) => WeatherSnapshot | null;
  resetWeather: () => void;
};

export type WeatherStore = WeatherStoreState & WeatherStoreActions;

/**
 * Converte a resposta do clima atual para WeatherSnapshot.
 */
const mapCurrentToSnapshot = (data: OpenWeatherCurrentResponse): WeatherSnapshot => ({
  description: data.weather[0]?.description ?? 'Sem descricao',
  temperature: {
    current: data.main.temp,
    min: data.main.temp_min,
    max: data.main.temp_max,
  },
  feelsLike: data.main.feels_like,
  pop: 0,
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
 * Store global do clima para compartilhar dados no app.
 */
export const useWeatherStore = create<WeatherStore>((set, get) => ({
  forecasts: new Map(),
  isLoading: false,
  error: null,
  locationLabel: 'Localizacao atual',
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
      if (!grouped.has(todayKey)) {
        grouped.set(todayKey, mapCurrentToSnapshot(currentData));
      }

      set((state) => ({
        ...state,
        forecasts: grouped,
        isLoading: false,
        error: null,
        locationLabel,
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
   * Limpa os dados de clima armazenados.
   */
  resetWeather: () => {
    set({
      forecasts: new Map(),
      isLoading: false,
      error: null,
      lastUpdatedAt: null,
    });
  },
}));
