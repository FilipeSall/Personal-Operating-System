import { css, cva } from '../../../../styled-system/css';

export const calendarHeader = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  paddingBottom: '16px',
  borderBottom: '1px solid',
  borderColor: 'surface.700',
  marginBottom: '0',
});

export const calendarHeaderTop = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
});

export const dateCardWrapper = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  position: 'relative',
});

export const dateCardButton = css({
  position: 'relative',
  border: 'none',
  borderRadius: '4px 4px 6px 6px',
  padding: '10px 14px 12px',
  textAlign: 'center',
  minWidth: '58px',
  backgroundColor: 'amber.200',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: `
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.08),
    inset 0 -2px 0 rgba(0, 0, 0, 0.05)
  `,
  _before: {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '70%',
    height: '3px',
    backgroundColor: 'amber.400',
    borderRadius: '0 0 2px 2px',
  },
  _after: {
    content: '""',
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '12px',
    height: '12px',
    background: 'linear-gradient(135deg, transparent 50%, rgba(0, 0, 0, 0.06) 50%)',
    borderRadius: '0 0 6px 0',
  },
  _hover: {
    transform: 'translateY(-2px) rotate(-1deg)',
    boxShadow: `
      0 4px 8px rgba(0, 0, 0, 0.12),
      0 8px 16px rgba(0, 0, 0, 0.1),
      inset 0 -2px 0 rgba(0, 0, 0, 0.05)
    `,
  },
  _active: {
    transform: 'translateY(0)',
  },
});

export const dateCardButtonMonth = css({
  fontSize: '9px',
  color: 'amber.900',
  textTransform: 'uppercase',
  fontWeight: '800',
  letterSpacing: '0.08em',
  marginBottom: '2px',
});

export const dateCardButtonDay = css({
  fontSize: '22px',
  fontWeight: '800',
  color: 'amber.950',
  lineHeight: '1',
});

export const datePickerDropdown = css({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: '0',
  zIndex: 100,
  backgroundColor: '#FFFEF8',
  border: 'none',
  borderRadius: '4px 4px 6px 6px',
  padding: '20px 16px 16px',
  minWidth: '220px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  boxShadow: `
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.08),
    inset 0 -2px 0 rgba(0, 0, 0, 0.03)
  `,
  _before: {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: '4px',
    backgroundColor: '#E8E8E0',
    borderRadius: '0 0 2px 2px',
  },
  _after: {
    content: '""',
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '16px',
    height: '16px',
    background: 'linear-gradient(135deg, transparent 50%, rgba(0, 0, 0, 0.04) 50%)',
    borderRadius: '0 0 6px 0',
  },
});

export const datePickerSection = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const datePickerLabel = css({
  fontSize: '11px',
  fontWeight: '600',
  color: 'text.muted',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const monthGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '4px',
});

export const monthButton = cva({
  base: {
    padding: '8px 4px',
    fontSize: '12px',
    fontWeight: '500',
    color: 'text.subtle',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    _hover: {
      backgroundColor: 'surface.800',
      color: 'text.primary',
    },
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: 'brand.500',
        color: 'white',
        fontWeight: '600',
        _hover: {
          backgroundColor: 'brand.600',
          color: 'white',
        },
      },
    },
  },
});

export const yearSelector = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const yearButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  backgroundColor: 'surface.800',
  border: 'none',
  borderRadius: '6px',
  color: 'text.muted',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  _hover: {
    backgroundColor: 'surface.700',
    color: 'text.primary',
  },
});

export const yearInput = css({
  flex: 1,
  textAlign: 'center',
  fontSize: '15px',
  fontWeight: '600',
  color: 'text.primary',
  backgroundColor: 'transparent',
  border: '1px solid transparent',
  borderRadius: '6px',
  padding: '4px 8px',
  width: '70px',
  outline: 'none',
  transition: 'all 0.15s ease',
  appearance: 'textfield',
  _hover: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  _focus: {
    backgroundColor: 'white',
    borderColor: 'brand.500',
    boxShadow: '0 0 0 2px rgba(214, 69, 80, 0.15)',
  },
});

export const dateCard = css({
  border: '1px solid',
  borderColor: 'surface.700',
  borderRadius: '10px',
  padding: '8px 12px',
  textAlign: 'center',
  minWidth: '56px',
  backgroundColor: 'surface.950',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
});

export const dateCardMonth = css({
  fontSize: '10px',
  color: 'text.muted',
  textTransform: 'uppercase',
  fontWeight: '700',
  letterSpacing: '0.05em',
});

export const dateCardDay = css({
  fontSize: '20px',
  fontWeight: '700',
  color: 'text.primary',
  lineHeight: '1.2',
});

export const monthInfo = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const calendarTitle = css({
  fontSize: '18px',
  fontWeight: '700',
  color: 'text.primary',
  textTransform: 'capitalize',
  letterSpacing: '-0.01em',
});

export const calendarPeriod = css({
  fontSize: '12px',
  color: 'text.muted',
});

export const navControls = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const navButtonGroup = css({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'surface.950',
  border: '1px solid',
  borderColor: 'surface.700',
  borderRadius: '10px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
});

export const navButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  backgroundColor: 'transparent',
  border: 'none',
  color: 'text.muted',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  _hover: {
    backgroundColor: 'surface.900',
    color: 'text.primary',
  },
});

export const navButtonLeft = css({
  borderRight: '1px solid',
  borderColor: 'surface.700',
});

export const navButtonRight = css({
  borderLeft: '1px solid',
  borderColor: 'surface.700',
});

export const todayButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 16px',
  height: '36px',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '13px',
  fontWeight: '600',
  color: 'text.primary',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  _hover: {
    backgroundColor: 'surface.900',
  },
});

export const viewSelector = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '0 12px',
  height: '36px',
  backgroundColor: 'surface.950',
  border: '1px solid',
  borderColor: 'surface.700',
  borderRadius: '10px',
  fontSize: '13px',
  fontWeight: '500',
  color: 'text.primary',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  _hover: {
    backgroundColor: 'surface.900',
  },
});

export const addEventButton = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '0 14px',
  height: '36px',
  backgroundColor: 'brand.500',
  border: 'none',
  borderRadius: '10px',
  fontSize: '13px',
  fontWeight: '600',
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  boxShadow: '0 2px 4px rgba(214, 69, 80, 0.25)',
  _hover: {
    backgroundColor: 'brand.600',
    boxShadow: '0 4px 8px rgba(214, 69, 80, 0.3)',
  },
  _active: {
    transform: 'scale(0.98)',
  },
});

export const addTaskButton = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '0 14px',
  height: '36px',
  backgroundColor: 'transparent',
  border: '1px solid',
  borderColor: 'text.primary',
  borderRadius: '10px',
  fontSize: '13px',
  fontWeight: '600',
  color: 'text.primary',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  _hover: {
    backgroundColor: 'text.primary',
    color: 'white',
  },
  _active: {
    transform: 'scale(0.98)',
  },
});
