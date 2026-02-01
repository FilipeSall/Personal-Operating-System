import { MdLocationOn } from 'react-icons/md';
import {
  weatherSummaryText,
  weatherDateBadge,
  weatherTemperatureRow,
  weatherTemperatureValue,
  weatherTemperatureUnit,
  weatherConditionBadge,
  weatherLocationRow,
} from '../CSS/WeatherSummary.styles';

type WeatherSummaryInfoProps = {
  dateLabel: string;
  temperatureValue: number | null;
  description: string;
  locationLabel: string;
};

/**
 * Exibe data, temperatura, condição e localização do resumo do clima.
 */
export function WeatherSummaryInfo({
  dateLabel,
  temperatureValue,
  description,
  locationLabel,
}: WeatherSummaryInfoProps) {
  return (
    <div className={weatherSummaryText}>
      <span className={weatherDateBadge}>{dateLabel}</span>
      <div className={weatherTemperatureRow}>
        <span className={weatherTemperatureValue}>{temperatureValue}</span>
        <span className={weatherTemperatureUnit}>°C</span>
      </div>
      <span className={weatherConditionBadge}>{description}</span>
      <div className={weatherLocationRow}>
        <MdLocationOn size={16} />
        <span>{locationLabel}</span>
      </div>
    </div>
  );
}
