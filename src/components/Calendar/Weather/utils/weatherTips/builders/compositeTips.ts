import type { WeatherSnapshot, WeatherTip } from '../../../../../../types/weather';
import { isBadHairDay, isDeceptivelyCold, isMiserable, hasWindChill } from '../conditions';
import { calculateHeatIndex, calculateWindChill } from '../metrics';
import { createTip } from '../tipUtils';

/**
 * Cria dica de "sufoco" quando esta muito quente, umido e sem vento.
 * @param snapshot Snapshot diário de clima.
 * @returns Dica composta de calor abafado ou `null`.
 */
export const buildMiseryTip = (snapshot: WeatherSnapshot): WeatherTip | null => {
  const temp = Math.round(snapshot.temperature.max);
  const humidity = Math.round(snapshot.humidity);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);

  if (!isMiserable(temp, humidity, windKmh)) {
    return null;
  }

  const heatIndex = calculateHeatIndex(temp, humidity);

  return createTip(
    'misery-index',
    'Calor abafado',
    `Sensação de ${heatIndex}°C com ${humidity}% de umidade e pouco vento. Mantenha-se hidratado e evite atividades intensas.`,
    'composite'
  );
};

/**
 * Cria dica de vento cortante (frio + vento).
 * @param snapshot Snapshot diário de clima.
 * @returns Dica composta de vento gelado ou `null`.
 */
export const buildWindChillTip = (snapshot: WeatherSnapshot): WeatherTip | null => {
  const temp = Math.round(snapshot.temperature.min);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);

  if (!hasWindChill(temp, windKmh)) {
    return null;
  }

  const windChill = calculateWindChill(temp, windKmh);

  return createTip(
    'wind-chill',
    'Vento gelado',
    `Sensação de ${windChill}°C com o vento de ${windKmh} km/h. Use casaco corta-vento e proteja extremidades.`,
    'composite'
  );
};

/**
 * Dica de "bad hair day" (umidade + vento + chuva).
 * @param snapshot Snapshot diário de clima.
 * @returns Dica composta de cabelo rebelde ou `null`.
 */
export const buildBadHairDayTip = (snapshot: WeatherSnapshot): WeatherTip | null => {
  const humidity = Math.round(snapshot.humidity);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const pop = snapshot.pop;

  if (!isBadHairDay(humidity, windKmh, pop)) {
    return null;
  }

  return createTip(
    'bad-hair-day',
    'Cabelo rebelde',
    `Umidade de ${humidity}%, vento de ${windKmh} km/h e chance de chuva. Opte por penteados presos ou proteja com chapéu.`,
    'composite'
  );
};

/**
 * Dica de frio enganador.
 * @param snapshot Snapshot diário de clima.
 * @returns Dica composta de frio aparente ou `null`.
 */
export const buildDeceptiveColdTip = (snapshot: WeatherSnapshot): WeatherTip | null => {
  const temp = Math.round(snapshot.temperature.current);
  const clouds = Math.round(snapshot.clouds);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);

  if (!isDeceptivelyCold(temp, clouds, windKmh)) {
    return null;
  }

  return createTip(
    'deceptively-cold',
    'Frio aparente',
    `${temp}°C parece ameno, mas nublado com vento cria sensação mais fria. Leve casaco leve por precaução.`,
    'composite'
  );
};
