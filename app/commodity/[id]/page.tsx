"use client";

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommodityPriceChart from '@/components/commodity/CommodityPriceChart';
import CommodityDetails from '@/components/commodity/CommodityDetails';
import CommodityChat from '@/components/commodity/CommodityChat';
import MarketInsightCard from '@/components/commodity/MarketInsightCard';
import LearningResources from '@/components/commodity/LearningResources';
import { getCommodityData } from '@/lib/realtime/api';
import { Skeleton } from '@/components/ui/skeleton';

export default function CommodityPage({ params }: { params: { id: string } }) {
  const [commodityData, setCommodityData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCommodityData() {
      try {
        // In a real app, this would fetch from an actual API
        const data = await getCommodityData(params.id);
        setCommodityData(data);
      } catch (error) {
        console.error("Failed to load commodity data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCommodityData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="h-[400px] w-full mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
            </div>
          </div>
          <div>
            <Skeleton className="h-[300px] w-full mb-6" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight capitalize">{commodityData.name}</h1>
        <p className="text-muted-foreground mt-2">
          Current market price and historical trends
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-card border rounded-lg p-6 mb-6">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                  <h2 className="text-lg font-medium">Price Trends</h2>
                  <p className="text-sm text-muted-foreground">Historical price movement for {commodityData.name}</p>
                </div>
                <Tabs defaultValue="1month">
                  <TabsList>
                    <TabsTrigger value="1week">1W</TabsTrigger>
                    <TabsTrigger value="1month">1M</TabsTrigger>
                    <TabsTrigger value="3months">3M</TabsTrigger>
                    <TabsTrigger value="1year">1Y</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CommodityPriceChart data={commodityData.priceHistory} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-muted/30 p-4 rounded-md">
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="text-2xl font-bold">{commodityData.currentPrice}</p>
                <p className="text-xs text-muted-foreground mt-1">Per quintal</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-md">
                <p className="text-sm text-muted-foreground">30-Day Change</p>
                <div className={`text-2xl font-bold ${commodityData.priceChange.startsWith('+') ? 'text-green-500' : commodityData.priceChange.startsWith('-') ? 'text-red-500' : ''}`}>
                  {commodityData.priceChange}
                </div>
                <p className="text-xs text-muted-foreground mt-1">From previous month</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-md">
                <p className="text-sm text-muted-foreground">Market Sentiment</p>
                <p className="text-2xl font-bold">{commodityData.marketSentiment}</p>
                <p className="text-xs text-muted-foreground mt-1">Based on recent price action</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <MarketInsightCard 
              title="Price Forecast" 
              description="Expected price movement over next 30 days"
              data={commodityData.forecast}
            />
            <MarketInsightCard 
              title="Market Demand" 
              description="Current demand trends in major markets"
              data={commodityData.demand}
            />
          </div>
          
          <div className="bg-card border rounded-lg overflow-hidden">
            <Tabs defaultValue="details">
              <TabsList className="w-full border-b rounded-none justify-start px-6">
                <TabsTrigger value="details">Commodity Details</TabsTrigger>
                <TabsTrigger value="learning">Learning Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="p-6">
                <CommodityDetails data={commodityData.details} />
              </TabsContent>
              <TabsContent value="learning" className="p-6">
                <LearningResources data={commodityData.learningResources} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div>
          <CommodityChat commodityId={params.id} commodityName={commodityData.name} />
        </div>
      </div>
    </div>
  );
}