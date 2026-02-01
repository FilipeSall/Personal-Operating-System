import { css } from '../../../../../styled-system/css';

export const weatherDetailsContent = css({
  padding: '2rem',
  overflowY: 'auto',
  backgroundColor: 'surface.900',
  maxHeight: 'calc(90vh - 100px)',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'surface.700',
    borderRadius: '20px',
  },
});

export const weatherDetailsGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1.5rem',
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (min-width: 1024px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@media (min-width: 1280px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
});

export const weatherDetailsFooter = css({
  marginTop: '2rem',
  textAlign: 'center',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: 'text.muted',
});

export const weatherDetailsNoData = css({
  padding: '2rem',
  textAlign: 'center',
  color: 'text.muted',
  fontSize: '1rem',
});
