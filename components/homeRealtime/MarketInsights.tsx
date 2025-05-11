import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';
import CommodityPriceChart from '@/components/commodity/CommodityPriceChart';

// Sample data for the price trend chart
const trendData = [
  { date: 'Jan 2024', price: 2100 },
  { date: 'Feb 2024', price: 2150 },
  { date: 'Mar 2024', price: 2080 },
  { date: 'Apr 2024', price: 2120 },
  { date: 'May 2024', price: 2180 },
  { date: 'Jun 2024', price: 2200 }
];

export default function MarketInsights() {
  return (
    <section className="container py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Market Insights</h2>
        <p className="text-muted-foreground mt-2">
          Latest trends and forecasts to help you make informed decisions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Price Trend Analysis</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mt-1 mb-4">
              Weekly price movement patterns across key commodities
            </CardDescription>
            <div className="h-60 w-full">
              <CommodityPriceChart data={trendData} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm font-medium">Rice</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-sm text-green-500">+3.2%</span>
                  <span className="text-xs text-muted-foreground ml-1">vs last week</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Wheat</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-sm text-green-500">+1.8%</span>
                  <span className="text-xs text-muted-foreground ml-1">vs last week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Market Forecast</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mt-1 mb-4">
              Predicted price movements for the upcoming harvest season
            </CardDescription>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Rice prices expected to stabilize by mid-season</p>
                  <p className="text-xs text-muted-foreground mt-1">Based on current planting estimates and weather forecasts</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Cotton may see price increase due to reduced output</p>
                  <p className="text-xs text-muted-foreground mt-1">International demand remains strong despite local conditions</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Sugarcane harvest projected at 5% higher than last year</p>
                  <p className="text-xs text-muted-foreground mt-1">Favorable rainfall in key growing regions improves outlook</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Market Alerts</CardTitle>
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mt-1 mb-4">
              Important updates that may impact agricultural markets
            </CardDescription>
            <div className="space-y-4">
              <div className="p-3 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-200">Weather Advisory</p>
                <p className="text-xs mt-1 text-amber-700 dark:text-amber-300">Heavy rainfall expected in eastern regions over the next week. May affect wheat harvest.</p>
              </div>
              <div className="p-3 rounded-md border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Policy Update</p>
                <p className="text-xs mt-1 text-blue-700 dark:text-blue-300">Government announces new minimum support prices for rice and wheat effective next month.</p>
              </div>
              <div className="p-3 rounded-md border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/50">
                <p className="text-sm font-medium text-green-900 dark:text-green-200">Market Opportunity</p>
                <p className="text-xs mt-1 text-green-700 dark:text-green-300">Export demand for organic pulses increasing. Premium prices available for certified produce.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}