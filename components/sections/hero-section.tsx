'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AudioButton } from '@/components/ui/audio-button';
import { Mic, Play } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 3000);
  };

  useEffect(() => {
    // Auto-play animation once after mounting
    const timer = setTimeout(() => {
      startAnimation();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,179,15,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(46,139,87,0.1),transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="flex-1 text-center md:text-left">
            <div className="relative inline-block mb-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Smart Voice Assistant for Farmers & Small Businesses
              </h1>
              <AudioButton
                text="Smart Voice Assistant for Farmers and Small Businesses"
                className="absolute -right-2 -top-2"
              />
            </div>

            <div className="relative inline-block">
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Speak in your own language. Get schemes, market prices & more — instantly.
              </p>
              <AudioButton
                text="Speak in your own language. Get schemes, market prices and more — instantly."
                className="absolute -right-2 -top-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto group relative"
                onClick={startAnimation}
              >
                <Mic className={`h-5 w-5 mr-2 transition-all duration-300 ${isAnimating ? 'scale-125' : 'scale-100'}`} />
                Start Talking
                <span className={`absolute inset-0 rounded-md border-2 border-primary transition-all duration-1000 ${isAnimating ? 'scale-150 opacity-0' : 'scale-100 opacity-0'}`}></span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-6 py-6 h-auto border-2"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className={`absolute inset-0 bg-muted rounded-full opacity-10 ${isAnimating ? 'animate-ping' : ''}`}></div>
              <div className="relative z-10">
                <Image
                  src="https://images.pexels.com/photos/2382934/pexels-photo-2382934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Farmer using voice assistant"
                  width={500}
                  height={500}
                  className="rounded-2xl shadow-2xl object-cover"
                />
                
                {/* Voice waves animation */}
                <div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-64 w-64 flex items-center justify-center ${isAnimating ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute inset-0 border-4 border-primary rounded-full"
                      style={{ 
                        animationDelay: `${i * 0.2}s`,
                        animation: isAnimating ? 'ripple 2s linear infinite' : 'none'
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}