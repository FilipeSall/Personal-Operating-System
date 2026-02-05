import type { OpenMeteoHourlyResponse } from '../types/openMeteo';
import type { HourlyForecast, HourlyDataPoint, HourlySource } from '../types/weather';

/**
 * Extrai a hora (0-23) a partir de um timestamp ISO.
 *
 * @param isoTime Data/hora em ISO.
 */
const extractHour = (isoTime: string): number => {
  const timePart = isoTime.split('T')[1];
  return parseInt(timePart.split(':')[0], 10);
};

/**
 * Formata uma hora inteira em HH:00.
 *
 * @param hour Hora (0-23).
 */
const formatTime = (hour: number): string => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

/**
 * Gera a chave de cache para forecast horario.
 *
 * @param lat Latitude.
 * @param lon Longitude.
 * @param dateKey Data no formato YYYY-MM-DD.
 * @param source Origem do dado (forecast ou archive).
 */
export const buildHourlyCacheKey = (
  lat: number,
  lon: number,
  dateKey: string,
  source: HourlySource
): string => {
  return `${lat.toFixed(2)}|${lon.toFixed(2)}|${dateKey}|${source}`;
};

/**
 * Converte a resposta do Open-Meteo para o modelo interno.
 *
 * @param response Resposta raw do Open-Meteo.
 * @param dateKey Data do forecast.
 * @param cacheKey Chave de cache gerada.
 */
export const mapOpenMeteoToHourly = (
  response: OpenMeteoHourlyResponse,
  dateKey: string,
  cacheKey: string
): HourlyForecast => {
  const { hourly } = response;

  const points: HourlyDataPoint[] = hourly.time.map((time, index) => ({
    hour: extractHour(time),
    time: formatTime(extractHour(time)),
    precipProbability: hourly.precipitation_probability[index] ?? 0,
    precipitation: hourly.precipitation[index] ?? 0,
    temperature: hourly.temperature_2m[index] ?? 0,
    weatherCode: hourly.weathercode[index] ?? 0,
  }));

  return {
    dateKey,
    cacheKey,
    points,
    fetchedAt: Date.now(),
  };
};
