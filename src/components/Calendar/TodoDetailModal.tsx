import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  MdClose,
  MdAccessTime,
  MdRepeat,
  MdCalendarToday,
  MdDelete,
  MdCheck,
  MdNotes,
  MdWork,
  MdNotifications,
  MdPerson,
  MdSchool,
  MdFavorite,
  MdAttachMoney,
} from 'react-icons/md';
import { MdRepeat as MdRepeatIcon } from 'react-icons/md';
import { useState } from 'react';
import { useCalendarStore } from '../../store/useCalendarStore';
import { TODO_TYPES } from '../../data/todoTypes';
import type { Todo, RepeatDuration, Weekday } from '../../types/calendar';
import {
  modalOverlay,
  modalCloseButton,
  detailModalContent,
  detailHeader,
  detailTitle,
  detailBadge,
  detailSection,
  detailRow,
  detailIcon,
  detailLabel,
  detailValue,
  detailTags,
  detailActions,
  detailActionButton,
  confirmModalContent,
  confirmHeader,
  confirmTitle,
  confirmOptions,
  confirmOptionButton,
} from './styles/todo-detail-modal.styles';

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  MdWork,
  MdRepeat: MdRepeatIcon,
  MdNotifications,
  MdPerson,
  MdSchool,
  MdFavorite,
  MdAttachMoney,
};

const WEEKDAY_LABELS: Record<Weekday, string> = {
  sun: 'Domingo',
  mon: 'Segunda',
  tue: 'Terça',
  wed: 'Quarta',
  thu: 'Quinta',
  fri: 'Sexta',
  sat: 'Sábado',
};

const DURATION_LABELS: Record<RepeatDuration, string> = {
  month: '1 mês',
  quarter: '3 meses',
  year: '1 ano',
  forever: 'Sempre',
};

const REPEAT_TYPE_LABELS: Record<string, string> = {
  none: 'Não repete',
  daily: 'Diariamente',
  weekly: 'Seg a Sex',
  custom: 'Personalizado',
};

interface TodoDetailModalProps {
  todo: Todo | null;
  onClose: () => void;
}

