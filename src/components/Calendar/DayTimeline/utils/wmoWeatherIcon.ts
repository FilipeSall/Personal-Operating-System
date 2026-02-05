import { createElement } from 'react';
import type { IconType } from 'react-icons';
import { WiCloudy, WiDaySunny, WiNightClear, WiRain, WiSnow } from 'react-icons/wi';

export type WeatherTone = 'sunny' | 'cloudy' | 'rain' | 'cold' | 'night';

type WmoMapping = {
  tone: WeatherTone;
  emoji: string;
  label: string;
};

export const TONE_ICON_MAP: Record<WeatherTone, IconType> = {
  sunny: WiDaySunny,
  cloudy: WiCloudy,
  rain: WiRain,
  cold: WiSnow,
  night: WiNightClear,
};

const WMO_MAP: Record<number, WmoMapping> = {
  0: { tone: 'sunny', emoji: '☀️', label: 'Ceu limpo' },
  1: { tone: 'sunny', emoji: '🌤️', label: 'Parcialmente limpo' },
  2: { tone: 'cloudy', emoji: '⛅', label: 'Parcialmente nublado' },
  3: { tone: 'cloudy', emoji: '☁️', label: 'Nublado' },
  45: { tone: 'cloudy', emoji: '🌫️', label: 'Nevoa' },
  48: { tone: 'cloudy', emoji: '🌫️', label: 'Nevoa' },
  51: { tone: 'rain', emoji: '🌧️', label: 'Garoa leve' },
  53: { tone: 'rain', emoji: '🌧️', label: 'Garoa moderada' },
  55: { tone: 'rain', emoji: '🌧️', label: 'Garoa forte' },
  56: { tone: 'rain', emoji: '🌧️', label: 'Garoa congelante' },
  57: { tone: 'rain', emoji: '🌧️', label: 'Garoa congelante' },
  61: { tone: 'rain', emoji: '🌧️', label: 'Chuva leve' },
  63: { tone: 'rain', emoji: '🌧️', label: 'Chuva moderada' },
  65: { tone: 'rain', emoji: '🌧️', label: 'Chuva forte' },
  66: { tone: 'rain', emoji: '🌧️', label: 'Chuva congelante' },
  67: { tone: 'rain', emoji: '🌧️', label: 'Chuva congelante' },
  71: { tone: 'cold', emoji: '🌨️', label: 'Neve leve' },
  73: { tone: 'cold', emoji: '🌨️', label: 'Neve moderada' },
  75: { tone: 'cold', emoji: '❄️', label: 'Neve forte' },
  77: { tone: 'cold', emoji: '❄️', label: 'Graos de neve' },
  80: { tone: 'rain', emoji: '🌦️', label: 'Pancadas leves' },
  81: { tone: 'rain', emoji: '🌦️', label: 'Pancadas moderadas' },
  82: { tone: 'rain', emoji: '⛈️', label: 'Pancadas fortes' },
  85: { tone: 'cold', emoji: '🌨️', label: 'Neve leve' },
  86: { tone: 'cold', emoji: '❄️', label: 'Neve forte' },
  95: { tone: 'rain', emoji: '⛈️', label: 'Trovoada' },
  96: { tone: 'rain', emoji: '⛈️', label: 'Trovoada com granizo' },
  99: { tone: 'rain', emoji: '⛈️', label: 'Trovoada forte' },
};

const DEFAULT_MAPPING: WmoMapping = {
  tone: 'cloudy',
  emoji: '☁️',
  label: 'Desconhecido',
};

/**
 * Retorna o mapeamento base do codigo WMO.
 *
 * @param code Codigo do Open-Meteo.
 */
export const getWmoMapping = (code: number): WmoMapping => {
  return WMO_MAP[code] ?? DEFAULT_MAPPING;
};

/**
 * Ajusta o tom para horario noturno (quando aplicavel).
 *
 * @param tone Tom base do WMO.
 * @param hour Hora local do slot.
 * @param precipProbability Probabilidade de precipitacao (0-100).
 */
export const adjustToneForNight = (
  tone: WeatherTone,
  hour: number,
  precipProbability?: number | null
): WeatherTone => {
  // Se a probabilidade de chuva for alta, sempre mostra icone de chuva
  if (precipProbability !== undefined && precipProbability !== null && precipProbability >= 60) {
    return 'rain';
  }

  const isNight = hour < 6 || hour >= 18;
  if (isNight && tone === 'sunny') {
    return 'night';
  }
  return tone;
};

/**
 * Retorna o icone padrao para um tom de clima.
 *
 * @param tone Tom do clima.
 */
export const getWeatherToneIcon = (tone: WeatherTone): IconType => {
  return TONE_ICON_MAP[tone];
};

type WeatherToneIconProps = {
  tone: WeatherTone;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

/**
 * Componente que renderiza o icone do clima baseado no tom.
 */
export const WeatherToneIcon = ({ tone, className, 'aria-hidden': ariaHidden }: WeatherToneIconProps) => {
  return createElement(TONE_ICON_MAP[tone], { className, 'aria-hidden': ariaHidden });
};
