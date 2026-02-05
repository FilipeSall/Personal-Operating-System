import type { OpenMeteoHourlyResponse } from '../types/openMeteo';
import type { HourlySource } from '../types/weather';

const OPEN_METEO_FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const OPEN_METEO_ARCHIVE_URL = 'https://archive-api.open-meteo.com/v1/archive';

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
  source?: HourlySource;
  signal?: AbortSignal;
};

/**
 * Monta a URL do Open-Meteo para o forecast horario de um dia.
 *
 * @param lat Latitude.
 * @param lon Longitude.
 * @param date Data no formato YYYY-MM-DD.
 * @param source Origem do dado (forecast ou archive).
 */
const buildHourlyUrl = (
  lat: number,
  lon: number,
  date: string,
  source: HourlySource
): string => {
  const baseUrl = source === 'archive' ? OPEN_METEO_ARCHIVE_URL : OPEN_METEO_FORECAST_URL;
  const url = new URL(baseUrl);
  url.searchParams.set('latitude', lat.toString());
  url.searchParams.set('longitude', lon.toString());
  url.searchParams.set('hourly', HOURLY_PARAMS);
  url.searchParams.set('start_date', date);
  url.searchParams.set('end_date', date);
  url.searchParams.set('timezone', 'auto');
  return url.toString();
};

/**
 * Busca o forecast horario no Open-Meteo.
 *
 * @param params Coordenadas, data e sinal de cancelamento.
 */
export const fetchHourlyForecast = async ({
  lat,
  lon,
  date,
  source = 'forecast',
  signal,
}: FetchHourlyForecastParams): Promise<OpenMeteoHourlyResponse> => {
  const url = buildHourlyUrl(lat, lon, date, source);
  const response = await fetch(url, { signal });

  if (!response.ok) {
    let reason: string | null = null;
    try {
      const errorPayload = (await response.json()) as { reason?: string };
      reason = typeof errorPayload?.reason === 'string' ? errorPayload.reason : null;
    } catch {
      reason = null;
    }

    const message = reason
      ? `Open-Meteo error: ${response.status} - ${reason}`
      : `Open-Meteo error: ${response.status}`;
    throw new Error(message);
  }

  const data = (await response.json()) as OpenMeteoHourlyResponse;
  return data;
};
