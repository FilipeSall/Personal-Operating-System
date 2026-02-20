import { useMemo } from 'react';
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
  const { selectedDate, todos } = useCalendarStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
      todos: state.todos,
    }))
  );
  const { forecasts, coordinates } = useWeatherStore(
    useShallow((state) => ({
      forecasts: state.forecasts,
      coordinates: state.coordinates,
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
  }, [tasks, theme.tone, selectedDate, hourlyData, currentPopPercent, isHourlyLoading]);
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
