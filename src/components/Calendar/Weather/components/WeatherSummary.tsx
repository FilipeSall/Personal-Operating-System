import Lottie from 'lottie-react';
import { MdLocationOn } from 'react-icons/md';
import type { WeatherSnapshot } from '../../../../types/weather';
import { resolveWeatherEmoji } from '../../utils/weatherEmoji';
import {
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
} from '../styles/WeatherSummary.styles';

type WeatherSummaryProps = {
  snapshot: WeatherSnapshot | null;
  description: string;
  dateLabel: string;
  temperatureValue: number | null;
  locationLabel: string;
};

type WeatherSummaryEmojiProps = {
  snapshot: WeatherSnapshot | null;
  description: string;
};

type WeatherSummaryInfoProps = {
  dateLabel: string;
  temperatureValue: number | null;
  description: string;
  locationLabel: string;
};

/**
 * Exibe o emoji animado referente ao clima atual.
 */
function WeatherSummaryEmoji({ snapshot, description }: WeatherSummaryEmojiProps) {
  return (
    <div className={weatherEmojiWrapper} role="img" aria-label={description}>
      <Lottie
        animationData={resolveWeatherEmoji(snapshot)}
        className={weatherEmoji}
        loop
        autoplay
      />
    </div>
  );
}

/**
 * Exibe data, temperatura, condição e localização do resumo do clima.
 */
function WeatherSummaryInfo({
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
