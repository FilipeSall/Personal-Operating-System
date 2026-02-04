import { useMemo } from 'react';
import { format, isSameDay, addDays } from 'date-fns';
import { useCalendarStore } from '../../../store/useCalendarStore';
import { useWeatherStore } from '../../../store/useWeatherStore';
import { toForecastKey } from '../../../utils/forecastGrouper';
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
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const todos = useCalendarStore((state) => state.todos);
  const forecasts = useWeatherStore((state) => state.forecasts);

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

  const timeline = useMemo(() => {
    return buildHourlyTimeline(tasks, theme.tone, selectedDate);
  }, [tasks, theme.tone, selectedDate]);
  const nextDayTimeline = useMemo(() => {
    return buildHourlyTimeline(nextDayTasks, nextTheme.tone, nextDate);
  }, [nextDate, nextDayTasks, nextTheme.tone]);


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
