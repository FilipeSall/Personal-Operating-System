import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  container: {
    width: '5rem', // 20 in tailwind = 80px = 5rem
    backgroundColor: '#211A1E',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    zIndex: 20,
    flexShrink: 0,
    position: 'fixed',
    left: '1rem',
    top: '1rem',
    bottom: '1rem',
    borderRadius: '1.5rem', // 24px = 1.5rem
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transitionProperty: 'all',
    transitionDuration: '300ms',

    '@media (min-width: 1024px)': {
      width: '6rem', // lg:w-24 = 96px = 6rem
    },
  },
});
