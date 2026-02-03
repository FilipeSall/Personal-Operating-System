import { calendarSidebar } from '../styles/calendar-sidebar.styles';
import type {
  CalendarSidebarActions,
  CalendarSidebarDerived,
  CalendarSidebarState,
} from '../hooks/useCalendarSidebar';
import { CalendarSidebarHeader } from './components/CalendarSidebarHeader';
import { CalendarSidebarTimeline } from './components/CalendarSidebarTimeline';

type CalendarSidebarViewProps = {
  state: CalendarSidebarState;
  derived: CalendarSidebarDerived;
  actions: CalendarSidebarActions;
};

/**
 * View do painel lateral do calendário.
 */
export function CalendarSidebarView({ state, derived }: CalendarSidebarViewProps) {
  return (
    <aside className={calendarSidebar} data-tone={state.tone}>
      <CalendarSidebarHeader
        dateLabel={state.dateLabel}
      />
      <CalendarSidebarTimeline timeline={derived.timeline} />
    </aside>
  );
}
