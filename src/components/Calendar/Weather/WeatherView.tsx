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
import { buildWeatherViewModel } from './utils/weatherViewModel';
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
  const {
    updatedAtLabel,
    dateLabel,
    description,
    recommendation,
    temperatureValue,
    humidityValue,
    windValue,
    uvValue,
  } = buildWeatherViewModel({ state, derived });

  const statusMessage = getWeatherStatusMessage(state, derived);

  return (
    <section className={weatherSection}>
      <div className={weatherPanel}>
        {/*Decorações de bolinhas */}
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
