import { css } from '../../../../styled-system/css';

// Header styles
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

// Container principal do conteúdo scrollável
export const weatherDetailsContent = css({
  padding: '2rem',
  overflowY: 'auto',
  backgroundColor: 'surface.900',
  maxHeight: 'calc(90vh - 100px)',

  // Custom scrollbar
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

// Grid de cards
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

// Card individual
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

// Container do ícone com gradiente
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

// Seção de informação
export const weatherDetailsInfo = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

// Label do card
export const weatherDetailsLabel = css({
  fontSize: '0.875rem',
  fontWeight: '700',
  color: 'text.muted',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '0.25rem',
});

// Valor principal
export const weatherDetailsValue = css({
  fontSize: '1.875rem',
  fontWeight: '800',
  color: 'text.primary',
  lineHeight: '1',
});

// Valor secundário (ex: Min/Max temperatura ou complementos inline)
export const weatherDetailsSecondary = css({
  fontSize: '1.5rem',
  fontWeight: '700',
  color: 'text.subtle',
});

// Valor secundário (compatibilidade) - para outros usos
export const weatherDetailsSecondarySmall = css({
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'text.subtle',
});

// Container para valores múltiplos (ex: nascer/pôr do sol)
export const weatherDetailsMultiValue = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  fontSize: '1.25rem',
  fontWeight: '800',
  color: 'text.primary',
});

// Item com ícone direcional
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

// Complemento secundário inline (ex: unidade, nível)
export const weatherDetailsValueComplement = css({
  fontSize: '0.625rem',
  fontWeight: '600',
  color: 'text.dim',
  marginLeft: '0.25rem',
});

// Valor mínimo e máximo de temperatura (no final do card)
export const weatherDetailsTemperatureRange = css({
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'text.dim',
  marginTop: 'auto',
  paddingTop: '0.5rem',
});

// Seção de recomendação (footer do card)
export const weatherDetailsRecommendation = css({
  paddingTop: '1rem',
  borderTop: '1px solid',
  borderColor: 'gray.300',
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'text.subtle',
  lineHeight: '1.4',
});

// Footer com timestamp
export const weatherDetailsFooter = css({
  marginTop: '2rem',
  textAlign: 'center',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: 'text.muted',
});

// Fallback message quando não há dados
export const weatherDetailsNoData = css({
  padding: '2rem',
  textAlign: 'center',
  color: 'text.muted',
  fontSize: '1rem',
});

// Estilos específicos para cada tipo de card (gradientes)
export const gradientBlue = css({
  backgroundImage: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)',
  boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)',
});

export const gradientRed = css({
  backgroundImage: 'linear-gradient(135deg, #F87171 0%, #E11D48 100%)',
  boxShadow: '0 8px 20px rgba(225, 29, 72, 0.3)',
});

export const gradientOrange = css({
  backgroundImage: 'linear-gradient(135deg, #FDB063 0%, #F97316 100%)',
  boxShadow: '0 8px 20px rgba(249, 115, 22, 0.3)',
});

export const gradientIndigo = css({
  backgroundImage: 'linear-gradient(135deg, #818CF8 0%, #9333EA 100%)',
  boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
});

export const gradientTeal = css({
  backgroundImage: 'linear-gradient(135deg, #5EEAD4 0%, #14B8A6 100%)',
  boxShadow: '0 8px 20px rgba(20, 184, 166, 0.3)',
});

export const gradientCyan = css({
  backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)',
  boxShadow: '0 8px 20px rgba(34, 211, 238, 0.3)',
});

export const gradientYellow = css({
  backgroundImage: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
  boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)',
});

export const gradientGray = css({
  backgroundImage: 'linear-gradient(135deg, #9CA3AF 0%, #4B5563 100%)',
  boxShadow: '0 8px 20px rgba(75, 85, 99, 0.3)',
});

export const gradientPink = css({
  backgroundImage: 'linear-gradient(135deg, #F472B6 0%, #A855F7 100%)',
  boxShadow: '0 8px 20px rgba(168, 85, 247, 0.3)',
});

export const gradientGreen = css({
  backgroundImage: 'linear-gradient(135deg, #4ADE80 0%, #059669 100%)',
  boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)',
});
