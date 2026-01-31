import { css } from '../../../../../styled-system/css';
import { weatherCircle, weatherPill, weatherSoftShadow } from './weatherTokens';

export const weatherTipCard = css({
  position: 'relative',
  width: '100%',
  backgroundColor: 'var(--weather-accent-light, #FDE8EA)',
  border: '0.125em solid',
  borderColor: 'var(--weather-accent-light, #FDE8EA)',
  borderRadius: '1.125em',
  padding: { base: '0.75em 0.625em', bp800: '1.25em 1em' },
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5em',
  ...weatherSoftShadow,
  flex: 1,
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
});

export const weatherTipText = css({
  fontSize: '0.8125em',
  fontWeight: '600',
  color: 'text.subtle',
  lineHeight: 1.4,
});
