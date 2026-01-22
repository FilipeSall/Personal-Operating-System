import { CalendarGrid } from './CalendarGrid';
import { CalendarTodoPanel } from './CalendarTodoPanel';
import { calendarContainer } from './styles/calendar-base.styles';

export function Calendar() {
  return (
    <div className={calendarContainer}>
      <CalendarGrid />
      <CalendarTodoPanel />
    </div>
  );
}
