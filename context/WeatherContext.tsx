import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeatherData } from '@/api/weatherApi';
import { WeatherData, UserPreferences, TemperatureUnit, TimeFormat } from '@/types/weather';

interface WeatherContextType {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  location: string;
  setLocation: (location: string) => void;
  preferences: UserPreferences;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setTimeFormat: (format: TimeFormat) => void;
  addSavedLocation: (location: string) => void;
  removeSavedLocation: (location: string) => void;
  refreshWeather: () => Promise<void>;
}

const defaultPreferences: UserPreferences = {
  temperatureUnit: 'celsius',
  timeFormat: '24h',
  savedLocations: []
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('London');
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const savedPrefs = localStorage.getItem('weatherPreferences');
    return savedPrefs ? JSON.parse(savedPrefs) : defaultPreferences;
  });

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('weatherPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const fetchWeather = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(location);
      if (data) {
        setWeatherData(data);
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (err) {
      setError('An error occurred while fetching weather data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const setTemperatureUnit = (unit: TemperatureUnit) => {
    setPreferences(prev => ({ ...prev, temperatureUnit: unit }));
  };

  const setTimeFormat = (format: TimeFormat) => {
    setPreferences(prev => ({ ...prev, timeFormat: format }));
  };

  const addSavedLocation = (loc: string) => {
    if (!preferences.savedLocations.includes(loc)) {
      setPreferences(prev => ({
        ...prev,
        savedLocations: [...prev.savedLocations, loc]
      }));
    }
  };

  const removeSavedLocation = (loc: string) => {
    setPreferences(prev => ({
      ...prev,
      savedLocations: prev.savedLocations.filter(l => l !== loc)
    }));
  };

  const refreshWeather = async () => {
    await fetchWeather();
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        isLoading,
        error,
        location,
        setLocation,
        preferences,
        setTemperatureUnit,
        setTimeFormat,
        addSavedLocation,
        removeSavedLocation,
        refreshWeather
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};