import type { ReactNode } from 'react';
import {
  MdCheckCircle,
  MdNorthEast,
  MdSouthWest,
} from 'react-icons/md';
import { cx } from '../../../../../styled-system/css';
import { WEATHER_GRADIENT_MAP, WEATHER_ICON_MAP } from '../../consts/weatherDetailsModal';
import type { WeatherDetailsCardViewModel } from '../../types/weatherDetailsModal';
import {
  weatherDetailsCard,
  weatherDetailsIconBox,
  weatherDetailsInfo,
  weatherDetailsLabel,
  weatherDetailsMultiValue,
  weatherDetailsRecommendation,
  weatherDetailsSunTime,
  weatherDetailsTemperatureRange,
  weatherDetailsValue,
  weatherDetailsValueComplement,
} from '../CSS/weather-details-modal.styles';

type WeatherDetailsModalCardProps = {
  card: WeatherDetailsCardViewModel;
};

/**
 * Resolve o ícone visual de acordo com o tipo do card.
 */
const getCardIcon = (card: WeatherDetailsCardViewModel): ReactNode => {
  if (card.variant === 'alerts' && !card.hasAlerts) {
    return <MdCheckCircle size={32} />;
  }

  return WEATHER_ICON_MAP[card.id];
};

/**
 * Renderiza o conteúdo principal (valor) de cada tipo de card.
 */
const renderCardValue = (card: WeatherDetailsCardViewModel): ReactNode => {
  switch (card.variant) {
    case 'temperature':
      return <p className={weatherDetailsValue}>{card.currentTemp}</p>;
    case 'sunTimes':
      return (
        <div className={weatherDetailsMultiValue}>
          <p className={weatherDetailsSunTime}>
            <MdNorthEast />
            <span>{card.sunrise}</span>
          </p>
          <p className={weatherDetailsSunTime}>
            <MdSouthWest />
            <span>{card.sunset}</span>
          </p>
        </div>
      );
    case 'wind':
      return (
        <p className={weatherDetailsValue}>
          {card.number}
          {card.unit ? <span className={weatherDetailsValueComplement}> {card.unit}</span> : null}
          {card.direction ? (
            <span className={weatherDetailsValueComplement}> • {card.direction}</span>
          ) : null}
        </p>
      );
    case 'uvIndex':
      return (
        <p className={weatherDetailsValue}>
          {card.value}
          {card.level ? <span className={weatherDetailsValueComplement}> {card.level}</span> : null}
        </p>
      );
    case 'alerts':
      return <p className={weatherDetailsValue}>{card.value}</p>;
    case 'precipitation':
      return (
        <p className={weatherDetailsValue}>
          {card.prefix ? <span>{card.prefix} </span> : null}
          {card.number}
          {card.unit ? <span className={weatherDetailsValueComplement}> {card.unit}</span> : null}
        </p>
      );
    default:
      return <p className={weatherDetailsValue}>{card.value}</p>;
  }
};

/**
 * Card visual do modal de detalhes do clima.
 */
export function WeatherDetailsModalCard({ card }: WeatherDetailsModalCardProps) {
  const icon = getCardIcon(card);

  return (
    <div className={weatherDetailsCard}>
      <div className={cx(weatherDetailsIconBox, WEATHER_GRADIENT_MAP[card.id])}>
        {icon}
      </div>
      <div className={weatherDetailsInfo}>
        <h3 className={weatherDetailsLabel}>{card.label}</h3>
        {renderCardValue(card)}
      </div>
      <div className={weatherDetailsRecommendation}>{card.recommendation}</div>
      {card.variant === 'temperature' && card.minMaxStr ? (
        <p className={weatherDetailsTemperatureRange}>{card.minMaxStr}</p>
      ) : null}
    </div>
  );
}
