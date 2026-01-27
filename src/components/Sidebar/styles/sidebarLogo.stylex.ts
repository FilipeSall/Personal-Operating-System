import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  container: {
    marginBottom: '2.5rem', // mb-10 = 2.5rem
    padding: '0.5rem',
  },

  logoBox: {
    width: '2.5rem', // w-10 = 40px = 2.5rem
    height: '2.5rem', // h-10 = 40px = 2.5rem
    borderRadius: '0.75rem', // rounded-xl = 12px
    backgroundImage: 'linear-gradient(to bottom right, #D64550, #FA9500)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },

  icon: {
    fontSize: '1.5rem', // text-2xl
  },
});
