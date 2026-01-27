import { CalendarGridView } from './CalendarGridView';
import { useCalendarGrid } from '../hooks/useCalendarGrid';

export function CalendarGrid() {
  const {
    currentMonth,
    monthStart,
    monthEnd,
    days,
    today,
    pickerYear,
    isDatePickerOpen,
    isAddTaskModalOpen,
    dropdownRef,
    handleMonthSelect,
    handleYearChange,
    handleYearInputChange,
    handleToggleDatePicker,
    handleOpenAddTaskModal,
    handleCloseAddTaskModal,
  } = useCalendarGrid();

  return (
    <CalendarGridView
      currentMonth={currentMonth}
      monthStart={monthStart}
      monthEnd={monthEnd}
      days={days}
      today={today}
      pickerYear={pickerYear}
      isDatePickerOpen={isDatePickerOpen}
      isAddTaskModalOpen={isAddTaskModalOpen}
      dropdownRef={dropdownRef}
      onMonthSelect={handleMonthSelect}
      onYearChange={handleYearChange}
      onYearInputChange={handleYearInputChange}
      onToggleDatePicker={handleToggleDatePicker}
      onOpenAddTaskModal={handleOpenAddTaskModal}
      onCloseAddTaskModal={handleCloseAddTaskModal}
    />
  );
}
