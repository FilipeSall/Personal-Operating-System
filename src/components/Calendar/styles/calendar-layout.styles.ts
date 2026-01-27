import { css } from '../../../../styled-system/css';

export const calendarContainer = css({
  display: 'grid',
  gridTemplateRows: '4fr 2fr',
  gap: '16px',
  backgroundColor: 'surface.950',
  width: '100%',
  height: '100%',
});

export const calendarSection = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: 0,
  overflow: 'hidden',
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'surface.950',
  borderRadius: '4px 4px 4px 0',
  padding: '16px',
  boxShadow: `
    0 1px 1px rgba(0, 0, 0, 0.08),
    0 2px 2px rgba(0, 0, 0, 0.06),
    0 4px 4px rgba(0, 0, 0, 0.05),
    0 8px 8px rgba(0, 0, 0, 0.04),
    0 16px 16px rgba(0, 0, 0, 0.03)
  `,
  border: '1px solid',
  borderColor: 'surface.700',
  backgroundImage: `
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 40%,
      transparent 60%,
      rgba(0, 0, 0, 0.02) 100%
    )
  `,
  _before: {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    height: '6px',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent)',
    borderRadius: '4px 4px 0 0',
    zIndex: 3,
    pointerEvents: 'none',
  },
});
