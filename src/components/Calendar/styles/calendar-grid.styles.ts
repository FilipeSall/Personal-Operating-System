import { css, cva } from '../../../../styled-system/css';

export const weekdaysRow = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderBottom: '1px solid',
  borderTop: '1px solid',
  borderColor: 'var(--calendar-panel-border, token(colors.surface.700))',
  position: 'relative',
  backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, transparent 100%)',
});

export const weekdayHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 0',
  fontSize: '10px',
  fontWeight: '700',
  color: 'text.muted',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  position: 'relative',
  _after: {
    content: '""',
    position: 'absolute',
    right: '0',
    top: '25%',
    height: '50%',
    width: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  _last: {
    _after: {
      display: 'none',
    },
  },
});

export const calendarGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gridAutoRows: '1fr',
  flex: 1,
  backgroundColor: 'var(--calendar-grid-bg, rgba(0, 0, 0, 0.06))',
  gap: '6px',
  overflow: 'hidden',
  minHeight: 0,
  borderRadius: '0 0 16px 16px',
  padding: '6px',
});

export const dayCell = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--calendar-card-bg, token(colors.surface.950))',
    padding: '8px 10px',
    gap: '4px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    overflow: 'hidden',
    height: '100%',
    position: 'relative',
    borderRadius: '12px',
    border: '1px solid rgba(0, 0, 0, 0.04)',
    boxShadow: '0 8px 12px rgba(33, 26, 30, 0.06)',
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'var(--weather-accent, token(colors.brand.500))',
        boxShadow: '0 12px 18px var(--weather-accent-shadow, rgba(214, 69, 80, 0.2))',
      },
    },
    isToday: {
      true: {
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, transparent 70%)',
      },
    },
    isOutsideMonth: {
      true: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        opacity: 0.5,
      },
    },
    hasEvents: {
      true: {},
    },
  },
  compoundVariants: [
    {
      isSelected: false,
      isOutsideMonth: false,
      css: {
        _hover: {
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          transform: 'translateY(-2px)',
          boxShadow: '0 14px 22px rgba(33, 26, 30, 0.12)',
        },
      },
    },
  ],
});

export const dayNumber = cva({
  base: {
    fontSize: '12px',
    fontWeight: '600',
    padding: '2px 6px',
    marginBottom: '6px',
    display: 'inline-flex',
    alignSelf: 'flex-start',
    color: 'text.subtle',
    borderRadius: '6px',
    transition: 'all 0.15s ease',
    lineHeight: '1.4',
    position: 'relative',
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: 'var(--weather-accent, token(colors.brand.500))',
        color: 'white',
        borderRadius: '8px',
        width: '26px',
        height: '26px',
        padding: '0',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        fontSize: '13px',
        boxShadow: '0 2px 6px var(--weather-accent-shadow, rgba(214, 69, 80, 0.35))',
      },
    },
    isToday: {
      true: {
        color: 'var(--weather-accent, token(colors.brand.500))',
        fontWeight: '700',
        _after: {
          content: '""',
          position: 'absolute',
          bottom: '-2px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: 'var(--weather-accent, token(colors.brand.500))',
        },
      },
    },
    isOutsideMonth: {
      true: {
        color: 'text.faint',
      },
    },
  },
  compoundVariants: [
    {
      isToday: true,
      isSelected: true,
      css: {
        color: 'white',
        _after: {
          display: 'none',
        },
      },
    },
  ],
});
