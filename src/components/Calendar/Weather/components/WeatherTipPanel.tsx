import { MdUmbrella } from 'react-icons/md';
import {
  weatherTipCard,
  weatherTipIcon,
  weatherTipHeader,
  weatherTipDot,
  weatherTipLabel,
  weatherTipText,
} from '../styles/WeatherTipPanel.styles';

type WeatherTipPanelProps = {
  recommendation: string;
};

/**
 * Cartão com a recomendação diária do clima.
 */
export function WeatherTipPanel({ recommendation }: WeatherTipPanelProps) {
  return (
    <div className={weatherTipCard}>
      <div className={weatherTipIcon}>
        <MdUmbrella size={18} />
      </div>
      <div className={weatherTipHeader}>
        <span className={weatherTipDot} />
        <span className={weatherTipLabel}>Dica do dia</span>
      </div>
      <p className={weatherTipText}>{recommendation}</p>
    </div>
  );
}
