import { useEffect, useMemo, useRef, useState } from 'react';
import { format, isSameDay, addDays } from 'date-fns';
import { useShallow } from 'zustand/react/shallow';
import { useCalendarStore } from '../../../store/useCalendarStore';
import { useWeatherStore } from '../../../store/useWeatherStore';
import { toForecastKey } from '../../../utils/forecastGrouper';
import { useHourlyForecast } from './useHourlyForecast';
import type { Todo } from '../../../types/calendar';
import type { WeatherSnapshot } from '../../../types/weather';
import {
  buildHourlyTimeline,
  formatSidebarDateLabel,
  type TimelineSlot,
} from '../utils/calendarSidebar';
import { resolveWeatherTheme, type WeatherTone } from '../utils/weatherTheme';

export type CalendarSidebarState = {
  dateLabel: string;
  isToday: boolean;
  tone: WeatherTone;
};

export type CalendarSidebarDerived = {
  timeline: TimelineSlot[];
  nextDayTimeline: TimelineSlot[];
  tasks: Todo[];
};

export type CalendarSidebarActions = Record<string, never>;

/**
 * Hook que prepara o conteúdo do painel lateral do calendário.
 */
export const useCalendarSidebar = () => {
  const isDev = import.meta.env.DEV;
  const logRef = useRef<string | null>(null);
  const [hourTick, setHourTick] = useState(0);
  const { selectedDate, todos } = useCalendarStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
      todos: state.todos,
    }))
  );
  const { forecasts, coordinates, fetchWeather } = useWeatherStore(
    useShallow((state) => ({
      forecasts: state.forecasts,
      coordinates: state.coordinates,
      fetchWeather: state.fetchWeather,
    }))
  );

  const dateKey = useMemo(() => format(selectedDate, 'yyyy-MM-dd'), [selectedDate]);
  const nextDate = useMemo(() => addDays(selectedDate, 1), [selectedDate]);
  const nextDateKey = useMemo(() => format(nextDate, 'yyyy-MM-dd'), [nextDate]);
  const tasks = useMemo(() => {
    const items = todos[dateKey] ?? [];
    return [...items].sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [dateKey, todos]);
  const nextDayTasks = useMemo(() => {
    const items = todos[nextDateKey] ?? [];
    return [...items].sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [nextDateKey, todos]);

  const snapshot = useMemo<WeatherSnapshot | null>(() => {
    const key = toForecastKey(selectedDate);
    return forecasts.get(key) ?? null;
  }, [forecasts, selectedDate]);
  const nextSnapshot = useMemo<WeatherSnapshot | null>(() => {
    const key = toForecastKey(nextDate);
    return forecasts.get(key) ?? null;
  }, [forecasts, nextDate]);

  const theme = useMemo(() => resolveWeatherTheme(snapshot), [snapshot]);
  const nextTheme = useMemo(() => resolveWeatherTheme(nextSnapshot), [nextSnapshot]);
  const currentPopPercent = useMemo(() => {
    if (!snapshot) return null;
    return Math.round(snapshot.pop * 100);
  }, [snapshot]);

  const lat = coordinates?.lat ?? null;
  const lon = coordinates?.lon ?? null;

  const { hourlyData, isLoading: isHourlyLoading } = useHourlyForecast({
    selectedDate,
    lat,
    lon,
  });

  const {
    hourlyData: nextDayHourlyData,
    isLoading: isNextDayHourlyLoading,
  } = useHourlyForecast({
    selectedDate: nextDate,
    lat,
    lon,
  });

  const timeline = useMemo(() => {
    return buildHourlyTimeline(
      tasks,
      theme.tone,
      selectedDate,
      hourlyData,
      currentPopPercent,
      isHourlyLoading
    );
  }, [tasks, theme.tone, selectedDate, hourlyData, currentPopPercent, isHourlyLoading, hourTick]);
  const nextDayTimeline = useMemo(() => {
    return buildHourlyTimeline(
      nextDayTasks,
      nextTheme.tone,
      nextDate,
      nextDayHourlyData,
      null,
      isNextDayHourlyLoading
    );
  }, [nextDate, nextDayTasks, nextTheme.tone, nextDayHourlyData, isNextDayHourlyLoading]);

  useEffect(() => {
    if (!isDev) return;
    const slot = timeline[23];
    const token = `${dateKey}|${slot?.precipProbability ?? 'null'}|${hourlyData?.dateKey ?? 'none'}`;
    if (logRef.current === token) return;
    logRef.current = token;
    console.log('[hourly] timeline slot 23', {
      dateKey,
      hourlyDateKey: hourlyData?.dateKey ?? null,
      precipProbability: slot?.precipProbability ?? null,
      weatherCode: slot?.weatherCode ?? null,
    });
  }, [dateKey, hourlyData, isDev, timeline]);

  useEffect(() => {
    const now = new Date();
    const msToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    let intervalId: number | null = null;

    const timeoutId = window.setTimeout(() => {
      setHourTick((value) => value + 1);
      intervalId = window.setInterval(() => {
        setHourTick((value) => value + 1);
      }, 60 * 1000);
    }, msToNextMinute);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    const now = new Date();
    const msToNextHour =
      (60 - now.getMinutes()) * 60 * 1000 -
      now.getSeconds() * 1000 -
      now.getMilliseconds();
    let intervalId: number | null = null;

    const timeoutId = window.setTimeout(() => {
      fetchWeather({ force: true });
      intervalId = window.setInterval(() => {
        fetchWeather({ force: true });
      }, 60 * 60 * 1000);
    }, msToNextHour);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [fetchWeather]);

  const dateLabel = useMemo(() => formatSidebarDateLabel(selectedDate), [selectedDate]);
  const isToday = useMemo(() => isSameDay(selectedDate, new Date()), [selectedDate]);

  const state: CalendarSidebarState = {
    dateLabel,
    isToday,
    tone: theme.tone,
  };

  const derived: CalendarSidebarDerived = {
    timeline,
    nextDayTimeline,
    tasks,
  };

  const actions: CalendarSidebarActions = {};

  return { state, derived, actions };
};
