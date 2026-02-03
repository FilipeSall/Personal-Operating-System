import { useMemo } from 'react';
import { format, isSameDay } from 'date-fns';
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
  const tasks = useMemo(() => {
    const items = todos[dateKey] ?? [];
    return [...items].sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [dateKey, todos]);

  const snapshot = useMemo<WeatherSnapshot | null>(() => {
    const key = toForecastKey(selectedDate);
    return forecasts.get(key) ?? null;
  }, [forecasts, selectedDate]);

  const theme = useMemo(() => resolveWeatherTheme(snapshot), [snapshot]);

  const timeline = useMemo(() => {
    return buildHourlyTimeline(tasks, theme.tone, selectedDate);
  }, [tasks, theme.tone, selectedDate]);


  const dateLabel = useMemo(() => formatSidebarDateLabel(selectedDate), [selectedDate]);
  const isToday = useMemo(() => isSameDay(selectedDate, new Date()), [selectedDate]);

  const state: CalendarSidebarState = {
    dateLabel,
    isToday,
    tone: theme.tone,
  };

  const derived: CalendarSidebarDerived = {
    timeline,
    tasks,
  };

  const actions: CalendarSidebarActions = {};

  return { state, derived, actions };
};
