import type { RepeatDuration, RepeatType } from '../../../types/calendar';

export const REPEAT_OPTIONS: { id: RepeatType; label: string }[] = [
  { id: 'none', label: 'Não repetir' },
  { id: 'daily', label: 'Todo dia' },
  { id: 'weekly', label: 'Seg a Sex' },
  { id: 'custom', label: 'Personalizado' },
];

export const DURATION_OPTIONS: { id: RepeatDuration; label: string }[] = [
  { id: 'month', label: '1 mês' },
  { id: 'quarter', label: '3 meses' },
  { id: 'year', label: '1 ano' },
  { id: 'forever', label: 'Sempre' },
];

export const DURATION_LABELS: Record<RepeatDuration, string> = {
  month: '1 mês',
  quarter: '3 meses',
  year: '1 ano',
  forever: 'Sempre',
};

export const REPEAT_TYPE_LABELS: Record<RepeatType, string> = {
  none: 'Não repete',
  daily: 'Diariamente',
  weekly: 'Seg a Sex',
  custom: 'Personalizado',
};
