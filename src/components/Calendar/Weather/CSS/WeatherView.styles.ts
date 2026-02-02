import { css } from '../../../../../styled-system/css';
import { weatherBorder } from './weatherTokens';

export const weatherSection = css({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '2.5em',
  ...weatherBorder,
  backgroundColor: 'surface.950',
  padding: '0.25em',
  boxShadow: '0 1.125em 2em rgba(33, 26, 30, 0.08)',
  fontSize: 'clamp(0.65em, 1vmin, 1em)',
  height: '100%',
  minHeight: 0,
});

export const weatherPanel = css({
  position: 'relative',
  overflow: 'visible',
  borderRadius: '2.25em',
  backgroundColor: 'var(--weather-panel-bg, rgba(253, 232, 234, 0.6))',
  padding: '1em 1.25em',
  display: 'grid',
  gridTemplateRows: '8fr 2fr',
  gap: { base: '0.625em', bp800: '1.5em' },
  transition: 'background-color 0.4s ease',
  width: '100%',
  height: '100%',
  maxHeight: '70vmin',
});

export const weatherDecorTop = css({
  position: 'absolute',
  top: '-2.5em',
  right: '-2.5em',
  width: '10em',
  height: '10em',
  borderRadius: '50%',
  backgroundColor: 'var(--weather-decor-top, rgba(214, 69, 80, 0.3))',
  filter: 'blur(1.5em)',
  pointerEvents: 'none',
  zIndex: 0,
  transition: 'background-color 0.4s ease',
});

export const weatherDecorBottom = css({
  position: 'absolute',
  bottom: '0.75em',
  left: '-2em',
  width: '8em',
  height: '8em',
  borderRadius: '50%',
  backgroundColor: 'var(--weather-decor-bottom, rgba(191, 58, 68, 0.25))',
  transition: 'background-color 0.4s ease',
  filter: 'blur(1.5em)',
  pointerEvents: 'none',
  zIndex: 0,
});

export const weatherTop = css({
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  alignItems: 'center',
  gap: { base: '0.625em', bp800: '1.5em' },
  minHeight: 0,
});

export const weatherStatusCard = css({
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'surface.950',
  border: '0.08em dashed rgba(214, 69, 80, 0.35)',
  borderRadius: '1.4em',
  padding: { base: '1.4em 1.2em', bp800: '1.8em 2em' },
  textAlign: 'center',
  display: 'grid',
  gap: '0.6em',
  justifyItems: 'center',
  boxShadow: '0 1em 1.6em rgba(33, 26, 30, 0.08)',
});

export const weatherStatusIcon = css({
  width: '6em',
  height: '6em',
  borderRadius: '1em',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(214, 69, 80, 0.12)',
  color: 'var(--weather-accent, #D64550)',
});

export const weatherStatusIconLarge = css({
  width: '12em',
  height: '12em',
});

export const weatherStatusSpinner = css({
  width: '1.6em',
  height: '1.6em',
  borderRadius: '50%',
  border: '0.2em solid rgba(214, 69, 80, 0.2)',
  borderTopColor: 'var(--weather-accent, #D64550)',
  animation: 'spin 0.9s linear infinite',
});

export const weatherStatusLottieContainer = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'clamp(4em, 9vmin, 5.5em)',
  height: 'clamp(4em, 9vmin, 5.5em)',
  marginBottom: '0.6em',
});

export const weatherStatusLottiePlayer = css({
  width: '100%',
  height: '100%',
});

export const weatherStatusBadge = css({
  textAlign: 'center',
  fontSize: '0.6em',
  fontWeight: '800',
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  color: 'var(--weather-accent, #D64550)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
  height: '2em',
  padding: '0.25em 0.8em',
  borderRadius: '999px',
  border: '0.08em solid rgba(214, 69, 80, 0.3)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
});

export const weatherStatusTitle = css({
  fontSize: { base: '1.15em', bp800: '1.3em' },
  fontWeight: '800',
  color: 'text.primary',
  letterSpacing: '-0.01em',
});

export const weatherStatusMessage = css({
  fontSize: { base: '0.86em', bp800: '0.92em' },
  fontWeight: '600',
  color: 'text.muted',
  maxWidth: '28em',
});

export const weatherStatusDetail = css({
  fontSize: '0.75em',
  color: 'text.dim',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  border: '0.08em solid rgba(120, 124, 130, 0.2)',
  borderRadius: '0.9em',
  padding: '0.5em 0.8em',
  maxWidth: '30em',
});
