import { css, cva } from '../../../../styled-system/css';

export const todoPanel = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px',
  backgroundColor: 'surface.950',
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
  color: 'text.primary',
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
    backgroundColor: 'surface.850',
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
  border: '2px solid',
  borderColor: 'text.faint',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  flexShrink: 0,
  _hover: {
    borderColor: 'text.dim',
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
  width: '24px',
  height: '24px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  color: 'text.dim',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: 'surface.700',
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
  padding: '10px 12px',
  backgroundColor: 'surface.850',
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
});

export const addTodoButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  backgroundColor: 'brand.500',
  border: 'none',
  borderRadius: '8px',
  color: 'text.primary',
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
    backgroundColor: 'surface.850',
    border: '1px solid',
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
        borderColor: 'currentColor',
        color: 'text.primary',
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
});

export const addTaskButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  padding: '8px 12px',
  backgroundColor: 'brand.500',
  border: 'none',
  borderRadius: '8px',
  color: 'text.primary',
  fontSize: '13px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: 'brand.600',
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
    backgroundColor: 'surface.800',
  },
});
