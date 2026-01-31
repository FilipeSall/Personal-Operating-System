import Lottie from 'lottie-react';
import type { WeatherSnapshot } from '../../../../types/weather';
import { resolveWeatherEmoji } from '../../utils/weatherEmoji';
import { weatherEmoji, weatherEmojiWrapper } from '../styles/WeatherSummary.styles';

type WeatherSummaryEmojiProps = {
  snapshot: WeatherSnapshot | null;
  description: string;
};

/**
 * Exibe o emoji animado referente ao clima atual.
 */
export function WeatherSummaryEmoji({ snapshot, description }: WeatherSummaryEmojiProps) {
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
