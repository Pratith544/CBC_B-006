"use client";

import { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { useTheme } from 'next-themes';

interface PriceChartProps {
  data: {
    date: string;
    price: number;
  }[];
}

export default function CommodityPriceChart({ data }: PriceChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-muted/50 rounded-md">
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    );
  }

  const formatPrice = (value: number) => `₹${value.toLocaleString()}`;
  
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 
            vertical={false}
          />
          <XAxis 
            dataKey="date" 
            tick={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
            tickMargin={10}
            axisLine={{ stroke: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
          />
          <YAxis 
            tick={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
            tickFormatter={formatPrice}
            axisLine={{ stroke: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            width={80}
          />
          <Tooltip
            formatter={(value: number) => [formatPrice(value), 'Price']}
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            labelStyle={{
              color: theme === 'dark' ? '#e5e7eb' : '#111827',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="hsl(var(--chart-1))" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "hsl(var(--chart-1))" }}
            name="Price per quintal"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}