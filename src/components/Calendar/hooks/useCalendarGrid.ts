import { useEffect, useMemo, useRef, useState } from 'react';
import { addDays, endOfMonth, endOfWeek, setMonth, setYear, startOfMonth, startOfWeek } from 'date-fns';
import { useCalendarStore } from '../../../store/useCalendarStore';

export const useCalendarGrid = () => {
  const { currentMonth, setCurrentMonth } = useCalendarStore();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(currentMonth.getFullYear());
  const dropdownRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => new Date(), []);
  const monthStart = useMemo(() => startOfMonth(currentMonth), [currentMonth]);
  const monthEnd = useMemo(() => endOfMonth(currentMonth), [currentMonth]);
  const calendarStart = useMemo(
    () => startOfWeek(monthStart, { weekStartsOn: 1 }),
    [monthStart]
  );
  const calendarEnd = useMemo(
    () => endOfWeek(monthEnd, { weekStartsOn: 1 }),
    [monthEnd]
  );

  const days = useMemo(() => {
    const dates: Date[] = [];
    let day = calendarStart;
    while (day <= calendarEnd) {
      dates.push(day);
      day = addDays(day, 1);
    }
    return dates;
  }, [calendarStart, calendarEnd]);

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

  const handleYearInputChange = (value: string) => {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed < 10000) {
      setPickerYear(parsed);
    }
  };

  const handleToggleDatePicker = () => {
    setPickerYear(currentMonth.getFullYear());
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleOpenAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const handleCloseAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  return {
    currentMonth,
    monthStart,
    monthEnd,
    calendarStart,
    calendarEnd,
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
  };
};
