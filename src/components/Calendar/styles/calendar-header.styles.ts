import { css, cva } from '../../../../styled-system/css';

export const calendarHeader = css({
  display: 'grid',
  gap: '12px',
  paddingBottom: '12px',
  borderBottom: '1px solid',
  borderColor: 'var(--calendar-panel-border, token(colors.surface.700))',
  marginBottom: '0',
});

export const calendarHeaderTop = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', bp800: '1.2fr 0.8fr' },
  alignItems: 'center',
  gap: '12px',
});

export const dateCardWrapper = css({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  position: 'relative',
  flexWrap: 'wrap',
});

export const dateCardButton = css({
  position: 'relative',
  border: 'none',
  borderRadius: '14px',
  padding: '10px 16px',
  textAlign: 'center',
  minWidth: '64px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  border: '1px solid',
  borderColor: 'rgba(0, 0, 0, 0.08)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 8px 14px rgba(33, 26, 30, 0.12)',
  _hover: {
    transform: 'translateY(-2px) rotate(-1deg)',
    boxShadow: '0 12px 18px rgba(33, 26, 30, 0.18)',
  },
  _active: {
    transform: 'translateY(0)',
  },
});

export const dateCardButtonMonth = css({
  fontSize: '9px',
  color: 'text.label',
  textTransform: 'uppercase',
  fontWeight: '800',
  letterSpacing: '0.08em',
  marginBottom: '2px',
});

export const dateCardButtonDay = css({
  fontSize: '20px',
  fontWeight: '800',
  color: 'text.primary',
  lineHeight: '1',
});

export const datePickerDropdown = css({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: '0',
  zIndex: 100,
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  border: 'none',
  borderRadius: '14px',
  padding: '16px',
  minWidth: '220px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  boxShadow: '0 18px 28px rgba(33, 26, 30, 0.12)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
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
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      color: 'text.primary',
    },
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: 'var(--weather-accent, token(colors.brand.500))',
        color: 'white',
        fontWeight: '600',
        _hover: {
          backgroundColor: 'var(--weather-accent-hover, token(colors.brand.600))',
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
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  border: 'none',
  borderRadius: '8px',
  color: 'text.muted',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  _hover: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
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
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  _focus: {
    backgroundColor: 'white',
    borderColor: 'var(--weather-accent, token(colors.brand.500))',
    boxShadow: '0 0 0 2px var(--weather-accent-light, rgba(214, 69, 80, 0.15))',
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
  gap: '4px',
});

export const calendarTitle = css({
  fontFamily: '"Bricolage Grotesque", "Manrope", sans-serif',
  fontSize: { base: '20px', bp800: '22px' },
  fontWeight: '700',
  color: 'text.primary',
  textTransform: 'capitalize',
  letterSpacing: '-0.01em',
});

export const calendarPeriod = css({
  fontSize: '12px',
  color: 'text.dim',
  fontWeight: '500',
});

export const navControls = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  justifyContent: { base: 'flex-start', bp800: 'flex-end' },
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
  padding: '8px 12px',
  height: '36px',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '10px',
  fontSize: '12px',
  fontWeight: '600',
  color: 'text.subtle',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 6px 12px rgba(33, 26, 30, 0.12)',
  _hover: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: 'text.primary',
    boxShadow: '0 10px 16px rgba(33, 26, 30, 0.16)',
  },
});

export const addTaskButton = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 12px',
  height: '36px',
  backgroundColor: 'var(--weather-accent, token(colors.brand.500))',
  border: 'none',
  borderRadius: '10px',
  fontSize: '12px',
  fontWeight: '600',
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  _hover: {
    backgroundColor: 'var(--weather-accent-hover, token(colors.brand.600))',
    transform: 'translateY(-1px)',
  },
  boxShadow: '0 8px 16px rgba(33, 26, 30, 0.18)',
});
