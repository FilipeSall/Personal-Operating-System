import { css, cva } from '../../../../../styled-system/css';
import { weatherBorder, weatherCircle, weatherSoftShadow } from './weatherTokens';

export const weatherMetricsTipWrapper = css({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gap: '0.75em',
  width: '100%',
  minHeight: 0,
});

export const weatherMetricsGrid = css({
  display: 'grid',
  gridTemplateColumns: { base: 'repeat(2, minmax(0, 1fr))', bp800: 'repeat(3, minmax(0, 1fr))' },
  gap: '0.75em',
  width: '100%',
  minHeight: 0,
});

export const weatherMetricsCarousel = css({
  position: 'relative',
  width: '100%',
});

export const weatherMetricsTrack = css({
  display: 'grid',
  gridTemplateColumns: { base: 'repeat(3, 1fr)', bp800: 'repeat(6, 1fr)' },
  gap: '0.5em',
  width: '100%',
});

export const weatherScrollButton = cva({
  base: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    width: '1.75em',
    height: '1.75em',
    ...weatherCircle,
    ...weatherBorder,
    backgroundColor: 'surface.950',
    color: 'text.muted',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 0.25em 0.5em rgba(33, 26, 30, 0.1)',
    _hover: {
      color: '#2563EB',
      borderColor: '#93C5FD',
    },
  },
  variants: {
    direction: {
      left: { left: '-0.875em' },
      right: { right: '-0.875em' },
    },
  },
});

export const weatherMetricCard = cva({
  base: {
    backgroundColor: 'surface.950',
    ...weatherBorder,
    borderRadius: '0.875em',
    padding: '0.5em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.125em',
    transition: 'transform 0.2s ease, border-color 0.2s ease',
    ...weatherSoftShadow,
    _hover: {
      transform: 'translateY(-0.25em)',
    },
  },
  variants: {
    tone: {
      humidity: {
        borderColor: '#DBEAFE',
      },
      wind: {
        borderColor: '#CCFBF1',
      },
      uv: {
        borderColor: '#EDE9FE',
      },
      feelsLike: {
        borderColor: '#FEF3C7',
      },
      rain: {
        borderColor: '#BFDBFE',
      },
      clouds: {
        borderColor: '#E5E7EB',
      },
    },
  },
});

export const weatherMetricIcon = cva({
  base: {
    ...weatherCircle,
    width: '1.5em',
    height: '1.5em',
    marginBottom: '0.125em',
  },
  variants: {
    tone: {
      humidity: {
        backgroundColor: '#DBEAFE',
        color: '#2563EB',
      },
      wind: {
        backgroundColor: '#CCFBF1',
        color: '#0F766E',
      },
      uv: {
        backgroundColor: '#EDE9FE',
        color: '#7C3AED',
      },
      feelsLike: {
        backgroundColor: '#FEF3C7',
        color: '#D97706',
      },
      rain: {
        backgroundColor: '#BFDBFE',
        color: '#1D4ED8',
      },
      clouds: {
        backgroundColor: '#F3F4F6',
        color: '#6B7280',
      },
    },
  },
});

export const weatherMetricLabel = css({
  fontSize: '0.5em',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontWeight: '700',
  color: 'text.dim',
});

export const weatherMetricValue = css({
  fontSize: '0.875em',
  fontWeight: '700',
  color: 'text.primary',
});
