export type TodoType =
  | 'work'
  | 'routine'
  | 'reminder'
  | 'personal'
  | 'study'
  | 'health'
  | 'finance';

export interface TodoTypeConfig {
  id: TodoType;
  label: string;
  icon: string;
  color: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  type: TodoType;
}

export interface SpecialDate {
  date: string;
  name: string;
  type: 'holiday' | 'birthday' | 'event';
  recurring: boolean;
}

export interface CalendarState {
  selectedDate: Date;
  currentMonth: Date;
  todos: Record<string, Todo[]>;
  specialDates: SpecialDate[];

  setSelectedDate: (date: Date) => void;
  setCurrentMonth: (date: Date) => void;
  addTodo: (date: string, text: string, type: TodoType) => void;
  toggleTodo: (date: string, todoId: string) => void;
  deleteTodo: (date: string, todoId: string) => void;
}
