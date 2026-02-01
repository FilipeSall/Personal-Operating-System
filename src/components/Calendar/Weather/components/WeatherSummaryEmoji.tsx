import Lottie from 'lottie-react';
import type { WeatherSnapshot } from '../../../../types/weather';
import { resolveWeatherEmoji } from '../../utils/weatherEmoji';
import { weatherEmoji, weatherEmojiWrapper, weatherDateBadge, weatherEmojiContainer } from '../CSS/WeatherSummary.styles';

type WeatherSummaryEmojiProps = {
  snapshot: WeatherSnapshot | null;
  description: string;
  dateLabel: string;
};

/**
 * Exibe o emoji animado referente ao clima atual e a data do dia.
 */
export function WeatherSummaryEmoji({ snapshot, description, dateLabel }: WeatherSummaryEmojiProps) {
  return (
    <div className={weatherEmojiContainer}>
      <span className={weatherDateBadge}>
        {dateLabel}
      </span>
      <div className={weatherEmojiWrapper} role="img" aria-label={description}>
        <Lottie
          animationData={resolveWeatherEmoji(snapshot)}
          className={weatherEmoji}
          loop
          autoplay
        />
      </div>
    </div>
  );
}
