export interface WeatherData {
  location: string;
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    uv: number;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    daily_chance_of_rain: number;
    condition: {
      text: string;
      icon: string;
    };
    uv: number;
  };
  hour: HourForecast[];
}

export interface HourForecast {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  wind_kph: number;
  wind_dir: string;
  precip_mm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  chance_of_rain: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export type ViewType = 'weather' | 'chatbot';
