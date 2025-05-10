import { TemperatureUnit } from '@/types/weather';

export const formatTemperature = (temp: number, unit: TemperatureUnit): string => {
  return `${Math.round(temp)}°${unit === 'celsius' ? 'C' : 'F'}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const formatTime = (timeString: string, format: '12h' | '24h'): string => {
  const date = new Date(timeString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: format === '12h'
  }).format(date);
};

export const getDayPeriod = (): 'morning' | 'day' | 'evening' | 'night' => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'day';
  if (hour >= 17 && hour < 20) return 'evening';
  return 'night';
};

export const getWeatherBackground = (code: number, isDay: boolean): string => {
  // Weather condition codes are based on WMO (World Meteorological Organization) codes
  // Clear
  if (code === 1000) {
    return isDay ? 'bg-gradient-to-br from-blue-400 to-blue-200' : 'bg-gradient-to-br from-indigo-900 to-blue-900';
  }
  
  // Partly cloudy
  if (code === 1003) {
    return isDay ? 'bg-gradient-to-br from-blue-400 to-blue-300' : 'bg-gradient-to-br from-indigo-800 to-blue-800';
  }
  
  // Cloudy
  if (code >= 1006 && code <= 1030) {
    return isDay ? 'bg-gradient-to-br from-blue-300 to-gray-300' : 'bg-gradient-to-br from-indigo-700 to-gray-800';
  }
  
  // Rainy
  if (code >= 1063 && code <= 1201) {
    return isDay ? 'bg-gradient-to-br from-blue-500 to-gray-400' : 'bg-gradient-to-br from-indigo-900 to-gray-900';
  }
  
  // Snow
  if (code >= 1204 && code <= 1237) {
    return isDay ? 'bg-gradient-to-br from-blue-100 to-gray-200' : 'bg-gradient-to-br from-blue-800 to-gray-800';
  }
  
  // Misc
  return isDay ? 'bg-gradient-to-br from-blue-400 to-blue-200' : 'bg-gradient-to-br from-indigo-900 to-blue-900';
};

export const getAirQualityDescription = (aqiIndex: number): { text: string; color: string } => {
  if (aqiIndex <= 50) {
    return { text: 'Good', color: 'text-green-500' };
  } else if (aqiIndex <= 100) {
    return { text: 'Moderate', color: 'text-yellow-500' };
  } else if (aqiIndex <= 150) {
    return { text: 'Unhealthy for Sensitive Groups', color: 'text-orange-500' };
  } else if (aqiIndex <= 200) {
    return { text: 'Unhealthy', color: 'text-red-500' };
  } else if (aqiIndex <= 300) {
    return { text: 'Very Unhealthy', color: 'text-purple-500' };
  } else {
    return { text: 'Hazardous', color: 'text-rose-700' };
  }
};

export const isDay = (): boolean => {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 20;
};