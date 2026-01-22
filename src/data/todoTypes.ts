import type { TodoTypeConfig } from '../types/calendar';

export const TODO_TYPES: TodoTypeConfig[] = [
  { id: 'work', label: 'Trabalho', icon: 'MdWork', color: '#D64550' },
  { id: 'routine', label: 'Rotina', icon: 'MdRepeat', color: '#FA9500' },
  { id: 'reminder', label: 'Lembrete', icon: 'MdNotifications', color: '#A7AA29' },
  { id: 'personal', label: 'Pessoal', icon: 'MdPerson', color: '#D64550' },
  { id: 'study', label: 'Estudo', icon: 'MdSchool', color: '#FA9500' },
  { id: 'health', label: 'Saúde', icon: 'MdFavorite', color: '#D64550' },
  { id: 'finance', label: 'Finanças', icon: 'MdAttachMoney', color: '#A7AA29' },
];

export const getTodoTypeConfig = (id: string): TodoTypeConfig | undefined => {
  return TODO_TYPES.find((type) => type.id === id);
};
