import { create } from 'zustand';
import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import type { CalendarState, Todo, Weekday, RepeatDuration } from '../types/calendar';
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

const getDurationDays = (duration: RepeatDuration): number => {
  switch (duration) {
    case 'month':
      return 30;
    case 'quarter':
      return 90;
    case 'year':
      return 365;
    case 'forever':
      return 365 * 2;
    default:
      return 30;
  }
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
      const createdAt = new Date().toISOString();
      const duration = todoData.repeat.duration || 'month';
      const durationDays = getDurationDays(duration);

      const createTodoForDate = (dateStr: string, isOriginal: boolean): Todo => ({
        id: isOriginal ? todoId : crypto.randomUUID(),
        text: todoData.text,
        comments: todoData.comments,
        date: dateStr,
        type: todoData.type,
        startTime: todoData.startTime,
        endTime: todoData.endTime,
        repeat: todoData.repeat,
        completed: false,
        originalTodoId: isOriginal ? undefined : todoId,
        createdAt,
      });

      if (todoData.repeat.type === 'none') {
        const dateTodos = newTodos[todoData.date] || [];
        newTodos[todoData.date] = [...dateTodos, createTodoForDate(todoData.date, true)];
      } else if (todoData.repeat.type === 'daily') {
        const startDate = new Date(todoData.date);
        for (let i = 0; i < durationDays; i++) {
          const date = addDays(startDate, i);
          const dateStr = format(date, 'yyyy-MM-dd');
          const dateTodos = newTodos[dateStr] || [];
          newTodos[dateStr] = [...dateTodos, createTodoForDate(dateStr, i === 0)];
        }
      } else if (todoData.repeat.type === 'weekly') {
        const startDate = new Date(todoData.date);
        const weekdays: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
        let isFirst = true;
        for (let i = 0; i < durationDays; i++) {
          const date = addDays(startDate, i);
          const dayOfWeek = WEEKDAY_MAP[date.getDay()];
          if (weekdays.includes(dayOfWeek)) {
            const dateStr = format(date, 'yyyy-MM-dd');
            const dateTodos = newTodos[dateStr] || [];
            newTodos[dateStr] = [...dateTodos, createTodoForDate(dateStr, isFirst)];
            isFirst = false;
          }
        }
      } else if (todoData.repeat.type === 'custom' && todoData.repeat.weekdays) {
        const startDate = new Date(todoData.date);
        const selectedWeekdays = todoData.repeat.weekdays;
        let isFirst = true;
        for (let i = 0; i < durationDays; i++) {
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

  updateTodo: (date: string, todoId: string, updates) =>
    set((state) => {
      const dateTodos = state.todos[date] || [];
      if (dateTodos.length === 0) return state;
      return {
        todos: {
          ...state.todos,
          [date]: dateTodos.map((todo) =>
            todo.id === todoId
              ? {
                  ...todo,
                  ...updates,
                  repeat: updates.repeat ?? todo.repeat,
                }
              : todo
          ),
        },
      };
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

  deleteTodo: (date: string, todoId: string, scope = 'single') =>
    set((state) => {
      const newTodos = { ...state.todos };
      const todoToDelete = newTodos[date]?.find((t) => t.id === todoId);

      if (!todoToDelete) return state;

      const originalId = todoToDelete.originalTodoId || todoId;
      const isSameSeries = (todo: Todo) =>
        todo.id === originalId || todo.originalTodoId === originalId;

      if (scope === 'single') {
        newTodos[date] = newTodos[date].filter((todo) => todo.id !== todoId);
        return { todos: newTodos };
      }

      if (scope === 'all') {
        Object.keys(newTodos).forEach((dateKey) => {
          newTodos[dateKey] = newTodos[dateKey].filter((todo) => !isSameSeries(todo));
        });
        return { todos: newTodos };
      }

      const baseDate = new Date(`${todoToDelete.date}T00:00:00`);
      const [rangeStart, rangeEnd] =
        scope === 'week'
          ? [
              startOfWeek(baseDate, { weekStartsOn: 1 }),
              endOfWeek(baseDate, { weekStartsOn: 1 }),
            ]
          : [startOfMonth(baseDate), endOfMonth(baseDate)];

      Object.keys(newTodos).forEach((dateKey) => {
        const keyDate = new Date(`${dateKey}T00:00:00`);
        if (keyDate >= rangeStart && keyDate <= rangeEnd) {
          newTodos[dateKey] = newTodos[dateKey].filter((todo) => !isSameSeries(todo));
        }
      });

      return { todos: newTodos };
    }),

  getTodosForDate: (date: string) => {
    const state = get();
    const todos = state.todos[date] || [];
    return [...todos].sort((a, b) => a.startTime.localeCompare(b.startTime));
  },
}));
