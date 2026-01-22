import { Calendar } from '../components/Calendar';
import { css } from '../../styled-system/css';

const homeContainer = css({
  minHeight: '100vh',
  backgroundColor: '#FDFFFC',
  color: '#211A1E',
  padding: '32px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gridAutoRows: 'minmax(120px, auto)',
  gap: '24px',
  alignItems: 'start',
});

const calendarWidget = css({
  width: '100%',
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
