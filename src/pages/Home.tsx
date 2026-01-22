import { Calendar } from '../components/Calendar';
import { css } from '../../styled-system/css';

const homeContainer = css({
  minHeight: '100vh',
  backgroundColor: '#0f0f1a',
  padding: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

function Home() {
  return (
    <section className={homeContainer}>
      <Calendar />
    </section>
  );
}

export default Home;
