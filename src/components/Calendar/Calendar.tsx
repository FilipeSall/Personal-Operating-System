import { CalendarGrid } from './CalendarGrid/CalendarGrid';
import { calendarContainer } from './styles/calendar-base.styles';

export function Calendar() {
  return (
    <div className={calendarContainer}>
      <CalendarGrid />
    </div>
  );
}
