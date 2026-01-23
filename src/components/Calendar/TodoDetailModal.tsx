import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCalendarStore } from '../../store/useCalendarStore';
import type { Todo } from '../../types/calendar';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
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
  const isClient = typeof document !== 'undefined';

  const currentTodo = useMemo(() => {
    if (!initialTodo) return null;
    return todos[initialTodo.date]?.find((t) => t.id === initialTodo.id) || initialTodo;
  }, [initialTodo, todos]);

  const deleteOptions = useMemo(() => {
    if (!currentTodo) return { mode: 'confirm' as const, scopes: [] as const };
    const seriesId = currentTodo.originalTodoId ?? currentTodo.id;
    const isSameSeries = (todo: Todo) =>
      todo.id === seriesId || todo.originalTodoId === seriesId;
    const seriesTodos = Object.values(todos)
      .flat()
      .filter(isSameSeries);

    if (seriesTodos.length <= 1) return { mode: 'confirm' as const, scopes: [] as const };

    const baseDate = new Date(`${currentTodo.date}T00:00:00`);
    const weekStart = startOfWeek(baseDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(baseDate, { weekStartsOn: 1 });
    const monthStart = startOfMonth(baseDate);
    const monthEnd = endOfMonth(baseDate);

    const isInRange = (dateStr: string, start: Date, end: Date) => {
      const date = new Date(`${dateStr}T00:00:00`);
      return date >= start && date <= end;
    };

    const isOnlyInWeek = seriesTodos.every((todo) => isInRange(todo.date, weekStart, weekEnd));
    if (isOnlyInWeek) return { mode: 'scope' as const, scopes: ['single', 'week'] as const };

    const isOnlyInMonth = seriesTodos.every((todo) => isInRange(todo.date, monthStart, monthEnd));
    if (isOnlyInMonth) {
      return { mode: 'scope' as const, scopes: ['single', 'week', 'month'] as const };
    }

    return { mode: 'scope' as const, scopes: ['single', 'week', 'month', 'all'] as const };
  }, [currentTodo, todos]);

  if (!initialTodo || !currentTodo || !isClient) return null;

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
        mode={deleteOptions.mode}
        scopes={deleteOptions.scopes}
      />
    </div>
  );

  return createPortal(modal, document.body);
}
