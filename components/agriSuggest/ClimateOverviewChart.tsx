'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/lib/types';
import { getTopCropCategories } from '@/lib/cropRecommendations';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ClimateOverviewChartProps {
  weatherData: WeatherData;
}

export default function ClimateOverviewChart({ weatherData }: ClimateOverviewChartProps) {
  const chartData = useMemo(() => {
    if (!weatherData?.location) return [];

    const categories = getTopCropCategories(weatherData);
    
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value: value * 100, // Convert to percentage for better visibility
    })).filter(item => item.value > 0);
  }, [weatherData]);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">
            Score: {(payload[0].value / 100).toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Climate Crop Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={customTooltip} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}