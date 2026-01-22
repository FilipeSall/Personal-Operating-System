import { css, cva } from '../../../../styled-system/css';

export const todoPanel = css({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gap: '16px',
  padding: '20px',
  backgroundColor: 'surface.900',
  borderRadius: '14px',
  height: '100%',
  minHeight: 0,
});

export const todoPanelHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const todoPanelTitle = css({
  fontSize: '14px',
  fontWeight: '600',
  color: 'text.primary',
});

export const todoList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  height: '100%',
  overflowY: 'auto',
  minHeight: 0,
});

export const todoItem = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 14px',
    backgroundColor: 'surface.950',
    borderRadius: '10px',
    borderLeft: '3px solid',
    transition: 'all 0.15s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  variants: {
    completed: {
      true: {
        opacity: 0.6,
        backgroundColor: 'surface.850',
      },
    },
  },
});

export const todoCheckbox = css({
  width: '18px',
  height: '18px',
  borderRadius: '5px',
  border: '2px solid',
  borderColor: 'surface.700',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.15s ease',
  flexShrink: 0,
  _hover: {
    borderColor: 'brand.500',
  },
});

export const todoText = cva({
  base: {
    flex: 1,
    fontSize: '14px',
    color: 'text.subtle',
  },
  variants: {
    completed: {
      true: {
        textDecoration: 'line-through',
        color: 'text.dim',
      },
    },
  },
});

export const todoDeleteButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '26px',
  height: '26px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '6px',
  color: 'text.dim',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  _hover: {
    backgroundColor: 'surface.850',
    color: 'danger.500',
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
  padding: '10px 14px',
  backgroundColor: 'surface.950',
  border: '1px solid',
  borderColor: 'surface.700',
  borderRadius: '10px',
  color: 'text.primary',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.15s ease',
  _placeholder: {
    color: 'text.dim',
  },
  _focus: {
    borderColor: 'brand.500',
    boxShadow: '0 0 0 3px rgba(214, 69, 80, 0.15)',
  },
});

export const addTodoButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  backgroundColor: 'brand.500',
  border: 'none',
  borderRadius: '10px',
  color: 'surface.950',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  _hover: {
    backgroundColor: 'brand.600',
    transform: 'translateY(-1px)',
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
    backgroundColor: 'surface.950',
    border: '1px solid',
    borderColor: 'surface.700',
    borderRadius: '8px',
    color: 'text.muted',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    _hover: {
      borderColor: 'surface.700',
      backgroundColor: 'surface.900',
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

export const emptyState = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  color: 'text.dim',
  fontSize: '14px',
  textAlign: 'center',
  height: '100%',
});

export const addTaskButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  padding: '8px 14px',
  backgroundColor: 'brand.500',
  border: 'none',
  borderRadius: '10px',
  color: 'surface.950',
  fontSize: '13px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  _hover: {
    backgroundColor: 'brand.600',
    transform: 'translateY(-1px)',
  },
});

export const todoTime = css({
  fontSize: '12px',
  color: 'text.label',
  fontWeight: '500',
  whiteSpace: 'nowrap',
});

export const todoRepeatIcon = css({
  color: 'text.dim',
  flexShrink: 0,
});

export const todoItemClickable = css({
  cursor: 'pointer',
  _hover: {
    backgroundColor: 'surface.900',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
  },
});
