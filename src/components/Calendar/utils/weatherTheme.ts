import type { WeatherSnapshot } from '../../../types/weather';

export type WeatherTone = 'default' | 'hot' | 'rain' | 'cold' | 'sunny' | 'cloudy' | 'atmosphere';

export type WeatherTheme = {
  tone: WeatherTone;
  panelBg: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  accentShadow: string;
  decorTop: string;
  decorBottom: string;
  footerBorder: string;
};

const THEMES: Record<WeatherTone, WeatherTheme> = {
  default: {
    tone: 'default',
    panelBg: 'rgba(253, 232, 234, 0.6)',
    accent: '#D64550',
    accentHover: '#BF3A44',
    accentLight: '#FDE8EA',
    accentShadow: 'rgba(214, 69, 80, 0.25)',
    decorTop: 'rgba(214, 69, 80, 0.3)',
    decorBottom: 'rgba(191, 58, 68, 0.25)',
    footerBorder: 'rgba(214, 69, 80, 0.25)',
  },
  hot: {
    tone: 'hot',
    panelBg: 'rgba(255, 237, 213, 0.6)',
    accent: '#EA580C',
    accentHover: '#C2410C',
    accentLight: '#FFEDD5',
    accentShadow: 'rgba(234, 88, 12, 0.25)',
    decorTop: 'rgba(249, 115, 22, 0.3)',
    decorBottom: 'rgba(251, 191, 36, 0.25)',
    footerBorder: 'rgba(249, 115, 22, 0.25)',
  },
  rain: {
    tone: 'rain',
    panelBg: 'rgba(219, 234, 254, 0.6)',
    accent: '#2563EB',
    accentHover: '#1D4ED8',
    accentLight: '#DBEAFE',
    accentShadow: 'rgba(37, 99, 235, 0.25)',
    decorTop: 'rgba(96, 165, 250, 0.3)',
    decorBottom: 'rgba(59, 130, 246, 0.25)',
    footerBorder: 'rgba(59, 130, 246, 0.25)',
  },
  cold: {
    tone: 'cold',
    panelBg: 'rgba(219, 234, 254, 0.6)',
    accent: '#1E40AF',
    accentHover: '#1E3A8A',
    accentLight: '#DBEAFE',
    accentShadow: 'rgba(30, 64, 175, 0.25)',
    decorTop: 'rgba(59, 130, 246, 0.3)',
    decorBottom: 'rgba(30, 64, 175, 0.25)',
    footerBorder: 'rgba(30, 64, 175, 0.25)',
  },
  sunny: {
    tone: 'sunny',
    panelBg: 'rgba(254, 249, 195, 0.6)',
    accent: '#CA8A04',
    accentHover: '#A16207',
    accentLight: '#FEF9C3',
    accentShadow: 'rgba(202, 138, 4, 0.25)',
    decorTop: 'rgba(250, 204, 21, 0.3)',
    decorBottom: 'rgba(253, 224, 71, 0.25)',
    footerBorder: 'rgba(250, 204, 21, 0.25)',
  },
  cloudy: {
    tone: 'cloudy',
    panelBg: 'rgba(243, 244, 246, 0.6)',
    accent: '#6B7280',
    accentHover: '#4B5563',
    accentLight: '#F3F4F6',
    accentShadow: 'rgba(107, 114, 128, 0.25)',
    decorTop: 'rgba(156, 163, 175, 0.3)',
    decorBottom: 'rgba(209, 213, 219, 0.25)',
    footerBorder: 'rgba(156, 163, 175, 0.25)',
  },
  atmosphere: {
    tone: 'atmosphere',
    panelBg: 'rgba(243, 244, 246, 0.6)',
    accent: '#6B7280',
    accentHover: '#4B5563',
    accentLight: '#F3F4F6',
    accentShadow: 'rgba(107, 114, 128, 0.25)',
    decorTop: 'rgba(156, 163, 175, 0.3)',
    decorBottom: 'rgba(209, 213, 219, 0.25)',
    footerBorder: 'rgba(156, 163, 175, 0.25)',
  },
};

const normalizeDescription = (value: string): string => {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
};

const RAIN_KEYWORDS = ['chuva', 'garoa', 'tempestade', 'trovoada'];
const SNOW_KEYWORDS = ['neve', 'granizo'];
const ATMOSPHERE_KEYWORDS = ['nevoa', 'neblina', 'bruma', 'fumaca', 'poeira', 'areia', 'cinzas', 'tornado', 'nevoeiro'];
const CLOUD_KEYWORDS = ['nublado', 'nuvens', 'cloud'];
const SUNNY_KEYWORDS = ['sol', 'ensolarado', 'ceu limpo', 'limpo'];

/**
 * Resolve o tema de cores baseado no clima atual.
 * Prioridade: temperatura extrema > descricao > fallback (sunny).
 */
export const resolveWeatherTheme = (snapshot: WeatherSnapshot | null): WeatherTheme => {
  if (!snapshot) {
    return THEMES.default;
  }

  if (snapshot.temperature.current >= 30) {
    return THEMES.hot;
  }

  if (snapshot.temperature.current <= 15) {
    return THEMES.cold;
  }

  const normalized = normalizeDescription(snapshot.description);

  if (RAIN_KEYWORDS.some((k) => normalized.includes(k))) {
    return THEMES.rain;
  }

  if (SNOW_KEYWORDS.some((k) => normalized.includes(k))) {
    return THEMES.cold;
  }

  if (ATMOSPHERE_KEYWORDS.some((k) => normalized.includes(k))) {
    return THEMES.atmosphere;
  }

  if (CLOUD_KEYWORDS.some((k) => normalized.includes(k))) {
    return THEMES.cloudy;
  }

  if (SUNNY_KEYWORDS.some((k) => normalized.includes(k))) {
    return THEMES.sunny;
  }

  return THEMES.sunny;
};

/**
 * Converte um WeatherTheme em CSS custom properties para inline style.
 */
export const weatherThemeToCssVars = (theme: WeatherTheme): Record<string, string> => {
  return {
    '--weather-panel-bg': theme.panelBg,
    '--weather-accent': theme.accent,
    '--weather-accent-hover': theme.accentHover,
    '--weather-accent-light': theme.accentLight,
    '--weather-accent-shadow': theme.accentShadow,
    '--weather-decor-top': theme.decorTop,
    '--weather-decor-bottom': theme.decorBottom,
    '--weather-footer-border': theme.footerBorder,
  };
};
