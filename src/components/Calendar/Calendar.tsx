import { useMemo } from 'react';
import { useCalendarStore } from '../../store/useCalendarStore';
import { useWeatherStore } from '../../store/useWeatherStore';
import { toForecastKey } from '../../utils/forecastGrouper';
import { resolveWeatherTheme, weatherThemeToCssVars } from './utils/weatherTheme';
import { CalendarGrid } from './CalendarGrid/CalendarGrid';
import { Weather } from './Weather/Weather';
import { calendarContainer } from './styles/calendar-layout.styles';

export function Calendar() {
  const selectedDate = useCalendarStore((s) => s.selectedDate);
  const forecasts = useWeatherStore((s) => s.forecasts);

  const cssVars = useMemo(() => {
    const key = toForecastKey(selectedDate);
    const snapshot = forecasts.get(key) ?? null;
    const theme = resolveWeatherTheme(snapshot);
    return weatherThemeToCssVars(theme);
  }, [selectedDate, forecasts]);

  return (
    <div className={calendarContainer} style={cssVars as React.CSSProperties}>
      <CalendarGrid />
      <Weather />
    </div>
  );
}
