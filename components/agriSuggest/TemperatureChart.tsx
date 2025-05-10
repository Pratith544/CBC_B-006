'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/lib/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface TemperatureChartProps {
  weatherData: WeatherData;
}

export default function TemperatureChart({ weatherData }: TemperatureChartProps) {
  const chartData = useMemo(() => {
    if (!weatherData?.forecast?.forecastday) return [];

    return weatherData.forecast.forecastday.map((day) => {
      const date = new Date(day.date);
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(date);

      return {
        date: formattedDate,
        min: day.day.mintemp_c,
        avg: day.day.avgtemp_c,
        max: day.day.maxtemp_c,
      };
    });
  }, [weatherData]);

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-sm text-blue-600">
            Min: {payload[0].value.toFixed(1)}°C
          </p>
          <p className="text-sm text-purple-600">
            Avg: {payload[1].value.toFixed(1)}°C
          </p>
          <p className="text-sm text-red-600">
            Max: {payload[2].value.toFixed(1)}°C
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Temperature Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickMargin={10}
              unit="°C"
            />
            <Tooltip content={customTooltip} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="min"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Min Temp"
            />
            <Line
              type="monotone"
              dataKey="avg"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Avg Temp"
            />
            <Line
              type="monotone"
              dataKey="max"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Max Temp"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}