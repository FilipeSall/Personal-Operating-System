import { css, cva } from '../../../../styled-system/css';

export const calendarSidebar = css({
  position: 'relative',
  display: 'grid',
  gridTemplateRows: 'auto auto 1fr',
  gap: { base: '12px', bp800: '16px' },
  padding: { base: '12px', bp800: '18px' },
  borderRadius: { base: '18px', bp800: '22px' },
  backgroundColor: 'var(--calendar-sidebar-bg, token(colors.surface.950))',
  border: '1px solid',
  borderColor: 'var(--calendar-panel-border, token(colors.surface.700))',
  boxShadow: '0 16px 32px rgba(33, 26, 30, 0.08)',
  transition: 'background-color 0.4s ease, border-color 0.4s ease',
  overflow: 'hidden',
  minHeight: 0,
  height: '100%',
  _before: {
    content: '""',
    position: 'absolute',
    inset: '0',
    backgroundImage: 'var(--calendar-shell-overlay)',
    opacity: 0.6,
    pointerEvents: 'none',
    animation: 'floatSlow 18s ease-in-out infinite',
  },
  _after: {
    content: '""',
    position: 'absolute',
    inset: '0',
    backgroundImage: 'var(--calendar-shell-pattern)',
    opacity: 0.2,
    pointerEvents: 'none',
    animation: 'drift 26s linear infinite',
  },
});

export const sidebarHeader = css({
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '12px',
});

export const sidebarTitleBlock = css({
  display: 'grid',
  gap: '4px',
});

export const sidebarKicker = css({
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontWeight: '700',
  color: 'text.label',
});

export const sidebarTitle = css({
  fontFamily: '"Bricolage Grotesque", "Manrope", sans-serif',
  fontSize: { base: '18px', bp800: '20px' },
  fontWeight: '700',
  color: 'text.primary',
});

export const sidebarMeta = css({
  fontSize: '12px',
  color: 'text.muted',
  fontWeight: '500',
});

export const timelineControls = css({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  padding: '8px 10px',
  borderRadius: '14px',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  background:
    'linear-gradient(120deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.7))',
  boxShadow: '0 12px 18px rgba(33, 26, 30, 0.08)',
});

export const timelineControlsGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flex: '1 1 auto',
  justifyContent: 'space-between',
});

export const timelineControlsRange = css({
  fontSize: '12px',
  fontWeight: '700',
  color: 'text.primary',
  letterSpacing: '0.04em',
});

export const timelineControlsButton = css({
  height: '32px',
  width: '32px',
  borderRadius: '10px',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: 'text.primary',
  display: 'grid',
  placeItems: 'center',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
  _hover: {
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 12px rgba(33, 26, 30, 0.12)',
  },
  _disabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
    boxShadow: 'none',
    transform: 'none',
  },
});


export const calendarTimeline = css({
  position: 'relative',
  zIndex: 1,
  overflow: 'hidden',
  paddingBottom: '8px',
  display: 'grid',
  gap: { base: '10px', bp800: '14px' },
  '--timeline-hour-column': { base: '52px', bp800: '78px' },
  '--timeline-dot-size': { base: '8px', bp800: '10px' },
  '--timeline-dot-column': { base: '18px', bp800: '24px' },
  '--timeline-line-x': { base: '7px', bp800: '9px' },
  _before: {
    content: '""',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: 'var(--timeline-line-x)',
    width: '1px',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.12), rgba(0,0,0,0.04))',
  },
});

export const timelineRow = css({
  display: 'grid',
  gridTemplateColumns:
    'var(--timeline-hour-column) minmax(0, 1fr) var(--timeline-dot-column)',
  gap: { base: '8px', bp800: '14px' },
  alignItems: 'flex-start',
  minHeight: '40px',
  position: 'relative',
});

export const timelineHour = css({
  display: 'flex',
  alignItems: 'center',
  fontSize: '12px',
  fontWeight: '700',
  color: 'text.dim',
  fontVariantNumeric: 'tabular-nums',
  position: 'relative',
  paddingTop: '2px',
});

export const timelineHourButton = css({
  border: 'none',
  background: 'transparent',
  padding: 0,
  fontSize: '12px',
  fontWeight: '700',
  color: 'text.dim',
  cursor: 'pointer',
  textDecoration: 'none',
});

