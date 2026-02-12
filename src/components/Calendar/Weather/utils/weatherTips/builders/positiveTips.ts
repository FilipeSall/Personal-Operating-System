import type { WeatherSnapshot, WeatherTip } from '../../../../../../types/weather';
import { isPerfectDay, isWorkoutWeather } from '../conditions';
import { buildWeatherTipSignals } from '../signals';
import { createTip } from '../tipUtils';

/**
 * Dica de clima perfeito para atividades ao ar livre.
 * @param snapshot Snapshot diário de clima.
 * @param selectedDate Data selecionada no calendário.
 * @returns Dica positiva de clima ideal ou `null`.
 */
export const buildPerfectDayTip = (snapshot: WeatherSnapshot, selectedDate: Date): WeatherTip | null => {
  const temp = Math.round(snapshot.temperature.current);
  const humidity = Math.round(snapshot.humidity);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const pop = snapshot.pop;
  const clouds = Math.round(snapshot.clouds);
  const signals = buildWeatherTipSignals(snapshot, selectedDate);

  if (!isPerfectDay(temp, humidity, windKmh, pop, clouds)) {
    return null;
  }

  const perfectCopy = signals.isNight
    ? `${temp}°C, umidade agradável (${humidity}%) e brisa suave. Noite ótima para um passeio leve.`
    : signals.isAfternoon
      ? `${temp}°C, umidade agradável (${humidity}%) e brisa suave. Tarde excelente para atividades ao ar livre.`
      : `${temp}°C, umidade agradável (${humidity}%) e brisa suave. Excelente dia para atividades ao ar livre.`;

  return createTip(
    'perfect-day',
    'Clima ideal',
    perfectCopy,
    'positive'
  );
};

/**
 * Dica de clima perfeito para exercicios.
 * @param snapshot Snapshot diário de clima.
 * @param selectedDate Data selecionada no calendário.
 * @returns Dica positiva de treino ou `null`.
 */
export const buildWorkoutTip = (snapshot: WeatherSnapshot, selectedDate: Date): WeatherTip | null => {
  const temp = Math.round(snapshot.temperature.current);
  const humidity = Math.round(snapshot.humidity);
  const uvIndex = snapshot.uvIndex;
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const signals = buildWeatherTipSignals(snapshot, selectedDate);

  if (!isWorkoutWeather(temp, humidity, uvIndex, windKmh)) {
    return null;
  }

  const workoutCopy = signals.isNight
    ? `Condições ideais para exercícios leves: ${temp}°C e umidade controlada. Noite boa pra se mexer.`
    : signals.isAfternoon
      ? `Condições ideais para exercícios ao ar livre: ${temp}°C e umidade controlada. Tarde boa pra treinar.`
      : `Condições ideais para exercícios ao ar livre: ${temp}°C e umidade controlada. Aproveite para se movimentar.`;

  return createTip(
    'workout-weather',
    'Clima de treino',
    workoutCopy,
    'positive'
  );
};
