import type { WeatherSnapshot } from '../../../../../types/weather';
import type { DaylightSignals, WeatherTipSignals } from './types';
import { normalizeText } from './text';

const SUN_WINDOW_MINUTES = 45;

/**
 * Verifica se duas datas sao do mesmo dia (fuso local).
 */
export function isSameLocalDay(left: Date, right: Date): boolean {
  return left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate();
}

/**
 * Indica se a data alvo e futura em relacao ao dia atual (fuso local).
 */
export function isFutureLocalDay(target: Date, now: Date): boolean {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  return targetDay.getTime() > today.getTime();
}

/**
 * Gera sinais do periodo do dia e proximidade de nascer/por do sol.
 */
export function buildDaylightSignals(snapshot: WeatherSnapshot, now: Date): DaylightSignals {
  const sunrise = new Date(snapshot.sunrise * 1000);
  const sunset = new Date(snapshot.sunset * 1000);
  const isNight = now < sunrise || now > sunset;
  const hour = now.getHours();
  const isMorning = hour >= 5 && hour < 12;
  const isAfternoon = hour >= 12 && hour < 18;
  const isEvening = hour >= 18 || hour < 5;
  const minutesToSunrise = Math.abs(now.getTime() - sunrise.getTime()) / (60 * 1000);
  const minutesToSunset = Math.abs(now.getTime() - sunset.getTime()) / (60 * 1000);

  return {
    isNight,
    isMorning,
    isAfternoon,
    isEvening,
    isNearSunrise: minutesToSunrise <= SUN_WINDOW_MINUTES,
    isNearSunset: minutesToSunset <= SUN_WINDOW_MINUTES,
  };
}

/**
 * Resume sinais do clima e do dia para variar dicas de rotina.
 */
export function buildWeatherTipSignals(
  snapshot: WeatherSnapshot,
  selectedDate: Date
): WeatherTipSignals {
  const now = new Date();
  const isToday = isSameLocalDay(selectedDate, now);
  const isFuture = isFutureLocalDay(selectedDate, now);
  const daylightSignals = isToday
    ? buildDaylightSignals(snapshot, now)
    : {
      isNight: false,
      isMorning: false,
      isAfternoon: false,
      isEvening: false,
      isNearSunrise: false,
      isNearSunset: false,
    };
  const normalized = normalizeText(snapshot.description);
  const popPercent = Math.round(snapshot.pop * 100);
  const maxTemp = Math.round(snapshot.temperature.max);
  const minTemp = Math.round(snapshot.temperature.min);
  const tempCurrent = Math.round(snapshot.temperature.current);
  const feelsLike = Math.round(snapshot.feelsLike);
  const windKmh = Math.round(snapshot.wind.speed * 3.6);
  const isStorm =
    normalized.includes('tempestade') ||
    normalized.includes('trovoada') ||
    normalized.includes('storm') ||
    normalized.includes('thunder');
  const isSnowy =
    normalized.includes('neve') ||
    normalized.includes('granizo') ||
    normalized.includes('snow') ||
    snapshot.precipitation.snow > 0;
  const isRainy =
    normalized.includes('chuva') ||
    normalized.includes('garoa') ||
    normalized.includes('chuvisco') ||
    normalized.includes('drizzle') ||
    normalized.includes('rain') ||
    snapshot.precipitation.rain > 0 ||
    popPercent >= 50;
  const cloudCover = Math.round(snapshot.clouds);
  const isOvercast =
    cloudCover >= 80 ||
    normalized.includes('encoberto') ||
    normalized.includes('overcast') ||
    normalized.includes('ceu fechado');
  const isMostlyCloudy = cloudCover >= 60 && cloudCover < 80;
  const isPartlyCloudy =
    (cloudCover >= 25 && cloudCover < 60) ||
    normalized.includes('nuvens dispersas') ||
    normalized.includes('poucas nuvens') ||
    normalized.includes('scattered') ||
    normalized.includes('few clouds');
  const isSunny =
    (normalized.includes('ceu limpo') ||
      normalized.includes('ensolarado') ||
      normalized.includes('clear') ||
      (normalized.includes('sol') && cloudCover <= 50)) &&
    cloudCover <= 40 &&
    snapshot.pop <= 0.2;
  const isHot = maxTemp >= 30 || feelsLike >= 30;
  const isCold = minTemp <= 10 || feelsLike <= 12;
  const isWindy = windKmh >= 25;
  const isWeekend = [0, 6].includes(selectedDate.getDay());

  return {
    isWeekend,
    isToday,
    isFuture,
    isStorm,
    isRainy,
    isSnowy,
    isSunny,
    isOvercast,
    isMostlyCloudy,
    isPartlyCloudy,
    isHot,
    isCold,
    isWindy,
    isNight: daylightSignals.isNight,
    isMorning: daylightSignals.isMorning,
    isAfternoon: daylightSignals.isAfternoon,
    isEvening: daylightSignals.isEvening,
    isNearSunrise: isToday && daylightSignals.isNearSunrise && !isRainy && !isSnowy && !isStorm,
    isNearSunset: isToday && daylightSignals.isNearSunset && !isRainy && !isSnowy && !isStorm,
    popPercent,
    maxTemp,
    minTemp,
    feelsLike,
    tempCurrent,
    cloudCover,
  };
}
