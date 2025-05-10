'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/lib/types';
import { getCropRecommendations } from '@/lib/cropRecommendations';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from 'recharts';

interface CropRecommendationChartProps {
  weatherData: WeatherData;
}

export default function CropRecommendationChart({ weatherData }: CropRecommendationChartProps) {
  const chartData = useMemo(() => {
    if (!weatherData?.location) return [];

    const recommendations = getCropRecommendations(weatherData, 5);
    
    return recommendations.map(crop => ({
      name: crop.name,
      score: (crop.suitabilityScore || 0) * 100,
    }));
  }, [weatherData]);

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-green-600">
            Suitability: {payload[0].value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Top Crop Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={true} vertical={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 12 }}
              tickMargin={10}
              unit="%"
              domain={[0, 100]}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickMargin={10}
              width={100}
            />
            <Tooltip content={customTooltip} />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="score"
              fill="#22c55e"
              radius={[0, 4, 4, 0]}
              name="Suitability Score"
            >
              <LabelList dataKey="score" position="right" formatter={(value: number) => `${value.toFixed(0)}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}