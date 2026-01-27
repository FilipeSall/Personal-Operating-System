import { css, cva, sva } from '../../../../styled-system/css';



export const addTodoModalRecipe = sva({
  slots: [
    'overlay',
    'content',
    'header',
    'title',
    'closeButton',
    'form',
    'input',
    'typeGrid',
    'timeRow',
    'timeGroup',
    'timeLabel',
    'timeInput',
    'timeError',
    'commentLabel',
    'commentInput',
    'repeatSection',
    'repeatLabel',
    'repeatOptions',
    'weekdaySelector',
    'durationSection',
    'durationOptions',
    'stepActions',
    'stepButtonPrimary',
    'stepButtonSecondary',
  ],
  base: {
    overlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(4px)',
      animation: 'modalFadeIn 0.3s ease-out',
    },
    content: {
      backgroundColor: 'surface.950',
      borderRadius: '20px',
      padding: '32px',
      width: { base: '75%', bp800: '50%', bp1400: '40%' },
      maxWidth: { base: '75%', bp800: '50%', bp1400: '40%' },
      maxHeight: '90vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      border: '1px solid',
      borderColor: 'surface.800',
      animation: 'modalSlideIn 0.3s ease-out',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'surface.800',
        borderRadius: '10px',
        margin: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'surface.600',
        borderRadius: '10px',
        '&:hover': {
          background: 'surface.500',
        },
      },
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: 'text.primary',
      letterSpacing: '-0.01em',
    },
    closeButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      backgroundColor: 'surface.900',
      border: 'none',
      borderRadius: '8px',
      color: 'text.dim',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      _hover: {
        backgroundColor: 'surface.800',
        color: 'text.primary',
      },
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      backgroundColor: 'surface.950',
      border: '2px solid',
      borderColor: 'surface.700',
      borderRadius: '12px',
      color: 'text.primary',
      fontSize: '15px',
      fontWeight: '500',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      _placeholder: {
        color: 'text.dim',
      },
      _focus: {
        borderColor: 'brand.500',
        transform: 'translateY(-1px)',
      },
      _active: {
        transform: 'translateY(0)',
      },
    },
    typeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
    },
    timeRow: {
      display: 'flex',
      gap: '16px',
      alignItems: 'end',
    },
    timeGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      flex: 1,
    },
    timeLabel: {
      fontSize: '12px',
      color: 'text.label',
      fontWeight: '500',
    },
    timeInput: {
      padding: '12px 14px',
      backgroundColor: 'surface.950',
      border: '2px solid',
      borderColor: 'surface.700',
      borderRadius: '12px',
      color: 'text.primary',
      fontSize: '14px',
      fontWeight: '500',
      outline: 'none',
      transition: 'all 0.2s ease',
      width: '100%',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      _focus: {
        borderColor: 'brand.500',
        transform: 'translateY(-1px)',
      },
      _active: {
        transform: 'translateY(0)',
      },
    },
    timeError: {
      marginTop: '-4px',
      fontSize: '12px',
      color: 'danger.500',
      fontWeight: '500',
    },
    commentLabel: {
      fontSize: '12px',
      color: 'text.label',
      fontWeight: '500',
    },
    commentInput: {
      width: '100%',
      minHeight: '80px',
      maxHeight: '200px',
      padding: '12px 14px',
      backgroundColor: 'surface.950',
      border: '2px solid',
      borderColor: 'surface.700',
      borderRadius: '12px',
      color: 'text.primary',
      fontSize: '14px',
      outline: 'none',
      resize: 'vertical',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      _placeholder: {
        color: 'text.dim',
      },
      _focus: {
        borderColor: 'brand.500',
        transform: 'translateY(-1px)',
      },
      _active: {
        transform: 'translateY(0)',
      },
    },
    repeatSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      animation: 'slideDown 0.3s ease-out',
    },
    repeatLabel: {
      fontSize: '12px',
      color: 'text.label',
      fontWeight: '500',
    },
    repeatOptions: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
    },
    weekdaySelector: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
      gap: '10px',
      animation: 'slideDown 0.3s ease-out',
    },
    durationSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      animation: 'slideDown 0.3s ease-out',
    },
    durationOptions: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
    },
    stepActions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '4px',
    },
    stepButtonPrimary: {
      padding: '12px 18px',
      backgroundColor: 'brand.500',
      border: 'none',
      borderRadius: '12px',
      color: 'surface.950',
      fontSize: '14px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 12px rgba(214, 69, 80, 0.2)',
      _hover: {
        backgroundColor: 'brand.600',
        transform: 'translateY(-1px)',
        boxShadow: '0 6px 16px rgba(214, 69, 80, 0.3)',
      },
      _active: {
        transform: 'translateY(0)',
        boxShadow: '0 3px 10px rgba(214, 69, 80, 0.2)',
      },
      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        transform: 'none',
        boxShadow: 'none',
      },
    },
    stepButtonSecondary: {
      padding: '12px 18px',
      backgroundColor: 'surface.900',
      border: '2px solid',
      borderColor: 'surface.700',
      borderRadius: '12px',
      color: 'text.primary',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      _hover: {
        backgroundColor: 'surface.800',
        borderColor: 'surface.600',
      },
      _active: {
        transform: 'translateY(0)',
      },
    },
  },
});

