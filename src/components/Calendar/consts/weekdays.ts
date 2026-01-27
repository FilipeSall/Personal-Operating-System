import type { Weekday } from '../../../types/calendar';

export const WEEKDAYS: { id: Weekday; short: string; long: string }[] = [
  { id: 'sun', short: 'D', long: 'Dom' },
  { id: 'mon', short: 'S', long: 'Seg' },
  { id: 'tue', short: 'T', long: 'Ter' },
  { id: 'wed', short: 'Q', long: 'Qua' },
  { id: 'thu', short: 'Q', long: 'Qui' },
  { id: 'fri', short: 'S', long: 'Sex' },
  { id: 'sat', short: 'S', long: 'Sáb' },
];

export const WEEKDAY_LABELS: Record<Weekday, string> = {
  sun: 'Domingo',
  mon: 'Segunda',
  tue: 'Terça',
  wed: 'Quarta',
  thu: 'Quinta',
  fri: 'Sexta',
  sat: 'Sábado',
};

export const ALL_WEEKDAYS: Weekday[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
export const WORK_WEEKDAYS: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
