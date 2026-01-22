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
import type { TodoType } from '../../types/calendar';
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

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTodoModal({ isOpen, onClose }: AddTodoModalProps) {
  const { selectedDate, addTodo } = useCalendarStore();
  const [text, setText] = useState('');
  const [selectedType, setSelectedType] = useState<TodoType>('reminder');

  if (!isOpen) return null;

  const dateKey = format(selectedDate, 'yyyy-MM-dd');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(dateKey, text.trim(), selectedType);
      setText('');
      setSelectedType('reminder');
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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

          <button
            type="submit"
            className={modalSubmitButton}
            disabled={!text.trim()}
          >
            Adicionar tarefa
          </button>
        </form>
      </div>
    </div>
  );
}
