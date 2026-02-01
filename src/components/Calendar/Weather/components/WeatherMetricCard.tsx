import type { ReactNode } from 'react';
import {
  weatherMetricCard,
  weatherMetricIcon,
  weatherMetricLabel,
  weatherMetricValue,
} from '../CSS/WeatherMetricsPanel.styles';

export type WeatherMetricTone = 'humidity' | 'wind' | 'uv';

export type WeatherMetricItem = {
  tone: WeatherMetricTone;
  label: string;
  value: string;
  icon: ReactNode;
};

type WeatherMetricCardProps = {
  tone: WeatherMetricTone;
  label: string;
  value: string;
  icon: ReactNode;
};

/**
 * Card unitário para exibir uma métrica de clima com ícone e valor.
 */
export function WeatherMetricCard({ tone, label, value, icon }: WeatherMetricCardProps) {
  return (
    <div className={weatherMetricCard({ tone })}>
      <div className={weatherMetricIcon({ tone })}>{icon}</div>
      <span className={weatherMetricLabel}>{label}</span>
      <span className={weatherMetricValue}>{value}</span>
    </div>
  );
}
