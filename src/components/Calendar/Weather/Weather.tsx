import { useWeather } from '../hooks/useWeather';
import { useWeatherUiStore } from '../../../store/useWeatherUiStore';
import { WeatherDetailsModal } from './WeatherDetailsModal';
import { WeatherView } from './WeatherView';

/**
 * Componente container do clima do dia.
 */
export function Weather() {
  const { state, derived, actions } = useWeather();
  const isDetailsOpen = useWeatherUiStore((store) => store.isDetailsOpen);
  const closeDetails = useWeatherUiStore((store) => store.closeDetails);

  return (
    <>
      <WeatherView state={state} derived={derived} actions={actions} />
      <WeatherDetailsModal
        isOpen={isDetailsOpen}
        onClose={closeDetails}
        state={state}
        derived={derived}
      />
    </>
  );
}
