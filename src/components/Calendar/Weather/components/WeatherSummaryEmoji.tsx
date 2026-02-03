import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { MdRefresh } from 'react-icons/md';
import type { WeatherSnapshot } from '../../../../types/weather';
import { resolveWeatherEmoji } from '../../utils/weatherEmoji';
import {
  weatherEmoji,
  weatherEmojiWrapper,
  weatherDateBadge,
  weatherEmojiContainer,
  weatherSummaryMeta,
  weatherSummaryMetaLabel,
} from '../CSS/WeatherSummary.styles';
import { weatherRefreshButton } from '../CSS/WeatherFooter.styles';

type WeatherSummaryEmojiProps = {
  state: {
    isLoading: boolean;
    updatedAtLabel: string | null;
  };
  derived: {
    snapshot: WeatherSnapshot | null;
    description: string;
    dateLabel: string;
  };
  actions: {
    refreshWeather: () => Promise<void>;
  };
};

/**
 * Exibe o emoji animado referente ao clima atual e a data do dia.
 */
export function WeatherSummaryEmoji({ state, derived, actions }: WeatherSummaryEmojiProps) {
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    resolveWeatherEmoji(derived.snapshot).then(setAnimationData);
  }, [derived.snapshot]);

  return (
    <div className={weatherEmojiContainer}>
      <div className={weatherSummaryMeta}>
        <button
          type="button"
          className={weatherRefreshButton}
          onClick={actions.refreshWeather}
          disabled={state.isLoading}
          title="Atualizar"
        >
          <MdRefresh size={18} />
        </button>
        {state.updatedAtLabel && (
          <span className={weatherSummaryMetaLabel}>
            Atualizado as {state.updatedAtLabel}
          </span>
        )}
      </div>
      <span className={weatherDateBadge}>{derived.dateLabel}</span>
      <div className={weatherEmojiWrapper} role="img" aria-label={derived.description}>
        {animationData != null ? (
          <Lottie
            animationData={animationData}
            className={weatherEmoji}
            loop
            autoplay
          />
        ) : null}
      </div>
    </div>
  );
}
