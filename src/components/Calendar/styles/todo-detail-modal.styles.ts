import { css, cva } from '../../../../styled-system/css';

export const modalOverlay = css({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(4px)',
  padding: '20px',
  overflow: 'hidden',
});

export const modalCloseButton = css({
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
});

export const detailModalContent = css({
  backgroundColor: 'surface.950',
  borderRadius: '20px',
  padding: '28px',
  width: '100%',
  maxWidth: '400px',
  maxHeight: '90vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
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
});

export const detailHeader = css({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '12px',
});

export const detailTitle = css({
  fontSize: '18px',
  fontWeight: '600',
  color: 'text.primary',
  lineHeight: '1.4',
  flex: 1,
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  whiteSpace: 'normal',
  maxWidth: 'calc(100% - 40px)',
});

export const detailBadge = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 10px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '500',
});

export const detailSection = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const detailRow = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
});

export const detailIcon = css({
  color: 'text.dim',
  flexShrink: 0,
  marginTop: '2px',
});

export const detailLabel = css({
  fontSize: '12px',
  color: 'text.dim',
  fontWeight: '500',
  minWidth: '80px',
});

export const detailValue = css({
  fontSize: '14px',
  color: 'text.subtle',
});

export const detailCommentContainer = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1,
});

export const detailCommentText = css({
  fontSize: '14px',
  color: 'text.subtle',
  lineHeight: '1.5',
  wordBreak: 'break-word',
});


export const detailTags = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '4px',
});

export const detailTag = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 10px',
  backgroundColor: 'surface.900',
  borderRadius: '20px',
  fontSize: '12px',
  color: 'text.label',
});

export const detailActions = css({
  display: 'flex',
  gap: '12px',
  marginTop: '8px',
  paddingTop: '16px',
  borderTop: '1px solid',
  borderTopColor: 'surface.700',
});

export const detailActionButton = cva({
  base: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    border: 'none',
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: 'brand.500',
        color: 'surface.950',
        _hover: {
          backgroundColor: 'brand.600',
          transform: 'translateY(-1px)',
        },
      },
      danger: {
        backgroundColor: 'surface.900',
        color: 'danger.500',
        _hover: {
          backgroundColor: 'surface.800',
        },
      },
      secondary: {
        backgroundColor: 'surface.900',
        color: 'text.subtle',
        _hover: {
          backgroundColor: 'surface.800',
        },
      },
    },
  },
});

export const confirmModalContent = css({
  backgroundColor: 'surface.950',
  borderRadius: '16px',
  padding: '24px',
  width: '100%',
  maxWidth: '360px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
});

export const confirmHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
});

export const confirmTitle = css({
  fontSize: '14px',
  fontWeight: '600',
  color: 'text.primary',
});

export const confirmOptions = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const confirmOptionButton = cva({
  base: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid',
    borderColor: 'surface.700',
    backgroundColor: 'surface.900',
    color: 'text.subtle',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    _hover: {
      backgroundColor: 'surface.800',
      color: 'text.primary',
    },
  },
  variants: {
    variant: {
      danger: {
        color: 'danger.500',
        borderColor: 'surface.700',
        _hover: {
          backgroundColor: 'surface.800',
          color: 'danger.500',
        },
      },
    },
  },
});
