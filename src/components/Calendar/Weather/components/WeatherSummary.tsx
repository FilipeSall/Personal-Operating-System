import type { WeatherSnapshot } from '../../../../types/weather';
import { weatherSummary } from '../CSS/WeatherSummary.styles';
import { WeatherSummaryEmoji } from './WeatherSummaryEmoji';
import { WeatherSummaryInfo } from './WeatherSummaryInfo';

type WeatherSummaryProps = {
  state: {
    locationLabel: string;
    isLoading: boolean;
    updatedAtLabel: string | null;
  };
  derived: {
    snapshot: WeatherSnapshot | null;
    description: string;
    dateLabel: string;
    temperatureValue: number | null;
  };
  actions: {
    refreshWeather: () => Promise<void>;
  };
};

/**
 * Painel que exibe o resumo principal do clima (emoji, temperatura e local).
 */
export function WeatherSummary({
  state,
  derived,
  actions,
}: WeatherSummaryProps) {
  return (
    <div className={weatherSummary}>
      <WeatherSummaryEmoji
        state={{ isLoading: state.isLoading, updatedAtLabel: state.updatedAtLabel }}
        derived={{
          snapshot: derived.snapshot,
          description: derived.description,
          dateLabel: derived.dateLabel,
        }}
        actions={{ refreshWeather: actions.refreshWeather }}
      />
      <WeatherSummaryInfo
        snapshot={derived.snapshot}
        temperatureValue={derived.temperatureValue}
        description={derived.description}
        locationLabel={state.locationLabel}
      />
    </div>
  );
}
