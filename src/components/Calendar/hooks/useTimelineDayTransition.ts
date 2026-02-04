import { useCallback, useEffect, useState } from 'react';
import { addDays } from 'date-fns';
import { useCalendarStore } from '../../../store/useCalendarStore';

type TimelineDayTransitionState = {
  startHourOverride: number | null;
};

type TimelineDayTransitionActions = {
  enterNextDayAtHour: (hour: number) => void;
};

/**
 * Move o calendario para o proximo dia ao navegar pela timeline.
 */
export const useTimelineDayTransition = (): {
  state: TimelineDayTransitionState;
  actions: TimelineDayTransitionActions;
} => {
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);
  const setCurrentMonth = useCalendarStore((state) => state.setCurrentMonth);
  const [startHourOverride, setStartHourOverride] = useState<number | null>(null);

  const enterNextDayAtHour = useCallback(
    (hour: number) => {
      const nextDate = addDays(selectedDate, 1);
      setSelectedDate(nextDate);
      setCurrentMonth(nextDate);
      setStartHourOverride(hour);
    },
    [selectedDate, setCurrentMonth, setSelectedDate]
  );

  useEffect(() => {
    if (startHourOverride !== null) {
      setStartHourOverride(null);
    }
  }, [selectedDate, startHourOverride]);

  return {
    state: { startHourOverride },
    actions: { enterNextDayAtHour },
  };
};
