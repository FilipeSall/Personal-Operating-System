import type { Todo, TodoType } from '../../../types/calendar';
import { format } from 'date-fns';
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

type CalendarDayCellViewProps = {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  isOutsideMonth: boolean;
  visibleEvents: Todo[];
  hiddenCount: number;
  hasEvents: boolean;
  onSelect: () => void;
};

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

export function CalendarDayCellView({
  date,
  isSelected,
  isToday,
  isOutsideMonth,
  visibleEvents,
  hiddenCount,
  hasEvents,
  onSelect,
}: CalendarDayCellViewProps) {
  return (
    <div
      className={dayCell({ isSelected, isToday, isOutsideMonth, hasEvents })}
      onClick={onSelect}
      role="button"
      tabIndex={isOutsideMonth ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect();
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

          {hiddenCount > 0 && <span className={moreEventsText}>+{hiddenCount} mais...</span>}
        </>
      )}
    </div>
  );
}
