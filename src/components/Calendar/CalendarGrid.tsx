import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MdAdd, MdChecklist } from 'react-icons/md';
import { useCalendarStore } from '../../store/useCalendarStore';
import { CalendarDayCell } from './CalendarDayCell';
import { AddTodoModal } from './AddTodoModal';
import {
  calendarHeader,
  calendarHeaderTop,
  dateCard,
  dateCardMonth,
  dateCardDay,
  navControls,
  addEventButton,
  addTaskButton,
  weekdaysRow,
  weekdayHeader,
  calendarGrid,
  calendarSection,
} from './styles/calendar-base.styles';

const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export function CalendarGrid() {
  const { currentMonth } = useCalendarStore();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const today = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days: Date[] = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className={calendarSection}>
      <div className={calendarHeader}>
        <div className={calendarHeaderTop}>
          <div className={dateCard}>
            <div className={dateCardMonth}>
              {format(today, 'MMM', { locale: ptBR })}
            </div>
            <div className={dateCardDay}>
              {format(today, 'd')}
            </div>
          </div>

          <div className={navControls}>
            <button
              className={addTaskButton}
              type="button"
              onClick={() => setIsAddTaskModalOpen(true)}
            >
              <MdChecklist size={18} />
              Tarefa
            </button>

            <button className={addEventButton} type="button">
              <MdAdd size={18} />
              Evento
            </button>
          </div>
        </div>
      </div>

      <div className={weekdaysRow}>
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className={weekdayHeader}>
            {weekday}
          </div>
        ))}
      </div>

      <div className={calendarGrid}>
        {days.map((date) => (
          <CalendarDayCell
            key={date.toISOString()}
            date={date}
            currentMonth={currentMonth}
          />
        ))}
      </div>

      <AddTodoModal
        isOpen={isAddTaskModalOpen}
        todo={null}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
    </div>
  );
}
