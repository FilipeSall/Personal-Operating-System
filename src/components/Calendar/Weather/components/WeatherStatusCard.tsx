import { Suspense, lazy, useEffect, useState } from 'react';
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

const Lottie = lazy(() => import('lottie-react'));

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
  const [shouldLoadAnimation, setShouldLoadAnimation] = useState(false);

  useEffect(() => {
    loadAnimation(status.kind).then(setAnimationData);
  }, [status.kind]);

  useEffect(() => {
    if (shouldLoadAnimation || typeof window === 'undefined') return;
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setShouldLoadAnimation(true));
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setShouldLoadAnimation(true), 200);
    return () => window.clearTimeout(id);
  }, [shouldLoadAnimation]);

  return (
    <div className={weatherStatusCard}>
      {animationData != null && shouldLoadAnimation ? (
        <Suspense fallback={null}>
          {isLoading ? (
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
          )}
        </Suspense>
      ) : null}
      <h3 className={weatherStatusTitle}>{status.title}</h3>
      <p className={weatherStatusMessage}>{status.message}</p>
      {status.detail && <p className={weatherStatusDetail}>{status.detail}</p>}
    </div>
  );
}
