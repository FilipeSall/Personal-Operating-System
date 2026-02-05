import { useCallback, useRef, useSyncExternalStore } from 'react';
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
  const overrideRef = useRef<number | null>(null);
  const subscribersRef = useRef(new Set<() => void>());

  const subscribe = useCallback((callback: () => void) => {
    subscribersRef.current.add(callback);
    return () => subscribersRef.current.delete(callback);
  }, []);

  const getSnapshot = useCallback(() => overrideRef.current, []);

  const startHourOverride = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const enterNextDayAtHour = useCallback(
    (hour: number) => {
      const nextDate = addDays(selectedDate, 1);
      overrideRef.current = hour;
      subscribersRef.current.forEach((cb) => cb());
      setSelectedDate(nextDate);
      setCurrentMonth(nextDate);
      queueMicrotask(() => {
        overrideRef.current = null;
        subscribersRef.current.forEach((cb) => cb());
      });
    },
    [selectedDate, setCurrentMonth, setSelectedDate]
  );

  return {
    state: { startHourOverride },
    actions: { enterNextDayAtHour },
  };
};
