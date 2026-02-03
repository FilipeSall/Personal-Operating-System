import { css } from '../../../../../styled-system/css';

export const weatherSection = css({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '18px',
  border: '1px solid',
  borderColor: 'var(--calendar-panel-border, token(colors.surface.700))',
  backgroundColor: 'var(--calendar-card-bg, token(colors.surface.950))',
  padding: '8px',
  boxShadow: '0 16px 28px rgba(33, 26, 30, 0.12)',
  fontSize: 'clamp(0.68em, 1vmin, 1em)',
  height: '100%',
  minHeight: 0,
});

export const weatherPanel = css({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  backgroundColor: 'var(--weather-panel-bg, rgba(253, 232, 234, 0.6))',
  padding: '1em',
  display: 'grid',
  gridTemplateRows: 'minmax(0, 1fr)',
  gap: { base: '0.75em', bp800: '1.25em' },
  transition: 'background-color 0.4s ease',
  width: '100%',
  height: '100%',
  minHeight: 0,
  backgroundImage:
    'radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.6), transparent 55%), radial-gradient(circle at 85% 85%, rgba(255, 255, 255, 0.35), transparent 60%)',
});

export const weatherDecorTop = css({
  position: 'absolute',
  top: '-3em',
  right: '-3em',
  width: '9em',
  height: '9em',
  borderRadius: '50%',
  backgroundColor: 'var(--weather-decor-top, rgba(214, 69, 80, 0.3))',
  filter: 'blur(2em)',
  pointerEvents: 'none',
  zIndex: 0,
  transition: 'background-color 0.4s ease',
  opacity: 0.6,
});

export const weatherDecorBottom = css({
  position: 'absolute',
  bottom: '-1em',
  left: '-2.5em',
  width: '8.5em',
  height: '8.5em',
  borderRadius: '50%',
  backgroundColor: 'var(--weather-decor-bottom, rgba(191, 58, 68, 0.25))',
  transition: 'background-color 0.4s ease',
  filter: 'blur(2em)',
  pointerEvents: 'none',
  zIndex: 0,
  opacity: 0.6,
});

export const weatherTop = css({
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  gridTemplateColumns: '0.6fr 1.4fr',
  alignItems: 'stretch',
  gap: { base: '0.75em', bp800: '1.25em' },
  height: '100%',
  minHeight: 0,
  paddingTop: '0.5em',
  paddingBottom: '0.25em',
  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
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
  width: '10em',
  height: '10em',
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
