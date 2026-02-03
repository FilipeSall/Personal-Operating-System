import type { TimelineSlot, TimelineTask } from '../../utils/calendarSidebar';

type TimelineSlotTasks = {
  visibleTasks: TimelineTask[];
  remaining: number;
};

/**
 * Calcula quais tarefas ficam visíveis na timeline de um horário.
 */
export function useTimelineSlotTasks(slot: TimelineSlot): TimelineSlotTasks {
  const visibleTasks = slot.tasks.slice(0, 2);
  const remaining = slot.tasks.length - visibleTasks.length;

  return { visibleTasks, remaining };
}
