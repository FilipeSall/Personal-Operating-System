import { format, fromUnixTime } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { WeatherSnapshot } from '../../../../types/weather';

const TEMPERATURE_CURRENT_REGEX = /Atual\s*([\d.,]+°C)/i;
const TEMPERATURE_MIN_REGEX = /Min\s*([\d.,]+°C)/i;
const TEMPERATURE_MAX_REGEX = /Max\s*([\d.,]+°C)/i;
const WIND_REGEX = /^([\d.,]+)\s*(km\/h)\s*•\s*(.+)$/i;
const UV_REGEX = /^([\d.,]+)\s*(.*)$/;
const PRECIPITATION_REGEX = /^(?:Chuva\s+|Neve\s+|Chuva .+ Neve .+ )?(\d+(?:[.,]\d+)?)\s*(mm)$/i;
const PRECIPITATION_PREFIX_REGEX = /^(Chuva|Neve|Chuva .+ Neve)\s+/i;

export type ParsedTemperatureRange = {
  currentTemp: string;
  minMaxStr: string | null;
};

export type ParsedSunTimes = {
  sunrise: string;
  sunset: string;
};

export type ParsedWindValue = {
  number: string;
  unit: string;
  direction: string;
};

export type ParsedUvValue = {
  value: string;
  level: string;
};

export type ParsedPrecipitationValue = {
  prefix: string;
  number: string;
  unit: string;
};

/**
 * Formata a data selecionada para o cabeçalho do modal.
 * @param selectedDate Data selecionada no calendário.
 * @returns Data formatada para exibição.
 */
export const formatWeatherDetailsDateLabel = (selectedDate: Date): string => {
  return format(selectedDate, "d 'de' MMMM", { locale: ptBR });
};

/**
 * Extrai temperatura atual e faixa min/max da string da métrica.
 * @param temperatureRangeStr Valor textual da linha de temperatura.
 * @returns Temperatura atual e faixa mínima/máxima.
 */
export const parseTemperatureRange = (temperatureRangeStr: string): ParsedTemperatureRange => {
  const currentMatch = temperatureRangeStr.match(TEMPERATURE_CURRENT_REGEX);
  const minMatch = temperatureRangeStr.match(TEMPERATURE_MIN_REGEX);
  const maxMatch = temperatureRangeStr.match(TEMPERATURE_MAX_REGEX);

  const currentTemp = currentMatch?.[1] ?? temperatureRangeStr;
  const minMaxStr =
    minMatch && maxMatch ? `Min ${minMatch[1]} • Max ${maxMatch[1]}` : null;

  return { currentTemp, minMaxStr };
};

/**
 * Formata nascer e pôr do sol a partir do snapshot.
 * @param snapshot Snapshot diário de clima.
 * @returns Horários formatados ou `null` quando não houver snapshot.
 */
export const formatSunTimes = (snapshot: WeatherSnapshot | null): ParsedSunTimes | null => {
  if (!snapshot) {
    return null;
  }

  return {
    sunrise: format(fromUnixTime(snapshot.sunrise), 'HH:mm', { locale: ptBR }),
    sunset: format(fromUnixTime(snapshot.sunset), 'HH:mm', { locale: ptBR }),
  };
};

/**
 * Extrai número, unidade e direção da métrica de vento.
 * @param windStr Valor textual da linha de vento.
 * @returns Partes estruturadas do valor de vento.
 */
export const parseWindValue = (windStr: string): ParsedWindValue => {
  const match = windStr.match(WIND_REGEX);

  if (!match) {
    return { number: windStr, unit: '', direction: '' };
  }

  return { number: match[1], unit: match[2], direction: match[3] };
};

/**
 * Extrai valor e nível textual da métrica de índice UV.
 * @param uvStr Valor textual da linha de UV.
 * @returns Valor numérico e classificação textual do UV.
 */
export const parseUvValue = (uvStr: string): ParsedUvValue => {
  const match = uvStr.match(UV_REGEX);

  if (!match) {
    return { value: uvStr, level: '' };
  }

  const level = match[2]?.trim() ?? '';

  return { value: match[1], level };
};

/**
 * Extrai prefixo textual, número e unidade da métrica de precipitação.
 * @param precipitationStr Valor textual da linha de precipitação.
 * @returns Prefixo, valor e unidade já separados.
 */
export const parsePrecipitationValue = (
  precipitationStr: string
): ParsedPrecipitationValue => {
  const match = precipitationStr.match(PRECIPITATION_REGEX);

  if (!match) {
    return { prefix: '', number: precipitationStr, unit: '' };
  }

  const prefix = precipitationStr.match(PRECIPITATION_PREFIX_REGEX)?.[1] ?? '';

  return {
    prefix,
    number: match[1],
    unit: match[2],
  };
};
