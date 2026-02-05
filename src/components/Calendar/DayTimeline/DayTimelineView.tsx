import { css } from '../../../../styled-system/css';
import {
  calendarTimeline,
  sidebarHeader,
  sidebarTitle,
  sidebarMeta,
} from '../styles/calendar-sidebar.styles';
import { TimelineHourSlot } from './components/TimelineHourSlot';
import type { TimelineSlotData } from './DayTimeline';

type DayTimelineViewProps = {
  slots: TimelineSlotData[];
  formattedDate: string;
  locationLabel: string;
  error: string | null;
};

const errorText = css({
  color: 'danger.500',
  fontSize: '12px',
  padding: '8px 0',
});

const footerAttribution = css({
  fontSize: '10px',
  color: 'text.faint',
  textAlign: 'center',
  padding: '8px 0',
  marginTop: 'auto',
});

/**
 * View principal da timeline diaria.
 */
export const DayTimelineView = ({
  slots,
  formattedDate,
  locationLabel,
  error,
}: DayTimelineViewProps) => {
  return (
    <>
      <header className={sidebarHeader}>
        <h2 className={sidebarTitle}>{formattedDate}</h2>
        <span className={sidebarMeta}>{locationLabel}</span>
      </header>

      {error && <p className={errorText}>{error}</p>}

      <div className={calendarTimeline}>
        {slots.map((slot) => (
          <TimelineHourSlot
            key={slot.hour}
            slot={slot}
          />
        ))}
      </div>

      <footer className={footerAttribution}>
        Dados horarios: Open-Meteo.com
      </footer>
    </>
  );
};
