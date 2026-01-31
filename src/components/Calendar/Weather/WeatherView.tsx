import type { WeatherActions, WeatherDerived, WeatherState } from '../hooks/useWeather';
import {
  weatherDecorBottom,
  weatherDecorTop,
  weatherPanel,
  weatherSection,
  weatherStatusCard,
  weatherTop,
} from './styles/WeatherView.styles';
import { getWeatherStatusMessage } from './utils/getWeatherStatusMessage';
import { buildWeatherViewModel } from './utils/weatherViewModel';
import { WeatherFooter } from './components/WeatherFooter';
import { WeatherMetricsPanel } from './components/WeatherMetricsPanel';
import { WeatherSummary } from './components/WeatherSummary';


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
              <WeatherMetricsPanel
                humidityValue={humidityValue}
                windValue={windValue}
                uvValue={uvValue}
                recommendation={recommendation}
              />
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
