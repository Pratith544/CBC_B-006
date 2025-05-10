'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface PrecipitationChartProps {
  weatherData: WeatherData;
}

export default function PrecipitationChart({ weatherData }: PrecipitationChartProps) {
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
        precipitation: day.day.totalprecip_mm,
        chanceOfRain: day.day.daily_chance_of_rain,
      };
    });
  }, [weatherData]);

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-sm text-blue-600">
            Precipitation: {payload[0].value.toFixed(1)} mm
          </p>
          <p className="text-sm text-green-600">
            Chance of Rain: {payload[1].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Precipitation Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
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
              unit=" mm"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              tickMargin={10}
              unit="%"
              domain={[0, 100]}
            />
            <Tooltip content={customTooltip} />
            <Legend verticalAlign="top" height={36} />
            <Bar
              yAxisId="left"
              dataKey="precipitation"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="Precipitation"
            />
            <Bar
              yAxisId="right"
              dataKey="chanceOfRain"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              name="Chance of Rain"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}