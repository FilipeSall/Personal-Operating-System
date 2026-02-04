import type { VisibleTimelineSlot } from '../../hooks/useTimelineNavigation';
import { calendarTimeline } from '../../styles/calendar-sidebar.styles';
import { CalendarSidebarTimelineRow } from './CalendarSidebarTimelineRow';

type CalendarSidebarTimelineProps = {
  slots: VisibleTimelineSlot[];
  onSelectNextDay: (hour: number) => void;
};

/**
 * Renderiza a timeline do painel lateral do calendário.
 */
export function CalendarSidebarTimeline({ slots, onSelectNextDay }: CalendarSidebarTimelineProps) {
  return (
    <div className={calendarTimeline}>
      {slots.map((slot) => (
        <CalendarSidebarTimelineRow
          key={`${slot.dayOffset}-${slot.hour}`}
          slot={slot}
          onSelectNextDay={onSelectNextDay}
        />
      ))}
    </div>
  );
}
