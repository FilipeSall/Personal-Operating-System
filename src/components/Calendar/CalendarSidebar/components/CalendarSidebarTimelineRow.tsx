import type { VisibleTimelineSlot } from '../../hooks/useTimelineNavigation';
import {
  timelineRow,
  timelineHour,
  timelineTasks,
  timelineTaskToggle,
  timelineHourButton,
  timelineDotWrapper,
  timelineWeatherDot,
  timelineConnector,
} from '../../styles/calendar-sidebar.styles';
import { useTimelineTaskExpansion } from '../../hooks/useTimelineTaskExpansion';
import { TimelineTaskCard } from './TimelineTaskCard';

type CalendarSidebarTimelineRowProps = {
  slot: VisibleTimelineSlot;
  onSelectNextDay: (hour: number) => void;
};

/**
 * Renderiza uma linha de horário da timeline.
 */
export function CalendarSidebarTimelineRow({
  slot,
  onSelectNextDay,
}: CalendarSidebarTimelineRowProps) {
  const { state, actions } = useTimelineTaskExpansion(slot.tasks, 3);

  return (
    <div className={timelineRow}>
      <div className={timelineHour}>
        {slot.dayOffset === 1 ? (
          <button
            type="button"
            className={timelineHourButton}
            onClick={() => onSelectNextDay(slot.hour)}
            aria-label="Ir para o proximo dia"
          >
            {slot.label}
          </button>
        ) : (
          <span>{slot.label}</span>
        )}
      </div>
      <div className={timelineTasks}>
        {state.visibleTasks.map((task) => (
          <TimelineTaskCard key={task.id} task={task} />
        ))}
        {state.hasOverflow && (
          <button
            type="button"
            className={timelineTaskToggle}
            onClick={actions.toggle}
            aria-expanded={state.isExpanded}
          >
            {state.isExpanded
              ? 'Mostrar menos'
              : `Ver mais ${state.hiddenCount} tarefas`}
          </button>
        )}
      </div>
      <div className={timelineDotWrapper}>
        <span
          className={timelineWeatherDot}
          data-tone={slot.tone}
          data-current={slot.isCurrentHour ? 'true' : 'false'}
        />
      </div>
      <span className={timelineConnector} aria-hidden="true" />
    </div>
  );
}
