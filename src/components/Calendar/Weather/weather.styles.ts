import { css, cva } from '../../../../styled-system/css';

export const weatherSection = css({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '40px',
  border: '2px solid',
  borderColor: 'surface.700',
  backgroundColor: 'surface.950',
  padding: '4px',
  boxShadow: '0 18px 32px rgba(33, 26, 30, 0.08)',
  minHeight: 0,
});

export const weatherPanel = css({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '36px',
  backgroundColor: 'var(--weather-panel-bg, rgba(253, 232, 234, 0.6))',
  padding: { base: '12px', bp800: '28px' },
  display: 'flex',
  flexDirection: 'column',
  gap: { base: '10px', bp800: '24px' },
  transition: 'background-color 0.4s ease',
  height: '100%',
});

export const weatherDecorTop = css({
  position: 'absolute',
  top: '-40px',
  right: '-40px',
  width: '160px',
  height: '160px',
  borderRadius: '50%',
  backgroundColor: 'var(--weather-decor-top, rgba(214, 69, 80, 0.3))',
  filter: 'blur(24px)',
  pointerEvents: 'none',
  zIndex: 0,
  transition: 'background-color 0.4s ease',
});

export const weatherDecorBottom = css({
  position: 'absolute',
  bottom: '12px',
  left: '-32px',
  width: '128px',
  height: '128px',
  borderRadius: '50%',
  backgroundColor: 'var(--weather-decor-bottom, rgba(191, 58, 68, 0.25))',
  transition: 'background-color 0.4s ease',
  filter: 'blur(24px)',
  pointerEvents: 'none',
  zIndex: 0,
});

export const weatherTop = css({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: { base: 'column', bp800: 'row' },
  alignItems: { base: 'flex-start', bp800: 'center' },
  justifyContent: 'space-between',
  gap: { base: '10px', bp800: '24px' },
});

export const weatherSummary = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  flex: 1,
});

export const weatherEmojiWrapper = css({
  width: { base: '80px', bp800: '112px' },
  height: { base: '68px', bp800: '96px' },
  borderRadius: '24px',
  backgroundColor: 'surface.950',
  border: '2px solid',
  borderColor: 'surface.700',
  boxShadow: '0 12px 20px rgba(33, 26, 30, 0.08)',
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
  gap: '8px',
});

export const weatherDateBadge = css({
  fontSize: '10px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'text.dim',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid',
  borderColor: 'surface.700',
  padding: '4px 10px',
  borderRadius: '999px',
  alignSelf: 'flex-start',
});

export const weatherTemperatureRow = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '6px',
});

export const weatherTemperatureValue = css({
  fontSize: { base: '40px', bp800: '64px' },
  fontWeight: '800',
  color: 'text.primary',
  lineHeight: 1,
});

export const weatherTemperatureUnit = css({
  fontSize: { base: '20px', bp800: '28px' },
  fontWeight: '700',
  color: 'text.muted',
  marginTop: { base: '4px', bp800: '6px' },
});

export const weatherConditionBadge = css({
  fontSize: '14px',
  fontWeight: '700',
  color: 'text.subtle',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid',
  borderColor: 'surface.700',
  padding: '4px 10px',
  borderRadius: '12px',
  alignSelf: 'flex-start',
});

export const weatherLocationRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '12px',
  fontWeight: '600',
  color: 'text.muted',
});

export const weatherMetricsTipWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%'
});

export const weatherMetricsGrid = css({
  display: 'grid',
  gridTemplateColumns: { base: 'repeat(2, minmax(0, 1fr))', bp800: 'repeat(3, minmax(0, 1fr))' },
  gap: '12px',
  width: '100%',
});

export const weatherMetricsCarousel = css({
  position: 'relative',
  width: '100%',
});

export const weatherMetricsTrack = css({
  display: 'grid',
  gridTemplateColumns: { base: 'repeat(3, 1fr)', bp800: 'repeat(6, 1fr)' },
  gap: '8px',
  width: '100%',
});

