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

export type WeatherCoordinates = {
  lat: number;
  lon: number;
  label: string;
  isFallback: boolean;
};
