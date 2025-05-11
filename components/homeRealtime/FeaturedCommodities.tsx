import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

// Mock data for featured commodities
const commodities = [
  {
    id: 'rice',
    name: 'Rice',
    currentPrice: '₹2,250',
    change: '+2.5%',
    trend: 'up',
    image: 'https://images.pexels.com/photos/4087609/pexels-photo-4087609.jpeg'
  },
  {
    id: 'wheat',
    name: 'Wheat',
    currentPrice: '₹1,960',
    change: '-1.2%',
    trend: 'down',
    image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    currentPrice: '₹6,700',
    change: '+3.8%',
    trend: 'up',
    image: 'https://images.pexels.com/photos/5503661/pexels-photo-5503661.jpeg'
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    currentPrice: '₹3,150',
    change: '+0.7%',
    trend: 'up',
    image: 'https://images.pexels.com/photos/4913349/pexels-photo-4913349.jpeg'
  }
];

export default function FeaturedCommodities() {
  return (
    <section className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Commodities</h2>
          <p className="text-muted-foreground mt-2">
            Explore current prices and trends for popular agricultural commodities
          </p>
        </div>
        <Link 
          href="/marketplace" 
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
        >
          View all commodities <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {commodities.map((commodity) => (
          <Link href={`/commodity/${commodity.id}`} key={commodity.id}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={commodity.image} 
                  alt={commodity.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-xl">{commodity.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-2xl font-bold">{commodity.currentPrice}</p>
                  <Badge 
                    variant={commodity.trend === 'up' ? 'default' : 'destructive'}
                    className="flex items-center gap-1"
                  >
                    {commodity.trend === 'up' ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    {commodity.change}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
                Updated 2 hours ago
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}