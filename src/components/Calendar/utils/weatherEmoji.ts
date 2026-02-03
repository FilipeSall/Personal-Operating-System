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
 * Retorna uma Promise com o JSON do Lottie (dynamic import para code splitting).
 * PRIORIDADE: Temperatura extrema > Descrição do clima > Temperatura fallback
 */
export const resolveWeatherEmoji = (snapshot: WeatherSnapshot | null): Promise<unknown> => {
  if (!snapshot) {
    return import('../../../assets/emojis/sunny.json').then(m => m.default);
  }

  if (snapshot.temperature.current >= 30) {
    return import('../../../assets/emojis/hot.json').then(m => m.default);
  }

  if (snapshot.temperature.current <= 15) {
    return import('../../../assets/emojis/cold.json').then(m => m.default);
  }

  const normalized = normalizeWeatherDescription(snapshot.description);

  if (RAIN_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return import('../../../assets/emojis/rain.json').then(m => m.default);
  }

  if (SNOW_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return import('../../../assets/emojis/cold.json').then(m => m.default);
  }

  if (ATMOSPHERE_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return import('../../../assets/emojis/atmosphere.json').then(m => m.default);
  }

  if (CLOUD_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return import('../../../assets/emojis/clound.json').then(m => m.default);
  }

  if (SUNNY_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return import('../../../assets/emojis/sunny.json').then(m => m.default);
  }

  return import('../../../assets/emojis/sunny.json').then(m => m.default);
};
