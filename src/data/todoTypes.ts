import type { TodoTypeConfig } from '../types/calendar';

export const TODO_TYPES: TodoTypeConfig[] = [
  { id: 'work', label: 'Trabalho', icon: 'MdWork', color: '#3B82F6' },
  { id: 'routine', label: 'Rotina', icon: 'MdRepeat', color: '#10B981' },
  { id: 'reminder', label: 'Lembrete', icon: 'MdNotifications', color: '#F59E0B' },
  { id: 'personal', label: 'Pessoal', icon: 'MdPerson', color: '#8B5CF6' },
  { id: 'study', label: 'Estudo', icon: 'MdSchool', color: '#EC4899' },
  { id: 'health', label: 'Saúde', icon: 'MdFavorite', color: '#EF4444' },
  { id: 'finance', label: 'Finanças', icon: 'MdAttachMoney', color: '#14B8A6' },
];

export const getTodoTypeConfig = (id: string): TodoTypeConfig | undefined => {
  return TODO_TYPES.find((type) => type.id === id);
};
