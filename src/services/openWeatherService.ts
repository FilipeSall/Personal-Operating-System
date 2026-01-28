import {
  OPEN_WEATHER_LANG,
  OPEN_WEATHER_UNITS,
} from '../components/Calendar/consts/weather';
import type { OpenWeatherCurrentResponse, OpenWeatherForecastResponse } from '../types/openWeather';

const OPEN_WEATHER_FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const OPEN_WEATHER_CURRENT_URL = 'https://api.openweathermap.org/data/2.5/weather';

type FetchForecastParams = {
  lat: number;
  lon: number;
  signal?: AbortSignal;
};

/**
 * Recupera a chave da OpenWeatherMap configurada no Vite.
 */
const getOpenWeatherApiKey = (): string => {
  return import.meta.env.VITE_OPENWEATHER_API_KEY ?? '';
};

/**
 * Monta a URL da OpenWeatherMap com os parametros fornecidos.
 */
const buildOpenWeatherUrl = (baseUrl: string, lat: number, lon: number, apiKey: string): string => {
  const url = new URL(baseUrl);
  url.searchParams.set('lat', lat.toString());
  url.searchParams.set('lon', lon.toString());
  url.searchParams.set('units', OPEN_WEATHER_UNITS);
  url.searchParams.set('lang', OPEN_WEATHER_LANG);
  url.searchParams.set('appid', apiKey);
  return url.toString();
};

/**
 * Busca a previsao do tempo (5 dias, intervalos de 3h) na OpenWeatherMap.
 */
export const fetchForecast = async ({
  lat,
  lon,
  signal,
}: FetchForecastParams): Promise<OpenWeatherForecastResponse> => {
  const apiKey = getOpenWeatherApiKey();
  if (!apiKey) {
    throw new Error('Chave da OpenWeatherMap nao configurada.');
  }

  const url = buildOpenWeatherUrl(OPEN_WEATHER_FORECAST_URL, lat, lon, apiKey);
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error('Nao foi possivel carregar o clima agora.');
  }

  return (await response.json()) as OpenWeatherForecastResponse;
};

type FetchCurrentParams = {
  lat: number;
  lon: number;
  signal?: AbortSignal;
};

/**
 * Busca o clima atual na OpenWeatherMap (fallback para o dia de hoje).
 */
export const fetchCurrentWeather = async ({
  lat,
  lon,
  signal,
}: FetchCurrentParams): Promise<OpenWeatherCurrentResponse> => {
  const apiKey = getOpenWeatherApiKey();
  if (!apiKey) {
    throw new Error('Chave da OpenWeatherMap nao configurada.');
  }

  const url = buildOpenWeatherUrl(OPEN_WEATHER_CURRENT_URL, lat, lon, apiKey);
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error('Nao foi possivel carregar o clima atual.');
  }

  return (await response.json()) as OpenWeatherCurrentResponse;
};
