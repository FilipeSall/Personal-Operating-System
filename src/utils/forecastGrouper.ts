import { format, fromUnixTime } from 'date-fns';
import type { OpenWeatherForecastItem, OpenWeatherForecastResponse } from '../types/openWeather';
import type { WeatherSnapshot } from '../types/weather';

/**
 * Agrupa os intervalos de 3h do forecast por data (YYYY-MM-DD).
 */
const groupItemsByDay = (items: OpenWeatherForecastItem[]): Map<string, OpenWeatherForecastItem[]> => {
  const groups = new Map<string, OpenWeatherForecastItem[]>();
  for (const item of items) {
    const key = format(fromUnixTime(item.dt), 'yyyy-MM-dd');
    const group = groups.get(key);
    if (group) {
      group.push(item);
    } else {
      groups.set(key, [item]);
    }
  }
  return groups;
};

/**
 * Retorna o item mais proximo do meio-dia (12:00).
 */
const getMiddayItem = (items: OpenWeatherForecastItem[]): OpenWeatherForecastItem => {
  let closest = items[0];
  let minDiff = Infinity;
  for (const item of items) {
    const hour = fromUnixTime(item.dt).getHours();
    const diff = Math.abs(hour - 12);
    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  }
  return closest;
};

/**
 * Retorna a descricao mais frequente entre os intervalos.
 */
const getMostFrequentDescription = (items: OpenWeatherForecastItem[]): string => {
  const counts = new Map<string, number>();
  for (const item of items) {
    const desc = item.weather[0]?.description ?? '';
    counts.set(desc, (counts.get(desc) ?? 0) + 1);
  }
  let best = '';
  let bestCount = 0;
  for (const [desc, count] of counts) {
    if (count > bestCount) {
      best = desc;
      bestCount = count;
    }
  }
  return best || 'Sem descricao';
};

/**
 * Converte a lista de forecast em snapshots agrupados por dia.
 */
export const groupForecastByDay = (
  data: OpenWeatherForecastResponse
): Map<string, WeatherSnapshot> => {
  const result = new Map<string, WeatherSnapshot>();
  const groups = groupItemsByDay(data.list);

  for (const [dateKey, items] of groups) {
    const midday = getMiddayItem(items);
    const windiest = items.reduce((a, b) => (b.wind.speed > a.wind.speed ? b : a));

    let tempMin = Infinity;
    let tempMax = -Infinity;
    let humiditySum = 0;
    let cloudsSum = 0;
    let popMax = 0;
    let rainTotal = 0;
    let snowTotal = 0;

    for (const item of items) {
      if (item.main.temp_min < tempMin) tempMin = item.main.temp_min;
      if (item.main.temp_max > tempMax) tempMax = item.main.temp_max;
      humiditySum += item.main.humidity;
      cloudsSum += item.clouds.all;
      if (item.pop > popMax) popMax = item.pop;
      rainTotal += item.rain?.['3h'] ?? 0;
      snowTotal += item.snow?.['3h'] ?? 0;
    }

    result.set(dateKey, {
      description: getMostFrequentDescription(items),
      temperature: {
        current: midday.main.temp,
        min: tempMin,
        max: tempMax,
      },
      feelsLike: midday.main.feels_like,
      pop: popMax,
      wind: {
        speed: windiest.wind.speed,
        deg: windiest.wind.deg,
      },
      humidity: Math.round(humiditySum / items.length),
      uvIndex: 0,
      clouds: Math.round(cloudsSum / items.length),
      sunrise: data.city.sunrise,
      sunset: data.city.sunset,
      alerts: [],
      precipitation: {
        rain: rainTotal,
        snow: snowTotal,
      },
    });
  }

  return result;
};

/**
 * Formata uma Date para a chave usada no mapa de forecasts.
 */
export const toForecastKey = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};
