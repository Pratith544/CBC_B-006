import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-transparent dark:from-green-950/20 dark:to-transparent -z-10" />
      
      <div className="container pt-16 md:pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 max-w-lg">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 animate-fade-in [--animation-delay:200ms]">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Real-time market data
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in [--animation-delay:300ms]">
              Digital Empowerment for Rural Communities
            </h1>
            
            <p className="text-lg text-muted-foreground animate-fade-in [--animation-delay:400ms]">
              Access real-time agricultural commodity prices, market trends, and expert advice to make informed decisions for your farm business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2 animate-fade-in [--animation-delay:500ms]">
              <Button size="lg" asChild>
                <Link href="/marketplace">
                  Explore Market <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/learn">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative animate-fade-in [--animation-delay:600ms]">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4">Search Commodity Prices</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search for rice, wheat, cotton..."
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">Rice</Button>
                <Button variant="outline" size="sm" className="justify-start">Wheat</Button>
                <Button variant="outline" size="sm" className="justify-start">Cotton</Button>
                <Button variant="outline" size="sm" className="justify-start">Sugarcane</Button>
              </div>
              <div className="mt-6">
                <Button className="w-full">Search Now</Button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-green-100 dark:bg-green-900/30 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 h-16 w-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}