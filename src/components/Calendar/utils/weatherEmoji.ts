import cloundEmoji from '../../../assets/emojis/clound.json';
import coldEmoji from '../../../assets/emojis/cold.json';
import hotEmoji from '../../../assets/emojis/hot.json';
import rainEmoji from '../../../assets/emojis/rain.json';
import sunnyEmoji from '../../../assets/emojis/sunny.json';
import type { WeatherSnapshot } from '../../../types/weather';

const RAIN_KEYWORDS = ['chuva', 'garoa', 'tempestade', 'trovoada'];
const CLOUD_KEYWORDS = ['nublado', 'nuvens', 'nevoa', 'neblina', 'cloud'];
const SUNNY_KEYWORDS = ['sol', 'ensolarado', 'ceu limpo', 'limpo'];
const SNOW_KEYWORDS = ['neve', 'granizo'];

/**
 * Normaliza a descricao do clima para comparacoes simples (sem acentos).
 */
const normalizeWeatherDescription = (value: string): string => {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
};

/**
 * Resolve o emoji animado que melhor representa o clima atual.
 */
export const resolveWeatherEmoji = (snapshot: WeatherSnapshot | null) => {
  if (!snapshot) {
    return sunnyEmoji;
  }

  const normalized = normalizeWeatherDescription(snapshot.description);

  if (RAIN_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return rainEmoji;
  }

  if (SNOW_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return coldEmoji;
  }

  if (CLOUD_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return cloundEmoji;
  }

  if (SUNNY_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return sunnyEmoji;
  }

  if (snapshot.temperature.current >= 30) {
    return hotEmoji;
  }

  if (snapshot.temperature.current <= 12) {
    return coldEmoji;
  }

  return sunnyEmoji;
};
