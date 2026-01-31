import { css } from '../../../../../styled-system/css';
import { weatherBorder, weatherCircle, weatherPill } from './weatherTokens';

export const weatherFooter = css({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5em',
  paddingTop: '0.625em',
  borderTop: '0.125em solid',
  borderColor: 'var(--weather-footer-border, rgba(214, 69, 80, 0.25))',
  minHeight: 0,
});

export const weatherRefreshGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75em',
});

export const weatherRefreshButton = css({
  width: '2em',
  height: '2em',
  ...weatherCircle,
  ...weatherBorder,
  backgroundColor: 'surface.950',
  color: 'text.muted',
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
  ...weatherPill,
  color: 'text.dim',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  padding: '0.25em 0.5em',
  border: '0.0625em solid',
  borderColor: 'surface.700',
});

export const weatherDetailsButton = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25em',
  padding: '0.25em 0.5em',
  ...weatherPill,
  border: '0.125em solid',
  borderColor: 'var(--weather-accent, #D64550)',
  backgroundColor: 'surface.950',
  color: 'var(--weather-accent, #D64550)',
  transition: 'all 0.2s ease',
  _hover: {
    backgroundColor: 'var(--weather-accent, #D64550)',
    color: 'white',
    transform: 'translate(0.125em, 0.125em)',
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
