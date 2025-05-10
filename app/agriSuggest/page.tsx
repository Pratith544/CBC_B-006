'use client';

import { useState, useEffect } from 'react';
import { WeatherData, ViewType } from '@/lib/types';
import { fetchWeatherData } from '@/lib/weatherApi';
import Toolbar from '@/components/layout/Toolbar';
import WeatherDashboard from '@/components/agriSuggest/WeatherDashboard';
import ChatbotView from '@/components/chatbot/ChatbotView';

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>('weather');
  const [location, setLocation] = useState('London, UK');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (searchLocation: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(searchLocation);
      setWeatherData(data);
      setLocation(searchLocation);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(location);
  }, []);

  const handleLocationSearch = (query: string) => {
    fetchData(query);
  };

  return (
    <div className="min-h-screen bg-white">
      <Toolbar 
        activeView={activeView} 
        onViewChange={setActiveView}
        location={location}
        onLocationSearch={handleLocationSearch}
      />
      
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-primary">Loading weather data...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">{error}</div>
          </div>
        ) : weatherData ? (
          <>
            {activeView === 'weather' ? (
              <WeatherDashboard weatherData={weatherData} />
            ) : (
              <ChatbotView weatherData={weatherData} />
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}