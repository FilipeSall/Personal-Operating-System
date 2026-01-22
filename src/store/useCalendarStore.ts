import { create } from 'zustand';
import { format, addDays } from 'date-fns';
import type { CalendarState, Todo, Weekday } from '../types/calendar';
import { SPECIAL_DATES } from '../data/holidays';

const WEEKDAY_MAP: Record<number, Weekday> = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};

export const useCalendarStore = create<CalendarState>((set, get) => ({
  selectedDate: new Date(),
  currentMonth: new Date(),
  todos: {},
  specialDates: SPECIAL_DATES,

  setSelectedDate: (date: Date) => set({ selectedDate: date }),

  setCurrentMonth: (date: Date) => set({ currentMonth: date }),

  addTodo: (todoData) =>
    set((state) => {
      const newTodos = { ...state.todos };
      const todoId = crypto.randomUUID();

      const createTodoForDate = (dateStr: string, isOriginal: boolean): Todo => ({
        id: isOriginal ? todoId : crypto.randomUUID(),
        text: todoData.text,
        completed: false,
        date: dateStr,
        type: todoData.type,
        startTime: todoData.startTime,
        endTime: todoData.endTime,
        repeat: todoData.repeat,
        originalTodoId: isOriginal ? undefined : todoId,
      });

      if (todoData.repeat.type === 'none') {
        const dateTodos = newTodos[todoData.date] || [];
        newTodos[todoData.date] = [...dateTodos, createTodoForDate(todoData.date, true)];
      } else if (todoData.repeat.type === 'daily') {
        const startDate = new Date(todoData.date);
        for (let i = 0; i < 30; i++) {
          const date = addDays(startDate, i);
          const dateStr = format(date, 'yyyy-MM-dd');
          const dateTodos = newTodos[dateStr] || [];
          newTodos[dateStr] = [...dateTodos, createTodoForDate(dateStr, i === 0)];
        }
      } else if (todoData.repeat.type === 'weekly') {
        const startDate = new Date(todoData.date);
        const weekdays: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
        for (let i = 0; i < 30; i++) {
          const date = addDays(startDate, i);
          const dayOfWeek = WEEKDAY_MAP[date.getDay()];
          if (weekdays.includes(dayOfWeek)) {
            const dateStr = format(date, 'yyyy-MM-dd');
            const dateTodos = newTodos[dateStr] || [];
            newTodos[dateStr] = [...dateTodos, createTodoForDate(dateStr, i === 0)];
          }
        }
      } else if (todoData.repeat.type === 'custom' && todoData.repeat.weekdays) {
        const startDate = new Date(todoData.date);
        const selectedWeekdays = todoData.repeat.weekdays;
        let isFirst = true;
        for (let i = 0; i < 30; i++) {
          const date = addDays(startDate, i);
          const dayOfWeek = WEEKDAY_MAP[date.getDay()];
          if (selectedWeekdays.includes(dayOfWeek)) {
            const dateStr = format(date, 'yyyy-MM-dd');
            const dateTodos = newTodos[dateStr] || [];
            newTodos[dateStr] = [...dateTodos, createTodoForDate(dateStr, isFirst)];
            isFirst = false;
          }
        }
      }

      return { todos: newTodos };
    }),

  toggleTodo: (date: string, todoId: string) =>
    set((state) => {
      const dateTodos = state.todos[date] || [];
      return {
        todos: {
          ...state.todos,
          [date]: dateTodos.map((todo) =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
          ),
        },
      };
    }),

  deleteTodo: (date: string, todoId: string, deleteAll?: boolean) =>
    set((state) => {
      const newTodos = { ...state.todos };
      const todoToDelete = newTodos[date]?.find((t) => t.id === todoId);

      if (!todoToDelete) return state;

      if (deleteAll && (todoToDelete.originalTodoId || todoToDelete.repeat.type !== 'none')) {
        const originalId = todoToDelete.originalTodoId || todoId;
        Object.keys(newTodos).forEach((dateKey) => {
          newTodos[dateKey] = newTodos[dateKey].filter(
            (todo) => todo.id !== originalId && todo.originalTodoId !== originalId
          );
        });
      } else {
        newTodos[date] = newTodos[date].filter((todo) => todo.id !== todoId);
      }

      return { todos: newTodos };
    }),

  getTodosForDate: (date: string) => {
    const state = get();
    const todos = state.todos[date] || [];
    return [...todos].sort((a, b) => a.startTime.localeCompare(b.startTime));
  },
}));
