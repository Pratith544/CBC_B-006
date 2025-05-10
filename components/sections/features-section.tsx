import { AudioButton } from '@/components/ui/audio-button';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  BarChart4, 
  Lightbulb, 
  Smartphone, 
  PiggyBank,
  PlayCircle
} from 'lucide-react';

const features = [
  {
    icon: Building,
    title: "Government Schemes",
    description: "Access all eligible government programs and subsidies for your region",
    audioText: "Find all government schemes that you are eligible for based on your location, land size, and crops.",
    color: "text-chart-1"
  },
  {
    icon: BarChart4,
    title: "Market Prices",
    description: "Get real-time prices for your crops and products in nearby markets",
    audioText: "Check current market prices for your crops and products in all nearby markets, updated daily.",
    color: "text-chart-2"
  },
  {
    icon: Lightbulb,
    title: "Business Tips",
    description: "Receive practical advice to improve your farm or business operations",
    audioText: "Get practical farming tips and business advice tailored to your specific needs and situation.",
    color: "text-chart-3"
  },
  {
    icon: Smartphone,
    title: "Digital Payments",
    description: "Learn how to send and receive money securely through your phone",
    audioText: "Learn how to use digital payment systems safely and easily, even with basic phones.",
    color: "text-chart-4"
  },
  {
    icon: PiggyBank,
    title: "Subsidies & Loans",
    description: "Discover financial assistance programs you qualify for",
    audioText: "Find out which subsidies and loan programs you qualify for based on your profile and needs.",
    color: "text-chart-5"
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Voice Bridge Helps You With</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful voice-powered tools designed for rural communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={<feature.icon className={`h-8 w-8 ${feature.color}`} />}
              title={feature.title}
              description={feature.description}
              audioText={feature.audioText}
              color={feature.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  audioText,
  color,
  delay
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  audioText: string;
  color: string;
  delay: number;
}) {
  return (
    <div 
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow" 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-')}/10 ${color}`}>
            {icon}
          </div>
          <AudioButton text={audioText} />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <Button variant="ghost" className="group flex items-center gap-2">
          <PlayCircle className="h-5 w-5 group-hover:animate-pulse" />
          <span>Show me how</span>
        </Button>
      </div>
      
      <div className={`h-1 w-full ${color.replace('text-', 'bg-')}`}></div>
    </div>
  );
}