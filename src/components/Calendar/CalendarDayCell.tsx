import { format, isSameDay, isSameMonth } from 'date-fns';
import { useCalendarStore } from '../../store/useCalendarStore';
import { dayCell, eventIndicator, eventDot } from './styles/calendar-base.styles';

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

  const uniqueTypes = [...new Set(dayTodos.map((t) => t.type))].slice(0, 3);

  const typeColors: Record<string, string> = {
    work: '#3B82F6',
    routine: '#10B981',
    reminder: '#F59E0B',
    personal: '#8B5CF6',
    study: '#EC4899',
    health: '#EF4444',
    finance: '#14B8A6',
  };

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
      {uniqueTypes.length > 0 && (
        <div className={eventIndicator}>
          {uniqueTypes.map((type) => (
            <span
              key={type}
              className={eventDot}
              style={{ backgroundColor: typeColors[type] }}
            />
          ))}
        </div>
      )}
    </button>
  );
}
