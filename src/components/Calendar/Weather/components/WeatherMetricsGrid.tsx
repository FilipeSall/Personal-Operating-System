import { weatherMetricsGrid } from '../CSS/WeatherMetricsPanel.styles';
import { WeatherMetricCard, type WeatherMetricItem } from './WeatherMetricCard';

type WeatherMetricsGridProps = {
  items: WeatherMetricItem[];
};

/**
 * Renderiza o grid com os cards de métricas do clima.
 */
export function WeatherMetricsGrid({ items }: WeatherMetricsGridProps) {
  return (
    <div className={weatherMetricsGrid}>
      {items.map((metric) => (
        <WeatherMetricCard
          key={metric.tone}
          tone={metric.tone}
          label={metric.label}
          value={metric.value}
          icon={metric.icon}
        />
      ))}
    </div>
  );
}
