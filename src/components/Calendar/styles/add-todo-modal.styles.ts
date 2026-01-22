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
  ],
  base: {
    overlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    content: {
      backgroundColor: 'surface.900',
      borderRadius: '16px',
      padding: '24px',
      width: '100%',
      maxWidth: '360px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
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
    },
    closeButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px',
      color: 'text.dim',
      cursor: 'pointer',
      transition: 'all 0.2s',
      _hover: {
        backgroundColor: 'surface.700',
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
      padding: '12px 14px',
      backgroundColor: 'surface.950',
      border: '1px solid',
      borderColor: 'surface.700',
      borderRadius: '8px',
      color: 'text.primary',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.2s',
      _placeholder: {
        color: 'text.dim',
      },
      _focus: {
        borderColor: 'brand.500',
      },
    },
    typeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '8px',
    },
    timeRow: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
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
      padding: '10px 12px',
      backgroundColor: 'surface.950',
      border: '1px solid',
      borderColor: 'surface.700',
      borderRadius: '8px',
      color: 'text.primary',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.2s',
      width: '100%',
      _focus: {
        borderColor: 'brand.500',
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
      minHeight: '72px',
      padding: '10px 12px',
      backgroundColor: 'surface.950',
      border: '1px solid',
      borderColor: 'surface.700',
      borderRadius: '8px',
      color: 'text.primary',
      fontSize: '14px',
      outline: 'none',
      resize: 'vertical',
      transition: 'all 0.2s',
      _placeholder: {
        color: 'text.dim',
      },
      _focus: {
        borderColor: 'brand.500',
      },
    },
    repeatSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
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
      display: 'flex',
      gap: '6px',
      justifyContent: 'space-between',
    },
    durationSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    durationOptions: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
    },
  },
});

export const modalTypeButton = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 12px',
    backgroundColor: 'surface.950',
    border: '2px solid',
    borderColor: 'surface.700',
    borderRadius: '8px',
    color: 'text.muted',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: {
      borderColor: 'text.faint',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'currentColor',
        color: 'text.primary',
        backgroundColor: 'surface.850',
      },
    },
  },
});

export const modalSubmitButton = css({
  width: '100%',
  padding: '12px',
  backgroundColor: 'brand.500',
  border: 'none',
  borderRadius: '8px',
  color: 'text.primary',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: 'brand.600',
  },
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const repeatButton = cva({
  base: {
    padding: '8px 12px',
    backgroundColor: 'surface.950',
    border: '2px solid',
    borderColor: 'surface.700',
    borderRadius: '8px',
    color: 'text.muted',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: {
      borderColor: 'text.faint',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'brand.500',
        color: 'text.primary',
        backgroundColor: 'surface.850',
      },
    },
  },
});

export const weekdayButton = cva({
  base: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'surface.950',
    border: '2px solid',
    borderColor: 'surface.700',
    borderRadius: '8px',
    color: 'text.muted',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: {
      borderColor: 'text.faint',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'brand.500',
        color: 'text.primary',
        backgroundColor: 'brand.500',
      },
    },
  },
});

export const durationButton = cva({
  base: {
    padding: '6px 12px',
    backgroundColor: 'surface.950',
    border: '2px solid',
    borderColor: 'surface.700',
    borderRadius: '6px',
    color: 'text.muted',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: {
      borderColor: 'text.faint',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'brand.500',
        color: 'text.primary',
        backgroundColor: 'surface.850',
      },
    },
  },
});
