import { CalendarGridView } from './CalendarGridView';
import { useCalendarGrid } from '../hooks/useCalendarGrid';

export function CalendarGrid() {
  const { state, dates, refs, actions } = useCalendarGrid();

  return (
    <CalendarGridView
      state={state}
      dates={dates}
      refs={refs}
      actions={actions}
    />
  );
}
