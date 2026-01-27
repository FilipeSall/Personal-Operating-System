import { useCalendarDayCell } from '../hooks/useCalendarDayCell';
import { CalendarDayCellView } from './CalendarDayCellView';

interface CalendarDayCellProps {
  date: Date;
  currentMonth: Date;
}

export function CalendarDayCell({ date, currentMonth }: CalendarDayCellProps) {
  const {
    dayTodos,
    visibleEvents,
    hiddenCount,
    isSelected,
    isToday,
    isOutsideMonth,
    handleSelect,
  } = useCalendarDayCell({ date, currentMonth });

  return (
    <CalendarDayCellView
      date={date}
      isSelected={isSelected}
      isToday={isToday}
      isOutsideMonth={isOutsideMonth}
      visibleEvents={visibleEvents}
      hiddenCount={hiddenCount}
      hasEvents={dayTodos.length > 0}
      onSelect={handleSelect}
    />
  );
}
