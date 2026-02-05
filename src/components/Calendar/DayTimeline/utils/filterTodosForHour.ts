import type { Todo } from '../../../../types/calendar';

/**
 * Converte um horario HH:mm em minutos totais.
 *
 * @param time Horario no formato HH:mm.
 */
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Filtra tarefas que acontecem dentro de uma hora especifica.
 *
 * @param todos Lista completa de tarefas.
 * @param hour Hora alvo (0-23).
 */
export const filterTodosForHour = (todos: Todo[], hour: number): Todo[] => {
  const hourStart = hour * 60;

  return todos.filter((todo) => {
    if (!todo.startTime || !todo.endTime) return false;

    const start = timeToMinutes(todo.startTime);
    const end = timeToMinutes(todo.endTime);

    return start <= hourStart && end > hourStart;
  });
};
