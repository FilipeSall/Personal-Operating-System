import { css } from '../../../../styled-system/css';

export const calendarShell = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: 0,
  borderRadius: { base: '24px', bp800: '32px' },
  padding: { base: '12px', bp800: '20px' },
  background: 'var(--calendar-shell-bg, linear-gradient(135deg, #FFF7ED 0%, #FDE8EA 100%))',
  boxShadow: '0 30px 60px rgba(33, 26, 30, 0.16)',
  transition: 'background 0.6s ease, box-shadow 0.6s ease',
  overflow: 'hidden',
  _before: {
    content: '""',
    position: 'absolute',
    inset: '0',
    backgroundImage:
      'var(--calendar-shell-overlay, radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.9), transparent 55%))',
    opacity: 0.8,
    pointerEvents: 'none',
    animation: 'floatSlow 18s ease-in-out infinite',
  },
  _after: {
    content: '""',
    position: 'absolute',
    inset: '0',
    backgroundImage:
      'var(--calendar-shell-pattern, radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px))',
    backgroundSize: '20px 20px',
    opacity: 0.35,
    pointerEvents: 'none',
    animation: 'drift 26s linear infinite',
  },
});

export const calendarLayout = css({
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  gridTemplateColumns: { base: '1fr', bp800: '1fr minmax(240px, 0.32fr)' },
  gridTemplateRows: { base: 'auto auto', bp800: '1fr' },
  gap: { base: '12px', bp800: '18px' },
  height: '100%',
  minHeight: 0,
});

export const calendarMain = css({
  display: 'grid',
  gridTemplateRows: {
    base: 'minmax(0, 1fr) minmax(0, 0.55fr)',
    bp800: 'minmax(0, 1fr) minmax(0, 0.45fr)',
  },
  gap: { base: '12px', bp800: '16px' },
  minHeight: 0,
  backgroundColor: 'var(--calendar-main-bg, rgba(255, 255, 255, 0.6))',
  borderRadius: { base: '18px', bp800: '22px' },
  padding: { base: '10px', bp800: '14px' },
  border: '1px solid',
  borderColor: 'var(--calendar-panel-border, token(colors.surface.700))',
  boxShadow: '0 18px 32px rgba(33, 26, 30, 0.1)',
  transition: 'background-color 0.4s ease, border-color 0.4s ease',
  overflow: 'hidden',
});

export const calendarSection = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  overflow: 'hidden',
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'var(--calendar-card-bg, token(colors.surface.950))',
  borderRadius: { base: '16px', bp800: '18px' },
  padding: { base: '12px', bp800: '16px' },
  border: '1px solid',
  borderColor: 'var(--calendar-panel-border, token(colors.surface.700))',
  boxShadow: '0 12px 20px rgba(33, 26, 30, 0.08)',
  backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, transparent 55%)',
});
