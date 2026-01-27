import { css, cva } from '../../../../styled-system/css';

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

export const eventItem = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2px 6px',
    borderRadius: '4px',
    borderLeft: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    _hover: {
      opacity: 0.85,
      transform: 'translateX(1px)',
    },
  },
  variants: {
    type: {
      work: {
        backgroundColor: 'rgba(214, 69, 80, 0.08)',
        borderColor: 'brand.500',
      },
      routine: {
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderColor: 'rgba(156, 163, 175, 0.5)',
      },
      reminder: {
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        borderColor: 'rgba(59, 130, 246, 0.6)',
      },
      personal: {
        backgroundColor: 'rgba(168, 85, 247, 0.08)',
        borderColor: 'rgba(168, 85, 247, 0.6)',
      },
      study: {
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        borderColor: 'rgba(59, 130, 246, 0.6)',
      },
      health: {
        backgroundColor: 'rgba(167, 170, 41, 0.1)',
        borderColor: 'rgba(167, 170, 41, 0.6)',
      },
      finance: {
        backgroundColor: 'rgba(249, 115, 22, 0.08)',
        borderColor: 'rgba(249, 115, 22, 0.6)',
      },
    },
  },
});

export const eventDot = cva({
  base: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    flexShrink: 0,
    boxShadow: '0 0 3px currentColor',
  },
  variants: {
    type: {
      work: {
        backgroundColor: 'brand.500',
      },
      routine: {
        backgroundColor: 'text.muted',
      },
      reminder: {
        backgroundColor: '#3B82F6',
      },
      personal: {
        backgroundColor: '#A855F7',
      },
      study: {
        backgroundColor: '#3B82F6',
      },
      health: {
        backgroundColor: 'success.500',
      },
      finance: {
        backgroundColor: '#F97316',
      },
    },
  },
});

export const eventText = cva({
  base: {
    fontSize: '10px',
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
    marginLeft: '5px',
    lineHeight: '1.3',
  },
  variants: {
    type: {
      work: {
        color: 'brand.500',
      },
      routine: {
        color: 'text.muted',
      },
      reminder: {
        color: '#3B82F6',
      },
      personal: {
        color: '#A855F7',
      },
      study: {
        color: '#3B82F6',
      },
      health: {
        color: 'success.500',
      },
      finance: {
        color: '#F97316',
      },
    },
  },
});

export const eventTime = cva({
  base: {
    fontSize: '9px',
    marginLeft: '4px',
    flexShrink: 0,
    fontVariantNumeric: 'tabular-nums',
    opacity: 0.7,
  },
  variants: {
    type: {
      work: {
        color: 'brand.500',
      },
      routine: {
        color: 'text.faint',
      },
      reminder: {
        color: '#3B82F6',
      },
      personal: {
        color: '#A855F7',
      },
      study: {
        color: '#3B82F6',
      },
      health: {
        color: 'rgba(167, 170, 41, 0.9)',
      },
      finance: {
        color: '#F97316',
      },
    },
  },
});

export const moreEventsText = css({
  fontSize: '9px',
  color: 'text.faint',
  fontWeight: '600',
  paddingLeft: '8px',
  marginTop: '2px',
  cursor: 'pointer',
  transition: 'color 0.15s ease',
  _hover: {
    color: 'text.primary',
  },
});

export const eventIndicator = css({
  position: 'absolute',
  bottom: '4px',
  display: 'flex',
  gap: '2px',
});
