import { css } from '../../../../../styled-system/css';
import { weatherBorder, weatherCircle, weatherPill, weatherSoftShadow } from './weatherTokens';

export const weatherTipCard = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75em',
  flex: 1,
  minHeight: 0,
});

export const weatherTipItem = css({
  position: 'relative',
  width: '100%',
  flex: 1,
  minHeight: 0,
  backgroundColor: 'var(--weather-accent-light, #FDE8EA)',
  border: '0.125em solid',
  borderColor: 'var(--weather-accent-light, #FDE8EA)',
  borderRadius: '1.125em',
  padding: { base: '0.75em 0.625em', bp800: '1.25em 1em' },
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5em',
  ...weatherSoftShadow,
});

export const weatherTipIcon = css({
  position: 'absolute',
  top: '-0.75em',
  right: '-0.625em',
  ...weatherCircle,
  backgroundColor: 'surface.950',
  border: '0.125em solid',
  borderColor: 'var(--weather-accent-light, #FDE8EA)',
  padding: '0.375em',
  boxShadow: '0 0.5em 0.875em rgba(33, 26, 30, 0.08)',
  color: 'var(--weather-accent, #D64550)',
});

export const weatherTipHeader = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
});

export const weatherTipDot = css({
  width: '0.5em',
  height: '0.5em',
  borderRadius: '999em',
  backgroundColor: 'var(--weather-accent, #D64550)',
});

export const weatherTipLabel = css({
  ...weatherPill,
  fontWeight: '800',
  letterSpacing: '0.16em',
  color: 'var(--weather-accent, #D64550)',
  fontSize: { base: '0.625em', bp1400: '0.88em', bp1440: '1em' },
});

export const weatherTipText = css({
  fontSize: { base: '0.8125em', bp1400: '1.2em', bp1440: '1.4em' },
  fontWeight: '600',
  color: 'text.subtle',
  lineHeight: 1.4,
});

export const weatherTipFooter = css({
  marginTop: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const weatherTipNav = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
});

export const weatherTipNavButton = css({
  ...weatherCircle,
  ...weatherBorder,
  width: { base: '1.75em', bp1440: '2em' },
  height: { base: '1.75em', bp1440: '2em' },
  backgroundColor: 'surface.950',
  color: 'text.muted',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 0.25em 0.5em rgba(33, 26, 30, 0.08)',
  _hover: {
    color: 'var(--weather-accent, #D64550)',
    borderColor: 'var(--weather-accent-light, #FDE8EA)',
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
});

export const weatherTipCounter = css({
  fontSize: { base: '0.65em', bp1400: '0.92em', bp1440: '1.05em' },
  fontWeight: '700',
  letterSpacing: '0.12em',
  color: 'text.dim',
});
