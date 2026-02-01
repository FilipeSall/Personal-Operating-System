import { css } from '../../../../../styled-system/css';
import { weatherBorder, weatherPill } from './weatherTokens';

export const weatherSummary = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1.75em',
  maxWidth: '100%',
  padding: '0 2em',
  borderRight: '0.0625em solid',
  borderColor: 'rgba(120, 124, 130, 0.15)',
  '@media (min-width: 768px) and (max-width: 1024px)': {
    padding: '0',
  },
  '@media (max-width: 425px)': {
    padding: '0 1em',
  },
});

export const weatherEmojiWrapper = css({
  width: 'clamp(7em, 10vw, 10em)',
  borderRadius: '1.75em',
  backgroundColor: 'surface.950',
  ...weatherBorder,
  boxShadow: '0 0.9em 1.35em rgba(33, 26, 30, 0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 425px)': {
    width: '7em',
  },
});

export const weatherEmoji = css({
  width: '100%',
  height: '100%',
});

export const weatherSummaryText = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6em',
  flex: 1,
  minWidth: 0,
  alignItems: 'center',
});

export const weatherDateBadge = css({
  ...weatherPill,
  color: 'text.dim',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '0.0625em solid',
  borderColor: 'surface.700',
  padding: '0.25em 0.625em',
});

export const weatherTemperatureRow = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.45em',
});

export const weatherTemperatureValue = css({
  fontSize: { base: '2.8em', bp800: '4.4em' },
  fontWeight: '800',
  color: 'text.primary',
  lineHeight: 1,
});

export const weatherTemperatureUnit = css({
  fontSize: { base: '1.35em', bp800: '1.9em' },
  fontWeight: '700',
  color: 'text.muted',
  marginTop: { base: '0.3em', bp800: '0.4em' },
});

export const weatherConditionBadge = css({
  fontSize: '0.95em',
  fontWeight: '700',
  color: 'text.subtle',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '0.0625em solid',
  borderColor: 'surface.700',
  padding: '0.28em 0.7em',
  borderRadius: '0.85em',
});

export const weatherLocationRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.3em',
  fontSize: '0.85em',
  fontWeight: '600',
  color: 'text.muted',
});
