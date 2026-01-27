import { useState } from 'react';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  MdClose,
  MdWork,
  MdRepeat,
  MdNotifications,
  MdPerson,
  MdSchool,
  MdFavorite,
  MdAttachMoney,
} from 'react-icons/md';
import { useCalendarStore } from '../../store/useCalendarStore';
import { TODO_TYPES } from '../../data/todoTypes';
import type { Todo, TodoType, RepeatType, RepeatDuration, Weekday } from '../../types/calendar';
import {
  addTodoModalRecipe,
  modalTypeButton,
  modalSubmitButton,
  repeatButton,
  weekdayButton,
  durationButton,
  weekdayLabelLong,
  weekdayLabelShort,
} from './styles/add-todo-modal.styles';
import { css } from '../../../styled-system/css';

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  MdWork,
  MdRepeat,
  MdNotifications,
  MdPerson,
  MdSchool,
  MdFavorite,
  MdAttachMoney,
};

const WEEKDAYS: { id: Weekday; short: string; long: string }[] = [
  { id: 'sun', short: 'D', long: 'Dom' },
  { id: 'mon', short: 'S', long: 'Seg' },
  { id: 'tue', short: 'T', long: 'Ter' },
  { id: 'wed', short: 'Q', long: 'Qua' },
  { id: 'thu', short: 'Q', long: 'Qui' },
  { id: 'fri', short: 'S', long: 'Sex' },
  { id: 'sat', short: 'S', long: 'Sáb' },
];

const ALL_WEEKDAYS: Weekday[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const WORK_WEEKDAYS: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri'];

const REPEAT_OPTIONS: { id: RepeatType; label: string }[] = [
  { id: 'none', label: 'Não repetir' },
  { id: 'daily', label: 'Todo dia' },
  { id: 'weekly', label: 'Seg a Sex' },
  { id: 'custom', label: 'Personalizado' },
];

const DURATION_OPTIONS: { id: RepeatDuration; label: string }[] = [
  { id: 'month', label: '1 mês' },
  { id: 'quarter', label: '3 meses' },
  { id: 'year', label: '1 ano' },
  { id: 'forever', label: 'Sempre' },
];

type ModalStep = 'details' | 'time' | 'tags' | 'repeat';
const STEPS: ModalStep[] = ['details', 'time', 'tags', 'repeat'];

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo?: Todo | null;
}

