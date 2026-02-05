import type { OpenMeteoHourlyResponse } from '../types/openMeteo';
import type { HourlyForecast, HourlyDataPoint } from '../types/weather';

const extractHour = (isoTime: string): number => {
  const timePart = isoTime.split('T')[1];
  return parseInt(timePart.split(':')[0], 10);
};

const formatTime = (hour: number): string => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

export const buildHourlyCacheKey = (
  lat: number,
  lon: number,
  dateKey: string
): string => {
  return `${lat.toFixed(2)}|${lon.toFixed(2)}|${dateKey}`;
};

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
