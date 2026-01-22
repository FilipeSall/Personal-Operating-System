import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  MdAdd,
  MdCheck,
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
import { AddTodoModal } from './AddTodoModal';
import {
  todoPanel,
  todoPanelHeader,
  todoPanelTitle,
  todoList,
  todoItem,
  todoCheckbox,
  todoText,
  todoDeleteButton,
  addTaskButton,
  emptyState,
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

export function CalendarTodoPanel() {
  const { selectedDate, todos, toggleTodo, deleteTodo } = useCalendarStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const dayTodos = todos[dateKey] || [];

  const getTypeConfig = (type: TodoType) => {
    return TODO_TYPES.find((t) => t.id === type);
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
          onClick={() => setIsModalOpen(true)}
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

            return (
              <div
                key={todo.id}
                className={todoItem({ completed: todo.completed })}
                style={{ borderLeftColor: typeConfig?.color || '#6b7280' }}
              >
                <button
                  type="button"
                  className={todoCheckbox}
                  style={todo.completed ? { backgroundColor: typeConfig?.color, borderColor: typeConfig?.color } : {}}
                  onClick={() => toggleTodo(dateKey, todo.id)}
                >
                  {todo.completed && <MdCheck size={12} color="#fff" />}
                </button>

                {Icon && <Icon size={16} color={typeConfig?.color} />}

                <span className={todoText({ completed: todo.completed })}>
                  {todo.text}
                </span>

                <button
                  type="button"
                  className={todoDeleteButton}
                  onClick={() => deleteTodo(dateKey, todo.id)}
                >
                  <MdClose size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <AddTodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
