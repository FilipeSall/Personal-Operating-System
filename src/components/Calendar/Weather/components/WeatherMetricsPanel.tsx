import { MdAir, MdOpacity, MdShield } from 'react-icons/md';
import {
  weatherMetricsGrid,
  weatherMetricsTipWrapper,
  weatherMetricCard,
  weatherMetricIcon,
  weatherMetricLabel,
  weatherMetricValue,
} from '../weather.styles';
import { WeatherTipPanel } from './WeatherTipPanel';

type WeatherMetricsPanelProps = {
  humidityValue: string;
  windValue: string;
  uvValue: string;
  recommendation: string;
};

/**
 * Painel de metricas e recomendacao do clima.
 */
export function WeatherMetricsPanel({
  humidityValue,
  windValue,
  uvValue,
  recommendation,
}: WeatherMetricsPanelProps) {
  return (
    <div className={weatherMetricsTipWrapper}>
      <div className={weatherMetricsGrid}>
        <div className={weatherMetricCard({ tone: 'humidity' })}>
          <div className={weatherMetricIcon({ tone: 'humidity' })}>
            <MdOpacity size={18} />
          </div>
          <span className={weatherMetricLabel}>Umidade</span>
          <span className={weatherMetricValue}>{humidityValue}</span>
        </div>
        <div className={weatherMetricCard({ tone: 'wind' })}>
          <div className={weatherMetricIcon({ tone: 'wind' })}>
            <MdAir size={18} />
          </div>
          <span className={weatherMetricLabel}>Vento</span>
          <span className={weatherMetricValue}>{windValue}</span>
        </div>
        <div className={weatherMetricCard({ tone: 'uv' })}>
          <div className={weatherMetricIcon({ tone: 'uv' })}>
            <MdShield size={18} />
          </div>
          <span className={weatherMetricLabel}>UV</span>
          <span className={weatherMetricValue}>{uvValue}</span>
        </div>
      </div>
      <WeatherTipPanel recommendation={recommendation} />
    </div>
  );
}
