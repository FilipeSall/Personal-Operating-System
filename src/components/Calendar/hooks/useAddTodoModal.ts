import { useState } from 'react';
import { format } from 'date-fns';
import { useCalendarStore } from '../../../store/useCalendarStore';
import type { RepeatDuration, RepeatType, Todo, TodoType, Weekday } from '../../../types/calendar';
import { ALL_WEEKDAYS, WORK_WEEKDAYS } from '../consts/weekdays';

type ModalStep = 'details' | 'time' | 'tags' | 'repeat';
const STEPS: ModalStep[] = ['details', 'time', 'tags', 'repeat'];

type UseAddTodoModalParams = {
  onClose: () => void;
  todo?: Todo | null;
};

/**
 * Hook que concentra toda a lógica do AddTodoModal (estado, validações e ações).
 *
 * Props:
 * - onClose: callback disparado ao fechar o modal.
 * - todo: tarefa opcional quando o modal é usado para edição.
 *
 * Como usar:
 * const { state, derived, actions } = useAddTodoModal({ onClose, todo });
 */
export const useAddTodoModal = ({ onClose, todo }: UseAddTodoModalParams) => {
  const { selectedDate, addTodo, updateTodo } = useCalendarStore();
  const isEditing = Boolean(todo);
  const initialRepeatType = todo?.repeat.type ?? 'none';
  const initialWeekdays =
    initialRepeatType === 'custom'
      ? todo?.repeat.weekdays ?? []
      : initialRepeatType === 'daily'
        ? ALL_WEEKDAYS
        : initialRepeatType === 'weekly'
          ? WORK_WEEKDAYS
          : [];

  const [text, setText] = useState(todo?.text ?? '');
  const [selectedType, setSelectedType] = useState<TodoType>(todo?.type ?? 'reminder');
  const [startTime, setStartTime] = useState(todo?.startTime ?? '09:00');
  const [endTime, setEndTime] = useState(todo?.endTime ?? '10:00');
  const [hasPause, setHasPause] = useState(Boolean(todo?.pauseStart && todo?.pauseEnd));
  const [pauseStart, setPauseStart] = useState(todo?.pauseStart ?? '12:00');
  const [pauseEnd, setPauseEnd] = useState(todo?.pauseEnd ?? '12:30');
  const [comments, setComments] = useState(todo?.comments ?? '');
  const [repeatType, setRepeatType] = useState<RepeatType>(initialRepeatType);
  const [selectedWeekdays, setSelectedWeekdays] = useState<Weekday[]>(initialWeekdays);
  const [duration, setDuration] = useState<RepeatDuration>(todo?.repeat.duration ?? 'month');
  const [step, setStep] = useState<ModalStep>('details');

  const dateKey = todo ? todo.date : format(selectedDate, 'yyyy-MM-dd');
  const showRepeatOptions = repeatType !== 'none';
  const isTimeRangeValid = startTime < endTime;
  const isPauseRangeValid =
    !hasPause || (pauseStart < pauseEnd && pauseStart >= startTime && pauseEnd <= endTime);
  const canSubmit =
    text.trim().length > 0 &&
    isTimeRangeValid &&
    isPauseRangeValid &&
    (repeatType !== 'custom' || selectedWeekdays.length > 0);
  const canAdvanceFromDetails = text.trim().length > 0;
  const canAdvanceFromTime = isTimeRangeValid && isPauseRangeValid;

  const getRepeatWeekdays = (type: RepeatType, customDays: Weekday[]) => {
    if (type === 'daily') return ALL_WEEKDAYS;
    if (type === 'weekly') return WORK_WEEKDAYS;
    if (type === 'custom') return customDays;
    return [];
  };

  const resetForm = () => {
    setText('');
    setSelectedType('reminder');
    setStartTime('09:00');
    setEndTime('10:00');
    setHasPause(false);
    setPauseStart('12:00');
    setPauseEnd('12:30');
    setComments('');
    setRepeatType('none');
    setSelectedWeekdays([]);
    setDuration('month');
    setStep('details');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !isTimeRangeValid || !isPauseRangeValid) return;

    const repeatWeekdays = getRepeatWeekdays(repeatType, selectedWeekdays);
    if (repeatType === 'custom' && repeatWeekdays.length === 0) return;

    const trimmedComments = comments.trim();
    const payload = {
      text: text.trim(),
      comments: trimmedComments.length > 0 ? trimmedComments : undefined,
      date: dateKey,
      type: selectedType,
      startTime,
      endTime,
      pauseStart: hasPause ? pauseStart : undefined,
      pauseEnd: hasPause ? pauseEnd : undefined,
      repeat: {
        type: repeatType,
        weekdays: repeatType !== 'none' ? repeatWeekdays : undefined,
        duration: repeatType !== 'none' ? duration : undefined,
      },
    };

    if (todo) {
      updateTodo(todo.date, todo.id, payload);
    } else {
      addTodo(payload);
    }

    resetForm();
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const toggleWeekday = (day: Weekday) => {
    setSelectedWeekdays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleRepeatChange = (type: RepeatType) => {
    setRepeatType(type);
    if (type === 'custom') return;
    setSelectedWeekdays(getRepeatWeekdays(type, []));
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const goNextStep = () => {
    setStep((current) => {
      const index = STEPS.indexOf(current);
      return STEPS[Math.min(index + 1, STEPS.length - 1)];
    });
  };

  const goPrevStep = () => {
    setStep((current) => {
      const index = STEPS.indexOf(current);
      return STEPS[Math.max(index - 1, 0)];
    });
  };

  return {
    state: {
      text,
      selectedType,
      startTime,
      endTime,
      hasPause,
      pauseStart,
      pauseEnd,
      comments,
      repeatType,
      selectedWeekdays,
      duration,
      step,
    },
    derived: {
      isEditing,
      dateKey,
      showRepeatOptions,
      isTimeRangeValid,
      isPauseRangeValid,
      canSubmit,
      canAdvanceFromDetails,
      canAdvanceFromTime,
    },
    actions: {
      handleSubmit,
      handleOverlayClick,
      handleClose,
      goNextStep,
      goPrevStep,
      handleRepeatChange,
      toggleWeekday,
      setSelectedType,
      setStartTime,
      setEndTime,
      setHasPause,
      setPauseStart,
      setPauseEnd,
      setDuration,
      handleTextChange: (value: string) => {
        if (value.length <= 50) {
          setText(value);
        }
      },
      handleCommentsChange: (value: string) => {
        if (value.length <= 500) {
          setComments(value);
        }
      },
    },
  };
};
