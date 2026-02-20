/**
 * Calcula quantos milissegundos faltam para a próxima virada de hora local.
 *
 * @param now Momento base para o cálculo.
 * @returns Intervalo em milissegundos até HH:00:00.000 seguinte.
 */
export const getMillisecondsUntilNextHour = (now: Date = new Date()): number => {
  const nextHour = new Date(now);
  nextHour.setMinutes(0, 0, 0);
  nextHour.setHours(now.getHours() + 1);
  return Math.max(nextHour.getTime() - now.getTime(), 0);
};
