import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useCalendarStore } from '../../store/useCalendarStore';
import type { Todo } from '../../types/calendar';
import {
  modalOverlay,
  detailModalContent,
} from './styles/todo-detail-modal.styles';
import { ICONS } from './TodoDetailModal/constants';
import { formatTodoDate, getTypeConfig } from './TodoDetailModal/utils';
import { TodoDetailHeader } from './TodoDetailModal/TodoDetailHeader';
import { TodoDetailTags } from './TodoDetailModal/TodoDetailTags';
import { TodoDetailMetaSection } from './TodoDetailModal/TodoDetailMetaSection';
import { TodoDetailActions } from './TodoDetailModal/TodoDetailActions';
import { TodoDetailDeleteModal } from './TodoDetailModal/TodoDetailDeleteModal';

interface TodoDetailModalProps {
  todo: Todo | null;
  onClose: () => void;
  onEdit: (todo: Todo) => void;
}

export function TodoDetailModal({ todo: initialTodo, onClose, onEdit }: TodoDetailModalProps) {
  const { deleteTodo, todos } = useCalendarStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!initialTodo) return null;
  if (typeof document === 'undefined') return null;

  const currentTodo = todos[initialTodo.date]?.find((t) => t.id === initialTodo.id) || initialTodo;

  const typeConfig = getTypeConfig(currentTodo.type);
  const Icon = typeConfig ? ICONS[typeConfig.icon] : null;
  const hasRepeat = currentTodo.repeat.type !== 'none';
  const shouldTruncateTitle = currentTodo.text.length > 50;

  const handleEdit = () => {
    onEdit(currentTodo);
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

  const formattedDate = formatTodoDate(currentTodo.date);

  const modal = (
    <div className={modalOverlay} onClick={handleOverlayClick}>
      <div className={detailModalContent}>
        <TodoDetailHeader
          title={currentTodo.text}
          showTitleTooltip={shouldTruncateTitle}
          onClose={onClose}
        />
        <TodoDetailTags
          typeColor={typeConfig?.color}
          typeLabel={typeConfig?.label}
          Icon={Icon}
          hasRepeat={hasRepeat}
        />
        <TodoDetailMetaSection todo={currentTodo} formattedDate={formattedDate} hasRepeat={hasRepeat} />
        <TodoDetailActions onEdit={handleEdit} onDelete={() => setIsDeleteModalOpen(true)} />
      </div>

      <TodoDetailDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );

  return createPortal(modal, document.body);
}
