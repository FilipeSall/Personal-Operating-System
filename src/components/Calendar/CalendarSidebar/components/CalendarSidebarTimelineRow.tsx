import type { TimelineSlot } from '../../utils/calendarSidebar';
import {
  timelineRow,
  timelineHour,
  timelineTasks,
  timelineTaskTime,
  timelineDotWrapper,
  timelineWeatherDot,
  timelineConnector,
} from '../../styles/calendar-sidebar.styles';
import { useTimelineSlotTasks } from '../hooks/useTimelineSlotTasks';
import { TimelineTaskCard } from './TimelineTaskCard';

type CalendarSidebarTimelineRowProps = {
  slot: TimelineSlot;
};

/**
 * Renderiza uma linha de horário da timeline.
 */
export function CalendarSidebarTimelineRow({ slot }: CalendarSidebarTimelineRowProps) {
  const { visibleTasks, remaining } = useTimelineSlotTasks(slot);

  return (
    <div className={timelineRow}>
      <div className={timelineHour}>
        <span>{slot.label}</span>
      </div>
      <div className={timelineTasks}>
        {visibleTasks.map((task) => (
          <TimelineTaskCard key={task.id} task={task} />
        ))}
        {remaining > 0 && <span className={timelineTaskTime}>+{remaining} tarefas</span>}
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
