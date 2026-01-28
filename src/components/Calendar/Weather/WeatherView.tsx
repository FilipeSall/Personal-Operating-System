import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { ReactNode } from 'react';
import {
  MdAir,
  MdDeviceThermostat,
  MdFilterDrama,
  MdGrain,
  MdOpacity,
  MdShield,
  MdThermostat,
  MdUmbrella,
  MdWarning,
  MdWbCloudy,
  MdWbTwilight,
} from 'react-icons/md';
import type { WeatherRowId } from '../../../types/weather';
import type { WeatherDerived, WeatherState } from '../hooks/useWeather';
import {
  weatherSection,
  weatherHeader,
  weatherTitle,
  weatherMeta,
  weatherSubtitle,
  weatherStatus,
  weatherTableWrapper,
  weatherTable,
  weatherHeadCell,
  weatherRow,
  weatherLabelCell,
  weatherValueCell,
  weatherRecommendationCell,
  weatherIcon,
  weatherLabel,
} from './weather.styles';

const WEATHER_ICONS: Record<WeatherRowId, ReactNode> = {
  summary: <MdWbCloudy size={18} />,
  temperature: <MdThermostat size={18} />,
  feelsLike: <MdDeviceThermostat size={18} />,
  rainChance: <MdUmbrella size={18} />,
  wind: <MdAir size={18} />,
  humidity: <MdOpacity size={18} />,
  uvIndex: <MdShield size={18} />,
  clouds: <MdFilterDrama size={18} />,
  sunTimes: <MdWbTwilight size={18} />,
  alerts: <MdWarning size={18} />,
  precipitation: <MdGrain size={18} />,
};

type WeatherViewProps = {
  state: WeatherState;
  derived: WeatherDerived;
};

/**
 * View do componente de clima, renderiza a tabela com recomendacoes.
 */
export function WeatherView({ state, derived }: WeatherViewProps) {
  const updatedAtLabel = state.lastUpdatedAt
    ? format(state.lastUpdatedAt, 'HH:mm', { locale: ptBR })
    : null;

  return (
    <section className={weatherSection}>
      <header className={weatherHeader}>
        <div className={weatherMeta}>
          <h3 className={weatherTitle}>
            Clima — {format(state.selectedDate, "d 'de' MMM", { locale: ptBR })}
          </h3>
          <p className={weatherSubtitle}>{state.locationLabel}</p>
        </div>
        {updatedAtLabel && (
          <p className={weatherSubtitle}>Atualizado {updatedAtLabel}</p>
        )}
      </header>

      {state.isLoading && !derived.hasData && (
        <div className={weatherStatus}>Carregando clima...</div>
      )}

      {state.error && <div className={weatherStatus}>{state.error}</div>}

      {!state.isLoading && !state.error && !derived.hasData && (
        <div className={weatherStatus}>Previsao indisponivel para esta data.</div>
      )}

      {derived.hasData && !state.error && (
        <div className={weatherTableWrapper}>
          <table className={weatherTable}>
            <thead>
              <tr>
                <th className={weatherHeadCell}>Dado</th>
                <th className={weatherHeadCell}>Valor</th>
                <th className={weatherHeadCell}>Recomendacao</th>
              </tr>
            </thead>
            <tbody>
              {derived.rows.map((row) => (
                <tr key={row.id} className={weatherRow}>
                  <td className={weatherLabelCell}>
                    <span className={weatherIcon}>{WEATHER_ICONS[row.id]}</span>
                    <span className={weatherLabel}>{row.label}</span>
                  </td>
                  <td className={weatherValueCell}>{row.value}</td>
                  <td className={weatherRecommendationCell}>{row.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
