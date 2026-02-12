import { createElement, type ReactNode } from 'react';
import {
  MdAir,
  MdDeviceThermostat,
  MdFilterDrama,
  MdGrain,
  MdOpacity,
  MdShield,
  MdThermostat,
  MdUmbrella,
  MdWarning,
  MdWbCloudy,
  MdWbTwilight,
} from 'react-icons/md';
import type { WeatherRowId } from '../../../types/weather';
import {
  gradientBlue,
  gradientCyan,
  gradientGray,
  gradientGreen,
  gradientIndigo,
  gradientOrange,
  gradientPink,
  gradientRed,
  gradientTeal,
  gradientYellow,
} from '../Weather/CSS/weather-details-modal.styles';

export const WEATHER_ICON_MAP: Record<WeatherRowId, ReactNode> = {
  summary: createElement(MdWbCloudy, { size: 32 }),
  temperature: createElement(MdThermostat, { size: 32 }),
  feelsLike: createElement(MdDeviceThermostat, { size: 32 }),
  rainChance: createElement(MdUmbrella, { size: 32 }),
  wind: createElement(MdAir, { size: 32 }),
  humidity: createElement(MdOpacity, { size: 32 }),
  uvIndex: createElement(MdShield, { size: 32 }),
  clouds: createElement(MdFilterDrama, { size: 32 }),
  sunTimes: createElement(MdWbTwilight, { size: 32 }),
  alerts: createElement(MdWarning, { size: 32 }),
  precipitation: createElement(MdGrain, { size: 32 }),
};

export const WEATHER_GRADIENT_MAP: Record<WeatherRowId, string> = {
  summary: gradientBlue,
  temperature: gradientRed,
  feelsLike: gradientOrange,
  rainChance: gradientIndigo,
  wind: gradientTeal,
  humidity: gradientCyan,
  uvIndex: gradientYellow,
  clouds: gradientGray,
  sunTimes: gradientPink,
  alerts: gradientGreen,
  precipitation: gradientBlue,
};
