import { useState } from 'react';
import { format } from 'date-fns';
import {
  MdWork,
  MdRepeat,
  MdNotifications,
  MdPerson,
  MdSchool,
  MdFavorite,
  MdAttachMoney,
  MdEventAvailable,
} from 'react-icons/md';
import { useCalendarStore } from '../../store/useCalendarStore';
import { TODO_TYPES } from '../../data/todoTypes';
import type { Todo, TodoType } from '../../types/calendar';
import { AddTodoModal } from './AddTodoModal';
import { TodoDetailModal } from './TodoDetailModal';
import {
  todoPanel,
  todoList,
  todoItem,
  todoStatusIndicator,
  todoText,
  emptyState,
  todoTime,
  todoRepeatIcon,
  todoItemClickable,
} from './styles/todo-panel.styles';

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  MdWork,
  MdRepeat,
  MdNotifications,
  MdPerson,
  MdSchool,
  MdFavorite,
  MdAttachMoney,
};

export function CalendarTodoPanel() {
  const { selectedDate, getTodosForDate } = useCalendarStore();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const dayTodos = getTodosForDate(dateKey);

  const getTypeConfig = (type: TodoType) => {
    return TODO_TYPES.find((t) => t.id === type);
  };

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  return (
    <div className={todoPanel}>
      {dayTodos.length === 0 ? (
        <div className={emptyState}>
          <MdEventAvailable size={32} color="text.dim" />
          <span>Nenhuma tarefa para este dia</span>
        </div>
      ) : (
        <div className={todoList}>
          {dayTodos.map((todo) => {
            const typeConfig = getTypeConfig(todo.type);
            const Icon = typeConfig ? ICONS[typeConfig.icon] : null;
            const hasRepeat = todo.repeat.type !== 'none';

            return (
              <div
                key={todo.id}
                className={`${todoItem} ${todoItemClickable}`}
                style={{ borderLeftColor: typeConfig?.color || '#7A7276' }}
                onClick={() => handleTodoClick(todo)}
              >
                <div
                  className={todoStatusIndicator}
                  style={{ backgroundColor: typeConfig?.color }}
                />

                <span className={todoTime}>
                  {todo.startTime}
                </span>

                {Icon && <Icon size={18} color={typeConfig?.color} />}

                <span className={todoText}>
                  {todo.text}
                </span>

                {hasRepeat && (
                  <span className={todoRepeatIcon}>
                    <MdRepeat size={16} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <AddTodoModal
        key={editingTodo?.id ?? 'new'}
        isOpen={!!editingTodo}
        todo={editingTodo}
        onClose={() => {
          setEditingTodo(null);
        }}
      />
      <TodoDetailModal
        key={selectedTodo?.id ?? 'empty'}
        todo={selectedTodo}
        onClose={() => setSelectedTodo(null)}
        onEdit={(todo) => {
          setSelectedTodo(null);
          setEditingTodo(todo);
        }}
      />
    </div>
  );
}
