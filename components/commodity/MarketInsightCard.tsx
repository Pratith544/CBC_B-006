import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, MinusIcon } from 'lucide-react';

interface MarketInsightCardProps {
  title: string;
  description: string;
  data: {
    trend: 'up' | 'down' | 'stable';
    value: string;
    insight: string;
    factors: string[];
  };
}

export default function MarketInsightCard({ title, description, data }: MarketInsightCardProps) {
  const getTrendIcon = () => {
    switch (data.trend) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      case 'stable':
        return <MinusIcon className="h-5 w-5 text-amber-500" />;
    }
  };
  
  const getTrendColor = () => {
    switch (data.trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      case 'stable':
        return 'text-amber-500';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {getTrendIcon()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-bold ${getTrendColor()}`}>{data.value}</span>
        </div>
        <p className="text-sm mt-2">{data.insight}</p>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Key Factors:</h4>
          <ul className="space-y-1 text-sm">
            {data.factors.map((factor, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="flex-shrink-0 rounded-full h-1.5 w-1.5 bg-primary mt-1.5"></span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}