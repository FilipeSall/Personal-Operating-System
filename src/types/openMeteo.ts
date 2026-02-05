export type OpenMeteoHourlyUnits = {
  time: string;
  precipitation_probability: string;
  precipitation: string;
  temperature_2m: string;
  weathercode: string;
};

export type OpenMeteoHourlyData = {
  time: string[];
  precipitation_probability: number[];
  precipitation: number[];
  temperature_2m: number[];
  weathercode: number[];
};

export type OpenMeteoHourlyResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
  hourly_units: OpenMeteoHourlyUnits;
  hourly: OpenMeteoHourlyData;
};
