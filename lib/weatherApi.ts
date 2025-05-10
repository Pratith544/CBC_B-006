import { WeatherData } from './types';

const API_KEY = 'YOUR_WEATHER_API_KEY'; // Replace with environment variable in production

/**
 * Fetches weather data for a specific location
 */
export async function getWeatherData(location: string): Promise<WeatherData> {
  try {
    // For demo purposes, we're using weatherapi.com - in production use environment variables for API keys
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
        location
      )}&days=7&aqi=no&alerts=no`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// For demo purposes, returning mock data when API key is not set
export async function getMockWeatherData(location: string): Promise<WeatherData> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    location: location || 'San Francisco',
    current: {
      temp_c: 18,
      temp_f: 64.4,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      },
      wind_kph: 14.4,
      wind_degree: 220,
      wind_dir: 'SW',
      pressure_mb: 1014,
      precip_mm: 0,
      humidity: 72,
      cloud: 25,
      feelslike_c: 18,
      uv: 5,
    },
    forecast: {
      forecastday: Array(7)
        .fill(null)
        .map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          return {
            date: date.toISOString().split('T')[0],
            day: {
              maxtemp_c: 20 + Math.random() * 5,
              mintemp_c: 12 + Math.random() * 3,
              avgtemp_c: 16 + Math.random() * 4,
              maxwind_kph: 10 + Math.random() * 15,
              totalprecip_mm: Math.random() * 5,
              avghumidity: 65 + Math.random() * 20,
              daily_chance_of_rain: Math.floor(Math.random() * 50),
              condition: {
                text: i % 2 === 0 ? 'Sunny' : 'Partly cloudy',
                icon: i % 2 === 0 
                  ? '//cdn.weatherapi.com/weather/64x64/day/113.png' 
                  : '//cdn.weatherapi.com/weather/64x64/day/116.png',
              },
              uv: 4 + Math.random() * 3,
            },
            hour: Array(24)
              .fill(null)
              .map((_, j) => {
                const hourDate = new Date(date);
                hourDate.setHours(j);
                return {
                  time: hourDate.toISOString(),
                  temp_c: 15 + Math.random() * 10,
                  condition: {
                    text: 'Partly cloudy',
                    icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
                  },
                  wind_kph: 5 + Math.random() * 15,
                  wind_dir: 'SW',
                  precip_mm: Math.random() * 2,
                  humidity: 60 + Math.random() * 20,
                  cloud: Math.floor(Math.random() * 100),
                  feelslike_c: 14 + Math.random() * 8,
                  chance_of_rain: Math.floor(Math.random() * 30),
                };
              }),
          };
        }),
    },
  };
}

// Helper function that will use the API if key is provided, otherwise mock data
export async function fetchWeatherData(location: string): Promise<WeatherData> {
  // Check if API_KEY is placeholder
  if (API_KEY === 'YOUR_WEATHER_API_KEY') {
    return getMockWeatherData(location);
  } else {
    return getWeatherData(location);
  }
}