import { CalendarGrid } from './CalendarGrid/CalendarGrid';
import { Weather } from './Weather/Weather';
import { calendarContainer } from './styles/calendar-layout.styles';

export function Calendar() {
  return (
    <div className={calendarContainer}>
      <CalendarGrid />
      <Weather />
    </div>
  );
}
