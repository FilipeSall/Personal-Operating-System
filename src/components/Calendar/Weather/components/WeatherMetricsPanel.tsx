import { MdAir, MdOpacity, MdShield } from 'react-icons/md';
import { weatherMetricsTipWrapper } from '../CSS/WeatherMetricsPanel.styles';
import type { WeatherMetricItem } from './WeatherMetricCard';
import { WeatherMetricsGrid } from './WeatherMetricsGrid';
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
  const metricItems: WeatherMetricItem[] = [
    {
      tone: 'humidity',
      label: 'Umidade',
      value: humidityValue,
      icon: <MdOpacity size={18} />,
    },
    {
      tone: 'wind',
      label: 'Vento',
      value: windValue,
      icon: <MdAir size={18} />,
    },
    {
      tone: 'uv',
      label: 'UV',
      value: uvValue,
      icon: <MdShield size={18} />,
    },
  ];

  return (
    <div className={weatherMetricsTipWrapper}>
      <WeatherMetricsGrid items={metricItems} />
      <WeatherTipPanel recommendation={recommendation} />
    </div>
  );
}
