import type { TimelineSlot } from '../../utils/calendarSidebar';
import { calendarTimeline } from '../../styles/calendar-sidebar.styles';
import { CalendarSidebarTimelineRow } from './CalendarSidebarTimelineRow';

type CalendarSidebarTimelineProps = {
  timeline: TimelineSlot[];
};

/**
 * Renderiza a timeline do painel lateral do calendário.
 */
export function CalendarSidebarTimeline({ timeline }: CalendarSidebarTimelineProps) {
  return (
    <div className={calendarTimeline}>
      {timeline.map((slot) => (
        <CalendarSidebarTimelineRow key={slot.hour} slot={slot} />
      ))}
    </div>
  );
}
