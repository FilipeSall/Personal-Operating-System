import { CalendarGrid } from './CalendarGrid/CalendarGrid';
import { calendarContainer } from './styles/calendar-layout.styles';

export function Calendar() {
  return (
    <div className={calendarContainer}>
      <CalendarGrid />
    </div>
  );
}
