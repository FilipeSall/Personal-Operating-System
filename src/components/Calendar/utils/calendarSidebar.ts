import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Todo } from '../../../types/calendar';
import type { HourlyForecast } from '../../../types/weather';
import type { WeatherTone } from './weatherTheme';

export type TimelineTone = 'sunny' | 'rain' | 'cloudy' | 'cold' | 'default' | 'night';

export type TimelineTask = {
  id: string;
  title: string;
  time: string;
  type: Todo['type'];
};

export type TimelineSlot = {
  hour: number;
  label: string;
  tasks: TimelineTask[];
  tone: TimelineTone;
  isCurrentHour: boolean;
  precipProbability: number | null;
  weatherCode: number | null;
};

/**
 * Formata uma hora inteira para o rótulo da timeline (formato 24h).
 *
 * Props:
 * - hour: hora inteira de 0 a 23.
 */
export const formatTimelineHour = (hour: number): string => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

/**
 * Extrai a hora inicial de uma string HH:mm.
 *
 * Props:
 * - time: string no formato HH:mm.
 */
export const parseHourFromTime = (time: string): number => {
  const [hourRaw] = time.split(':');
  const hour = Number(hourRaw);
  return Number.isNaN(hour) ? 0 : Math.min(Math.max(hour, 0), 23);
};

/**
 * Resolve o tom do indicador de clima para a timeline, considerando o horário.
 *
 * Props:
 * - tone: tom do clima do dia.
 * - hour: hora do slot (0-23).
 */
export const resolveTimelineTone = (tone: WeatherTone, hour: number): TimelineTone => {
  const isNight = hour < 6 || hour >= 20;

  if (isNight) {
    return 'night';
  }

  switch (tone) {
    case 'rain':
      return 'rain';
    case 'sunny':
    case 'hot':
      return 'sunny';
    case 'cold':
      return 'cold';
    case 'cloudy':
    case 'atmosphere':
      return 'cloudy';
    default:
      return 'default';
  }
};

/**
 * Monta os 24 slots da timeline e distribui as tarefas por hora.
 *
 * Props:
 * - todos: tarefas do dia selecionado.
 * - tone: tom do clima do dia.
 * - selectedDate: data selecionada no calendário.
 * - hourlyForecast: dados hourly do Open-Meteo (opcional).
 * - currentPopPercent: probabilidade de chuva atual (OpenWeather) para fallback (0-100).
 */
export const buildHourlyTimeline = (
  todos: Todo[],
  tone: WeatherTone,
  selectedDate: Date,
  hourlyForecast?: HourlyForecast | null,
  currentPopPercent?: number | null
): TimelineSlot[] => {
  const now = new Date();
  const currentHour = now.getHours();
  const isToday = isSameDay(selectedDate, now);
  const hourlyByHour = hourlyForecast
    ? new Map(hourlyForecast.points.map((point) => [point.hour, point]))
    : null;

  const tasksByHour = todos.reduce<Record<number, TimelineTask[]>>((acc, todo) => {
    const hour = parseHourFromTime(todo.startTime);
    const entry: TimelineTask = {
      id: todo.id,
      title: todo.text,
      time: todo.startTime,
      type: todo.type,
    };

    if (!acc[hour]) {
      acc[hour] = [entry];
    } else {
      acc[hour] = [...acc[hour], entry];
    }

    return acc;
  }, {});

  return Array.from({ length: 24 }, (_, hour) => {
    const hourlyPoint =
      hourlyByHour?.get(hour) ?? hourlyForecast?.points[hour] ?? null;
    const isCurrentSlot = isToday && hour === currentHour;
    const fallbackPop = isCurrentSlot && currentPopPercent !== null
      ? currentPopPercent
      : null;

    return {
      hour,
      label: formatTimelineHour(hour),
      tasks: tasksByHour[hour] ?? [],
      tone: resolveTimelineTone(tone, hour),
      isCurrentHour: isCurrentSlot,
      precipProbability: fallbackPop ?? hourlyPoint?.precipProbability ?? null,
      weatherCode: hourlyPoint?.weatherCode ?? null,
    };
  });
};

/**
 * Formata a data selecionada em pt-BR para exibição no painel lateral.
 *
 * Props:
 * - date: data selecionada.
 */
export const formatSidebarDateLabel = (date: Date): string => {
  return format(date, "EEEE, d 'de' MMMM", { locale: ptBR });
};
