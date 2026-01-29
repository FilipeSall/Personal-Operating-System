import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  MdAir,
  MdOpacity,
  MdShield,
} from 'react-icons/md';
import type { WeatherActions, WeatherDerived, WeatherState } from '../hooks/useWeather';
import {
  weatherDecorBottom,
  weatherDecorTop,
  weatherMetricsGrid,
  weatherMetricsTipWrapper,
  weatherMetricCard,
  weatherMetricIcon,
  weatherMetricLabel,
  weatherMetricValue,
  weatherPanel,
  weatherSection,
  weatherStatusCard,
  weatherTop,
} from './weather.styles';
import { getWeatherStatusMessage } from './utils/getWeatherStatusMessage';
import { WeatherFooter } from './components/WeatherFooter';
import { WeatherSummary } from './components/WeatherSummary';
import { WeatherTipPanel } from './components/WeatherTipPanel';


type WeatherViewProps = {
  state: WeatherState;
  derived: WeatherDerived;
  actions: WeatherActions;
  onOpenDetails: () => void;
};

/**
 * View do componente de clima, renderiza o resumo com metricas e dica do dia.
 */
export function WeatherView({ state, derived, actions, onOpenDetails }: WeatherViewProps) {
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

  const statusMessage = getWeatherStatusMessage(state, derived);
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
              <WeatherSummary
                snapshot={derived.snapshot}
                description={description}
                dateLabel={dateLabel}
                temperatureValue={temperatureValue}
                locationLabel={state.locationLabel}
              />
              <div className={weatherMetricsTipWrapper}>
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
                <WeatherTipPanel recommendation={recommendation} />
              </div>
            </div>

            <WeatherFooter
              actions={actions}
              derived={derived}
              state={state}
              onOpenDetails={onOpenDetails}
              updatedAtLabel={updatedAtLabel}
            />
          </>
        )}
      </div>
    </section>
  );
}
