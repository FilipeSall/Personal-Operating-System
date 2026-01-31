import { css } from '../../../../../styled-system/css';
import { weatherBorder, weatherPill } from './weatherTokens';

export const weatherSummary = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1.5em',
  width: '100%',
});

export const weatherEmojiWrapper = css({
  width: { base: '5em', bp800: '7em' },
  height: { base: '4.25em', bp800: '6em' },
  borderRadius: '1.5em',
  backgroundColor: 'surface.950',
  ...weatherBorder,
  boxShadow: '0 0.75em 1.25em rgba(33, 26, 30, 0.08)',
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
  gap: '0.5em',
});

export const weatherDateBadge = css({
  ...weatherPill,
  color: 'text.dim',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '0.0625em solid',
  borderColor: 'surface.700',
  padding: '0.25em 0.625em',
  alignSelf: 'flex-start',
});

export const weatherTemperatureRow = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.375em',
});

export const weatherTemperatureValue = css({
  fontSize: { base: '2.5em', bp800: '4em' },
  fontWeight: '800',
  color: 'text.primary',
  lineHeight: 1,
});

export const weatherTemperatureUnit = css({
  fontSize: { base: '1.25em', bp800: '1.75em' },
  fontWeight: '700',
  color: 'text.muted',
  marginTop: { base: '0.25em', bp800: '0.375em' },
});

export const weatherConditionBadge = css({
  fontSize: '0.875em',
  fontWeight: '700',
  color: 'text.subtle',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '0.0625em solid',
  borderColor: 'surface.700',
  padding: '0.25em 0.625em',
  borderRadius: '0.75em',
  alignSelf: 'flex-start',
});

export const weatherLocationRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25em',
  fontSize: '0.75em',
  fontWeight: '600',
  color: 'text.muted',
});
