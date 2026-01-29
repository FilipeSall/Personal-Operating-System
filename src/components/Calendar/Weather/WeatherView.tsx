import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Lottie from 'lottie-react';
import {
  MdAir,
  MdArrowForward,
  MdLocationOn,
  MdOpacity,
  MdRefresh,
  MdShield,
  MdUmbrella,
} from 'react-icons/md';
import type { WeatherActions, WeatherDerived, WeatherState } from '../hooks/useWeather';
import { resolveWeatherEmoji } from '../utils/weatherEmoji';
import {
  weatherSection,
  weatherPanel,
  weatherDecorTop,
  weatherDecorBottom,
  weatherTop,
  weatherSummary,
  weatherEmojiWrapper,
  weatherEmoji,
  weatherSummaryText,
  weatherDateBadge,
  weatherTemperatureRow,
  weatherTemperatureValue,
  weatherTemperatureUnit,
  weatherConditionBadge,
  weatherLocationRow,
  weatherMetricsGrid,
  weatherMetricCard,
  weatherMetricIcon,
  weatherMetricLabel,
  weatherMetricValue,
  weatherTipCard,
  weatherTipIcon,
  weatherTipHeader,
  weatherTipDot,
  weatherTipLabel,
  weatherTipText,
  weatherFooter,
  weatherRefreshGroup,
  weatherRefreshButton,
  weatherUpdatedLabel,
  weatherDetailsButton,
  weatherStatusCard,
} from './weather.styles';

type WeatherViewProps = {
  state: WeatherState;
  derived: WeatherDerived;
  actions: WeatherActions;
};

/**
 * View do componente de clima, renderiza o resumo com metricas e dica do dia.
 */
export function WeatherView({ state, derived, actions }: WeatherViewProps) {
  const updatedAtLabel = state.lastUpdatedAt
    ? format(state.lastUpdatedAt, 'HH:mm', { locale: ptBR })
    : null;
  const dateLabel = format(state.selectedDate, "d 'de' MMM", { locale: ptBR });
  const summaryRow = derived.rows.find((row) => row.id === 'summary');
  const temperatureValue = derived.snapshot
    ? Math.round(derived.snapshot.temperature.current)
    : null;
  const humidityValue = derived.snapshot
    ? `${Math.round(derived.snapshot.humidity)}%`
    : '--';
  const windValue = derived.snapshot
    ? `${Math.round(derived.snapshot.wind.speed * 3.6)} km/h`
    : '--';
  const uvValue = derived.snapshot ? derived.snapshot.uvIndex.toFixed(1) : '--';
  const statusMessage = state.error
    ? state.error
    : !derived.snapshot && state.isLoading
      ? 'Carregando clima...'
      : !derived.snapshot
        ? 'Previsao indisponivel para esta data.'
        : null;
  const description = summaryRow?.value ?? 'Sem descricao';
  const recommendation = summaryRow?.recommendation ?? 'Sem recomendacao disponivel.';

  return (
    <section className={weatherSection}>
      <div className={weatherPanel}>
        <div className={weatherDecorTop} />
        <div className={weatherDecorBottom} />

        {statusMessage ? (
          <div className={weatherStatusCard}>{statusMessage}</div>
        ) : (
          <>
            <div className={weatherTop}>
              <div className={weatherSummary}>
                <div className={weatherEmojiWrapper} role="img" aria-label={description}>
                  <Lottie
                    animationData={resolveWeatherEmoji(derived.snapshot)}
                    className={weatherEmoji}
                    loop
                    autoplay
                  />
                </div>
                <div className={weatherSummaryText}>
                  <span className={weatherDateBadge}>{dateLabel}</span>
                  <div className={weatherTemperatureRow}>
                    <span className={weatherTemperatureValue}>{temperatureValue}</span>
                    <span className={weatherTemperatureUnit}>°C</span>
                  </div>
                  <span className={weatherConditionBadge}>{description}</span>
                  <div className={weatherLocationRow}>
                    <MdLocationOn size={16} />
                    <span>{state.locationLabel}</span>
                  </div>
                </div>
              </div>

              <div className={weatherMetricsGrid}>
                <div className={weatherMetricCard({ tone: 'humidity' })}>
                  <div className={weatherMetricIcon({ tone: 'humidity' })}>
                    <MdOpacity size={18} />
                  </div>
                  <span className={weatherMetricLabel}>Umidade</span>
                  <span className={weatherMetricValue}>{humidityValue}</span>
                </div>
                <div className={weatherMetricCard({ tone: 'wind' })}>
                  <div className={weatherMetricIcon({ tone: 'wind' })}>
                    <MdAir size={18} />
                  </div>
                  <span className={weatherMetricLabel}>Vento</span>
                  <span className={weatherMetricValue}>{windValue}</span>
                </div>
                <div className={weatherMetricCard({ tone: 'uv' })}>
                  <div className={weatherMetricIcon({ tone: 'uv' })}>
                    <MdShield size={18} />
                  </div>
                  <span className={weatherMetricLabel}>UV</span>
                  <span className={weatherMetricValue}>{uvValue}</span>
                </div>
              </div>

              <div className={weatherTipCard}>
                <div className={weatherTipIcon}>
                  <MdUmbrella size={18} />
                </div>
                <div className={weatherTipHeader}>
                  <span className={weatherTipDot} />
                  <span className={weatherTipLabel}>Dica do dia</span>
                </div>
                <p className={weatherTipText}>{recommendation}</p>
              </div>
            </div>

            <div className={weatherFooter}>
              <div className={weatherRefreshGroup}>
                <button
                  type="button"
                  className={weatherRefreshButton}
                  onClick={actions.refreshWeather}
                  disabled={state.isLoading}
                  title="Atualizar"
                >
                  <MdRefresh size={20} />
                </button>
                {updatedAtLabel && (
                  <span className={weatherUpdatedLabel}>Atualizado as {updatedAtLabel}</span>
                )}
              </div>
              <button type="button" className={weatherDetailsButton} disabled={!derived.snapshot}>
                <span>Ver detalhes</span>
                <MdArrowForward size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
