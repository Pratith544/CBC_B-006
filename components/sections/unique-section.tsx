'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AudioButton } from '@/components/ui/audio-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mic, 
  Keyboard, 
  SignalLow, 
  SignalHigh,
  Users, 
  User,
  LayoutGrid,
  LayoutList
} from 'lucide-react';
import { cn } from '@/lib/utils';

const benefits = [
  {
    id: "voice-input",
    title: "Voice Instead of Typing",
    beforeIcon: Keyboard,
    afterIcon: Mic,
    beforeDescription: "Complex text input requiring literacy",
    afterDescription: "Simple voice commands in your language",
    audioText: "Use your voice instead of typing text. Speak in your own language instead of struggling with a keyboard."
  },
  {
    id: "low-bandwidth",
    title: "Works with Weak Internet",
    beforeIcon: SignalHigh,
    afterIcon: SignalLow,
    beforeDescription: "Fast internet needed for most apps",
    afterDescription: "Works even with weak 2G connections",
    audioText: "Voice Bridge works even with weak or unstable internet connections in rural areas."
  },
  {
    id: "personalization",
    title: "Personalized for You",
    beforeIcon: Users,
    afterIcon: User,
    beforeDescription: "Generic information for everyone",
    afterDescription: "Specific advice for your situation",
    audioText: "Get information tailored to your specific needs, farm type, and business, not generic advice."
  },
  {
    id: "simple-design",
    title: "Simple, Clean Design",
    beforeIcon: LayoutGrid,
    afterIcon: LayoutList,
    beforeDescription: "Cluttered, complex interfaces",
    afterDescription: "Clean, one-task-at-a-time design",
    audioText: "Voice Bridge has a simple, easy-to-use design that focuses on one task at a time."
  }
];

export function UniqueSection() {
  const [activeTab, setActiveTab] = useState("voice-input");

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes Voice Bridge Different</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed with rural users in mind, solving real connectivity and access problems
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="voice-input" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4">
                {benefits.map((benefit) => (
                  <TabsTrigger
                    key={benefit.id}
                    value={benefit.id}
                    className="text-xs sm:text-sm md:text-base px-3 py-2"
                  >
                    {benefit.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {benefits.map((benefit) => (
              <TabsContent key={benefit.id} value={benefit.id} className="mt-0">
                <ComparisonCard
                  beforeIcon={<benefit.beforeIcon className="h-8 w-8" />}
                  afterIcon={<benefit.afterIcon className="h-8 w-8" />}
                  beforeDescription={benefit.beforeDescription}
                  afterDescription={benefit.afterDescription}
                  audioText={benefit.audioText}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({ 
  beforeIcon, 
  afterIcon, 
  beforeDescription, 
  afterDescription,
  audioText
}: { 
  beforeIcon: React.ReactNode; 
  afterIcon: React.ReactNode; 
  beforeDescription: string; 
  afterDescription: string;
  audioText: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BeforeAfterPanel 
            icon={beforeIcon} 
            description={beforeDescription} 
            type="before" 
          />
          
          <BeforeAfterPanel 
            icon={afterIcon} 
            description={afterDescription} 
            type="after" 
          />
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button className="group relative">
            <AudioButton text={audioText} size="default" />
            <span className="ml-2">Hear the difference</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function BeforeAfterPanel({ 
  icon, 
  description, 
  type 
}: { 
  icon: React.ReactNode; 
  description: string; 
  type: "before" | "after";
}) {
  return (
    <div className={cn(
      "flex flex-col items-center text-center p-4 rounded-lg border",
      type === "before" 
        ? "border-destructive/30 bg-destructive/5" 
        : "border-primary/30 bg-primary/5"
    )}>
      <div className={cn(
        "p-4 rounded-full mb-4",
        type === "before" 
          ? "bg-destructive/20 text-destructive" 
          : "bg-primary/20 text-primary"
      )}>
        {icon}
      </div>
      
      <h4 className={cn(
        "text-lg font-medium mb-2",
        type === "before" ? "text-destructive" : "text-primary"
      )}>
        {type === "before" ? "Other Apps" : "Voice Bridge"}
      </h4>
      
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}