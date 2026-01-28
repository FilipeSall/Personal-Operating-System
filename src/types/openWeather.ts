export type OpenWeatherWeather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type OpenWeatherForecastItem = {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: OpenWeatherWeather[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  pop: number;
  rain?: {
    '3h'?: number;
  };
  snow?: {
    '3h'?: number;
  };
};

export type OpenWeatherForecastCity = {
  name: string;
  sunrise: number;
  sunset: number;
};

export type OpenWeatherForecastResponse = {
  list: OpenWeatherForecastItem[];
  city: OpenWeatherForecastCity;
};

export type OpenWeatherCurrentResponse = {
  weather: OpenWeatherWeather[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
};
