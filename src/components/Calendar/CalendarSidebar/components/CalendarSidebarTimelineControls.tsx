import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import {
  timelineControls,
  timelineControlsGroup,
  timelineControlsButton,
  timelineControlsRange,
} from '../../styles/calendar-sidebar.styles';

type CalendarSidebarTimelineControlsProps = {
  rangeLabel: string;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

/**
 * Controles de navegacao da timeline do painel lateral.
 */
export function CalendarSidebarTimelineControls({
  rangeLabel,
  canPrev,
  canNext,
  onPrev,
  onNext,
}: CalendarSidebarTimelineControlsProps) {
  return (
    <div className={timelineControls}>
      <div className={timelineControlsGroup}>
        <button
          type="button"
          className={timelineControlsButton}
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Hora anterior"
        >
          <MdKeyboardArrowUp size={18} />
        </button>
        <div className={timelineControlsRange}>{rangeLabel}</div>
        <button
          type="button"
          className={timelineControlsButton}
          onClick={onNext}
          disabled={!canNext}
          aria-label="Proxima hora"
        >
          <MdKeyboardArrowDown size={18} />
        </button>
      </div>
    </div>
  );
}
