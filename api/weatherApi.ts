import { WeatherData, LocationData } from '../types/weather';

const API_KEY = '5ff17e87e0d94cad84b122008251005'; // Replace with your actual API key from a .env file in production
const BASE_URL = 'https://api.weatherapi.com/v1';

export const searchLocations = async (query: string): Promise<LocationData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
};

export const fetchWeatherData = async (
  location: string, 
  days: number = 7,
  aqi: boolean = true
): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=${days}&aqi=${aqi ? 'yes' : 'no'}&alerts=yes`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};