export const weatherScrollButton = cva({
  base: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    width: '28px',
    height: '28px',
    borderRadius: '999px',
    border: '2px solid',
    borderColor: 'surface.700',
    backgroundColor: 'surface.950',
    color: 'text.muted',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 8px rgba(33, 26, 30, 0.1)',
    _hover: {
      color: '#2563EB',
      borderColor: '#93C5FD',
    },
  },
  variants: {
    direction: {
      left: { left: '-14px' },
      right: { right: '-14px' },
    },
  },
});

export const weatherMetricCard = cva({
  base: {
    backgroundColor: 'surface.950',
    border: '2px solid',
    borderColor: 'surface.700',
    borderRadius: '14px',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    transition: 'transform 0.2s ease, border-color 0.2s ease',
    boxShadow: '0 10px 16px rgba(33, 26, 30, 0.06)',
    _hover: {
      transform: 'translateY(-4px)',
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
    width: '24px',
    height: '24px',
    borderRadius: '999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2px',
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
  fontSize: '8px',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontWeight: '700',
  color: 'text.dim',
});

export const weatherMetricValue = css({
  fontSize: '14px',
  fontWeight: '700',
  color: 'text.primary',
});

export const weatherTipCard = css({
  position: 'relative',
  width: '100%',
  backgroundColor: 'var(--weather-accent-light, #FDE8EA)',
  border: '2px solid',
  borderColor: 'var(--weather-accent-light, #FDE8EA)',
  borderRadius: '18px',
  padding: { base: '12px 10px', bp800: '20px 16px' },
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  boxShadow: '0 10px 16px rgba(33, 26, 30, 0.06)',
  flex: 1,
});

export const weatherTipIcon = css({
  position: 'absolute',
  top: '-12px',
  right: '-10px',
  borderRadius: '999px',
  backgroundColor: 'surface.950',
  border: '2px solid',
  borderColor: 'var(--weather-accent-light, #FDE8EA)',
  padding: '6px',
  boxShadow: '0 8px 14px rgba(33, 26, 30, 0.08)',
  color: 'var(--weather-accent, #D64550)',
});

export const weatherTipHeader = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const weatherTipDot = css({
  width: '8px',
  height: '8px',
  borderRadius: '999px',
  backgroundColor: 'var(--weather-accent, #D64550)',
});

export const weatherTipLabel = css({
  fontSize: '10px',
  fontWeight: '800',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--weather-accent, #D64550)',
});

export const weatherTipText = css({
  fontSize: '13px',
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
  gap: '8px',
  paddingTop: '10px',
  borderTop: '2px solid',
  borderColor: 'var(--weather-footer-border, rgba(214, 69, 80, 0.25))',
  marginTop: 'auto',
});

export const weatherRefreshGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const weatherRefreshButton = css({
  width: '32px',
  height: '32px',
  borderRadius: '999px',
  border: '2px solid',
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
  fontSize: '10px',
  fontWeight: '700',
  color: 'text.dim',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  padding: '4px 8px',
  borderRadius: '999px',
  border: '1px solid',
  borderColor: 'surface.700',
});

export const weatherDetailsButton = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 8px',
  borderRadius: '999px',
  border: '2px solid',
  borderColor: 'var(--weather-accent, #D64550)',
  backgroundColor: 'surface.950',
  color: 'var(--weather-accent, #D64550)',
  fontSize: '10px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  transition: 'all 0.2s ease',
  _hover: {
    backgroundColor: 'var(--weather-accent, #D64550)',
    color: 'white',
    transform: 'translate(2px, 2px)',
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
  border: '1px solid',
  borderColor: 'surface.700',
  borderRadius: '16px',
  padding: '16px',
  fontSize: '13px',
  fontWeight: '600',
  color: 'text.muted',
  textAlign: 'center',
});
