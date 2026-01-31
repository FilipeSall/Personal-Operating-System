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
  padding: { base: '0.75em', bp800: '1.75em' },
  display: 'grid',
  gridTemplateRows: '7fr 3fr',
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
  gridTemplateColumns: { base: '1fr', bp800: '1fr 1fr' },
  alignItems: { base: 'start', bp800: 'center' },
  gap: { base: '0.625em', bp800: '1.5em' },
  minHeight: 0,
});

export const weatherStatusCard = css({
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'surface.950',
  border: '0.0625em solid',
  borderColor: 'surface.700',
  borderRadius: '1em',
  padding: '1em',
  fontSize: '0.8125em',
  fontWeight: '600',
  color: 'text.muted',
  textAlign: 'center',
});
