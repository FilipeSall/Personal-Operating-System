import { Calendar } from '../components/Calendar/Calendar';
import { css } from '../../styled-system/css';

const homeContainer = css({
  height: '100vh',
  backgroundColor: '#F6F2EA',
  color: '#211A1E',
  padding: { base: '12px', bp800: '28px' },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  overflow: 'hidden',
  backgroundImage:
    'radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.8), transparent 55%), radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.6), transparent 60%)',
});

const calendarWidget = css({
  width: '100%',
  height: '100%',
  maxWidth: { base: '100%', bp1024: '1200px' },
  minWidth: { bp800: '600px' },
});

function Home() {
  return (
    <section className={homeContainer}>
      <div className={calendarWidget}>
        <Calendar />
      </div>
    </section>
  );
}

export default Home;
