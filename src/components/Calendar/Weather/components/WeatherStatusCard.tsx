import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import {
  weatherStatusCard,
  weatherStatusDetail,
  weatherStatusIcon,
  weatherStatusIconLarge,
  weatherStatusMessage,
  weatherStatusTitle,
  weatherStatusLottieContainer,
  weatherStatusLottiePlayer,
} from '../CSS/WeatherView.styles';
import type { WeatherStatusState } from '../utils/getWeatherStatusMessage';

type WeatherStatusCardProps = {
  status: WeatherStatusState;
};

const loadAnimation = (kind: WeatherStatusState['kind']): Promise<unknown> => {
  switch (kind) {
    case 'loading':
      return import('../../../../assets/icons/loading.json').then(m => m.default);
    case 'past':
      return import('../../../../assets/icons/time.json').then(m => m.default);
    case 'no-data':
      return import('../../../../assets/icons/wait.json').then(m => m.default);
    default:
      return import('../../../../assets/icons/alert.json').then(m => m.default);
  }
};

/**
 * Exibe um card de status para loading ou erro do clima.
 */
export function WeatherStatusCard({ status }: WeatherStatusCardProps) {
  const isLoading = status.kind === 'loading';
  const isPast = status.kind === 'past';
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    loadAnimation(status.kind).then(setAnimationData);
  }, [status.kind]);

  return (
    <div className={weatherStatusCard}>
      {animationData != null ? (
        isLoading ? (
          <div className={weatherStatusLottieContainer}>
            <Lottie className={weatherStatusLottiePlayer} animationData={animationData} loop autoplay />
          </div>
        ) : (
          <div className={`${weatherStatusIcon} ${isPast ? weatherStatusIconLarge : ''}`}>
            <Lottie
              className={weatherStatusLottiePlayer}
              animationData={animationData}
              loop
              autoplay
            />
          </div>
        )
      ) : null}
      <h3 className={weatherStatusTitle}>{status.title}</h3>
      <p className={weatherStatusMessage}>{status.message}</p>
      {status.detail && <p className={weatherStatusDetail}>{status.detail}</p>}
    </div>
  );
}
