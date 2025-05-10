'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TemperatureChart from './TemperatureChart';
import PrecipitationChart from './PrecipitationChart';
import HumidityWindChart from './HumidityWindChart';
import CropRecommendationChart from './CropRecommendationChart';
import ClimateOverviewChart from './ClimateOverviewChart';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';

interface WeatherDashboardProps {
  weatherData: WeatherData;
}

export default function WeatherDashboard({ weatherData }: WeatherDashboardProps) {
  if (!weatherData || !weatherData.current) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No weather data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Temperature</p>
              <h3 className="text-2xl font-bold mt-1">{weatherData.current.temp_c}°C</h3>
              <p className="text-sm text-blue-700 mt-1">
                Feels like {weatherData.current.feelslike_c}°C
              </p>
            </div>
            <Thermometer className="h-12 w-12 text-blue-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Humidity</p>
              <h3 className="text-2xl font-bold mt-1">{weatherData.current.humidity}%</h3>
              <p className="text-sm text-green-700 mt-1">
                {weatherData.current.condition.text}
              </p>
            </div>
            <Droplets className="h-12 w-12 text-green-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-800">Wind</p>
              <h3 className="text-2xl font-bold mt-1">{weatherData.current.wind_kph} km/h</h3>
              <p className="text-sm text-amber-700 mt-1">
                Direction: {weatherData.current.wind_dir}
              </p>
            </div>
            <Wind className="h-12 w-12 text-amber-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-800">Precipitation</p>
              <h3 className="text-2xl font-bold mt-1">{weatherData.current.precip_mm} mm</h3>
              <p className="text-sm text-purple-700 mt-1">
                Cloud: {weatherData.current.cloud}%
              </p>
            </div>
            <Cloud className="h-12 w-12 text-purple-500" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TemperatureChart weatherData={weatherData} />
        <PrecipitationChart weatherData={weatherData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HumidityWindChart weatherData={weatherData} />
        <CropRecommendationChart weatherData={weatherData} />
      </div>

      <ClimateOverviewChart weatherData={weatherData} />

      <Card>
        <CardHeader>
          <CardTitle>Daily Forecast Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="temperature">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="precipitation">Precipitation</TabsTrigger>
              <TabsTrigger value="humidity">Humidity</TabsTrigger>
              <TabsTrigger value="wind">Wind</TabsTrigger>
            </TabsList>
            
            <TabsContent value="temperature" className="animate-in fade-in-50 duration-300">
              <div className="space-y-4">
                {weatherData.forecast.forecastday.map((day) => {
                  const date = new Date(day.date);
                  const formattedDate = new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  }).format(date);
                  
                  return (
                    <div key={day.date} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={`https:${day.day.condition.icon}`} 
                          alt={day.day.condition.text}
                          className="w-10 h-10"
                        />
                        <span className="font-medium">{formattedDate}</span>
                      </div>
                      <div className="flex space-x-4">
                        <span className="text-blue-600">{day.day.mintemp_c.toFixed(1)}°C</span>
                        <span className="font-medium">-</span>
                        <span className="text-red-600">{day.day.maxtemp_c.toFixed(1)}°C</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="precipitation" className="animate-in fade-in-50 duration-300">
              <div className="space-y-4">
                {weatherData.forecast.forecastday.map((day) => {
                  const date = new Date(day.date);
                  const formattedDate = new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  }).format(date);
                  
                  return (
                    <div key={day.date} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={`https:${day.day.condition.icon}`} 
                          alt={day.day.condition.text}
                          className="w-10 h-10"
                        />
                        <span className="font-medium">{formattedDate}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-blue-600">{day.day.totalprecip_mm} mm</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {day.day.daily_chance_of_rain}% chance
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="humidity" className="animate-in fade-in-50 duration-300">
              <div className="space-y-4">
                {weatherData.forecast.forecastday.map((day) => {
                  const date = new Date(day.date);
                  const formattedDate = new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  }).format(date);
                  
                  return (
                    <div key={day.date} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={`https:${day.day.condition.icon}`} 
                          alt={day.day.condition.text}
                          className="w-10 h-10"
                        />
                        <span className="font-medium">{formattedDate}</span>
                      </div>
                      <div>
                        <span className="text-green-600">{day.day.avghumidity}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="wind" className="animate-in fade-in-50 duration-300">
              <div className="space-y-4">
                {weatherData.forecast.forecastday.map((day) => {
                  const date = new Date(day.date);
                  const formattedDate = new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  }).format(date);
                  
                  return (
                    <div key={day.date} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={`https:${day.day.condition.icon}`} 
                          alt={day.day.condition.text}
                          className="w-10 h-10"
                        />
                        <span className="font-medium">{formattedDate}</span>
                      </div>
                      <div>
                        <span className="text-amber-600">{day.day.maxwind_kph} km/h</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}