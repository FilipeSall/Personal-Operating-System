import { MdLocationOn } from 'react-icons/md';
import type { WeatherSnapshot } from '../../../../types/weather';
import {
  weatherSummaryText,
  weatherTemperatureRow,
  weatherTemperatureValue,
  weatherTemperatureUnit,
  weatherConditionBadge,
  weatherLocationRow,
  weatherLocationIcon,
} from '../CSS/WeatherSummary.styles';
import { buildWeatherTags } from '../utils/weatherTags';
import { WeatherTagsRow } from './WeatherTagsRow';

type WeatherSummaryInfoProps = {
  snapshot: WeatherSnapshot | null;
  temperatureValue: number | null;
  description: string;
  locationLabel: string;
};

/**
 * Exibe temperatura, condição, localização e tags contextuais do resumo do clima.
 */
export function WeatherSummaryInfo({
  snapshot,
  temperatureValue,
  description,
  locationLabel,
}: WeatherSummaryInfoProps) {
  const tags = snapshot ? buildWeatherTags(snapshot) : [];

  return (
    <div className={weatherSummaryText}>
      <div className={weatherTemperatureRow}>
        <span className={weatherTemperatureValue}>{temperatureValue}</span>
        <span className={weatherTemperatureUnit}>°C</span>
      </div>
      <span className={weatherConditionBadge}>{description}</span>
      <WeatherTagsRow tags={tags} />
      <div className={weatherLocationRow}>
        <span className={weatherLocationIcon}>
          <MdLocationOn size={14} />
        </span>
        <span>{locationLabel}</span>
      </div>
    </div>
  );
}
