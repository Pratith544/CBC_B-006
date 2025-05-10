import PageContainer from "@/components/layout/PageContainer";
import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <PageContainer fullWidth>
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </PageContainer>
  );
}
