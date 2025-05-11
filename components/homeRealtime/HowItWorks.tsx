import { Card, CardContent } from '@/components/ui/card';
import { Search, BarChart2, MessageSquareText, Lightbulb } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Search Commodities",
      description: "Enter the name of any agricultural commodity to find current market prices and trends."
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-primary" />,
      title: "View Price Trends",
      description: "Explore interactive charts showing price fluctuations over time to identify market patterns."
    },
    {
      icon: <MessageSquareText className="h-10 w-10 text-primary" />,
      title: "Ask Questions",
      description: "Use our AI assistant to get answers about market conditions, price forecasts, and agricultural advice."
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "Learn & Improve",
      description: "Access educational resources to help you make better farming and selling decisions."
    }
  ];

  return (
    <section className="container py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
        <p className="text-muted-foreground mt-4">
          KrishiMarket provides easy access to agricultural market data and insights to help you make informed decisions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="border-2 border-muted bg-background">
            <CardContent className="pt-6 text-center">
              <div className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Connected dots between steps (visible on desktop) */}
      <div className="hidden lg:flex justify-center mt-10">
        <div className="relative h-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-0.5 bg-muted"></div>
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"></div>
          <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"></div>
        </div>
      </div>
    </section>
  );
}