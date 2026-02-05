import { useCallback, useEffect, useMemo, useState } from 'react';
import type { TimelineSlot } from '../utils/calendarSidebar';
import { formatTimelineHour } from '../utils/calendarSidebar';

type TimelineNavigationOptions = {
  timeline: TimelineSlot[];
  nextDayTimeline: TimelineSlot[];
  visibleCount?: number;
  startHourOverride?: number | null;
};

export type VisibleTimelineSlot = TimelineSlot & {
  dayOffset: 0 | 1;
};

type TimelineNavigationState = {
  visibleSlots: VisibleTimelineSlot[];
  startHour: number;
  endHour: number;
  canPrev: boolean;
  canNext: boolean;
  rangeLabel: string;
  hasCurrentHour: boolean;
  currentHour: number | null;
  visibleCount: number;
};

type TimelineNavigationActions = {
  goPrev: () => void;
  goNext: () => void;
  jumpToHour: (hour: number) => void;
  goToCurrent: () => void;
};

/**
 * Controla a janela de horas visíveis na timeline do painel lateral.
 */
export const useTimelineNavigation = ({
  timeline,
  nextDayTimeline,
  visibleCount = 8,
  startHourOverride = null,
}: TimelineNavigationOptions): {
  state: TimelineNavigationState;
  actions: TimelineNavigationActions;
} => {
  const maxStart = Math.max(0, timeline.length - 1);
  const currentHourIndex = useMemo(
    () => timeline.findIndex((slot) => slot.isCurrentHour),
    [timeline]
  );
  const currentHour = currentHourIndex >= 0 ? currentHourIndex : null;
  const hasCurrentHour = currentHourIndex >= 0;

  const initialStart = useMemo(() => {
    if (hasCurrentHour) {
      return currentHourIndex;
    }

    return Math.min(8, maxStart);
  }, [currentHourIndex, hasCurrentHour, maxStart]);

  const [startHour, setStartHour] = useState(initialStart);

  useEffect(() => {
    setStartHour(initialStart);
  }, [initialStart]);

  useEffect(() => {
    if (startHourOverride !== null) {
      setStartHour(Math.min(Math.max(startHourOverride, 0), maxStart));
    }
  }, [maxStart, startHourOverride]);

  /**
   * Limita a hora inicial ao intervalo permitido da janela visível.
   */
  const clampStart = useCallback(
    (hour: number) => Math.min(Math.max(hour, 0), maxStart),
    [maxStart]
  );

  /**
   * Salta para uma hora específica mantendo a janela visível válida.
   */
  const jumpToHour = useCallback(
    (hour: number) => {
      setStartHour(clampStart(hour));
    },
    [clampStart]
  );

  /**
   * Retrocede a janela em 1 hora.
   */
  const goPrev = useCallback(() => {
    setStartHour((value) => clampStart(value - 1));
  }, [clampStart]);

  /**
   * Avança a janela em 1 hora.
   */
  const goNext = useCallback(() => {
    setStartHour((value) => clampStart(value + 1));
  }, [clampStart]);

  /**
   * Move a janela para a hora atual quando disponível.
   */
  const goToCurrent = useCallback(() => {
    if (hasCurrentHour) {
      setStartHour(clampStart(currentHourIndex));
    }
  }, [clampStart, currentHourIndex, hasCurrentHour]);

  const endHour = (startHour + visibleCount - 1) % timeline.length;
  const visibleSlots = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, index) => {
      const absoluteHour = startHour + index;
      const dayOffset = (absoluteHour >= 24 ? 1 : 0) as 0 | 1;
      const hour = absoluteHour % 24;
      const baseTimeline = dayOffset === 1 ? nextDayTimeline : timeline;
      const slot = baseTimeline[hour];

      return { ...slot, dayOffset };
    });
  }, [nextDayTimeline, startHour, timeline, visibleCount]);

  const rangeLabel = `${formatTimelineHour(startHour)} - ${formatTimelineHour(endHour)}`;

  const state: TimelineNavigationState = {
    visibleSlots,
    startHour,
    endHour,
    canPrev: startHour > 0,
    canNext: startHour < maxStart,
    rangeLabel,
    hasCurrentHour,
    currentHour,
    visibleCount,
  };

  const actions: TimelineNavigationActions = {
    goPrev,
    goNext,
    jumpToHour,
    goToCurrent,
  };

  return { state, actions };
};
