import {
  timelineRow,
  timelineMeta,
  timelineHour,
  timelineConnector,
  timelineTasks,
  timelineTask,
  timelineTaskTitle,
  timelineEmpty,
  timelineWeather,
  timelineWeatherIcon,
  timelineWeatherValue,
  timelineWeatherSpinner,
} from '../../styles/calendar-sidebar.styles';
import {
  adjustToneForNight,
  getWmoMapping,
  WeatherToneIcon,
} from '../utils/wmoWeatherIcon';
import type { TimelineSlotData } from '../DayTimeline';

type TimelineHourSlotProps = {
  slot: TimelineSlotData;
};

/**
 * Slot horario com clima e tarefas.
 */
export const TimelineHourSlot = ({ slot }: TimelineHourSlotProps) => {
  const { hour, time, weather, todos, isLoading } = slot;

  const wmoMapping = weather ? getWmoMapping(weather.weatherCode) : null;
  const precipProbability = weather?.precipProbability ?? null;
  const tone = wmoMapping
    ? adjustToneForNight(wmoMapping.tone, hour, precipProbability)
    : 'cloudy';
  const precipValue = weather ? Math.round(weather.precipProbability) : null;
  const hasPrecipData = precipValue !== null;
  const weatherLabel = hasPrecipData ? `${precipValue}%` : isLoading ? '' : '—';
  const weatherTitle = hasPrecipData
    ? `${wmoMapping?.label ? `${wmoMapping.label} · ` : ''}${weatherLabel} de chuva`
    : 'Dados horarios indisponiveis';

  return (
    <div className={timelineRow}>
      <div className={timelineMeta}>
        <span className={timelineHour}>{time}</span>
        <span
          className={timelineWeather}
          data-tone={tone}
          data-empty={hasPrecipData || isLoading ? 'false' : 'true'}
          title={isLoading ? 'Carregando...' : weatherTitle}
        >
          <WeatherToneIcon tone={tone} className={timelineWeatherIcon} aria-hidden="true" />
          {isLoading ? (
            <span className={timelineWeatherValue} aria-live="polite">
              <span className={timelineWeatherSpinner} aria-hidden="true" />
            </span>
          ) : (
            <span className={timelineWeatherValue}>{weatherLabel}</span>
          )}
        </span>
      </div>
      <span className={timelineConnector} />

      <div className={timelineTasks}>
        {todos.length === 0 && (
          <span className={timelineEmpty}>—</span>
        )}
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={timelineTask({ type: todo.type })}
          >
            <span className={timelineTaskTitle}>{todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
