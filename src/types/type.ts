export interface WeatherCondition {
  main: string;
  description: string;
  icon: string;
}

export interface TemperatureInfo {
  day?: number; // for daily forecasts
  night?: number; // for nightly forecasts
  min?: number;
  max?: number;
}

export interface Forecast {
  dt: number; // timestamp
  temp: TemperatureInfo;
  weather: WeatherCondition[];
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  weather: WeatherCondition[];
}

export interface TodayForecastProps {
  data: CurrentWeather;
}

export interface NightForecastProps {
  data: Forecast;
}

export interface MultiDayForecastProps {
  data: Forecast[];
}

export interface SearchBarProps {
  onSearch: (city: string) => void;
}
