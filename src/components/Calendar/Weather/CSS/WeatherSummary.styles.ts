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
  width: 'clamp(7.5em, 12vw, 11em)',
  aspectRatio: '1',
  borderRadius: '2em',
  backgroundColor: 'surface.950',
  backgroundImage:
    'radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.55), transparent 55%), radial-gradient(circle at 80% 75%, rgba(255, 255, 255, 0.35), transparent 60%)',
  ...weatherBorder,
  boxShadow: '0 1.2em 1.8em rgba(33, 26, 30, 0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  _before: {
    content: '""',
    position: 'absolute',
    inset: '0.65em',
    borderRadius: '1.6em',
    border: '0.08em dashed rgba(33, 26, 30, 0.2)',
    pointerEvents: 'none',
  },
  '@media (max-width: 425px)': {
    width: '7.25em',
  },
});

export const weatherEmoji = css({
  width: '82%',
  height: '82%',
});

export const weatherSummaryText = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75em',
  flex: 1,
  minWidth: 0,
  alignItems: 'flex-start',
  width: '100%',
  padding: '0.35em 0.15em',
});

export const weatherDateBadge = css({
  ...weatherPill,
  color: 'text.dim',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '0.0625em solid',
  borderColor: 'surface.700',
  padding: '0.3em 0.8em',
  fontSize: { base: '0.65em', bp1440: '0.78em' },
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  alignSelf: 'stretch',
  textAlign: 'center',
});

export const weatherTemperatureRow = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.35em',
});

export const weatherTemperatureValue = css({
  fontSize: { base: '2.9em', bp800: '4.5em' },
  fontWeight: '800',
  color: 'text.primary',
  lineHeight: 1,
  letterSpacing: '-0.02em',
});

export const weatherTemperatureUnit = css({
  fontSize: { base: '1.35em', bp800: '1.9em' },
  fontWeight: '700',
  color: 'text.muted',
  marginTop: { base: '0.2em', bp800: '0.3em' },
});

export const weatherConditionBadge = css({
  fontSize: '0.92em',
  fontWeight: '700',
  color: 'text.primary',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  border: '0.0625em solid rgba(120, 124, 130, 0.2)',
  padding: '0.3em 0.9em',
  borderRadius: '999px',
  alignSelf: 'flex-start',
  letterSpacing: '0.01em',
});

export const weatherLocationRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.45em',
  fontSize: '0.86em',
  fontWeight: '600',
  color: 'text.muted',
});

export const weatherLocationIcon = css({
  width: '1.55em',
  height: '1.55em',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  border: '0.0625em solid rgba(120, 124, 130, 0.2)',
  color: 'text.subtle',
});

export const weatherEmojiContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.65em',
  padding: '0.85em 0.9em',
  borderRadius: '1.4em',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  boxShadow: '0 1.1em 1.8em rgba(33, 26, 30, 0.08)',
  border: '0.0625em solid rgba(120, 124, 130, 0.18)',
});

export const weatherTagsRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  marginTop: '0.3em',
});

export const weatherTag = css({
  ...weatherPill,
  fontSize: '0.7em',
  fontWeight: '600',
  color: 'text.muted',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  border: '0.0625em solid rgba(120, 124, 130, 0.18)',
  padding: '0.2em 0.5em',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25em',
  whiteSpace: 'nowrap',
  '@media (min-width: 1440px)': {
    fontSize: '0.8em',
    padding: '0.25em 0.6em',
  },
});
