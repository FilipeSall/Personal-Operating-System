import { DEFAULT_WEATHER_COORDINATES, DEFAULT_WEATHER_LABEL } from '../components/Calendar/consts/weather';
import type { WeatherCoordinates } from '../types/weather';

/**
 * Resolve as coordenadas para o clima usando geolocalizacao quando disponivel.
 */
export const resolveWeatherCoordinates = (): Promise<WeatherCoordinates> => {
  if (!navigator.geolocation) {
    return Promise.resolve({
      ...DEFAULT_WEATHER_COORDINATES,
      label: DEFAULT_WEATHER_LABEL,
      isFallback: true,
    });
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          label: 'Localizacao atual',
          isFallback: false,
        });
      },
      () => {
        resolve({
          ...DEFAULT_WEATHER_COORDINATES,
          label: DEFAULT_WEATHER_LABEL,
          isFallback: true,
        });
      },
      { timeout: 5000 }
    );
  });
};
