import { calendarSidebar } from '../styles/calendar-sidebar.styles';
import type {
  CalendarSidebarActions,
  CalendarSidebarDerived,
  CalendarSidebarState,
} from '../hooks/useCalendarSidebar';
import { useTimelineNavigation } from '../hooks/useTimelineNavigation';
import { useTimelineDayTransition } from '../hooks/useTimelineDayTransition';
import { CalendarSidebarHeader } from './components/CalendarSidebarHeader';
import { CalendarSidebarTimeline } from './components/CalendarSidebarTimeline';
import { CalendarSidebarTimelineControls } from './components/CalendarSidebarTimelineControls';

type CalendarSidebarViewProps = {
  state: CalendarSidebarState;
  derived: CalendarSidebarDerived;
  actions: CalendarSidebarActions;
};

/**
 * View do painel lateral do calendário.
 */
export function CalendarSidebarView({ state, derived }: CalendarSidebarViewProps) {
  const { state: transitionState, actions: transitionActions } = useTimelineDayTransition();
  const { state: navState, actions: navActions } = useTimelineNavigation({
    timeline: derived.timeline,
    nextDayTimeline: derived.nextDayTimeline,
    visibleCount: 8,
    startHourOverride: transitionState.startHourOverride,
  });
  return (
    <aside className={calendarSidebar} data-tone={state.tone}>
      <CalendarSidebarHeader dateLabel={state.dateLabel} />
      <CalendarSidebarTimelineControls
        rangeLabel={navState.rangeLabel}
        canPrev={navState.canPrev}
        canNext={navState.canNext}
        onPrev={navActions.goPrev}
        onNext={navActions.goNext}
      />
      <CalendarSidebarTimeline
        slots={navState.visibleSlots}
        onSelectNextDay={transitionActions.enterNextDayAtHour}
      />
    </aside>
  );
}
