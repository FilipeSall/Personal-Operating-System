import type { WeatherActions, WeatherDerived, WeatherState } from '../hooks/useWeather';
import {
  weatherDecorBottom,
  weatherDecorTop,
  weatherPanel,
  weatherSection,
  weatherTop,
} from './CSS/WeatherView.styles';
import { getWeatherStatusState } from './utils/getWeatherStatusMessage';
import { buildWeatherViewModel } from './utils/weatherViewModel';
import { WeatherFooter } from './components/WeatherFooter';
import { WeatherSummary } from './components/WeatherSummary';
import { WeatherTipPanel } from './components/WeatherTipPanel';
import { WeatherStatusCard } from './components/WeatherStatusCard';

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
    temperatureValue,
    tips,
  } = buildWeatherViewModel({ state, derived });

  const statusState = getWeatherStatusState(state, derived);

  return (
    <section className={weatherSection}>
      <div className={weatherPanel}>
        {/*Decorações de bolinhas */}
        <div className={weatherDecorTop} />
        <div className={weatherDecorBottom} />

        {statusState ? (
          <WeatherStatusCard status={statusState} />
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
              <WeatherTipPanel tips={tips} />
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
