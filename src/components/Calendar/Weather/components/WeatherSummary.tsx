import type { WeatherSnapshot } from '../../../../types/weather';
import { weatherSummary } from '../CSS/WeatherSummary.styles';
import { WeatherSummaryEmoji } from './WeatherSummaryEmoji';
import { WeatherSummaryInfo } from './WeatherSummaryInfo';

type WeatherSummaryProps = {
  snapshot: WeatherSnapshot | null;
  description: string;
  dateLabel: string;
  temperatureValue: number | null;
  locationLabel: string;
};

/**
 * Painel que exibe o resumo principal do clima (emoji, temperatura e local).
 */
export function WeatherSummary({
  snapshot,
  description,
  dateLabel,
  temperatureValue,
  locationLabel,
}: WeatherSummaryProps) {
  return (
    <div className={weatherSummary}>
      <WeatherSummaryEmoji snapshot={snapshot} description={description} />
      <WeatherSummaryInfo
        dateLabel={dateLabel}
        temperatureValue={temperatureValue}
        description={description}
        locationLabel={locationLabel}
      />
    </div>
  );
}
