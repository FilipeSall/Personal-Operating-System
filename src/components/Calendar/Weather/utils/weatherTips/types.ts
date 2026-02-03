import type { WeatherSnapshot, WeatherTip } from '../../../../../types/weather';

export type WeatherTipsInput = {
  snapshot: WeatherSnapshot;
  selectedDate: Date;
};

export type TipPool = {
  tips: WeatherTip[];
  weight: number;
};

export type WeatherTipSignals = {
  isWeekend: boolean;
  isToday: boolean;
  isFuture: boolean;
  isStorm: boolean;
  isRainy: boolean;
  isSnowy: boolean;
  isSunny: boolean;
  isOvercast: boolean;
  isMostlyCloudy: boolean;
  isPartlyCloudy: boolean;
  isHot: boolean;
  isCold: boolean;
  isWindy: boolean;
  isNight: boolean;
  isMorning: boolean;
  isAfternoon: boolean;
  isEvening: boolean;
  isNearSunrise: boolean;
  isNearSunset: boolean;
  popPercent: number;
  maxTemp: number;
  minTemp: number;
  feelsLike: number;
  tempCurrent: number;
  cloudCover: number;
};

export type DaylightSignals = {
  isNight: boolean;
  isMorning: boolean;
  isAfternoon: boolean;
  isEvening: boolean;
  isNearSunrise: boolean;
  isNearSunset: boolean;
};
