import { format, isSameDay, isSameMonth } from 'date-fns';
import { useCalendarStore } from '../../../store/useCalendarStore';
import type { Todo, TodoType } from '../../../types/calendar';
import {
  dayCell,
  dayNumber,
  eventItem,
  eventDot,
  eventText,
  eventTime,
  moreEventsText,
} from '../styles/calendar-base.styles';
import { formatTime } from '../utils/formatTime';

interface CalendarDayCellProps {
  date: Date;
  currentMonth: Date;
}

const MAX_VISIBLE_EVENTS = 3;

function EventItemComponent({ todo }: { todo: Todo }) {
  const type = todo.type as TodoType;

  return (
    <div className={eventItem({ type })}>
      <div className={eventDot({ type })} />
      <span className={eventText({ type })}>{todo.text}</span>
      <span className={eventTime({ type })}>{formatTime(todo.startTime)}</span>
    </div>
  );
}

export function CalendarDayCell({ date, currentMonth }: CalendarDayCellProps) {
  const { selectedDate, setSelectedDate, getTodosForDate } = useCalendarStore();

  const dateKey = format(date, 'yyyy-MM-dd');
  const dayTodos = getTodosForDate(dateKey);
  const isSelected = isSameDay(date, selectedDate);
  const isToday = isSameDay(date, new Date());
  const isOutsideMonth = !isSameMonth(date, currentMonth);

  const visibleEvents = dayTodos.slice(0, MAX_VISIBLE_EVENTS);
  const hiddenCount = dayTodos.length - MAX_VISIBLE_EVENTS;

  const handleClick = () => {
    if (!isOutsideMonth) {
      setSelectedDate(date);
    }
  };

  return (
    <div
      className={dayCell({ isSelected, isToday, isOutsideMonth, hasEvents: dayTodos.length > 0 })}
      onClick={handleClick}
      role="button"
      tabIndex={isOutsideMonth ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <span className={dayNumber({ isSelected, isToday, isOutsideMonth })}>
        {format(date, 'd')}
      </span>

      {!isOutsideMonth && (
        <>
          {visibleEvents.map((todo) => (
            <EventItemComponent key={todo.id} todo={todo} />
          ))}

          {hiddenCount > 0 && (
            <span className={moreEventsText}>
              +{hiddenCount} mais...
            </span>
          )}
        </>
      )}
    </div>
  );
}
