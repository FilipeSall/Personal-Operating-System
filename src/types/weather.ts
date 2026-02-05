export type WeatherRowId =
  | 'summary'
  | 'temperature'
  | 'feelsLike'
  | 'rainChance'
  | 'wind'
  | 'humidity'
  | 'uvIndex'
  | 'clouds'
  | 'sunTimes'
  | 'alerts'
  | 'precipitation';

export type WeatherRow = {
  id: WeatherRowId;
  label: string;
  value: string;
  recommendation: string;
};

export type WeatherSnapshot = {
  description: string;
  temperature: {
    current: number;
    min: number;
    max: number;
  };
  feelsLike: number;
  pop: number;
  wind: {
    speed: number;
    deg: number;
  };
  humidity: number;
  uvIndex: number;
  clouds: number;
  sunrise: number;
  sunset: number;
  alerts: string[];
  precipitation: {
    rain: number;
    snow: number;
  };
};

export type WeatherTipKind =
  | 'sun'
  | 'rain'
  | 'storm'
  | 'snow'
  | 'fog'
  | 'clouds'
  | 'wind'
  | 'humidity'
  | 'uv'
  | 'temperature'
  | 'precipitation'
  | 'alert'
  | 'generic'
  | 'composite'
  | 'positive';

export type WeatherTip = {
  id: string;
  label: string;
  message: string;
  kind: WeatherTipKind;
};

export type WeatherCoordinates = {
  lat: number;
  lon: number;
  label: string;
  isFallback: boolean;
};

export type HourlySource = 'forecast' | 'archive';

export type HourlyDataPoint = {
  hour: number;
  time: string;
  precipProbability: number;
  precipitation: number;
  temperature: number;
  weatherCode: number;
};

export type HourlyForecast = {
  dateKey: string;
  cacheKey: string;
  points: HourlyDataPoint[];
  fetchedAt: number;
};
