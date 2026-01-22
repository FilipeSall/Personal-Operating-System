import { Calendar } from '../components/Calendar';
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
  width: '100%',
  height: '100%',
  maxWidth: '500px',
  margin: '0 auto',
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
