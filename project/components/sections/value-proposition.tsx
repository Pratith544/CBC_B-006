import { AudioButton } from '@/components/ui/audio-button';
import { cn } from '@/lib/utils';
import { Volume2, Brain, Phone } from 'lucide-react';

const values = [
  {
    icon: Volume2,
    title: "Speak naturally in your language",
    description: "No typing needed - just talk as you normally would in your regional language",
    audioText: "Use Voice Bridge by speaking in your native language. No need to type or learn new technology. Just speak naturally."
  },
  {
    icon: Brain,
    title: "Get personalized suggestions",
    description: "Receive custom advice for your farm or business based on your specific needs",
    audioText: "Voice Bridge learns about your farm or business and provides personalized recommendations just for you."
  },
  {
    icon: Phone,
    title: "Works even on basic phones",
    description: "No smartphone or internet needed. Use with any basic phone through simple voice calls",
    audioText: "You can use Voice Bridge with any phone, even basic feature phones without internet. Works through simple voice calls."
  }
];

export function ValueProposition() {
  return (
    <section id="benefits" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Voice Bridge Works for Everyone</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed specifically for rural communities with any type of phone or device
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:items-start">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={<value.icon className="h-12 w-12" />}
              title={value.title}
              description={value.description}
              audioText={value.audioText}
              className={index === 1 ? "md:mt-8" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({ 
  icon, 
  title, 
  description, 
  audioText,
  className
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  audioText: string;
  className?: string;
}) {
  return (
    <div className={cn(
      "bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group h-full",
      className
    )}>
      <div className="flex flex-col items-center text-center">
        <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
          {icon}
        </div>
        
        <div className="relative">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <AudioButton 
            text={title} 
            className="absolute -right-8 -top-2 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
        
        <p className="text-muted-foreground">{description}</p>
        
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <AudioButton text={audioText} size="default" />
        </div>
      </div>
    </div>
  );
}