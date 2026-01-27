import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem', // gap-6 = 24px
    width: '100%',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
});
