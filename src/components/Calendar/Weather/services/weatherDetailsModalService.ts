import type { WeatherRow } from '../../../../types/weather';
import type {
  WeatherDetailsCardViewModel,
  WeatherDetailsDefaultCard,
  WeatherDetailsModalServiceInput,
  WeatherDetailsModalViewModel,
} from '../../types/weatherDetailsModal';
import {
  formatSunTimes,
  formatWeatherDetailsDateLabel,
  parsePrecipitationValue,
  parseTemperatureRange,
  parseUvValue,
  parseWindValue,
} from '../utils/weatherDetailsModalParsers';
import { formatWeatherDetailsRecommendation } from '../utils/formatWeatherDetailsRecommendation';

/**
 * Cria o modelo final de dados consumido pela view do modal de detalhes do clima.
 * @param params Estado e dados derivados do clima.
 * @param params.state Estado base do clima.
 * @param params.derived Dados derivados do clima.
 * @returns Modelo completo do modal pronto para renderização.
 */
export const buildWeatherDetailsModalViewModel = ({
  state,
  derived,
}: WeatherDetailsModalServiceInput): WeatherDetailsModalViewModel => {
  return {
    dateLabel: formatWeatherDetailsDateLabel(state.selectedDate),
    locationLabel: state.locationLabel,
    hasData: derived.rows.length > 0,
    cards: derived.rows.map((row) =>
      buildWeatherDetailsCard(row, derived, state.selectedDate)
    ),
  };
};

/**
 * Transforma uma linha de métrica em um card tipado de exibição.
 * @param row Linha da tabela de métricas do clima.
 * @param derived Dados derivados de clima usados em cards compostos.
 * @param selectedDate Data selecionada no calendário.
 * @returns Card pronto para exibição na UI.
 */
export const buildWeatherDetailsCard = (
  row: WeatherRow,
  derived: WeatherDetailsModalServiceInput['derived'],
  selectedDate: Date
): WeatherDetailsCardViewModel => {
  const recommendation = formatWeatherDetailsRecommendation({
    recommendation: row.recommendation,
    rowId: row.id,
    selectedDate,
  });

  switch (row.id) {
    case 'temperature': {
      const parsed = parseTemperatureRange(row.value);

      return {
        id: row.id,
        label: row.label,
        recommendation,
        variant: 'temperature',
        currentTemp: parsed.currentTemp,
        minMaxStr: parsed.minMaxStr,
      };
    }
    case 'sunTimes': {
      const sunTimes = formatSunTimes(derived.snapshot);

      if (!sunTimes) {
        return buildDefaultCard(row, recommendation);
      }

      return {
        id: row.id,
        label: row.label,
        recommendation,
        variant: 'sunTimes',
        sunrise: sunTimes.sunrise,
        sunset: sunTimes.sunset,
      };
    }
    case 'wind': {
      const parsed = parseWindValue(row.value);

      return {
        id: row.id,
        label: row.label,
        recommendation,
        variant: 'wind',
        number: parsed.number,
        unit: parsed.unit,
        direction: parsed.direction,
      };
    }
    case 'uvIndex': {
      const parsed = parseUvValue(row.value);

      return {
        id: row.id,
        label: row.label,
        recommendation,
        variant: 'uvIndex',
        value: parsed.value,
        level: parsed.level,
      };
    }
    case 'alerts':
      return {
        id: row.id,
        label: row.label,
        recommendation,
        variant: 'alerts',
        value: row.value,
        hasAlerts: row.value !== 'Sem alertas',
      };
    case 'precipitation': {
      const parsed = parsePrecipitationValue(row.value);

      return {
        id: row.id,
        label: row.label,
        recommendation,
        variant: 'precipitation',
        prefix: parsed.prefix,
        number: parsed.number,
        unit: parsed.unit,
      };
    }
    default:
      return buildDefaultCard(row, recommendation);
  }
};

/**
 * Cria o modelo padrão para linhas sem tratamento especializado.
 * @param row Linha da tabela de métricas.
 * @param recommendation Recomendação já ajustada para o contexto da data.
 * @returns Card default com o valor original da linha.
 */
export const buildDefaultCard = (
  row: WeatherRow,
  recommendation: string
): WeatherDetailsDefaultCard => {
  return {
    id: row.id,
    label: row.label,
    recommendation,
    variant: 'default',
    value: row.value,
  };
};
