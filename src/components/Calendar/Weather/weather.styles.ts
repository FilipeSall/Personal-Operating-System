import { css, cva } from '../../../../styled-system/css';

export const weatherSection = css({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '2.5rem',
  border: '0.125rem solid',
  borderColor: 'surface.700',
  backgroundColor: 'surface.950',
  padding: '0.25rem',
  boxShadow: '0 1.125rem 2rem rgba(33, 26, 30, 0.08)',
  minHeight: 0,
});

export const weatherPanel = css({
  position: 'relative',
  overflow: 'visible',
  borderRadius: '2.25rem',
  backgroundColor: 'var(--weather-panel-bg, rgba(253, 232, 234, 0.6))',
  padding: { base: '0.75rem', bp800: '1.75rem' },
  display: 'grid',
  gridTemplateRows: 'auto auto',
  gap: { base: '0.625rem', bp800: '1.5rem' },
  transition: 'background-color 0.4s ease',
  width: '100%',
});

export const weatherDecorTop = css({
  position: 'absolute',
  top: '-2.5rem',
  right: '-2.5rem',
  width: '10rem',
  height: '10rem',
  borderRadius: '50%',
  backgroundColor: 'var(--weather-decor-top, rgba(214, 69, 80, 0.3))',
  filter: 'blur(1.5rem)',
  pointerEvents: 'none',
  zIndex: 0,
  transition: 'background-color 0.4s ease',
});

export const weatherDecorBottom = css({
  position: 'absolute',
  bottom: '0.75rem',
  left: '-2rem',
  width: '8rem',
  height: '8rem',
  borderRadius: '50%',
  backgroundColor: 'var(--weather-decor-bottom, rgba(191, 58, 68, 0.25))',
  transition: 'background-color 0.4s ease',
  filter: 'blur(1.5rem)',
  pointerEvents: 'none',
  zIndex: 0,
});

export const weatherTop = css({
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  gridTemplateColumns: { base: '1fr', bp800: '1fr 1fr' },
  alignItems: { base: 'start', bp800: 'center' },
  gap: { base: '0.625rem', bp800: '1.5rem' },
});

export const weatherSummary = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  width: '100%',
});

export const weatherEmojiWrapper = css({
  width: { base: '5rem', bp800: '7rem' },
  height: { base: '4.25rem', bp800: '6rem' },
  borderRadius: '1.5rem',
  backgroundColor: 'surface.950',
  border: '0.125rem solid',
  borderColor: 'surface.700',
  boxShadow: '0 0.75rem 1.25rem rgba(33, 26, 30, 0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const weatherEmoji = css({
  width: '100%',
  height: '100%',
});

export const weatherSummaryText = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const weatherDateBadge = css({
  fontSize: '0.625rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'text.dim',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '0.0625rem solid',
  borderColor: 'surface.700',
  padding: '0.25rem 0.625rem',
  borderRadius: '999px',
  alignSelf: 'flex-start',
});

export const weatherTemperatureRow = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.375rem',
});

export const weatherTemperatureValue = css({
  fontSize: { base: '2.5rem', bp800: '4rem' },
  fontWeight: '800',
  color: 'text.primary',
  lineHeight: 1,
});

export const weatherTemperatureUnit = css({
  fontSize: { base: '1.25rem', bp800: '1.75rem' },
  fontWeight: '700',
  color: 'text.muted',
  marginTop: { base: '0.25rem', bp800: '0.375rem' },
});

export const weatherConditionBadge = css({
  fontSize: '0.875rem',
  fontWeight: '700',
  color: 'text.subtle',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '0.0625rem solid',
  borderColor: 'surface.700',
  padding: '0.25rem 0.625rem',
  borderRadius: '0.75rem',
  alignSelf: 'flex-start',
});

export const weatherLocationRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  fontSize: '0.75rem',
  fontWeight: '600',
  color: 'text.muted',
});

export const weatherMetricsTipWrapper = css({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gap: '0.75rem',
  width: '100%',
});

export const weatherMetricsGrid = css({
  display: 'grid',
  gridTemplateColumns: { base: 'repeat(2, minmax(0, 1fr))', bp800: 'repeat(3, minmax(0, 1fr))' },
  gap: '0.75rem',
  width: '100%',
});

export const weatherMetricsCarousel = css({
  position: 'relative',
  width: '100%',
});

export const weatherMetricsTrack = css({
  display: 'grid',
  gridTemplateColumns: { base: 'repeat(3, 1fr)', bp800: 'repeat(6, 1fr)' },
  gap: '0.5rem',
  width: '100%',
});

