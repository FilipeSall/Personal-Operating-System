import { css } from '../../../../../styled-system/css';

export const weatherDetailsCard = css({
  backgroundColor: 'surface.950',
  padding: '1.5rem',
  borderRadius: '1rem',
  border: '1px solid',
  borderColor: 'surface.800',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-0.25rem)',
    boxShadow: '0 10px 25px rgba(33, 26, 30, 0.1)',
  },
});

export const weatherDetailsIconBox = css({
  width: '3.5rem',
  height: '3.5rem',
  borderRadius: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '1.875rem',
});

export const weatherDetailsInfo = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

export const weatherDetailsLabel = css({
  fontSize: '0.875rem',
  fontWeight: '700',
  color: 'text.muted',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '0.25rem',
});

export const weatherDetailsValue = css({
  fontSize: '1.875rem',
  fontWeight: '800',
  color: 'text.primary',
  lineHeight: '1',
});

export const weatherDetailsSecondary = css({
  fontSize: '1.5rem',
  fontWeight: '700',
  color: 'text.subtle',
});

export const weatherDetailsSecondarySmall = css({
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'text.subtle',
});

export const weatherDetailsMultiValue = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  fontSize: '1.25rem',
  fontWeight: '800',
  color: 'text.primary',
});

export const weatherDetailsSunTime = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1.25rem',
  fontWeight: '800',
  color: 'text.primary',
  '& svg': {
    width: '1.25rem',
    height: '1.25rem',
  },
});

export const weatherDetailsValueComplement = css({
  fontSize: '0.625rem',
  fontWeight: '600',
  color: 'text.dim',
  marginLeft: '0.25rem',
});

export const weatherDetailsTemperatureRange = css({
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'text.dim',
  marginTop: 'auto',
  paddingTop: '0.5rem',
});

export const weatherDetailsRecommendation = css({
  paddingTop: '1rem',
  borderTop: '1px solid',
  borderColor: 'gray.300',
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'text.subtle',
  lineHeight: '1.4',
});
