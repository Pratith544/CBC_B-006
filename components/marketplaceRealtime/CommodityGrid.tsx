import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Mock data for commodities
const commoditiesData = {
  all: [
    {
      id: 'rice',
      name: 'Rice',
      currentPrice: '₹2,250',
      change: '+2.5%',
      trend: 'up',
      category: 'grains',
      image: 'https://images.pexels.com/photos/4087609/pexels-photo-4087609.jpeg'
    },
    {
      id: 'wheat',
      name: 'Wheat',
      currentPrice: '₹1,960',
      change: '-1.2%',
      trend: 'down',
      category: 'grains',
      image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg'
    },
    {
      id: 'cotton',
      name: 'Cotton',
      currentPrice: '₹6,700',
      change: '+3.8%',
      trend: 'up',
      category: 'cash',
      image: 'https://images.pexels.com/photos/5503661/pexels-photo-5503661.jpeg'
    },
    {
      id: 'sugarcane',
      name: 'Sugarcane',
      currentPrice: '₹3,150',
      change: '+0.7%',
      trend: 'up',
      category: 'cash',
      image: 'https://images.pexels.com/photos/4913349/pexels-photo-4913349.jpeg'
    },
    {
      id: 'corn',
      name: 'Corn',
      currentPrice: '₹1,850',
      change: '+1.5%',
      trend: 'up',
      category: 'grains',
      image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg'
    },
    {
      id: 'soybeans',
      name: 'Soybeans',
      currentPrice: '₹3,820',
      change: '0.0%',
      trend: 'stable',
      category: 'grains',
      image: 'https://images.pexels.com/photos/6157051/pexels-photo-6157051.jpeg'
    },
    {
      id: 'tomatoes',
      name: 'Tomatoes',
      currentPrice: '₹2,480',
      change: '-2.3%',
      trend: 'down',
      category: 'fruits',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'
    },
    {
      id: 'potatoes',
      name: 'Potatoes',
      currentPrice: '₹1,250',
      change: '+1.8%',
      trend: 'up',
      category: 'fruits',
      image: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg'
    }
  ]
};

// Filter commodity data based on category
const getCommoditiesByCategory = (category: string) => {
  if (category === 'all') return commoditiesData.all;
  return commoditiesData.all.filter(item => item.category === category);
};

interface CommodityGridProps {
  category: string;
}

export default function CommodityGrid({ category }: CommodityGridProps) {
  const commodities = getCommoditiesByCategory(category);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {commodities.map((commodity) => (
        <Link href={`/commodity/${commodity.id}`} key={commodity.id}>
          <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={commodity.image} 
                alt={commodity.name}
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
              <Badge className="absolute top-2 right-2 text-xs capitalize">
                {commodity.category}
              </Badge>
            </div>
            <CardContent className="p-4 flex-1">
              <h3 className="font-semibold text-xl">{commodity.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <p className="text-2xl font-bold">{commodity.currentPrice}</p>
                <Badge 
                  variant={
                    commodity.trend === 'up' 
                      ? 'default' 
                      : commodity.trend === 'down' 
                        ? 'destructive' 
                        : 'secondary'
                  }
                  className="flex items-center gap-1"
                >
                  {commodity.trend === 'up' ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : commodity.trend === 'down' ? (
                    <TrendingDown className="h-3.5 w-3.5" />
                  ) : (
                    <Minus className="h-3.5 w-3.5" />
                  )}
                  {commodity.change}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 text-sm text-muted-foreground border-t mt-auto">
              <span>Per quintal • Updated 2 hours ago</span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}