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
  shellBg: string;
  shellOverlay: string;
  shellPattern: string;
  panelBorder: string;
  mainBg: string;
  sidebarBg: string;
  cardBg: string;
  gridBg: string;
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
    shellBg: 'linear-gradient(135deg, rgba(255, 247, 237, 0.9) 0%, rgba(253, 232, 234, 0.85) 100%)',
    shellOverlay:
      'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.9), transparent 55%), radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.8), transparent 50%)',
    shellPattern: 'radial-gradient(rgba(214, 69, 80, 0.12) 1px, transparent 1px)',
    panelBorder: 'rgba(214, 69, 80, 0.18)',
    mainBg: 'rgba(255, 255, 255, 0.7)',
    sidebarBg: 'rgba(255, 255, 255, 0.8)',
    cardBg: 'rgba(255, 255, 255, 0.92)',
    gridBg: 'rgba(214, 69, 80, 0.08)',
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
    shellBg: 'linear-gradient(140deg, rgba(255, 237, 213, 0.95) 0%, rgba(254, 215, 170, 0.9) 100%)',
    shellOverlay:
      'radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.85), transparent 55%), radial-gradient(circle at 85% 5%, rgba(255, 251, 235, 0.8), transparent 55%)',
    shellPattern: 'radial-gradient(rgba(234, 88, 12, 0.16) 1px, transparent 1px)',
    panelBorder: 'rgba(234, 88, 12, 0.2)',
    mainBg: 'rgba(255, 255, 255, 0.68)',
    sidebarBg: 'rgba(255, 255, 255, 0.82)',
    cardBg: 'rgba(255, 255, 255, 0.92)',
    gridBg: 'rgba(234, 88, 12, 0.08)',
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
    shellBg: 'linear-gradient(140deg, rgba(224, 242, 254, 0.95) 0%, rgba(219, 234, 254, 0.9) 100%)',
    shellOverlay:
      'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.9), transparent 55%), radial-gradient(circle at 85% 15%, rgba(191, 219, 254, 0.6), transparent 55%)',
    shellPattern: 'radial-gradient(rgba(37, 99, 235, 0.14) 1px, transparent 1px)',
    panelBorder: 'rgba(59, 130, 246, 0.22)',
    mainBg: 'rgba(255, 255, 255, 0.7)',
    sidebarBg: 'rgba(255, 255, 255, 0.82)',
    cardBg: 'rgba(255, 255, 255, 0.92)',
    gridBg: 'rgba(59, 130, 246, 0.08)',
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
    shellBg: 'linear-gradient(140deg, rgba(219, 234, 254, 0.95) 0%, rgba(191, 219, 254, 0.9) 100%)',
    shellOverlay:
      'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.9), transparent 55%), radial-gradient(circle at 80% 10%, rgba(191, 219, 254, 0.65), transparent 55%)',
    shellPattern: 'radial-gradient(rgba(30, 64, 175, 0.16) 1px, transparent 1px)',
    panelBorder: 'rgba(30, 64, 175, 0.22)',
    mainBg: 'rgba(255, 255, 255, 0.7)',
    sidebarBg: 'rgba(255, 255, 255, 0.82)',
    cardBg: 'rgba(255, 255, 255, 0.92)',
    gridBg: 'rgba(30, 64, 175, 0.08)',
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
    shellBg: 'linear-gradient(135deg, rgba(254, 249, 195, 0.95) 0%, rgba(254, 240, 138, 0.9) 100%)',
    shellOverlay:
      'radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.9), transparent 55%), radial-gradient(circle at 80% 10%, rgba(254, 240, 138, 0.6), transparent 55%)',
    shellPattern: 'radial-gradient(rgba(202, 138, 4, 0.16) 1px, transparent 1px)',
    panelBorder: 'rgba(202, 138, 4, 0.2)',
    mainBg: 'rgba(255, 255, 255, 0.7)',
    sidebarBg: 'rgba(255, 255, 255, 0.82)',
    cardBg: 'rgba(255, 255, 255, 0.92)',
    gridBg: 'rgba(202, 138, 4, 0.08)',
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
    shellBg: 'linear-gradient(140deg, rgba(243, 244, 246, 0.95) 0%, rgba(229, 231, 235, 0.9) 100%)',
    shellOverlay:
      'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.9), transparent 55%), radial-gradient(circle at 80% 10%, rgba(229, 231, 235, 0.7), transparent 55%), linear-gradient(120deg, rgba(148, 163, 184, 0.12), transparent 60%)',
    shellPattern: 'radial-gradient(rgba(107, 114, 128, 0.12) 1px, transparent 1px)',
    panelBorder: 'rgba(107, 114, 128, 0.18)',
    mainBg: 'rgba(255, 255, 255, 0.68)',
    sidebarBg: 'rgba(255, 255, 255, 0.8)',
    cardBg: 'rgba(255, 255, 255, 0.92)',
    gridBg: 'rgba(107, 114, 128, 0.08)',
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
    shellBg: 'linear-gradient(140deg, rgba(243, 244, 246, 0.95) 0%, rgba(229, 231, 235, 0.9) 100%)',
    shellOverlay:
      'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.9), transparent 55%), radial-gradient(circle at 80% 10%, rgba(229, 231, 235, 0.7), transparent 55%), linear-gradient(120deg, rgba(148, 163, 184, 0.12), transparent 60%)',
    shellPattern: 'radial-gradient(rgba(107, 114, 128, 0.12) 1px, transparent 1px)',
    panelBorder: 'rgba(107, 114, 128, 0.18)',
    mainBg: 'rgba(255, 255, 255, 0.68)',
    sidebarBg: 'rgba(255, 255, 255, 0.8)',
    cardBg: 'rgba(255, 255, 255, 0.92)',
    gridBg: 'rgba(107, 114, 128, 0.08)',
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
    '--calendar-shell-bg': theme.shellBg,
    '--calendar-shell-overlay': theme.shellOverlay,
    '--calendar-shell-pattern': theme.shellPattern,
    '--calendar-panel-border': theme.panelBorder,
    '--calendar-main-bg': theme.mainBg,
    '--calendar-sidebar-bg': theme.sidebarBg,
    '--calendar-card-bg': theme.cardBg,
    '--calendar-grid-bg': theme.gridBg,
  };
};
