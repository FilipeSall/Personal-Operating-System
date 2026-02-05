import type { WeatherActions, WeatherDerived, WeatherState } from '../hooks/useWeather';
import { useMemo } from 'react';
import {
  weatherDecorBottom,
  weatherDecorTop,
  weatherPanel,
  weatherSection,
  weatherTop,
} from './CSS/WeatherView.styles';
import { useWeatherUiStore } from '../../../store/useWeatherUiStore';
import { getWeatherStatusState } from './utils/getWeatherStatusMessage';
import { buildWeatherViewModel } from './utils/weatherViewModel';
import { WeatherSummary } from './components/WeatherSummary';
import { WeatherTipPanel } from './components/WeatherTipPanel';
import { WeatherStatusCard } from './components/WeatherStatusCard';

type WeatherViewProps = {
  state: WeatherState;
  derived: WeatherDerived;
  actions: WeatherActions;
};

/**
 * View do componente de clima, renderiza o resumo com metricas e dica do dia.
 */
export function WeatherView({ state, derived, actions }: WeatherViewProps) {
  const openDetails = useWeatherUiStore((store) => store.openDetails);

  const {
    updatedAtLabel,
    dateLabel,
    description,
    temperatureValue,
    tips,
  } = useMemo(
    () => buildWeatherViewModel({ state, derived }),
    [state, derived]
  );

  const statusState = useMemo(
    () => getWeatherStatusState(state, derived),
    [state, derived]
  );

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
                state={{
                  locationLabel: state.locationLabel,
                  isLoading: state.isLoading,
                  updatedAtLabel,
                }}
                derived={{
                  snapshot: derived.snapshot,
                  description,
                  dateLabel,
                  temperatureValue,
                }}
                actions={{ refreshWeather: actions.refreshWeather }}
              />
              <WeatherTipPanel
                tips={tips}
                canOpenDetails={Boolean(derived.snapshot)}
                onOpenDetails={() => {
                  if (!derived.snapshot) return;
                  openDetails();
                }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
