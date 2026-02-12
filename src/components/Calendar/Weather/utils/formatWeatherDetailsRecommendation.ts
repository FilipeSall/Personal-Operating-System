import type { WeatherRowId } from '../../../../types/weather';

export type FormatWeatherDetailsRecommendationInput = {
  recommendation: string;
  rowId: WeatherRowId;
  selectedDate: Date;
};

/**
 * Normaliza para o início do dia local.
 * @param date Data de referência.
 * @returns Data truncada para o início do dia.
 */
const getStartOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

/**
 * Indica se a data selecionada é futura em relação ao dia atual.
 * @param selectedDate Data selecionada no calendário.
 * @param now Data/hora atual.
 * @returns `true` quando a data é futura.
 */
const isFutureLocalDay = (selectedDate: Date, now: Date): boolean => {
  return getStartOfDay(selectedDate).getTime() > getStartOfDay(now).getTime();
};

/**
 * Deixa a primeira letra minúscula para encaixar após prefixo.
 * @param text Texto de entrada.
 * @returns Texto com primeira letra minúscula.
 */
const lowercaseFirst = (text: string): string => {
  if (!text) {
    return text;
  }
  return text.charAt(0).toLowerCase() + text.slice(1);
};

/**
 * Ajusta referências temporais de "agora/hoje" para contexto de previsão.
 * @param text Texto base da recomendação.
 * @returns Texto com referências temporais neutras para futuro.
 */
const replaceTemporalReferences = (text: string): string => {
  return text
    .replace(/\bagora\b/gi, 'nessa data')
    .replace(/\bhoje\b/gi, 'nessa data')
    .replace(/\bmais tarde\b/gi, 'ao longo desse dia');
};

/**
 * Formata a recomendação do modal para contexto de data futura.
 * @param input Dados necessários para formatação da recomendação.
 * @param input.recommendation Recomendação original no tempo presente.
 * @param input.rowId Identificador da linha de clima.
 * @param input.selectedDate Data selecionada no calendário.
 * @returns Recomendação adequada ao contexto da data selecionada.
 */
export const formatWeatherDetailsRecommendation = ({
  recommendation,
  rowId,
  selectedDate,
}: FormatWeatherDetailsRecommendationInput): string => {
  if (!isFutureLocalDay(selectedDate, new Date())) {
    return recommendation;
  }

  const normalized = replaceTemporalReferences(recommendation);

  if (rowId === 'rainChance') {
    if (/chovendo nessa data/i.test(normalized)) {
      return 'Há previsão de chuva nessa data. Leve proteção e prefira trajetos cobertos.';
    }
    if (/neve nessa data/i.test(normalized)) {
      return 'Há previsão de neve nessa data. Redobre o cuidado com o piso e use calçado aderente.';
    }
  }

  if (rowId === 'alerts' && /tem alerta rolando/i.test(normalized)) {
    return 'Há alertas previstos para essa data. Siga as orientações oficiais e evite exposição a risco.';
  }

  const hasForecastTone =
    /\b(previs[aã]o|previst[ao]|vai|deve)\b/i.test(normalized);

  if (hasForecastTone) {
    return normalized;
  }

  return `Para essa data, ${lowercaseFirst(normalized)}`;
};
