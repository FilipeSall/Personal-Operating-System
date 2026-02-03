import { useMemo } from 'react';
import { useCalendarStore } from '../../store/useCalendarStore';
import { useWeatherStore } from '../../store/useWeatherStore';
import { toForecastKey } from '../../utils/forecastGrouper';
import { resolveWeatherTheme, weatherThemeToCssVars } from './utils/weatherTheme';
import { CalendarGrid } from './CalendarGrid/CalendarGrid';
import { Weather } from './Weather/Weather';
import { CalendarSidebar } from './CalendarSidebar/CalendarSidebar';
import {
  calendarShell,
  calendarLayout,
  calendarMain,
} from './styles/calendar-layout.styles';

export function Calendar() {
  const selectedDate = useCalendarStore((s) => s.selectedDate);
  const forecasts = useWeatherStore((s) => s.forecasts);

  const { cssVars, tone } = useMemo(() => {
    const key = toForecastKey(selectedDate);
    const snapshot = forecasts.get(key) ?? null;
    const theme = resolveWeatherTheme(snapshot);
    return { cssVars: weatherThemeToCssVars(theme), tone: theme.tone };
  }, [selectedDate, forecasts]);

  return (
    <div className={calendarShell} style={cssVars as React.CSSProperties} data-tone={tone}>
      <div className={calendarLayout}>
        <div className={calendarMain}>
          <CalendarGrid />
          <Weather />
        </div>
        <CalendarSidebar />
      </div>
    </div>
  );
}
