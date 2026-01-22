import { MdRepeat as MdRepeatIcon, MdWork, MdNotifications, MdPerson, MdSchool, MdFavorite, MdAttachMoney } from 'react-icons/md';
import type { RepeatDuration, Weekday } from '../../../types/calendar';

export const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  MdWork,
  MdRepeat: MdRepeatIcon,
  MdNotifications,
  MdPerson,
  MdSchool,
  MdFavorite,
  MdAttachMoney,
};

export const WEEKDAY_LABELS: Record<Weekday, string> = {
  sun: 'Domingo',
  mon: 'Segunda',
  tue: 'Terça',
  wed: 'Quarta',
  thu: 'Quinta',
  fri: 'Sexta',
  sat: 'Sábado',
};

export const DURATION_LABELS: Record<RepeatDuration, string> = {
  month: '1 mês',
  quarter: '3 meses',
  year: '1 ano',
  forever: 'Sempre',
};

export const REPEAT_TYPE_LABELS: Record<string, string> = {
  none: 'Não repete',
  daily: 'Diariamente',
  weekly: 'Seg a Sex',
  custom: 'Personalizado',
};
