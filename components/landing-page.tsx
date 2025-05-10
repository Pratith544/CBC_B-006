import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/sections/hero-section';
import { ValueProposition } from '@/components/sections/value-proposition';
import { FeaturesSection } from '@/components/sections/features-section';
import { UniqueSection } from '@/components/sections/unique-section';
import { CtaSection } from '@/components/sections/cta-section';
import { TrustSection } from '@/components/sections/trust-section';
import { Footer } from '@/components/footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <ValueProposition />
        <FeaturesSection />
        <UniqueSection />
        <CtaSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}