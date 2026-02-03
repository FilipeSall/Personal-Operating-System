import {
  MdWorkOutline,
  MdReplay,
  MdNotificationsNone,
  MdPersonOutline,
  MdSchool,
  MdFavoriteBorder,
  MdAttachMoney,
} from 'react-icons/md';
import type { IconType } from 'react-icons';
import type { Todo } from '../../../../types/calendar';
import type { TimelineTask } from '../../utils/calendarSidebar';
import {
  timelineTask,
  timelineTaskTime,
  timelineTaskTitle,
  timelineTaskIcon,
} from '../../styles/calendar-sidebar.styles';

type TimelineTaskCardProps = {
  task: TimelineTask;
};

const TODO_TYPE_ICONS: Record<Todo['type'], IconType> = {
  work: MdWorkOutline,
  routine: MdReplay,
  reminder: MdNotificationsNone,
  personal: MdPersonOutline,
  study: MdSchool,
  health: MdFavoriteBorder,
  finance: MdAttachMoney,
};

/**
 * Renderiza um card de tarefa dentro da timeline.
 */
export function TimelineTaskCard({ task }: TimelineTaskCardProps) {
  const Icon = TODO_TYPE_ICONS[task.type];

  return (
    <div className={timelineTask({ type: task.type })}>
      <span className={timelineTaskTime}>{task.time}</span>
      <span className={timelineTaskTitle}>{task.title}</span>
      <span className={timelineTaskIcon}>
        <Icon size={14} />
      </span>
    </div>
  );
}
