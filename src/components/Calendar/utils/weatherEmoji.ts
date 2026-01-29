import atmosphereEmoji from '../../../assets/emojis/atmosphere.json';
import cloundEmoji from '../../../assets/emojis/clound.json';
import coldEmoji from '../../../assets/emojis/cold.json';
import hotEmoji from '../../../assets/emojis/hot.json';
import rainEmoji from '../../../assets/emojis/rain.json';
import sunnyEmoji from '../../../assets/emojis/sunny.json';
import type { WeatherSnapshot } from '../../../types/weather';

const RAIN_KEYWORDS = ['chuva', 'garoa', 'tempestade', 'trovoada'];
const CLOUD_KEYWORDS = ['nublado', 'nuvens', 'cloud'];
const ATMOSPHERE_KEYWORDS = ['nevoa', 'neblina', 'bruma', 'fumaca', 'poeira', 'areia', 'cinzas', 'tornado', 'nevoeiro'];
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
 * PRIORIDADE: Temperatura extrema > Descrição do clima > Temperatura fallback
 */
export const resolveWeatherEmoji = (snapshot: WeatherSnapshot | null) => {
  if (!snapshot) {
    return sunnyEmoji;
  }

  // PRIORIDADE 1: Temperatura extrema (independente da descrição)
  if (snapshot.temperature.current >= 30) {
    return hotEmoji;
  }

  if (snapshot.temperature.current <= 15) {
    return coldEmoji;
  }

  // PRIORIDADE 2: Descrição do clima (quando temperatura está entre 15-30°C)
  const normalized = normalizeWeatherDescription(snapshot.description);

  if (RAIN_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return rainEmoji;
  }

  if (SNOW_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return coldEmoji;
  }

  if (ATMOSPHERE_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return atmosphereEmoji;
  }

  if (CLOUD_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return cloundEmoji;
  }

  if (SUNNY_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return sunnyEmoji;
  }

  // PRIORIDADE 3: Fallback padrão
  return sunnyEmoji;
};
