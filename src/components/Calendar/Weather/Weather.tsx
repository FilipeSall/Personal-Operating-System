import { useWeather } from '../hooks/useWeather';
import { WeatherView } from './WeatherView';

/**
 * Componente container do clima do dia.
 */
export function Weather() {
  const { state, derived, actions } = useWeather();

  return <WeatherView state={state} derived={derived} actions={actions} />;
}
