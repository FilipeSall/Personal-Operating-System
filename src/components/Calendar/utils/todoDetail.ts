import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TODO_TYPES } from '../../../data/todoTypes';
import type { Todo, TodoTypeConfig } from '../../../types/calendar';

/**
 * Retorna a configuração do tipo de tarefa.
 *
 * Props:
 * - type: tipo da tarefa (ex.: 'work', 'reminder').
 *
 * Como usar:
 * const config = getTypeConfig(todo.type);
 */
export const getTypeConfig = (type: Todo['type']): TodoTypeConfig | undefined => {
  return TODO_TYPES.find((t) => t.id === type);
};

/**
 * Formata a data do TODO para exibição longa (pt-BR).
 *
 * Props:
 * - date: string no formato YYYY-MM-DD.
 *
 * Como usar:
 * const label = formatTodoDate(todo.date);
 */
export const formatTodoDate = (date: string): string => {
  return format(new Date(`${date}T00:00:00`), "EEEE, d 'de' MMMM", { locale: ptBR });
};
