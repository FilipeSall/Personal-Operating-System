import { css, cva } from '../../../../styled-system/css';

export const calendarContainer = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '24px',
  backgroundColor: 'surface.900',
  borderRadius: '16px',
  maxWidth: '400px',
  fontFamily: 'system-ui, sans-serif',
});

export const calendarHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '8px',
});

export const calendarTitle = css({
  fontSize: '18px',
  fontWeight: '600',
  color: 'text.primary',
  textTransform: 'capitalize',
});

export const navButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '8px',
  color: 'text.muted',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: 'surface.700',
    color: 'text.primary',
  },
});

export const calendarGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '4px',
});

export const weekdayHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '32px',
  fontSize: '12px',
  fontWeight: '500',
  color: 'text.dim',
  textTransform: 'uppercase',
});

export const dayCell = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'text.subtle',
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: 'brand.500',
        color: 'text.primary',
      },
    },
    isToday: {
      true: {
        border: '2px solid',
        borderColor: 'brand.500',
      },
    },
    isOutsideMonth: {
      true: {
        color: 'text.faint',
        cursor: 'default',
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
          backgroundColor: 'surface.700',
        },
      },
    },
  ],
});

export const eventIndicator = css({
  position: 'absolute',
  bottom: '4px',
  display: 'flex',
  gap: '2px',
});

export const eventDot = css({
  width: '4px',
  height: '4px',
  borderRadius: '50%',
});
