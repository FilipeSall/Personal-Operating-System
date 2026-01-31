import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { WeatherRow, WeatherSnapshot } from '../../../../types/weather';
import type { WeatherDerived, WeatherState } from '../../hooks/useWeather';

export type WeatherViewModelInput = {
  state: WeatherState;
  derived: WeatherDerived;
};

export type WeatherViewModel = {
  updatedAtLabel: string | null;
  dateLabel: string;
  description: string;
  recommendation: string;
  temperatureValue: number | null;
  humidityValue: string;
  windValue: string;
  uvValue: string;
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
  recommendation: string;
};

/**
 * Gera os textos de descricao e recomendacao com valores padrao.
 */
export const getSummaryTexts = (summaryRow?: WeatherRow): WeatherSummaryTexts => {
  return {
    description: summaryRow?.value ?? 'Sem descricao',
    recommendation: summaryRow?.recommendation ?? 'Sem recomendacao disponivel.',
  };
};

type WeatherMetricValues = {
  temperatureValue: number | null;
  humidityValue: string;
  windValue: string;
  uvValue: string;
};

/**
 * Calcula os valores exibidos nas metricas do painel.
 */
export const getMetricValues = (snapshot: WeatherSnapshot | null): WeatherMetricValues => {
  if (!snapshot) {
    return {
      temperatureValue: null,
      humidityValue: '--',
      windValue: '--',
      uvValue: '--',
    };
  }

  return {
    temperatureValue: Math.round(snapshot.temperature.current),
    humidityValue: `${Math.round(snapshot.humidity)}%`,
    windValue: `${Math.round(snapshot.wind.speed * 3.6)} km/h`,
    uvValue: snapshot.uvIndex.toFixed(1),
  };
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
  const { description, recommendation } = getSummaryTexts(summaryRow);
  const { temperatureValue, humidityValue, windValue, uvValue } = getMetricValues(derived.snapshot);

  return {
    updatedAtLabel,
    dateLabel,
    description,
    recommendation,
    temperatureValue,
    humidityValue,
    windValue,
    uvValue,
  };
};
