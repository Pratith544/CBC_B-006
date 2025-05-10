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

interface HumidityWindChartProps {
  weatherData: WeatherData;
}

export default function HumidityWindChart({ weatherData }: HumidityWindChartProps) {
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
        humidity: day.day.avghumidity,
        wind: day.day.maxwind_kph,
      };
    });
  }, [weatherData]);

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-sm text-teal-600">
            Humidity: {payload[0].value}%
          </p>
          <p className="text-sm text-indigo-600">
            Max Wind: {payload[1].value} km/h
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Humidity & Wind</CardTitle>
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
              yAxisId="left"
              tick={{ fontSize: 12 }}
              tickMargin={10}
              unit="%"
              domain={[0, 100]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              tickMargin={10}
              unit=" km/h"
            />
            <Tooltip content={customTooltip} />
            <Legend verticalAlign="top" height={36} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="humidity"
              stroke="#0d9488"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Humidity"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="wind"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Wind Speed"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}