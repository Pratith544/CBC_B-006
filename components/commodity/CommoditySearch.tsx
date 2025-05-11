"use client";

import { useState } from 'react';
import { Search, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getCommodityData } from '@/lib/realtime/api';
import CommodityPriceChart from './CommodityPriceChart';

export default function CommoditySearch() {
  const [query, setQuery] = useState('');
  const [commodityData, setCommodityData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const data = await getCommodityData(query.toLowerCase().replace(/\s+/g, '-'));
      setCommodityData(data);
    } catch (error) {
      console.error('Error fetching commodity data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const popularSearches = [
    'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Corn', 'Soybeans', 'Potatoes', 'Onions'
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for agricultural commodities..."
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button 
              type="submit" 
              className="absolute right-1 top-1 h-10"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Popular searches:</h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery(term);
                  handleSearch({ preventDefault: () => {} } as React.FormEvent);
                }}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {commodityData && (
        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">{commodityData.name}</h2>
                <p className="text-muted-foreground">Current market price and trends</p>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="text-2xl font-bold">{commodityData.currentPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Change</p>
                  <div className={`flex items-center gap-1 ${
                    commodityData.priceChange.startsWith('+') 
                      ? 'text-green-500' 
                      : commodityData.priceChange.startsWith('-') 
                        ? 'text-red-500' 
                        : ''
                  }`}>
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-bold">{commodityData.priceChange}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <CommodityPriceChart data={commodityData.priceHistory} />
            
            <div className="mt-6">
              <Button variant="outline" className="w-full sm:w-auto">
                View Detailed Analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}