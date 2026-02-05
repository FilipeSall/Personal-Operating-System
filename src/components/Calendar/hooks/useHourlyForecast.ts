import { useEffect, useMemo, useRef, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { format, isAfter, isBefore, addDays, subDays, startOfDay } from 'date-fns';
import { useWeatherStore } from '../../../store/useWeatherStore';
import { buildHourlyCacheKey } from '../../../utils/hourlyForecastMapper';
import type { HourlyForecast, HourlySource } from '../../../types/weather';
import {
  HOURLY_FORECAST_DEBOUNCE_MS,
  HOURLY_FORECAST_MAX_FUTURE_DAYS,
  HOURLY_FORECAST_MAX_PAST_DAYS,
} from '../consts/hourlyForecast';

type UseHourlyForecastParams = {
  selectedDate: Date;
  lat: number | null;
  lon: number | null;
};

type UseHourlyForecastReturn = {
  hourlyData: HourlyForecast | null;
  isLoading: boolean;
  error: string | null;
  isStale: boolean;
  refetch: () => void;
};

/**
 * Hook responsavel por buscar e cachear o forecast horario para um dia especifico.
 *
 * @param params Dados da data e coordenadas.
 */
export const useHourlyForecast = ({
  selectedDate,
  lat,
  lon,
}: UseHourlyForecastParams): UseHourlyForecastReturn => {
  const hourlySelector = useShallow((state: ReturnType<typeof useWeatherStore.getState>) => ({
    fetchHourly: state.fetchHourly,
    hourlyForecasts: state.hourlyForecasts,
    hourlyStatus: state.hourlyStatus,
    isHourlyStale: state.isHourlyStale,
  }));
  const { fetchHourly, hourlyForecasts, hourlyStatus, isHourlyStale } = useWeatherStore(
    hourlySelector
  );

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dateKey = useMemo(() => format(selectedDate, 'yyyy-MM-dd'), [selectedDate]);
  const source: HourlySource = useMemo(() => {
    const today = startOfDay(new Date());
    const selectedDay = startOfDay(selectedDate);
    return isBefore(selectedDay, today) ? 'archive' : 'forecast';
  }, [selectedDate]);
  const fallbackSource: HourlySource | null = source === 'archive' ? 'forecast' : null;

  const primaryKey = useMemo(() => {
    if (lat === null || lon === null) return null;
    return buildHourlyCacheKey(lat, lon, dateKey, source);
  }, [dateKey, lat, lon, source]);
  const fallbackKey = useMemo(() => {
    if (lat === null || lon === null || !fallbackSource) return null;
    return buildHourlyCacheKey(lat, lon, dateKey, fallbackSource);
  }, [dateKey, lat, lon, fallbackSource]);

  const hourlyData = useMemo(() => {
    if (!primaryKey) return null;
    return (
      hourlyForecasts.get(primaryKey) ??
      (fallbackKey ? hourlyForecasts.get(fallbackKey) ?? null : null)
    );
  }, [fallbackKey, hourlyForecasts, primaryKey]);
  const primaryStale = primaryKey ? isHourlyStale(primaryKey) : true;
  const fallbackStale = fallbackKey ? isHourlyStale(fallbackKey) : true;
  const isStale = primaryStale && fallbackStale;
  const status = primaryKey ? hourlyStatus.get(primaryKey) : null;
  const fallbackStatus = fallbackKey ? hourlyStatus.get(fallbackKey) : null;
  const hasError = Boolean(status?.error || fallbackStatus?.error);
  const error = hourlyData ? null : status?.error ?? fallbackStatus?.error ?? null;
  const isOutOfRangeError = Boolean(status?.error?.includes('out of allowed range'));
  /**
   * Verifica se a data esta dentro do range suportado pelo Open-Meteo.
   */
  const isValidDate = useCallback(() => {
    const today = startOfDay(new Date());
    const selectedDay = startOfDay(selectedDate);
    const minDate = subDays(today, HOURLY_FORECAST_MAX_PAST_DAYS);
    const maxDate = addDays(today, HOURLY_FORECAST_MAX_FUTURE_DAYS);

    return !isBefore(selectedDay, minDate) && !isAfter(selectedDay, maxDate);
  }, [selectedDate]);

  const canRequest = lat !== null && lon !== null && isValidDate();
  const isLoadingRaw = Boolean(status?.isLoading || fallbackStatus?.isLoading);
  const isLoading = Boolean(
    isLoadingRaw || (canRequest && hourlyData === null && isStale && !hasError)
  );

  /**
   * Executa a busca do forecast horario (com cancelamento do anterior).
   */
  const doFetch = useCallback(
    (requestSource: HourlySource, force = false) => {
      if (lat === null || lon === null) return;
      if (!isValidDate()) return;

      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      fetchHourly({
        dateKey,
        lat,
        lon,
        source: requestSource,
        signal: abortControllerRef.current.signal,
        force,
      });
    },
    [lat, lon, dateKey, fetchHourly, isValidDate]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      abortControllerRef.current?.abort();
    };
  }, [primaryKey]);

  useEffect(() => {
    if (lat === null || lon === null) return;
    if (!isValidDate()) return;
    if (isLoadingRaw) return;
    if (hourlyData && !isStale) return;
    if (isOutOfRangeError) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      doFetch(source);
    }, HOURLY_FORECAST_DEBOUNCE_MS);
  }, [
    dateKey,
    lat,
    lon,
    source,
    isValidDate,
    isLoading,
    hourlyData,
    isStale,
    doFetch,
    isLoadingRaw,
    primaryKey,
    fallbackKey,
    isOutOfRangeError,
  ]);

  const fallbackAttemptedRef = useRef(new Set<string>());

  useEffect(() => {
    if (!fallbackSource) return;
    if (lat === null || lon === null) return;
    if (hourlyData) return;
    if (!status?.error) return;
    if (isOutOfRangeError) return;

    const token = `${dateKey}|${source}`;
    if (fallbackAttemptedRef.current.has(token)) return;
    fallbackAttemptedRef.current.add(token);
    doFetch(fallbackSource, true);
  }, [
    dateKey,
    doFetch,
    fallbackSource,
    hourlyData,
    lat,
    lon,
    source,
    status?.error,
    isOutOfRangeError,
  ]);

  /**
   * Forca uma nova busca ignorando cache.
   */
  const refetch = useCallback(() => {
    doFetch(source, true);
    if (fallbackSource) {
      doFetch(fallbackSource, true);
    }
  }, [doFetch, fallbackSource, source]);

  return {
    hourlyData,
    isLoading,
    error,
    isStale,
    refetch,
  };
};
