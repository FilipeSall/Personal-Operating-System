import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    aspectRatio: '1',
    borderRadius: '1rem', // rounded-2xl = 16px
    transitionProperty: 'all',
    transitionDuration: '150ms',
    position: 'relative',
  },

  linkActive: {
    backgroundColor: '#D64550',
    color: '#FDFFFC',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

    ':hover': {
      transform: 'scale(1.05)',
    },
  },

  linkInactive: {
    color: '#9CA3AF', // text-gray-400

    ':hover': {
      color: '#FDFFFC',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },

  icon: {
    fontSize: '1.5rem', // text-2xl
  },

  tooltip: {
    position: 'absolute',
    left: '3.5rem', // left-14 = 56px
    backgroundColor: '#1F2937', // bg-gray-800
    color: '#FFFFFF',
    fontSize: '0.75rem', // text-xs
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    borderRadius: '0.25rem',
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '150ms',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    zIndex: 50,
  },

  tooltipVisible: {
    opacity: 1,
  },
});
