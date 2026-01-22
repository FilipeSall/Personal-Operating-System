import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TODO_TYPES } from '../../../data/todoTypes';
import type { Todo, TodoTypeConfig } from '../../../types/calendar';

export const getTypeConfig = (type: Todo['type']): TodoTypeConfig | undefined => {
  return TODO_TYPES.find((t) => t.id === type);
};

export const formatTodoDate = (date: string): string => {
  return format(new Date(`${date}T00:00:00`), "EEEE, d 'de' MMMM", { locale: ptBR });
};
