import { css, cva } from '../../../../styled-system/css';

export const weekdaysRow = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  backgroundColor: 'surface.900',
  borderBottom: '1px solid',
  borderTop: '1px solid',
  borderColor: 'surface.700',
  position: 'relative',
  backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)',
});

export const weekdayHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 0',
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
    backgroundColor: 'surface.700',
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
  backgroundColor: 'surface.700',
  gap: '1px',
  overflow: 'hidden',
  minHeight: 0,
  borderRadius: '0 0 4px 0',
});

export const dayCell = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'surface.950',
    padding: '6px 8px',
    gap: '3px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    overflow: 'hidden',
    height: '100%',
    position: 'relative',
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: 'surface.900',
        boxShadow: 'inset 0 0 0 1px token(colors.brand.500/30)',
      },
    },
    isToday: {
      true: {
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 50%)',
      },
    },
    isOutsideMonth: {
      true: {
        backgroundColor: 'surface.950',
        opacity: 0.4,
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
          backgroundColor: 'surface.900',
          backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)',
        },
      },
    },
  ],
});

export const dayNumber = cva({
  base: {
    fontSize: '12px',
    fontWeight: '500',
    padding: '2px 6px',
    marginBottom: '4px',
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
        backgroundColor: 'brand.500',
        color: 'white',
        borderRadius: '8px',
        width: '26px',
        height: '26px',
        padding: '0',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        fontSize: '13px',
        boxShadow: '0 2px 6px rgba(214, 69, 80, 0.35)',
      },
    },
    isToday: {
      true: {
        color: 'brand.500',
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
          backgroundColor: 'brand.500',
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