export const timelineConnector = css({
  position: 'absolute',
  top: '7px',
  left: 'calc(var(--timeline-hour-column) + 6px)',
  right: 'var(--timeline-line-x)',
  height: '1px',
  background:
    'linear-gradient(90deg, rgba(0,0,0,0.08), rgba(0,0,0,0.12), rgba(0,0,0,0.2))',
  opacity: 0.8,
  pointerEvents: 'none',
});

export const timelineDotWrapper = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingRight: '4px',
  paddingTop: '2px',
});

export const timelineWeatherDot = css({
  width: 'var(--timeline-dot-size)',
  height: 'var(--timeline-dot-size)',
  borderRadius: '999px',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  boxShadow: '0 0 0 5px rgba(0, 0, 0, 0.04)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&[data-tone="sunny"]': {
    backgroundColor: 'rgba(248, 200, 72, 0.95)',
    boxShadow: '0 0 0 5px rgba(248, 200, 72, 0.18)',
  },
  '&[data-tone="rain"]': {
    backgroundColor: 'rgba(59, 130, 246, 0.95)',
    boxShadow: '0 0 0 5px rgba(59, 130, 246, 0.18)',
  },
  '&[data-tone="cloudy"]': {
    backgroundColor: 'rgba(148, 163, 184, 0.95)',
    boxShadow: '0 0 0 5px rgba(148, 163, 184, 0.18)',
  },
  '&[data-tone="cold"]': {
    backgroundColor: 'rgba(56, 189, 248, 0.95)',
    boxShadow: '0 0 0 5px rgba(56, 189, 248, 0.18)',
  },
  '&[data-tone="night"]': {
    backgroundColor: 'rgba(71, 85, 105, 0.9)',
    boxShadow: '0 0 0 5px rgba(71, 85, 105, 0.18)',
  },
  '&[data-current="true"]': {
    transform: 'scale(1.35)',
    boxShadow: '0 0 0 7px var(--weather-accent-light, rgba(214, 69, 80, 0.2))',
  },
});

export const timelineTasks = css({
  display: 'grid',
  gap: '8px',
});

export const timelineTaskToggle = css({
  width: 'fit-content',
  padding: '6px 10px',
  borderRadius: '999px',
  border: '1px dashed rgba(0, 0, 0, 0.12)',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  fontSize: '11px',
  fontWeight: '600',
  color: 'text.primary',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  _hover: {
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 12px rgba(33, 26, 30, 0.12)',
  },
});

export const timelineTask = cva({
  base: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    gap: { base: '6px', bp800: '8px' },
    padding: { base: '6px 8px', bp800: '8px 12px' },
    borderRadius: '14px',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    boxShadow: '0 8px 16px rgba(33, 26, 30, 0.08)',
    fontSize: '13px',
    fontWeight: '600',
    color: 'text.primary',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    _hover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 12px 18px rgba(33, 26, 30, 0.12)',
    },
  },
  variants: {
    type: {
      work: {
        borderColor: 'rgba(214, 69, 80, 0.2)',
        backgroundColor: 'rgba(253, 232, 234, 0.75)',
      },
      routine: {
        borderColor: 'rgba(234, 179, 8, 0.2)',
        backgroundColor: 'rgba(254, 243, 199, 0.75)',
      },
      reminder: {
        borderColor: 'rgba(59, 130, 246, 0.2)',
        backgroundColor: 'rgba(219, 234, 254, 0.75)',
      },
      personal: {
        borderColor: 'rgba(168, 85, 247, 0.2)',
        backgroundColor: 'rgba(237, 233, 254, 0.75)',
      },
      study: {
        borderColor: 'rgba(16, 185, 129, 0.2)',
        backgroundColor: 'rgba(209, 250, 229, 0.75)',
      },
      health: {
        borderColor: 'rgba(239, 68, 68, 0.2)',
        backgroundColor: 'rgba(254, 226, 226, 0.75)',
      },
      finance: {
        borderColor: 'rgba(249, 115, 22, 0.2)',
        backgroundColor: 'rgba(255, 237, 213, 0.75)',
      },
    },
  },
});

export const timelineTaskTime = css({
  fontSize: '11px',
  fontWeight: '700',
  color: 'text.muted',
  fontVariantNumeric: 'tabular-nums',
});

export const timelineTaskTitle = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const timelineTaskIcon = css({
  width: '18px',
  height: '18px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
});

export const timelineEmpty = css({
  fontSize: '11px',
  color: 'text.faint',
  fontStyle: 'italic',
});
