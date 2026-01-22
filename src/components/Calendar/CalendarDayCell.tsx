import { format, isSameDay, isSameMonth } from 'date-fns';
import { useCalendarStore } from '../../store/useCalendarStore';
import { dayCell } from './styles/calendar-base.styles';

interface CalendarDayCellProps {
  date: Date;
  currentMonth: Date;
}

export function CalendarDayCell({ date, currentMonth }: CalendarDayCellProps) {
  const { selectedDate, setSelectedDate, todos } = useCalendarStore();

  const dateKey = format(date, 'yyyy-MM-dd');
  const dayTodos = todos[dateKey] || [];
  const isSelected = isSameDay(date, selectedDate);
  const isToday = isSameDay(date, new Date());
  const isOutsideMonth = !isSameMonth(date, currentMonth);

  const handleClick = () => {
    if (!isOutsideMonth) {
      setSelectedDate(date);
    }
  };

  return (
    <button
      className={dayCell({ isSelected, isToday, isOutsideMonth, hasEvents: dayTodos.length > 0 })}
      onClick={handleClick}
      disabled={isOutsideMonth}
      type="button"
    >
      {format(date, 'd')}
    </button>
  );
}
