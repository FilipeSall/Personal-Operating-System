import { css } from '../../../../styled-system/css';

export const weatherSection = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  backgroundColor: 'surface.950',
  borderRadius: '4px',
  border: '1px solid',
  borderColor: 'surface.700',
  padding: '16px',
  minHeight: 0,
  boxShadow: `
    0 1px 1px rgba(0, 0, 0, 0.08),
    0 2px 2px rgba(0, 0, 0, 0.06),
    0 4px 4px rgba(0, 0, 0, 0.05),
    0 8px 8px rgba(0, 0, 0, 0.04),
    0 16px 16px rgba(0, 0, 0, 0.03)
  `,
  backgroundImage: `
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 40%,
      transparent 60%,
      rgba(0, 0, 0, 0.02) 100%
    )
  `,
});

export const weatherHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
});

export const weatherMeta = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const weatherTitle = css({
  fontSize: '14px',
  fontWeight: '700',
  color: 'text.primary',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
});

export const weatherSubtitle = css({
  fontSize: '12px',
  color: 'text.muted',
});

export const weatherStatus = css({
  fontSize: '12px',
  color: 'text.muted',
  backgroundColor: 'surface.900',
  borderRadius: '8px',
  padding: '10px 12px',
  border: '1px solid',
  borderColor: 'surface.700',
});

export const weatherTableWrapper = css({
  flex: 1,
  overflow: 'auto',
  borderRadius: '10px',
  border: '1px solid',
  borderColor: 'surface.700',
});

export const weatherTable = css({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '12px',
  color: 'text.primary',
  backgroundColor: 'surface.950',
});

export const weatherHeadCell = css({
  textAlign: 'left',
  fontSize: '10px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '10px 12px',
  backgroundColor: 'surface.900',
  color: 'text.muted',
  borderBottom: '1px solid',
  borderColor: 'surface.700',
});

export const weatherRow = css({
  borderBottom: '1px solid',
  borderColor: 'surface.800',
  _even: {
    backgroundColor: 'surface.900',
  },
});

export const weatherLabelCell = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 12px',
  fontWeight: '600',
  color: 'text.primary',
});

export const weatherValueCell = css({
  padding: '10px 12px',
  color: 'text.subtle',
  whiteSpace: 'nowrap',
});

export const weatherRecommendationCell = css({
  padding: '10px 12px',
  color: 'text.muted',
});

export const weatherIcon = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  borderRadius: '8px',
  backgroundColor: 'surface.800',
  color: 'brand.400',
});

export const weatherLabel = css({
  display: 'inline-flex',
  alignItems: 'center',
});
