import { useMemo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useShallow } from 'zustand/react/shallow';
import { useCalendarStore } from '../../../store/useCalendarStore';
import { useWeatherStore } from '../../../store/useWeatherStore';
import { useHourlyForecast } from '../hooks/useHourlyForecast';
import { filterTodosForHour } from './utils/filterTodosForHour';
import { DayTimelineView } from './DayTimelineView';
import type { Todo } from '../../../types/calendar';
import type { HourlyDataPoint } from '../../../types/weather';

export type TimelineSlotData = {
  hour: number;
  time: string;
  weather: HourlyDataPoint | null;
  todos: Todo[];
  isLoading: boolean;
};

/**
 * Timeline de 24h com clima horario e tarefas do dia selecionado.
 */
export const DayTimeline = () => {
  const { selectedDate, getTodosForDate } = useCalendarStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
      getTodosForDate: state.getTodosForDate,
    }))
  );
  const { locationLabel, coordinates } = useWeatherStore(
    useShallow((state) => ({
      locationLabel: state.locationLabel,
      coordinates: state.coordinates,
    }))
  );

  const lat = coordinates?.lat ?? null;
  const lon = coordinates?.lon ?? null;

  const { hourlyData, isLoading, error } = useHourlyForecast({
    selectedDate,
    lat,
    lon,
  });

  const dateKey = useMemo(() => format(selectedDate, 'yyyy-MM-dd'), [selectedDate]);
  const todos = useMemo(() => getTodosForDate(dateKey), [dateKey, getTodosForDate]);
  const hourlyByHour = useMemo(() => {
    if (!hourlyData) return null;
    return new Map(hourlyData.points.map((point) => [point.hour, point]));
  }, [hourlyData]);

  const currentHour = new Date().getHours();

  const slots: TimelineSlotData[] = useMemo(() => {
    return Array.from({ length: 24 }, (_, hour) => {
      const weatherPoint = hourlyByHour?.get(hour) ?? null;
      const todosForHour = filterTodosForHour(todos, hour);

      return {
        hour,
        time: `${hour.toString().padStart(2, '0')}:00`,
        weather: weatherPoint,
        todos: todosForHour,
        isLoading: Boolean(isLoading && !hourlyData && hour === currentHour),
      };
    });
  }, [currentHour, hourlyByHour, hourlyData, isLoading, todos]);

  const formattedDate = useMemo(
    () => format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR }),
    [selectedDate]
  );

  return (
    <DayTimelineView
      slots={slots}
      formattedDate={formattedDate}
      locationLabel={locationLabel}
      error={error}
    />
  );
};
