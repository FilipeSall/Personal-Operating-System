import type { VisibleTimelineSlot } from '../../hooks/useTimelineNavigation';
import {
  timelineRow,
  timelineMeta,
  timelineHour,
  timelineTasks,
  timelineTaskToggle,
  timelineHourButton,
  timelineConnector,
  timelineWeather,
  timelineWeatherIcon,
  timelineWeatherValue,
} from '../../styles/calendar-sidebar.styles';
import { useTimelineTaskExpansion } from '../../hooks/useTimelineTaskExpansion';
import { TimelineTaskCard } from './TimelineTaskCard';
import {
  adjustToneForNight,
  getWmoMapping,
  WeatherToneIcon,
} from '../../DayTimeline/utils/wmoWeatherIcon';

type CalendarSidebarTimelineRowProps = {
  slot: VisibleTimelineSlot;
  onSelectNextDay: (hour: number) => void;
};

/**
 * Renderiza uma linha de horário da timeline.
 */
export function CalendarSidebarTimelineRow({
  slot,
  onSelectNextDay,
}: CalendarSidebarTimelineRowProps) {
  const { state, actions } = useTimelineTaskExpansion(slot.tasks, 3);
  const wmoMapping = slot.weatherCode !== null ? getWmoMapping(slot.weatherCode) : null;
  const tone = wmoMapping
    ? adjustToneForNight(wmoMapping.tone, slot.hour, slot.precipProbability)
    : slot.tone === 'default'
      ? 'cloudy'
      : slot.tone;
  const precipValue =
    slot.precipProbability !== null ? Math.round(slot.precipProbability) : null;
  const hasPrecipData = precipValue !== null;
  const weatherLabel = hasPrecipData ? `${precipValue}%` : '—';
  const weatherTitle = hasPrecipData
    ? `${wmoMapping?.label ? `${wmoMapping.label} · ` : ''}${weatherLabel} de chuva`
    : 'Dados horarios indisponiveis';

  return (
    <div className={timelineRow}>
      <div className={timelineMeta}>
        <div className={timelineHour}>
          {slot.dayOffset === 1 ? (
            <button
              type="button"
              className={timelineHourButton}
              onClick={() => onSelectNextDay(slot.hour)}
              aria-label="Ir para o proximo dia"
            >
              {slot.label}
            </button>
          ) : (
            <span>{slot.label}</span>
          )}
        </div>
        <span
          className={timelineWeather}
          data-tone={tone}
          data-empty={hasPrecipData ? 'false' : 'true'}
          title={weatherTitle}
        >
          <WeatherToneIcon tone={tone} className={timelineWeatherIcon} aria-hidden="true" />
          <span className={timelineWeatherValue}>{weatherLabel}</span>
        </span>
      </div>
      <div className={timelineTasks}>
        {state.visibleTasks.map((task) => (
          <TimelineTaskCard key={task.id} task={task} />
        ))}
        {state.hasOverflow && (
          <button
            type="button"
            className={timelineTaskToggle}
            onClick={actions.toggle}
            aria-expanded={state.isExpanded}
          >
            {state.isExpanded
              ? 'Mostrar menos'
              : `Ver mais ${state.hiddenCount} tarefas`}
          </button>
        )}
      </div>
      <span className={timelineConnector} aria-hidden="true" />
    </div>
  );
}
