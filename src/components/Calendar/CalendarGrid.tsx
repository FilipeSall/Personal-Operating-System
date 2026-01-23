import { useState, useRef, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  setMonth,
  setYear,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MdAdd, MdChecklist, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useCalendarStore } from '../../store/useCalendarStore';
import { CalendarDayCell } from './CalendarDayCell';
import { AddTodoModal } from './AddTodoModal';
import {
  calendarHeader,
  calendarHeaderTop,
  dateCardWrapper,
  dateCardButton,
  dateCardButtonMonth,
  dateCardButtonDay,
  datePickerDropdown,
  datePickerSection,
  datePickerLabel,
  monthGrid,
  monthButton,
  yearSelector,
  yearButton,
  yearInput,
  monthInfo,
  calendarTitle,
  calendarPeriod,
  navControls,
  addEventButton,
  addTaskButton,
  weekdaysRow,
  weekdayHeader,
  calendarGrid,
  calendarSection,
} from './styles/calendar-base.styles';

const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export function CalendarGrid() {
  const { currentMonth, setCurrentMonth } = useCalendarStore();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(currentMonth.getFullYear());
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    }

    if (isDatePickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDatePickerOpen]);

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = setYear(setMonth(currentMonth, monthIndex), pickerYear);
    setCurrentMonth(newDate);
    setIsDatePickerOpen(false);
  };

  const handleYearChange = (delta: number) => {
    setPickerYear((prev) => prev + delta);
  };

  return (
    <div className={calendarSection}>
      <div className={calendarHeader}>
        <div className={calendarHeaderTop}>
          <div className={dateCardWrapper} ref={dropdownRef}>
            <button
              type="button"
              className={dateCardButton}
              onClick={() => {
                setPickerYear(currentMonth.getFullYear());
                setIsDatePickerOpen(!isDatePickerOpen);
              }}
            >
              <div className={dateCardButtonMonth}>
                {format(today, 'MMM', { locale: ptBR })}
              </div>
              <div className={dateCardButtonDay}>
                {format(today, 'd')}
              </div>
            </button>

            {isDatePickerOpen && (
              <div className={datePickerDropdown}>
                <div className={datePickerSection}>
                  <span className={datePickerLabel}>Ano</span>
                  <div className={yearSelector}>
                    <button
                      type="button"
                      className={yearButton}
                      onClick={() => handleYearChange(-1)}
                    >
                      <MdChevronLeft size={18} />
                    </button>
                    <input
                      type="number"
                      className={yearInput}
                      value={pickerYear}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (!isNaN(value) && value > 0 && value < 10000) {
                          setPickerYear(value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.currentTarget.blur();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className={yearButton}
                      onClick={() => handleYearChange(1)}
                    >
                      <MdChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className={datePickerSection}>
                  <span className={datePickerLabel}>Mês</span>
                  <div className={monthGrid}>
                    {MONTHS.map((month, index) => (
                      <button
                        key={month}
                        type="button"
                        className={monthButton({
                          isSelected:
                            currentMonth.getMonth() === index &&
                            currentMonth.getFullYear() === pickerYear,
                        })}
                        onClick={() => handleMonthSelect(index)}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className={monthInfo}>
              <h2 className={calendarTitle}>
                {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
              </h2>
              <p className={calendarPeriod}>
                {format(monthStart, 'd MMM', { locale: ptBR })} - {format(monthEnd, 'd MMM, yyyy', { locale: ptBR })}
              </p>
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
