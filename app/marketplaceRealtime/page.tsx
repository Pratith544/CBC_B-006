import CommoditySearch from '@/components/marketplaceRealtime/CommoditySearch';
import CommodityGrid from '@/components/marketplaceRealtime/CommodityGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarketplaceFilters from '@/components/marketplaceRealtime/MarketplaceFilters';

export default function MarketplaceRealtime() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Agricultural Marketplace</h1>
        <p className="text-muted-foreground mt-2">
          Explore real-time prices and trends for agricultural commodities
        </p>
      </div>
      
      <CommoditySearch />
      
      <div className="mt-8">
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Commodities</TabsTrigger>
              <TabsTrigger value="grains">Grains</TabsTrigger>
              <TabsTrigger value="fruits">Fruits & Vegetables</TabsTrigger>
              <TabsTrigger value="cash">Cash Crops</TabsTrigger>
            </TabsList>
            
            <MarketplaceFilters />
          </div>
          
          <TabsContent value="all" className="mt-0">
            <CommodityGrid category="all" />
          </TabsContent>
          <TabsContent value="grains" className="mt-0">
            <CommodityGrid category="grains" />
          </TabsContent>
          <TabsContent value="fruits" className="mt-0">
            <CommodityGrid category="fruits" />
          </TabsContent>
          <TabsContent value="cash" className="mt-0">
            <CommodityGrid category="cash" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}