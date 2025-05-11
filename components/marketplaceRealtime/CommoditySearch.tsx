"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function CommoditySearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/commodity/${query.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };
  
  const popularSearches = [
    'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Corn', 'Soybeans', 'Potatoes', 'Onions'
  ];

  return (
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
          >
            Search
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
                router.push(`/commodity/${term.toLowerCase()}`);
              }}
            >
              {term}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}