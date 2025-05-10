import { AudioButton } from '@/components/ui/audio-button';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Image from 'next/image';

const partners = [
  { name: "Agricultural Ministry", logo: "/govt-logo.svg" },
  { name: "Rural Development", logo: "/rural-logo.svg" },
  { name: "Digital India", logo: "/digital-logo.svg" },
  { name: "AgriTech Foundation", logo: "/agri-logo.svg" },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Farmer, Bihar",
    quote: "Voice Bridge helped me find a government scheme I didn't know about. Now I've gotten a loan for a new tractor.",
    image: "https://images.pexels.com/photos/2382930/pexels-photo-2382930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Lakshmi Devi",
    location: "Shop Owner, Tamil Nadu",
    quote: "I learned how to accept digital payments through my basic phone. My business has grown 30% since then.",
    image: "https://images.pexels.com/photos/7410764/pexels-photo-7410764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
];

export function TrustSection() {
  return (
    <section id="languages" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* User count */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold mb-6">Trusted by 10,000+ farmers across India</h3>
            
            <div className="relative">
              <div className="flex justify-center -space-x-4">
                {[...Array(10)].map((_, i) => (
                  <FarmerIcon key={i} className={`w-8 h-8 text-primary ${i % 2 === 0 ? 'text-chart-1' : i % 3 === 0 ? 'text-chart-2' : 'text-chart-3'}`} />
                ))}
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10">
                  +9,990
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                location={testimonial.location}
                quote={testimonial.quote}
                image={testimonial.image}
              />
            ))}
          </div>

          {/* Coming soon banner */}
          <div className="bg-muted/50 border border-border rounded-xl p-6 md:p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                  Coming Soon
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Offline Mode - No Internet Needed</h3>
                <p className="text-muted-foreground">
                  Use Voice Bridge even when you're in areas with no internet connection at all.
                </p>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="mr-2 h-5 w-5" />
                Join Waitlist
              </Button>
            </div>
          </div>

          {/* Partner logos */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6">Supported By</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {partners.map((partner, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-muted/50 rounded-lg h-16 w-32 flex items-center justify-center">
                    <PartnerLogo index={index} />
                  </div>
                  <span className="text-sm text-muted-foreground mt-2">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, location, quote, image }: { name: string; location: string; quote: string; image: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image 
              src={image} 
              alt={name} 
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
        <AudioButton text={`Testimonial from ${name}, ${location}: ${quote}`} className="ml-auto" />
      </div>
      <blockquote className="text-muted-foreground italic">"{quote}"</blockquote>
    </div>
  );
}

function FarmerIcon({ className }: { className?: string }) {
  return (
    <div className={`rounded-full flex items-center justify-center ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="12" cy="7" r="5" />
        <path d="M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7" />
      </svg>
    </div>
  );
}

function PartnerLogo({ index }: { index: number }) {
  // Generate placeholder logos based on index
  switch (index) {
    case 0:
      return (
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full border-2 border-chart-1 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-chart-1">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-bold text-sm">Agri<span className="text-chart-1">Gov</span></span>
        </div>
      );
    case 1:
      return (
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full border-2 border-chart-2 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-chart-2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-bold text-sm">Rural<span className="text-chart-2">Dev</span></span>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full border-2 border-chart-3 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-chart-3">
              <path d="M12 18v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 18v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <span className="font-bold text-sm">Digital<span className="text-chart-3">India</span></span>
        </div>
      );
    case 3:
      return (
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full border-2 border-chart-4 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-chart-4">
              <path d="M12 2v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 5.5l14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 12H2a10 10 0 0014.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 12h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-bold text-sm">Agri<span className="text-chart-4">Tech</span></span>
        </div>
      );
    default:
      return null;
  }
}