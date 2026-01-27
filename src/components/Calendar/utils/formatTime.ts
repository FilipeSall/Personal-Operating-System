/**
 * Formata uma string HH:mm para o formato 12h (ex.: 14:05 -> 2:05 PM).
 *
 * Props:
 * - time: string no formato HH:mm.
 *
 * Como usar:
 * const label = formatTime('09:30');
 */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${suffix}`;
};