export const modalTypeButton = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 14px',
    backgroundColor: 'surface.950',
    border: '2px solid',
    borderColor: 'surface.700',
    borderRadius: '12px',
    color: 'text.muted',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    _hover: {
      borderColor: 'surface.600',
      backgroundColor: 'surface.900',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    },
    _active: {
      transform: 'translateY(0)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'brand.500',
        color: 'brand.500',
        backgroundColor: 'surface.900',
      },
    },
  },
});

export const modalSubmitButton = css({
  width: '100%',
  padding: '16px',
  backgroundColor: 'brand.500',
  border: 'none',
  borderRadius: '14px',
  color: 'surface.950',
  fontSize: '15px',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 12px rgba(214, 69, 80, 0.25)',
  _hover: {
    backgroundColor: 'brand.600',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(214, 69, 80, 0.35)',
  },
  _active: {
    transform: 'translateY(0)',
    boxShadow: '0 3px 10px rgba(214, 69, 80, 0.25)',
  },
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  },
});

export const repeatButton = cva({
  base: {
    padding: '10px 16px',
    backgroundColor: 'surface.950',
    border: '2px solid',
    borderColor: 'surface.700',
    borderRadius: '12px',
    color: 'text.muted',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    _hover: {
      borderColor: 'surface.600',
      backgroundColor: 'surface.900',
      transform: 'translateY(-1px)',
    },
    _active: {
      transform: 'translateY(0)',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'brand.500',
        color: 'brand.500',
        backgroundColor: 'surface.900',
      },
    },
  },
});

export const weekdayButton = cva({
  base: {
    width: '100%',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'surface.950',
    border: '2px solid',
    borderColor: 'surface.700',
    borderRadius: '12px',
    color: 'text.muted',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    _hover: {
      borderColor: 'surface.600',
      backgroundColor: 'surface.900',
      transform: 'translateY(-2px)',
      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.12)',
    },
    _active: {
      transform: 'translateY(0)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'brand.500',
        color: 'surface.950',
        backgroundColor: 'brand.500',
        transform: 'scale(1.05)',
      },
    },
  },
});

export const weekdayLabelLong = css({
  display: { base: 'none', bp800: 'inline' },
});

export const weekdayLabelShort = css({
  display: { base: 'inline', bp800: 'none' },
});

export const durationButton = cva({
  base: {
    padding: '8px 14px',
    backgroundColor: 'surface.950',
    border: '2px solid',
    borderColor: 'surface.700',
    borderRadius: '10px',
    color: 'text.muted',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    _hover: {
      borderColor: 'surface.600',
      backgroundColor: 'surface.900',
      transform: 'translateY(-1px)',
    },
    _active: {
      transform: 'translateY(0)',
    },
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      borderColor: 'surface.800',
      color: 'text.dim',
      backgroundColor: 'surface.900',
      boxShadow: 'none',
      transform: 'none',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'brand.500',
        color: 'brand.500',
        backgroundColor: 'surface.900',
      },
    },
  },
});
