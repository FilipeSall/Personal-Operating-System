import { create } from 'zustand';
import type { CalendarState, Todo, TodoType } from '../types/calendar';
import { SPECIAL_DATES } from '../data/holidays';

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: new Date(),
  currentMonth: new Date(),
  todos: {},
  specialDates: SPECIAL_DATES,

  setSelectedDate: (date: Date) => set({ selectedDate: date }),

  setCurrentMonth: (date: Date) => set({ currentMonth: date }),

  addTodo: (date: string, text: string, type: TodoType) =>
    set((state) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        date,
        type,
      };
      const dateTodos = state.todos[date] || [];
      return {
        todos: {
          ...state.todos,
          [date]: [...dateTodos, newTodo],
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

  deleteTodo: (date: string, todoId: string) =>
    set((state) => {
      const dateTodos = state.todos[date] || [];
      return {
        todos: {
          ...state.todos,
          [date]: dateTodos.filter((todo) => todo.id !== todoId),
        },
      };
    }),
}));
