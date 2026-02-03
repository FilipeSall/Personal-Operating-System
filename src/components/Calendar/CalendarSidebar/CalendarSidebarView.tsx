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
import type { Todo } from '../../../types/calendar';
import type { TimelineSlot, TimelineTask } from '../utils/calendarSidebar';
import {
  calendarSidebar,
  sidebarHeader,
  sidebarTitleBlock,
  sidebarKicker,
  sidebarTitle,
  sidebarMeta,
  calendarTimeline,
  timelineRow,
  timelineHour,
  timelineConnector,
  timelineDotWrapper,
  timelineWeatherDot,
  timelineTasks,
  timelineTask,
  timelineTaskTime,
  timelineTaskTitle,
  timelineTaskIcon,
} from '../styles/calendar-sidebar.styles';
import type {
  CalendarSidebarActions,
  CalendarSidebarDerived,
  CalendarSidebarState,
} from '../hooks/useCalendarSidebar';

const TODO_TYPE_ICONS: Record<Todo['type'], IconType> = {
  work: MdWorkOutline,
  routine: MdReplay,
  reminder: MdNotificationsNone,
  personal: MdPersonOutline,
  study: MdSchool,
  health: MdFavoriteBorder,
  finance: MdAttachMoney,
};

type CalendarSidebarViewProps = {
  state: CalendarSidebarState;
  derived: CalendarSidebarDerived;
  actions: CalendarSidebarActions;
};

/**
 * Renderiza um card de tarefa dentro da timeline.
 */
function TimelineTaskCard({ task }: { task: TimelineTask }) {
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

/**
 * View do painel lateral do calendário.
 */
export function CalendarSidebarView({ state, derived }: CalendarSidebarViewProps) {
  return (
    <aside className={calendarSidebar} data-tone={state.tone}>
      <div className={sidebarHeader}>
        <div className={sidebarTitleBlock}>
          <span className={sidebarKicker}>Agenda do dia</span>
          <h3 className={sidebarTitle}>{state.dateLabel}</h3>
          <span className={sidebarMeta}>
            {derived.tasks.length} tarefas{state.isToday ? ' · Hoje' : ''}
          </span>
        </div>
      </div>

      <div className={calendarTimeline}>
        {derived.timeline.map((slot: TimelineSlot) => {
          const visibleTasks = slot.tasks.slice(0, 2);
          const remaining = slot.tasks.length - visibleTasks.length;

          return (
            <div key={slot.hour} className={timelineRow}>
              <div className={timelineHour}>
                <span>{slot.label}</span>
              </div>
              <div className={timelineTasks}>
                {visibleTasks.map((task) => (
                  <TimelineTaskCard key={task.id} task={task} />
                ))}
                {remaining > 0 && (
                  <span className={timelineTaskTime}>+{remaining} tarefas</span>
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
        })}
      </div>
    </aside>
  );
}
