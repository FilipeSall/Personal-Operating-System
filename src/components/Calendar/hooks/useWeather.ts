import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { buildWeatherRows } from '../utils/weatherMetrics';
import { useWeatherStore } from '../../../store/useWeatherStore';
import { useCalendarStore } from '../../../store/useCalendarStore';
import { toForecastKey } from '../../../utils/forecastGrouper';
import type { WeatherRow } from '../../../types/weather';

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
    },
  };
};
