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

export type RepeatType = 'none' | 'daily' | 'weekly' | 'custom';

export type Weekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export interface RepeatConfig {
  type: RepeatType;
  weekdays?: Weekday[];
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  type: TodoType;
  startTime: string;
  endTime: string;
  repeat: RepeatConfig;
  originalTodoId?: string;
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
  addTodo: (todo: Omit<Todo, 'id' | 'completed' | 'originalTodoId'>) => void;
  toggleTodo: (date: string, todoId: string) => void;
  deleteTodo: (date: string, todoId: string, deleteAll?: boolean) => void;
  getTodosForDate: (date: string) => Todo[];
}