export function AddTodoModal({ isOpen, onClose, todo }: AddTodoModalProps) {
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

  const modalSlots = addTodoModalRecipe();
  const dateKey = todo ? todo.date : format(selectedDate, 'yyyy-MM-dd');
  const showRepeatOptions = repeatType !== 'none';
  const isTimeRangeValid = startTime < endTime;
  const isPauseRangeValid = !hasPause || (pauseStart < pauseEnd && pauseStart >= startTime && pauseEnd <= endTime);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !isTimeRangeValid || !isPauseRangeValid) return;

    const repeatWeekdays = getRepeatWeekdays(repeatType, selectedWeekdays);
    if (repeatType === 'custom' && repeatWeekdays.length === 0) return;

    if (text.trim()) {
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
    }
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

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const detailsSection = (
    <>
      <input
        type="text"
        className={modalSlots.input}
        placeholder="Descreva sua tarefa..."
        value={text}
        onChange={(e) => {
          if (e.target.value.length <= 50) {
            setText(e.target.value);
          }
        }}
        maxLength={50}
        autoFocus
      />

      <div className={modalSlots.timeGroup}>
        <label className={modalSlots.commentLabel}>Comentários (opcional)</label>
        <textarea
          className={modalSlots.commentInput}
          placeholder="Adicione detalhes ou observações..."
          value={comments}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setComments(e.target.value);
            }
          }}
          maxLength={500}
        />
        <div
          className={css({
            fontSize: '11px',
            color: 'text.dim',
            textAlign: 'right',
            marginTop: '-4px',
          })}
        >
          {comments.length}/500
        </div>
      </div>
    </>
  );

  const timeSection = (
    <>
      <div className={modalSlots.timeRow}>
        <div className={modalSlots.timeGroup}>
          <label className={modalSlots.timeLabel}>Início</label>
          <input
            type="time"
            className={modalSlots.timeInput}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className={modalSlots.timeGroup}>
          <label className={modalSlots.timeLabel}>Término</label>
          <input
            type="time"
            className={modalSlots.timeInput}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      {!isTimeRangeValid && (
        <span className={modalSlots.timeError}>
          O horário de término deve ser posterior ao horário de início.
        </span>
      )}

      <div className={modalSlots.timeGroup}>
        <label className={modalSlots.commentLabel}>
          <input
            type="checkbox"
            checked={hasPause}
            onChange={(e) => setHasPause(e.target.checked)}
            className={css({ marginRight: '8px' })}
          />
          Adicionar pausa (opcional)
        </label>
      </div>

      {hasPause && (
        <>
          <div className={modalSlots.timeRow}>
            <div className={modalSlots.timeGroup}>
              <label className={modalSlots.timeLabel}>Pausa início</label>
              <input
                type="time"
                className={modalSlots.timeInput}
                value={pauseStart}
                onChange={(e) => setPauseStart(e.target.value)}
              />
            </div>
            <div className={modalSlots.timeGroup}>
              <label className={modalSlots.timeLabel}>Pausa fim</label>
              <input
                type="time"
                className={modalSlots.timeInput}
                value={pauseEnd}
                onChange={(e) => setPauseEnd(e.target.value)}
              />
            </div>
          </div>
          {!isPauseRangeValid && (
            <span className={modalSlots.timeError}>
              A pausa deve ficar dentro do intervalo e com fim após o início.
            </span>
          )}
        </>
      )}
    </>
  );

  const tagsSection = (
    <div className={modalSlots.typeGrid}>
      {TODO_TYPES.map((type) => {
        const Icon = ICONS[type.icon];
        const isSelected = selectedType === type.id;
        return (
          <button
            key={type.id}
            type="button"
            className={modalTypeButton({ isSelected })}
            style={isSelected ? { borderColor: type.color, color: type.color } : {}}
            onClick={() => setSelectedType(type.id)}
          >
            {Icon && <Icon size={18} color={isSelected ? type.color : undefined} />}
            {type.label}
          </button>
        );
      })}
    </div>
  );

  const repeatSection = (
    <div className={modalSlots.repeatSection}>
      <span className={modalSlots.repeatLabel}>Repetir</span>
      <div className={modalSlots.repeatOptions}>
        {REPEAT_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className={repeatButton({ isSelected: repeatType === option.id })}
            onClick={() => handleRepeatChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {repeatType === 'custom' && (
        <div className={modalSlots.weekdaySelector}>
          {WEEKDAYS.map((day, index) => (
            <button
              key={`${day.id}-${index}`}
              type="button"
              className={weekdayButton({ isSelected: selectedWeekdays.includes(day.id) })}
              onClick={() => toggleWeekday(day.id)}
            >
              <span className={weekdayLabelLong}>{day.long}</span>
              <span className={weekdayLabelShort}>{day.short}</span>
            </button>
          ))}
        </div>
      )}

      <div className={modalSlots.durationSection} aria-disabled={!showRepeatOptions}>
        <span className={modalSlots.repeatLabel}>Duração</span>
        <div className={modalSlots.durationOptions}>
          {DURATION_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={durationButton({ isSelected: duration === option.id })}
              onClick={() => setDuration(option.id)}
              disabled={!showRepeatOptions}
              aria-disabled={!showRepeatOptions}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const modal = (
    <div className={modalSlots.overlay} onClick={handleOverlayClick}>
      <div className={modalSlots.content}>
        <div className={modalSlots.header}>
          <span className={modalSlots.title}>
            {todo ? 'Editar tarefa' : 'Nova tarefa'} -{' '}
            {format(new Date(`${dateKey}T00:00:00`), "d 'de' MMM", { locale: ptBR })}
          </span>
          <button type="button" className={modalSlots.closeButton} onClick={handleClose}>
            <MdClose size={20} />
          </button>
        </div>

        <form className={modalSlots.form} onSubmit={handleSubmit}>
          {isEditing ? (
            <>
              {detailsSection}
              {timeSection}
              {tagsSection}
              {repeatSection}
              <button
                type="submit"
                className={modalSubmitButton}
                disabled={!canSubmit}
                title={!isTimeRangeValid ? 'O horário de término deve ser depois do início.' : undefined}
              >
                Salvar alterações
              </button>
            </>
          ) : (
            <>
              {step === 'details' && detailsSection}
              {step === 'time' && timeSection}
              {step === 'tags' && tagsSection}
              {step === 'repeat' && repeatSection}

              <div className={modalSlots.stepActions}>
                {step !== 'details' && (
                  <button type="button" className={modalSlots.stepButtonSecondary} onClick={goPrevStep}>
                    Voltar
                  </button>
                )}

                {step === 'details' && (
                  <button
                    type="button"
                    className={modalSlots.stepButtonPrimary}
                    onClick={goNextStep}
                    disabled={!canAdvanceFromDetails}
                  >
                    Avançar
                  </button>
                )}

                {step === 'time' && (
                  <button
                    type="button"
                    className={modalSlots.stepButtonPrimary}
                    onClick={goNextStep}
                    disabled={!canAdvanceFromTime}
                    title={
                      !isTimeRangeValid
                        ? 'O horário de término deve ser depois do início.'
                        : !isPauseRangeValid
                          ? 'A pausa deve ficar dentro do intervalo e com fim após o início.'
                          : undefined
                    }
                  >
                    Avançar
                  </button>
                )}

                {step === 'tags' && (
                  <button type="button" className={modalSlots.stepButtonPrimary} onClick={goNextStep}>
                    Avançar
                  </button>
                )}

                {step === 'repeat' && (
                  <button
                    type="submit"
                    className={modalSubmitButton}
                    disabled={!canSubmit}
                    title={!isTimeRangeValid ? 'O horário de término deve ser depois do início.' : undefined}
                  >
                    Adicionar tarefa
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
