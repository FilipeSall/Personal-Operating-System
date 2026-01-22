import { useState } from 'react';
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
import type { TodoType, RepeatType, RepeatDuration, Weekday } from '../../types/calendar';
import {
  addTodoModalRecipe,
  modalTypeButton,
  modalSubmitButton,
  repeatButton,
  weekdayButton,
  durationButton,
} from './styles/add-todo-modal.styles';

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  MdWork,
  MdRepeat,
  MdNotifications,
  MdPerson,
  MdSchool,
  MdFavorite,
  MdAttachMoney,
};

const WEEKDAYS: { id: Weekday; label: string }[] = [
  { id: 'sun', label: 'D' },
  { id: 'mon', label: 'S' },
  { id: 'tue', label: 'T' },
  { id: 'wed', label: 'Q' },
  { id: 'thu', label: 'Q' },
  { id: 'fri', label: 'S' },
  { id: 'sat', label: 'S' },
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

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTodoModal({ isOpen, onClose }: AddTodoModalProps) {
  const { selectedDate, addTodo } = useCalendarStore();
  const [text, setText] = useState('');
  const [selectedType, setSelectedType] = useState<TodoType>('reminder');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [comments, setComments] = useState('');
  const [repeatType, setRepeatType] = useState<RepeatType>('none');
  const [selectedWeekdays, setSelectedWeekdays] = useState<Weekday[]>([]);
  const [duration, setDuration] = useState<RepeatDuration>('month');

  if (!isOpen) return null;

  const modalSlots = addTodoModalRecipe();
  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const showRepeatOptions = repeatType !== 'none';
  const isTimeRangeValid = startTime < endTime;
  const canSubmit =
    text.trim().length > 0 &&
    isTimeRangeValid &&
    (repeatType !== 'custom' || selectedWeekdays.length > 0);

  const getRepeatWeekdays = (type: RepeatType, customDays: Weekday[]) => {
    if (type === 'daily') return ALL_WEEKDAYS;
    if (type === 'weekly') return WORK_WEEKDAYS;
    if (type === 'custom') return customDays;
    return [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !isTimeRangeValid) return;

    const repeatWeekdays = getRepeatWeekdays(repeatType, selectedWeekdays);
    if (repeatType === 'custom' && repeatWeekdays.length === 0) return;

    if (text.trim()) {
      const trimmedComments = comments.trim();
      addTodo({
        text: text.trim(),
        comments: trimmedComments.length > 0 ? trimmedComments : undefined,
        date: dateKey,
        type: selectedType,
        startTime,
        endTime,
        repeat: {
          type: repeatType,
          weekdays: repeatType !== 'none' ? repeatWeekdays : undefined,
          duration: repeatType !== 'none' ? duration : undefined,
        },
      });
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setText('');
    setSelectedType('reminder');
    setStartTime('09:00');
    setEndTime('10:00');
    setComments('');
    setRepeatType('none');
    setSelectedWeekdays([]);
    setDuration('month');
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

  return (
    <div className={modalSlots.overlay} onClick={handleOverlayClick}>
      <div className={modalSlots.content}>
        <div className={modalSlots.header}>
          <span className={modalSlots.title}>
            Nova tarefa - {format(selectedDate, "d 'de' MMM", { locale: ptBR })}
          </span>
          <button type="button" className={modalSlots.closeButton} onClick={handleClose}>
            <MdClose size={20} />
          </button>
        </div>

        <form className={modalSlots.form} onSubmit={handleSubmit}>
          <input
            type="text"
            className={modalSlots.input}
            placeholder="Descreva sua tarefa..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />

          <div className={modalSlots.timeGroup}>
            <label className={modalSlots.commentLabel}>Comentários (opcional)</label>
            <textarea
              className={modalSlots.commentInput}
              placeholder="Adicione detalhes ou observações..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>

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
                    {day.label}
                  </button>
                ))}
              </div>
            )}

            {showRepeatOptions && (
              <div className={modalSlots.durationSection}>
                <span className={modalSlots.repeatLabel}>Duração</span>
                <div className={modalSlots.durationOptions}>
                  {DURATION_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={durationButton({ isSelected: duration === option.id })}
                      onClick={() => setDuration(option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={modalSubmitButton}
            disabled={!canSubmit}
            title={!isTimeRangeValid ? 'O horário de término deve ser depois do início.' : undefined}
          >
            Adicionar tarefa
          </button>
        </form>
      </div>
    </div>
  );
}
