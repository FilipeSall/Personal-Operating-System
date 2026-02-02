import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { WeatherRow, WeatherSnapshot, WeatherTip } from '../../../../types/weather';
import type { WeatherDerived, WeatherState } from '../../hooks/useWeather';
import { buildWeatherTips } from './weatherTips/buildWeatherTips';

export type WeatherViewModelInput = {
  state: WeatherState;
  derived: WeatherDerived;
};

export type WeatherViewModel = {
  updatedAtLabel: string | null;
  dateLabel: string;
  description: string;
  temperatureValue: number | null;
  tips: WeatherTip[];
};

/**
 * Formata o horario da ultima atualizacao do clima.
 */
export const formatUpdatedAtLabel = (lastUpdatedAt: Date | null): string | null => {
  if (!lastUpdatedAt) {
    return null;
  }
  return format(lastUpdatedAt, 'HH:mm', { locale: ptBR });
};

/**
 * Formata a data selecionada no calendario.
 */
export const formatSelectedDateLabel = (selectedDate: Date): string => {
  return format(selectedDate, "d 'de' MMM", { locale: ptBR });
};

/**
 * Localiza a linha de resumo dentro das métricas do clima.
 */
export const getSummaryRow = (rows: WeatherRow[]): WeatherRow | undefined => {
  return rows.find((row) => row.id === 'summary');
};

type WeatherSummaryTexts = {
  description: string;
};

/**
 * Gera os textos de descricao e recomendacao com valores padrao.
 */
export const getSummaryTexts = (summaryRow?: WeatherRow): WeatherSummaryTexts => {
  return {
    description: summaryRow?.value ?? 'Sem descricao',
  };
};

/**
 * Calcula o valor exibido na temperatura principal.
 */
export const getTemperatureValue = (snapshot: WeatherSnapshot | null): number | null => {
  if (!snapshot) {
    return null;
  }

  return Math.round(snapshot.temperature.current);
};

/**
 * Monta o modelo de dados usado pela view do clima.
 */
export const buildWeatherViewModel = ({
  state,
  derived,
}: WeatherViewModelInput): WeatherViewModel => {
  const updatedAtLabel = formatUpdatedAtLabel(state.lastUpdatedAt);
  const dateLabel = formatSelectedDateLabel(state.selectedDate);
  const summaryRow = getSummaryRow(derived.rows);
  const { description } = getSummaryTexts(summaryRow);
  const temperatureValue = getTemperatureValue(derived.snapshot);
  const tips = derived.snapshot
    ? buildWeatherTips({ snapshot: derived.snapshot, selectedDate: state.selectedDate })
    : [];

  return {
    updatedAtLabel,
    dateLabel,
    description,
    temperatureValue,
    tips,
  };
};
