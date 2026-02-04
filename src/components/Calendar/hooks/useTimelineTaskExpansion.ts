import { useMemo, useState } from 'react';
import type { TimelineTask } from '../utils/calendarSidebar';

type TimelineTaskExpansionState = {
  visibleTasks: TimelineTask[];
  hiddenCount: number;
  isExpanded: boolean;
  hasOverflow: boolean;
};

type TimelineTaskExpansionActions = {
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
};

/**
 * Gerencia a expansão das tarefas dentro de um bloco de hora.
 */
export const useTimelineTaskExpansion = (
  tasks: TimelineTask[],
  initialVisible = 3
): { state: TimelineTaskExpansionState; actions: TimelineTaskExpansionActions } => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasOverflow = tasks.length > initialVisible;

  const visibleTasks = useMemo(() => {
    if (isExpanded || !hasOverflow) {
      return tasks;
    }

    return tasks.slice(0, initialVisible);
  }, [hasOverflow, initialVisible, isExpanded, tasks]);

  const hiddenCount = hasOverflow ? tasks.length - visibleTasks.length : 0;

  /**
   * Expande o bloco para exibir todas as tarefas.
   */
  const expand = () => setIsExpanded(true);
  /**
   * Recolhe o bloco para a visualização reduzida.
   */
  const collapse = () => setIsExpanded(false);
  /**
   * Alterna entre expandido e recolhido.
   */
  const toggle = () => setIsExpanded((value) => !value);

  return {
    state: {
      visibleTasks,
      hiddenCount,
      isExpanded,
      hasOverflow,
    },
    actions: {
      expand,
      collapse,
      toggle,
    },
  };
};
