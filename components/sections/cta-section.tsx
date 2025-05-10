'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AudioButton } from '@/components/ui/audio-button';
import { Mic, ArrowRight } from 'lucide-react';

export function CtaSection() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const goToNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setStep(1); // Reset for demo purposes
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_110%,rgba(211,84,0,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-10%,rgba(46,139,87,0.1),transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative inline-block mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to get personalized help?
            </h2>
            <AudioButton
              text="Ready to get personalized help?"
              className="absolute -right-2 -top-2"
            />
          </div>

          <p className="text-xl text-muted-foreground mb-12">
            Start using Voice Bridge in just 3 simple steps
          </p>

          <div className="flex justify-between items-center mb-12 relative">
            {/* Progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted transform -translate-y-1/2"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-primary transform -translate-y-1/2 transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>

            {/* Step circles */}
            {[1, 2, 3].map((stepNumber) => (
              <div 
                key={stepNumber}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg relative z-10 transition-all ${
                  stepNumber === step 
                    ? 'border-primary bg-primary text-primary-foreground shadow-lg scale-110' 
                    : stepNumber < step 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : 'border-muted bg-card text-muted-foreground'
                }`}
              >
                {stepNumber}
              </div>
            ))}
          </div>

          <div className="mb-12">
            {step === 1 && (
              <StepContent
                title="Speak your needs"
                description="Tell Voice Bridge what you're looking for - market prices, schemes, or business advice"
                iconComponent={<Mic className="h-12 w-12" />}
              />
            )}
            {step === 2 && (
              <StepContent
                title="Get personalized results"
                description="Voice Bridge finds the most relevant information for your specific situation"
                iconComponent={<SearchIcon className="h-12 w-12" />}
              />
            )}
            {step === 3 && (
              <StepContent
                title="Take action easily"
                description="Follow the simple steps provided to apply for schemes, contact buyers, or implement advice"
                iconComponent={<CheckmarkIcon className="h-12 w-12" />}
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto group"
              onClick={goToNextStep}
            >
              {step < totalSteps ? (
                <>
                  Next Step
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  Start Now
                  <Mic className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            
            <div className="text-muted-foreground flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              <span>Takes just 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepContent({ 
  title, 
  description, 
  iconComponent 
}: { 
  title: string; 
  description: string; 
  iconComponent: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center animate-fadeIn">
      <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
        {iconComponent}
      </div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-lg mx-auto">{description}</p>
    </div>
  );
}

// Custom icons
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  );
}

function CheckmarkIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}