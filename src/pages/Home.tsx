import { Calendar } from '../components/Calendar/Calendar';
import { css } from '../../styled-system/css';

const homeContainer = css({
  height: '100vh',
  backgroundColor: '#FDFFFC',
  color: '#211A1E',
  padding: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  overflow: 'hidden',
});

const calendarWidget = css({
  width: '50%',
  height: '100%',
  minWidth: '400px',
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
