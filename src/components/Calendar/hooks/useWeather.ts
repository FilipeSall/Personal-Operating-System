import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { buildWeatherRows } from '../utils/weatherMetrics';
import { useWeatherStore } from '../../../store/useWeatherStore';
import { useCalendarStore } from '../../../store/useCalendarStore';
import { toForecastKey } from '../../../utils/forecastGrouper';
import type { WeatherRow, WeatherSnapshot } from '../../../types/weather';

export type WeatherState = {
  isLoading: boolean;
  error: string | null;
  locationLabel: string;
  lastUpdatedAt: Date | null;
  selectedDate: Date;
};

export type WeatherDerived = {
  rows: WeatherRow[];
  hasData: boolean;
  snapshot: WeatherSnapshot | null;
};

export type WeatherActions = {
  refreshWeather: () => Promise<void>;
};

/**
 * Hook responsavel por carregar e formatar o clima do dia selecionado.
 */
export const useWeather = () => {
  const fetchWeather = useWeatherStore((store) => store.fetchWeather);
  const forecasts = useWeatherStore((store) => store.forecasts);
  const selectedDate = useCalendarStore((store) => store.selectedDate);

  const state: WeatherState = useWeatherStore(
    useShallow((store) => ({
      isLoading: store.isLoading,
      error: store.error,
      locationLabel: store.locationLabel,
      lastUpdatedAt: store.lastUpdatedAt,
      selectedDate,
    }))
  );

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  /**
   * Forca a atualizacao do clima no store.
   */
  const refreshWeather = () => {
    return fetchWeather({ force: true });
  };

  const dateKey = toForecastKey(selectedDate);
  const snapshot = forecasts.get(dateKey) ?? null;

  const rows = useMemo(() => {
    if (!snapshot) {
      return [];
    }
    return buildWeatherRows(snapshot);
  }, [snapshot]);

  return {
    state,
    derived: {
      rows,
      hasData: Boolean(snapshot),
      snapshot,
    },
    actions: {
      refreshWeather,
    },
  };
};
