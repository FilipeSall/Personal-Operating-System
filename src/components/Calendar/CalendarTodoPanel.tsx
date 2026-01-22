import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  MdAdd,
  MdCheck,
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
import type { Todo, TodoType } from '../../types/calendar';
import { AddTodoModal } from './AddTodoModal';
import { TodoDetailModal } from './TodoDetailModal';
import {
  todoPanel,
  todoPanelHeader,
  todoPanelTitle,
  todoList,
  todoItem,
  todoCheckbox,
  todoText,
  addTaskButton,
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
  const { selectedDate, getTodosForDate, toggleTodo } = useCalendarStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const dayTodos = getTodosForDate(dateKey);

  const getTypeConfig = (type: TodoType) => {
    return TODO_TYPES.find((t) => t.id === type);
  };

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCheckboxClick = (e: React.MouseEvent, todoId: string) => {
    e.stopPropagation();
    toggleTodo(dateKey, todoId);
  };

  return (
    <div className={todoPanel}>
      <div className={todoPanelHeader}>
        <span className={todoPanelTitle}>
          {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
        </span>
        <button
          type="button"
          className={addTaskButton}
          onClick={() => setIsAddModalOpen(true)}
        >
          <MdAdd size={18} />
          Nova tarefa
        </button>
      </div>

      {dayTodos.length === 0 ? (
        <div className={emptyState}>
          Nenhuma tarefa para este dia
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
                className={`${todoItem({ completed: todo.completed })} ${todoItemClickable}`}
                style={{ borderLeftColor: typeConfig?.color || '#7A7276' }}
                onClick={() => handleTodoClick(todo)}
              >
                <button
                  type="button"
                  className={todoCheckbox}
                  style={todo.completed ? { backgroundColor: typeConfig?.color, borderColor: typeConfig?.color } : {}}
                  onClick={(e) => handleCheckboxClick(e, todo.id)}
                >
                  {todo.completed && <MdCheck size={12} color="#FDFFFC" />}
                </button>

                <span className={todoTime}>
                  {todo.startTime}
                </span>

                {Icon && <Icon size={16} color={typeConfig?.color} />}

                <span className={todoText({ completed: todo.completed })}>
                  {todo.text}
                </span>

                {hasRepeat && (
                  <span className={todoRepeatIcon}>
                    <MdRepeat size={14} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <AddTodoModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <TodoDetailModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
    </div>
  );
}
