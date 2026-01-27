import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MdAdd, MdChecklist, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { CalendarDayCell } from '../CalendarDayCell/CalendarDayCell';
import { AddTodoModal } from '../AddTodoModal/AddTodoModal';
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
} from '../styles/calendar-base.styles';
import { CALENDAR_MONTHS, CALENDAR_WEEKDAYS } from '../consts/calendarLabels';

type CalendarGridViewProps = {
  currentMonth: Date;
  monthStart: Date;
  monthEnd: Date;
  days: Date[];
  today: Date;
  pickerYear: number;
  isDatePickerOpen: boolean;
  isAddTaskModalOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onToggleDatePicker: () => void;
  onMonthSelect: (monthIndex: number) => void;
  onYearChange: (delta: number) => void;
  onYearInputChange: (value: string) => void;
  onOpenAddTaskModal: () => void;
  onCloseAddTaskModal: () => void;
};

export function CalendarGridView({
  currentMonth,
  monthStart,
  monthEnd,
  days,
  today,
  pickerYear,
  isDatePickerOpen,
  isAddTaskModalOpen,
  dropdownRef,
  onToggleDatePicker,
  onMonthSelect,
  onYearChange,
  onYearInputChange,
  onOpenAddTaskModal,
  onCloseAddTaskModal,
}: CalendarGridViewProps) {
  return (
    <div className={calendarSection}>
      <div className={calendarHeader}>
        <div className={calendarHeaderTop}>
          <div className={dateCardWrapper} ref={dropdownRef}>
            <button type="button" className={dateCardButton} onClick={onToggleDatePicker}>
              <div className={dateCardButtonMonth}>
                {format(today, 'MMM', { locale: ptBR })}
              </div>
              <div className={dateCardButtonDay}>{format(today, 'd')}</div>
            </button>

            {isDatePickerOpen && (
              <div className={datePickerDropdown}>
                <div className={datePickerSection}>
                  <span className={datePickerLabel}>Ano</span>
                  <div className={yearSelector}>
                    <button type="button" className={yearButton} onClick={() => onYearChange(-1)}>
                      <MdChevronLeft size={18} />
                    </button>
                    <input
                      type="number"
                      className={yearInput}
                      value={pickerYear}
                      onChange={(e) => onYearInputChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.currentTarget.blur();
                        }
                      }}
                    />
                    <button type="button" className={yearButton} onClick={() => onYearChange(1)}>
                      <MdChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className={datePickerSection}>
                  <span className={datePickerLabel}>Mês</span>
                  <div className={monthGrid}>
                    {CALENDAR_MONTHS.map((month, index) => (
                      <button
                        key={month}
                        type="button"
                        className={monthButton({
                          isSelected:
                            currentMonth.getMonth() === index &&
                            currentMonth.getFullYear() === pickerYear,
                        })}
                        onClick={() => onMonthSelect(index)}
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
                {format(monthStart, 'd MMM', { locale: ptBR })} -{' '}
                {format(monthEnd, 'd MMM, yyyy', { locale: ptBR })}
              </p>
            </div>
          </div>

          <div className={navControls}>
            <button className={addTaskButton} type="button" onClick={onOpenAddTaskModal}>
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
        {CALENDAR_WEEKDAYS.map((weekday) => (
          <div key={weekday} className={weekdayHeader}>
            {weekday}
          </div>
        ))}
      </div>

      <div className={calendarGrid}>
        {days.map((date) => (
          <CalendarDayCell key={date.toISOString()} date={date} currentMonth={currentMonth} />
        ))}
      </div>

      <AddTodoModal isOpen={isAddTaskModalOpen} todo={null} onClose={onCloseAddTaskModal} />
    </div>
  );
}
