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
import loadingAnimation from '../../../../assets/icons/loading.json';
import alertAnimation from '../../../../assets/icons/alert.json';
import timeAnimation from '../../../../assets/icons/time.json';

type WeatherStatusCardProps = {
  status: WeatherStatusState;
};

/**
 * Exibe um card de status para loading ou erro do clima.
 */
export function WeatherStatusCard({ status }: WeatherStatusCardProps) {
  const isLoading = status.kind === 'loading';
  const isPast = status.kind === 'past';

  return (
    <div className={weatherStatusCard}>
      {isLoading ? (
        <div className={weatherStatusLottieContainer}>
          <Lottie className={weatherStatusLottiePlayer} animationData={loadingAnimation} loop autoplay />
        </div>
      ) : (
        <div className={`${weatherStatusIcon} ${isPast ? weatherStatusIconLarge : ''}`}>
          <Lottie
            className={weatherStatusLottiePlayer}
            animationData={isPast ? timeAnimation : alertAnimation}
            loop
            autoplay
          />
        </div>
      )}
      <h3 className={weatherStatusTitle}>{status.title}</h3>
      <p className={weatherStatusMessage}>{status.message}</p>
      {status.detail && <p className={weatherStatusDetail}>{status.detail}</p>}
    </div>
  );
}
