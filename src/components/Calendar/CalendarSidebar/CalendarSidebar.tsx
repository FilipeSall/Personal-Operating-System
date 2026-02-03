import { useCalendarSidebar } from '../hooks/useCalendarSidebar';
import { CalendarSidebarView } from './CalendarSidebarView';

/**
 * Container do painel lateral do calendário.
 */
export function CalendarSidebar() {
  const { state, derived, actions } = useCalendarSidebar();

  return <CalendarSidebarView state={state} derived={derived} actions={actions} />;
}
