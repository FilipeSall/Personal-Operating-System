import { css, cva } from '../../../styled-system/css';

export const calendarContainer = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '24px',
  backgroundColor: '#1a1a2e',
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
  color: '#ffffff',
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
  color: '#a0a0a0',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: '#2a2a4e',
    color: '#ffffff',
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
  color: '#6b7280',
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
    color: '#e0e0e0',
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: '#3B82F6',
        color: '#ffffff',
      },
    },
    isToday: {
      true: {
        border: '2px solid #3B82F6',
      },
    },
    isOutsideMonth: {
      true: {
        color: '#4b5563',
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
          backgroundColor: '#2a2a4e',
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

export const todoPanel = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px',
  backgroundColor: '#16162a',
  borderRadius: '12px',
});

export const todoPanelHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const todoPanelTitle = css({
  fontSize: '14px',
  fontWeight: '600',
  color: '#ffffff',
});

export const todoList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const todoItem = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    backgroundColor: '#1e1e3f',
    borderRadius: '8px',
    borderLeft: '3px solid',
    transition: 'all 0.2s',
  },
  variants: {
    completed: {
      true: {
        opacity: 0.5,
      },
    },
  },
});

export const todoCheckbox = css({
  width: '18px',
  height: '18px',
  borderRadius: '4px',
  border: '2px solid #4b5563',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  flexShrink: 0,
  _hover: {
    borderColor: '#6b7280',
  },
});

export const todoText = cva({
  base: {
    flex: 1,
    fontSize: '14px',
    color: '#e0e0e0',
  },
  variants: {
    completed: {
      true: {
        textDecoration: 'line-through',
        color: '#6b7280',
      },
    },
  },
});

export const todoDeleteButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  color: '#6b7280',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: '#2a2a4e',
    color: '#EF4444',
  },
});

export const addTodoForm = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const addTodoInputRow = css({
  display: 'flex',
  gap: '8px',
});

export const addTodoInput = css({
  flex: 1,
  padding: '10px 12px',
  backgroundColor: '#1e1e3f',
  border: '1px solid #2a2a4e',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.2s',
  _placeholder: {
    color: '#6b7280',
  },
  _focus: {
    borderColor: '#3B82F6',
  },
});

export const addTodoButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  backgroundColor: '#3B82F6',
  border: 'none',
  borderRadius: '8px',
  color: '#ffffff',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: '#2563EB',
  },
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const typeSelector = css({
  display: 'flex',
  gap: '6px',
  flexWrap: 'wrap',
});

export const typeButton = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 10px',
    backgroundColor: '#1e1e3f',
    border: '1px solid #2a2a4e',
    borderRadius: '6px',
    color: '#a0a0a0',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: {
      borderColor: '#4b5563',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'currentColor',
        color: '#ffffff',
      },
    },
  },
});

export const emptyState = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  color: '#6b7280',
  fontSize: '14px',
  textAlign: 'center',
});

export const modalOverlay = css({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
});

export const modalContent = css({
  backgroundColor: '#1a1a2e',
  borderRadius: '16px',
  padding: '24px',
  width: '100%',
  maxWidth: '360px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const modalHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const modalTitle = css({
  fontSize: '18px',
  fontWeight: '600',
  color: '#ffffff',
});

export const modalCloseButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '8px',
  color: '#6b7280',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: '#2a2a4e',
    color: '#ffffff',
  },
});

export const modalForm = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const modalInput = css({
  width: '100%',
  padding: '12px 14px',
  backgroundColor: '#16162a',
  border: '1px solid #2a2a4e',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.2s',
  _placeholder: {
    color: '#6b7280',
  },
  _focus: {
    borderColor: '#3B82F6',
  },
});

export const modalTypeGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '8px',
});

export const modalTypeButton = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 12px',
    backgroundColor: '#16162a',
    border: '2px solid #2a2a4e',
    borderRadius: '8px',
    color: '#a0a0a0',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: {
      borderColor: '#4b5563',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'currentColor',
        color: '#ffffff',
        backgroundColor: '#1e1e3f',
      },
    },
  },
});

export const modalSubmitButton = css({
  width: '100%',
  padding: '12px',
  backgroundColor: '#3B82F6',
  border: 'none',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: '#2563EB',
  },
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const addTaskButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  padding: '8px 12px',
  backgroundColor: '#3B82F6',
  border: 'none',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: '#2563EB',
  },
});

export const timeInputRow = css({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
});

export const timeInputGroup = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flex: 1,
});

export const timeInputLabel = css({
  fontSize: '12px',
  color: '#9ca3af',
  fontWeight: '500',
});

export const timeInput = css({
  padding: '10px 12px',
  backgroundColor: '#16162a',
  border: '1px solid #2a2a4e',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.2s',
  width: '100%',
  _focus: {
    borderColor: '#3B82F6',
  },
});

export const repeatSection = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const repeatLabel = css({
  fontSize: '12px',
  color: '#9ca3af',
  fontWeight: '500',
});

export const repeatOptions = css({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
});

export const repeatButton = cva({
  base: {
    padding: '8px 12px',
    backgroundColor: '#16162a',
    border: '2px solid #2a2a4e',
    borderRadius: '8px',
    color: '#a0a0a0',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: {
      borderColor: '#4b5563',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: '#3B82F6',
        color: '#ffffff',
        backgroundColor: '#1e1e3f',
      },
    },
  },
});

export const weekdaySelector = css({
  display: 'flex',
  gap: '6px',
  justifyContent: 'space-between',
});

export const weekdayButton = cva({
  base: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16162a',
    border: '2px solid #2a2a4e',
    borderRadius: '8px',
    color: '#a0a0a0',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: {
      borderColor: '#4b5563',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: '#3B82F6',
        color: '#ffffff',
        backgroundColor: '#3B82F6',
      },
    },
  },
});

export const todoTime = css({
  fontSize: '12px',
  color: '#9ca3af',
  fontWeight: '500',
  whiteSpace: 'nowrap',
});

export const todoRepeatIcon = css({
  color: '#6b7280',
  flexShrink: 0,
});
