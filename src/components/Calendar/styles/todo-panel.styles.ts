import { css, cva } from '../../../../styled-system/css';

export const todoPanel = css({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gap: '20px',
  padding: '24px',
  backgroundColor: 'surface.900',
  borderRadius: '16px',
  height: '100%',
  minHeight: 0,
  border: '1px solid',
  borderColor: 'surface.800',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
  overflow: 'hidden',
});

export const todoPanelHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '16px',
  borderBottom: '1px solid',
  borderColor: 'surface.800',
});

export const todoPanelTitle = css({
  fontSize: '16px',
  fontWeight: '700',
  color: 'text.primary',
  letterSpacing: '-0.02em',
});

export const todoList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  height: '100%',
  overflowY: 'auto',
  minHeight: 0,
  scrollbarWidth: 'thin',
  scrollbarColor: 'surface.700 surface.800',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'surface.800',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'surface.700',
    borderRadius: '3px',
    '&:hover': {
      background: 'surface.600',
    },
  },
});

export const todoItem = css({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  padding: '16px 18px',
  backgroundColor: 'surface.950',
  borderRadius: '12px',
  borderLeft: '4px solid',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
  },
});

export const todoStatusIndicator = css({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: 'surface.700',
  flexShrink: 0,
  transition: 'all 0.2s ease',
  boxShadow: '0 0 8px currentColor',
});

export const todoText = css({
  flex: 1,
  fontSize: '15px',
  color: 'text.subtle',
  fontWeight: '500',
  lineHeight: '1.4',
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
  padding: '32px',
  color: 'text.dim',
  fontSize: '15px',
  textAlign: 'center',
  height: '100%',
  backgroundColor: 'surface.950',
  borderRadius: '12px',
  border: '2px dashed',
  borderColor: 'surface.800',
  gap: '12px',
});

export const addTaskButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '10px 16px',
  backgroundColor: 'brand.500',
  border: 'none',
  borderRadius: '12px',
  color: 'surface.950',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 8px rgba(214, 69, 80, 0.25)',
  _hover: {
    backgroundColor: 'brand.600',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(214, 69, 80, 0.35)',
  },
});

export const todoTime = css({
  fontSize: '13px',
  color: 'text.label',
  fontWeight: '600',
  whiteSpace: 'nowrap',
  backgroundColor: 'surface.900',
  padding: '4px 8px',
  borderRadius: '6px',
  border: '1px solid',
  borderColor: 'surface.800',
});

export const todoRepeatIcon = css({
  color: 'text.label',
  flexShrink: 0,
  backgroundColor: 'surface.900',
  padding: '4px',
  borderRadius: '6px',
  border: '1px solid',
  borderColor: 'surface.800',
});

export const todoItemClickable = css({
  cursor: 'pointer',
  _hover: {
    backgroundColor: 'surface.900',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
    transform: 'translateY(-1px)',
  },
});
