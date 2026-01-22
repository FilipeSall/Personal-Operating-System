import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useCalendarStore } from '../../store/useCalendarStore';
import { CalendarDayCell } from './CalendarDayCell';
import {
  calendarHeader,
  calendarTitle,
  navButton,
  calendarGrid,
  weekdayHeader,
} from './calendar.styles';

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function CalendarGrid() {
  const { currentMonth, setCurrentMonth } = useCalendarStore();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days: Date[] = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div>
      <div className={calendarHeader}>
        <button className={navButton} onClick={handlePrevMonth} type="button">
          <MdChevronLeft size={20} />
        </button>
        <span className={calendarTitle}>
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </span>
        <button className={navButton} onClick={handleNextMonth} type="button">
          <MdChevronRight size={20} />
        </button>
      </div>

      <div className={calendarGrid}>
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className={weekdayHeader}>
            {weekday}
          </div>
        ))}

        {days.map((date) => (
          <CalendarDayCell
            key={date.toISOString()}
            date={date}
            currentMonth={currentMonth}
          />
        ))}
      </div>
    </div>
  );
}
