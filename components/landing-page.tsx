"use client";

import { useState, useEffect } from "react";
// import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import ValueProposition from "@/components/sections/value-proposition";
import FeaturesSection from "@/components/sections/features-section";
import UniqueSection from "@/components/sections/unique-section";
import CtaSection from "@/components/sections/cta-section";
import TrustSection from "@/components/sections/trust-section";
import Footer from "@/components/footer";
import { useTheme } from "next-themes";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-[#121F2F] text-[#F5F5F5]"
          : "bg-[#FFF9E6] text-[#333333]"
      }`}
    >
      {/* <Navbar /> */}
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
