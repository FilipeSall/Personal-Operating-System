import { Calendar } from '../components/Calendar/Calendar';
import { css } from '../../styled-system/css';

const homeContainer = css({
  height: '100vh',
  backgroundColor: '#FDFFFC',
  color: '#211A1E',
  padding: { base: '12px', bp800: '32px' },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  overflow: 'hidden',
});

const calendarWidget = css({
  width: { base: '100%', bp800: '50%' },
  height: '100%',
  minWidth: { bp800: '400px' },
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
