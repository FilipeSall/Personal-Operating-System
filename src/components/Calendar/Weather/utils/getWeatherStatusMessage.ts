import type { WeatherDerived, WeatherState } from '../hooks/useWeather';

/**
 * Retorna a mensagem que deve ser exibida quando o resumo do clima não pode ser renderizado.
 */
export function getWeatherStatusMessage(
  state: WeatherState,
  derived: WeatherDerived
): string | null {
  if (state.error) {
    return state.error;
  }

  if (!derived.snapshot) {
    if (state.isLoading) {
      return 'Carregando clima...';
    }

    return 'Previsao indisponivel para esta data.';
  }

  return null;
}
