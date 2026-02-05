import type { OpenMeteoHourlyResponse } from '../types/openMeteo';

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

const HOURLY_PARAMS = [
  'precipitation_probability',
  'precipitation',
  'temperature_2m',
  'weathercode',
].join(',');

type FetchHourlyForecastParams = {
  lat: number;
  lon: number;
  date: string;
  signal?: AbortSignal;
};

const buildHourlyUrl = (lat: number, lon: number, date: string): string => {
  const url = new URL(OPEN_METEO_BASE_URL);
  url.searchParams.set('latitude', lat.toString());
  url.searchParams.set('longitude', lon.toString());
  url.searchParams.set('hourly', HOURLY_PARAMS);
  url.searchParams.set('start_date', date);
  url.searchParams.set('end_date', date);
  url.searchParams.set('timezone', 'auto');
  return url.toString();
};

export const fetchHourlyForecast = async ({
  lat,
  lon,
  date,
  signal,
}: FetchHourlyForecastParams): Promise<OpenMeteoHourlyResponse> => {
  const url = buildHourlyUrl(lat, lon, date);

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Open-Meteo error: ${response.status}`);
  }

  return (await response.json()) as OpenMeteoHourlyResponse;
};
