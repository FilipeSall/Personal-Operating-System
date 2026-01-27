import { format, isSameDay, isSameMonth } from 'date-fns';
import { useCalendarStore } from '../../../store/useCalendarStore';

type UseCalendarDayCellParams = {
  date: Date;
  currentMonth: Date;
};

/**
 * Hook que concentra a lógica do dia no calendário.
 *
 * Props:
 * - date: data do dia renderizado.
 * - currentMonth: mês atualmente selecionado no calendário.
 *
 * Como usar:
 * const state = useCalendarDayCell({ date, currentMonth });
 * Use os retornos para renderizar o UI do dia e lidar com cliques/teclas.
 */
export const useCalendarDayCell = ({ date, currentMonth }: UseCalendarDayCellParams) => {
  const { selectedDate, setSelectedDate, getTodosForDate } = useCalendarStore();

  const dateKey = format(date, 'yyyy-MM-dd');
  const dayTodos = getTodosForDate(dateKey);
  const isSelected = isSameDay(date, selectedDate);
  const isToday = isSameDay(date, new Date());
  const isOutsideMonth = !isSameMonth(date, currentMonth);

  const maxVisibleEvents = 3;
  const visibleEvents = dayTodos.slice(0, maxVisibleEvents);
  const hiddenCount = dayTodos.length - maxVisibleEvents;

  const handleSelect = () => {
    if (!isOutsideMonth) {
      setSelectedDate(date);
    }
  };

  return {
    dateKey,
    dayTodos,
    visibleEvents,
    hiddenCount,
    isSelected,
    isToday,
    isOutsideMonth,
    handleSelect,
  };
};
