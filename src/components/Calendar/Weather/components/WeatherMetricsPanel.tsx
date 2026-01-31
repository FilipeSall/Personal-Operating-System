import type { ReactNode } from 'react';
import { MdAir, MdOpacity, MdShield } from 'react-icons/md';
import {
  weatherMetricsGrid,
  weatherMetricsTipWrapper,
  weatherMetricCard,
  weatherMetricIcon,
  weatherMetricLabel,
  weatherMetricValue,
} from '../styles/WeatherMetricsPanel.styles';
import { WeatherTipPanel } from './WeatherTipPanel';

type WeatherMetricsPanelProps = {
  humidityValue: string;
  windValue: string;
  uvValue: string;
  recommendation: string;
};

type WeatherMetricTone = 'humidity' | 'wind' | 'uv';

type WeatherMetricItem = {
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
function WeatherMetricCardView({ tone, label, value, icon }: WeatherMetricCardProps) {
  return (
    <div className={weatherMetricCard({ tone })}>
      <div className={weatherMetricIcon({ tone })}>{icon}</div>
      <span className={weatherMetricLabel}>{label}</span>
      <span className={weatherMetricValue}>{value}</span>
    </div>
  );
}

/**
 * Monta a lista de métricas do painel com base nos valores atuais.
 */
function buildWeatherMetricItems({
  humidityValue,
  windValue,
  uvValue,
}: Pick<WeatherMetricsPanelProps, 'humidityValue' | 'windValue' | 'uvValue'>): WeatherMetricItem[] {
  return [
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
}

/**
 * Painel de metricas e recomendacao do clima.
 */
export function WeatherMetricsPanel({
  humidityValue,
  windValue,
  uvValue,
  recommendation,
}: WeatherMetricsPanelProps) {
  const metricItems = buildWeatherMetricItems({ humidityValue, windValue, uvValue });

  return (
    <div className={weatherMetricsTipWrapper}>
      <div className={weatherMetricsGrid}>
        {metricItems.map((metric) => (
          <WeatherMetricCardView
            key={metric.tone}
            tone={metric.tone}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </div>
      <WeatherTipPanel recommendation={recommendation} />
    </div>
  );
}