export const weatherScrollButton = cva({
  base: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: '999px',
    border: '0.125rem solid',
    borderColor: 'surface.700',
    backgroundColor: 'surface.950',
    color: 'text.muted',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 0.25rem 0.5rem rgba(33, 26, 30, 0.1)',
    _hover: {
      color: '#2563EB',
      borderColor: '#93C5FD',
    },
  },
  variants: {
    direction: {
      left: { left: '-0.875rem' },
      right: { right: '-0.875rem' },
    },
  },
});

export const weatherMetricCard = cva({
  base: {
    backgroundColor: 'surface.950',
    border: '0.125rem solid',
    borderColor: 'surface.700',
    borderRadius: '0.875rem',
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.125rem',
    transition: 'transform 0.2s ease, border-color 0.2s ease',
    boxShadow: '0 0.625rem 1rem rgba(33, 26, 30, 0.06)',
    _hover: {
      transform: 'translateY(-0.25rem)',
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
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.125rem',
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
  fontSize: '0.5rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontWeight: '700',
  color: 'text.dim',
});

export const weatherMetricValue = css({
  fontSize: '0.875rem',
  fontWeight: '700',
  color: 'text.primary',
});

export const weatherTipCard = css({
  position: 'relative',
  width: '100%',
  backgroundColor: 'var(--weather-accent-light, #FDE8EA)',
  border: '0.125rem solid',
  borderColor: 'var(--weather-accent-light, #FDE8EA)',
  borderRadius: '1.125rem',
  padding: { base: '0.75rem 0.625rem', bp800: '1.25rem 1rem' },
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  boxShadow: '0 0.625rem 1rem rgba(33, 26, 30, 0.06)',
  flex: 1,
});

export const weatherTipIcon = css({
  position: 'absolute',
  top: '-0.75rem',
  right: '-0.625rem',
  borderRadius: '999px',
  backgroundColor: 'surface.950',
  border: '0.125rem solid',
  borderColor: 'var(--weather-accent-light, #FDE8EA)',
  padding: '0.375rem',
  boxShadow: '0 0.5rem 0.875rem rgba(33, 26, 30, 0.08)',
  color: 'var(--weather-accent, #D64550)',
});

export const weatherTipHeader = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const weatherTipDot = css({
  width: '0.5rem',
  height: '0.5rem',
  borderRadius: '999px',
  backgroundColor: 'var(--weather-accent, #D64550)',
});

export const weatherTipLabel = css({
  fontSize: '0.625rem',
  fontWeight: '800',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--weather-accent, #D64550)',
});

export const weatherTipText = css({
  fontSize: '0.8125rem',
  fontWeight: '600',
  color: 'text.subtle',
  lineHeight: 1.4,
});

export const weatherFooter = css({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem',
  paddingTop: '0.625rem',
  borderTop: '0.125rem solid',
  borderColor: 'var(--weather-footer-border, rgba(214, 69, 80, 0.25))',
});

export const weatherRefreshGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
});

export const weatherRefreshButton = css({
  width: '2rem',
  height: '2rem',
  borderRadius: '999px',
  border: '0.125rem solid',
  borderColor: 'surface.700',
  backgroundColor: 'surface.950',
  color: 'text.muted',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  _hover: {
    color: 'var(--weather-accent, #D64550)',
    borderColor: 'var(--weather-accent-light, #FDE8EA)',
    transform: 'rotate(180deg)',
  },
  _disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
  },
});

export const weatherUpdatedLabel = css({
  fontSize: '0.625rem',
  fontWeight: '700',
  color: 'text.dim',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  padding: '0.25rem 0.5rem',
  borderRadius: '999px',
  border: '0.0625rem solid',
  borderColor: 'surface.700',
});

export const weatherDetailsButton = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  padding: '0.25rem 0.5rem',
  borderRadius: '999px',
  border: '0.125rem solid',
  borderColor: 'var(--weather-accent, #D64550)',
  backgroundColor: 'surface.950',
  color: 'var(--weather-accent, #D64550)',
  fontSize: '0.625rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  transition: 'all 0.2s ease',
  _hover: {
    backgroundColor: 'var(--weather-accent, #D64550)',
    color: 'white',
    transform: 'translate(0.125rem, 0.125rem)',
    boxShadow: 'none',
  },
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    borderColor: 'surface.700',
    color: 'text.dim',
    backgroundColor: 'surface.900',
  },
});

export const weatherStatusCard = css({
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'surface.950',
  border: '0.0625rem solid',
  borderColor: 'surface.700',
  borderRadius: '1rem',
  padding: '1rem',
  fontSize: '0.8125rem',
  fontWeight: '600',
  color: 'text.muted',
  textAlign: 'center',
});