export function TodoDetailModal({ todo: initialTodo, onClose }: TodoDetailModalProps) {
  const { toggleTodo, deleteTodo, todos } = useCalendarStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!initialTodo) return null;

  const currentTodo = todos[initialTodo.date]?.find((t) => t.id === initialTodo.id) || initialTodo;

  const typeConfig = TODO_TYPES.find((t) => t.id === currentTodo.type);
  const Icon = typeConfig ? ICONS[typeConfig.icon] : null;
  const hasRepeat = currentTodo.repeat.type !== 'none';

  const handleToggle = () => {
    toggleTodo(currentTodo.date, currentTodo.id);
  };

  const handleDelete = (scope: 'single' | 'week' | 'month' | 'all') => {
    deleteTodo(currentTodo.date, currentTodo.id, scope);
    setIsDeleteModalOpen(false);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const todoDate = new Date(currentTodo.date + 'T00:00:00');

  return (
    <div className={modalOverlay} onClick={handleOverlayClick}>
      <div className={detailModalContent}>
        <div className={detailHeader}>
          <span
            className={detailTitle}
            style={{
              textDecoration: currentTodo.completed ? 'line-through' : 'none',
              opacity: currentTodo.completed ? 0.6 : 1,
            }}
          >
            {currentTodo.text}
          </span>
          <button type="button" className={modalCloseButton} onClick={onClose}>
            <MdClose size={20} />
          </button>
        </div>

        <div className={detailTags}>
          {typeConfig && (
            <span
              className={detailBadge}
              style={{ backgroundColor: `${typeConfig.color}20`, color: typeConfig.color }}
            >
              {Icon && <Icon size={14} color={typeConfig.color} />}
              {typeConfig.label}
            </span>
          )}
          {currentTodo.completed && (
            <span
              className={detailBadge}
              style={{ backgroundColor: '#10B98120', color: '#10B981' }}
            >
              <MdCheck size={14} />
              Concluída
            </span>
          )}
          {hasRepeat && (
            <span
              className={detailBadge}
              style={{ backgroundColor: '#6366F120', color: '#6366F1' }}
            >
              <MdRepeat size={14} />
              Recorrente
            </span>
          )}
        </div>

        <div className={detailSection}>
          <div className={detailRow}>
            <span className={detailIcon}>
              <MdCalendarToday size={18} />
            </span>
            <span className={detailLabel}>Data</span>
            <span className={detailValue}>
              {format(todoDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
            </span>
          </div>

          <div className={detailRow}>
            <span className={detailIcon}>
              <MdAccessTime size={18} />
            </span>
            <span className={detailLabel}>Horário</span>
            <span className={detailValue}>
              {currentTodo.startTime} - {currentTodo.endTime}
            </span>
          </div>

          {currentTodo.comments && (
            <div className={detailRow}>
              <span className={detailIcon}>
                <MdNotes size={18} />
              </span>
              <span className={detailLabel}>Comentários</span>
              <span className={detailValue}>{currentTodo.comments}</span>
            </div>
          )}

          {hasRepeat && (
            <>
              <div className={detailRow}>
                <span className={detailIcon}>
                  <MdRepeat size={18} />
                </span>
                <span className={detailLabel}>Repetição</span>
                <span className={detailValue}>
                  {REPEAT_TYPE_LABELS[currentTodo.repeat.type]}
                </span>
              </div>

              {currentTodo.repeat.type === 'custom' && currentTodo.repeat.weekdays && (
                <div className={detailRow}>
                  <span className={detailIcon} style={{ visibility: 'hidden' }}>
                    <MdRepeat size={18} />
                  </span>
                  <span className={detailLabel}>Dias</span>
                  <span className={detailValue}>
                    {currentTodo.repeat.weekdays.map((d) => WEEKDAY_LABELS[d]).join(', ')}
                  </span>
                </div>
              )}

              {currentTodo.repeat.duration && (
                <div className={detailRow}>
                  <span className={detailIcon} style={{ visibility: 'hidden' }}>
                    <MdRepeat size={18} />
                  </span>
                  <span className={detailLabel}>Duração</span>
                  <span className={detailValue}>
                    {DURATION_LABELS[currentTodo.repeat.duration]}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        <div className={detailActions}>
          <button
            type="button"
            className={detailActionButton({ variant: currentTodo.completed ? 'secondary' : 'primary' })}
            onClick={handleToggle}
          >
            <MdCheck size={18} />
            {currentTodo.completed ? 'Desmarcar' : 'Concluir'}
          </button>

          <button
            type="button"
            className={detailActionButton({ variant: 'danger' })}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <MdDelete size={18} />
            Excluir
          </button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className={modalOverlay} onClick={(e) => e.currentTarget === e.target && setIsDeleteModalOpen(false)}>
          <div className={confirmModalContent}>
            <div className={confirmHeader}>
              <span className={confirmTitle}>Qual você quer excluir?</span>
              <button type="button" className={modalCloseButton} onClick={() => setIsDeleteModalOpen(false)}>
                <MdClose size={18} />
              </button>
            </div>
            <div className={confirmOptions}>
              <button
                type="button"
                className={confirmOptionButton({ variant: 'danger' })}
                onClick={() => handleDelete('single')}
              >
                Apenas esta
              </button>
              <button
                type="button"
                className={confirmOptionButton({ variant: 'danger' })}
                onClick={() => handleDelete('week')}
              >
                Todas da semana
              </button>
              <button
                type="button"
                className={confirmOptionButton({ variant: 'danger' })}
                onClick={() => handleDelete('month')}
              >
                Todas do mês
              </button>
              <button
                type="button"
                className={confirmOptionButton({ variant: 'danger' })}
                onClick={() => handleDelete('all')}
              >
                Todas do calendário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
