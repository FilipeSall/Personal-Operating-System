import { css, cva } from '../../../../styled-system/css';

export const calendarContainer = css({
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
  gap: '24px',
  padding: '28px',
  backgroundColor: 'surface.950',
  borderRadius: '20px',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
  border: '1px solid',
  borderColor: 'surface.700',
});

export const calendarSection = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: 0,
  overflow: 'hidden',
});

export const calendarHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '12px',
  paddingBottom: '16px',
  borderBottom: '1px solid',
  borderColor: 'surface.700',
});

export const calendarTitle = css({
  fontSize: '20px',
  fontWeight: '600',
  color: 'text.primary',
  textTransform: 'capitalize',
  letterSpacing: '-0.01em',
});

export const navButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  backgroundColor: 'surface.900',
  border: 'none',
  borderRadius: '10px',
  color: 'text.muted',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  _hover: {
    backgroundColor: 'surface.800',
    color: 'brand.500',
  },
});

export const calendarGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gridTemplateRows: 'auto repeat(6, 1fr)',
  gap: '6px',
  flex: 1,
  height: '100%',
  minHeight: 0,
  overflow: 'hidden',
});

export const weekdayHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '36px',
  fontSize: '11px',
  fontWeight: '600',
  color: 'text.dim',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const dayCell = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    position: 'relative',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'text.subtle',
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: 'brand.500',
        color: 'surface.950',
        fontWeight: '600',
        boxShadow: '0 2px 8px rgba(214, 69, 80, 0.35)',
      },
    },
    isToday: {
      true: {
        backgroundColor: 'surface.900',
        color: 'brand.500',
        fontWeight: '600',
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
          backgroundColor: 'surface.900',
        },
      },
    },
    {
      isSelected: true,
      isToday: true,
      css: {
        backgroundColor: 'brand.500',
        color: 'surface.950',
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
