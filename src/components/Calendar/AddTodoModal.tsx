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
  modalOverlay,
  modalContent,
  modalHeader,
  modalTitle,
  modalCloseButton,
  modalForm,
  modalInput,
  modalTypeGrid,
  modalTypeButton,
  modalSubmitButton,
  timeInputRow,
  timeInputGroup,
  timeInputLabel,
  timeInput,
  repeatSection,
  repeatLabel,
  repeatOptions,
  repeatButton,
  weekdaySelector,
  weekdayButton,
  durationSection,
  durationOptions,
  durationButton,
} from './calendar.styles';

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
  const [repeatType, setRepeatType] = useState<RepeatType>('none');
  const [selectedWeekdays, setSelectedWeekdays] = useState<Weekday[]>([]);
  const [duration, setDuration] = useState<RepeatDuration>('month');

  if (!isOpen) return null;

  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const showRepeatOptions = repeatType !== 'none';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo({
        text: text.trim(),
        date: dateKey,
        type: selectedType,
        startTime,
        endTime,
        repeat: {
          type: repeatType,
          weekdays: repeatType === 'custom' ? selectedWeekdays : undefined,
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
    setRepeatType('none');
    setSelectedWeekdays([]);
    setDuration('month');
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const toggleWeekday = (day: Weekday) => {
    setSelectedWeekdays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className={modalOverlay} onClick={handleOverlayClick}>
      <div className={modalContent}>
        <div className={modalHeader}>
          <span className={modalTitle}>
            Nova tarefa - {format(selectedDate, "d 'de' MMM", { locale: ptBR })}
          </span>
          <button type="button" className={modalCloseButton} onClick={onClose}>
            <MdClose size={20} />
          </button>
        </div>

        <form className={modalForm} onSubmit={handleSubmit}>
          <input
            type="text"
            className={modalInput}
            placeholder="Descreva sua tarefa..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />

          <div className={timeInputRow}>
            <div className={timeInputGroup}>
              <label className={timeInputLabel}>Início</label>
              <input
                type="time"
                className={timeInput}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className={timeInputGroup}>
              <label className={timeInputLabel}>Término</label>
              <input
                type="time"
                className={timeInput}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className={modalTypeGrid}>
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

          <div className={repeatSection}>
            <span className={repeatLabel}>Repetir</span>
            <div className={repeatOptions}>
              {REPEAT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={repeatButton({ isSelected: repeatType === option.id })}
                  onClick={() => setRepeatType(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {repeatType === 'custom' && (
              <div className={weekdaySelector}>
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
              <div className={durationSection}>
                <span className={repeatLabel}>Duração</span>
                <div className={durationOptions}>
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
            disabled={!text.trim() || (repeatType === 'custom' && selectedWeekdays.length === 0)}
          >
            Adicionar tarefa
          </button>
        </form>
      </div>
    </div>
  );
}
