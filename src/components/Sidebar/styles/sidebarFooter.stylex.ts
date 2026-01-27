import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    width: '100%',
    marginTop: 'auto',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    aspectRatio: '1',
    color: '#9CA3AF', // text-gray-400
    borderRadius: '1rem', // rounded-2xl
    transitionProperty: 'all',
    transitionDuration: '150ms',
    borderWidth: '0',
    borderStyle: 'none',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    cursor: 'pointer',

    ':hover': {
      color: '#EF4444', // text-red-400
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },

  icon: {
    fontSize: '1.5rem', // text-2xl
  },
});
