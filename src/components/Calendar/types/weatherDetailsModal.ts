import type { WeatherRowId } from '../../../types/weather';
import type { WeatherDerived, WeatherState } from '../hooks/useWeather';

export type WeatherDetailsCardBase = {
  id: WeatherRowId;
  label: string;
  recommendation: string;
};

export type WeatherDetailsDefaultCard = WeatherDetailsCardBase & {
  variant: 'default';
  value: string;
};

export type WeatherDetailsTemperatureCard = WeatherDetailsCardBase & {
  variant: 'temperature';
  currentTemp: string;
  minMaxStr: string | null;
};

export type WeatherDetailsSunTimesCard = WeatherDetailsCardBase & {
  variant: 'sunTimes';
  sunrise: string;
  sunset: string;
};

export type WeatherDetailsWindCard = WeatherDetailsCardBase & {
  variant: 'wind';
  number: string;
  unit: string;
  direction: string;
};

export type WeatherDetailsUvCard = WeatherDetailsCardBase & {
  variant: 'uvIndex';
  value: string;
  level: string;
};

export type WeatherDetailsAlertsCard = WeatherDetailsCardBase & {
  variant: 'alerts';
  value: string;
  hasAlerts: boolean;
};

export type WeatherDetailsPrecipitationCard = WeatherDetailsCardBase & {
  variant: 'precipitation';
  prefix: string;
  number: string;
  unit: string;
};

export type WeatherDetailsCardViewModel =
  | WeatherDetailsDefaultCard
  | WeatherDetailsTemperatureCard
  | WeatherDetailsSunTimesCard
  | WeatherDetailsWindCard
  | WeatherDetailsUvCard
  | WeatherDetailsAlertsCard
  | WeatherDetailsPrecipitationCard;

export type WeatherDetailsModalViewModel = {
  dateLabel: string;
  locationLabel: string;
  hasData: boolean;
  cards: WeatherDetailsCardViewModel[];
};

export type WeatherDetailsModalServiceInput = {
  state: WeatherState;
  derived: WeatherDerived;
};
