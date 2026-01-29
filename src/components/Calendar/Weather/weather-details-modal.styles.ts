import { css } from '../../../../styled-system/css';

export const weatherDetailsHeader = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const weatherDetailsMeta = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  fontSize: '12px',
  color: 'text.muted',
});

export const weatherDetailsSubtitle = css({
  fontSize: '12px',
  color: 'text.dim',
});

export const weatherDetailsTable = css({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '12px',
  color: 'text.primary',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid',
  borderColor: 'surface.800',
});

export const weatherDetailsTableHeadCell = css({
  textAlign: 'left',
  fontSize: '10px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '10px 12px',
  backgroundColor: 'surface.900',
  color: 'text.muted',
  borderBottom: '1px solid',
  borderColor: 'surface.800',
});

export const weatherDetailsRow = css({
  borderBottom: '1px solid',
  borderColor: 'surface.800',
  backgroundColor: 'surface.950',
  _even: {
    backgroundColor: 'surface.900',
  },
});

export const weatherDetailsLabelCell = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 12px',
  fontWeight: '600',
  color: 'text.primary',
});

export const weatherDetailsValueCell = css({
  padding: '10px 12px',
  color: 'text.subtle',
  whiteSpace: 'nowrap',
});

export const weatherDetailsRecommendationCell = css({
  padding: '10px 12px',
  color: 'text.muted',
});

export const weatherDetailsIcon = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  borderRadius: '8px',
  backgroundColor: 'surface.800',
  color: 'brand.500',
});
