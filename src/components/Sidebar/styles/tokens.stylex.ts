import * as stylex from '@stylexjs/stylex';

/**
 * Design tokens para o componente Sidebar
 * Centraliza cores, espaçamentos e outros valores reutilizáveis
 */

export const colors = stylex.defineVars({
  // Cores principais
  primary: '#D64550',
  secondary: '#FA9500',
  tertiary: '#A7AA29',

  // Cores da sidebar
  sidebarBg: '#211A1E',
  sidebarIcon: '#FDFFFC',
  sidebarIconInactive: '#9CA3AF',

  // Cores de hover
  hoverBg: 'rgba(255, 255, 255, 0.1)',
  logoutHover: '#EF4444',

  // Cores do tooltip
  tooltipBg: '#1F2937',
  tooltipText: '#FFFFFF',

  // Cores adicionais
  white: '#FFFFFF',
  transparent: 'transparent',
});

export const spacing = stylex.defineVars({
  // Padding/margin
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px

  // Tamanhos específicos
  logoSize: '2.5rem',      // 40px
  iconSize: '1.5rem',      // 24px
  sidebarWidthSm: '5rem',  // 80px
  sidebarWidthLg: '6rem',  // 96px
});

export const borderRadius = stylex.defineVars({
  sm: '0.25rem',   // 4px
  md: '0.75rem',   // 12px (rounded-xl)
  lg: '1rem',      // 16px (rounded-2xl)
  xl: '1.5rem',    // 24px (rounded-3xl)
});

export const shadows = stylex.defineVars({
  logo: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  sidebar: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
});

export const transitions = stylex.defineVars({
  fast: '150ms',
  normal: '300ms',
});
