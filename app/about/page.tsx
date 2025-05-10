import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About RuralLearn</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground">
            RuralLearn is dedicated to empowering rural communities through
            personalized digital learning experiences, focusing on agricultural
            advancement and financial literacy.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p>
                We believe that access to tailored knowledge can transform rural
                livelihoods. Our mission is to bridge the digital divide and
                provide rural communities with the specific information and
                skills they need to thrive in a changing agricultural landscape.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">How We Help</h2>
              <ul className="space-y-2">
                {[
                  "Personalized learning paths based on individual needs and context",
                  "Practical, actionable content focused on real-world application",
                  "Accessible interface designed for various literacy levels",
                  "Content available in multiple languages and formats",
                  "Offline access options for areas with limited connectivity",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <img
                src="https://images.pexels.com/photos/2382892/pexels-photo-2382892.jpeg"
                alt="Rural community members learning together"
                className="rounded-lg shadow-md mb-6"
              />

              <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
              <p>
                We combine advanced technology with deep agricultural expertise
                to create learning experiences that:
              </p>
              <ul className="space-y-2 mt-4">
                {[
                  "Respect local knowledge and practices",
                  "Introduce appropriate modern techniques",
                  "Focus on sustainability and resilience",
                  "Support financial independence and growth",
                  "Build community capacity and leadership",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-muted/50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Our Partners</h2>
            <p>
              We collaborate with agricultural universities, rural development
              organizations, government agencies, and technology partners to
              create comprehensive and accurate content.
            </p>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Agricultural University",
                "Rural Development Institute",
                "Farmers' Cooperative",
                "National Extension Service",
                "Financial Inclusion Network",
                "Sustainable Agriculture Alliance",
                "Digital Literacy Foundation",
                "Rural Entrepreneurs Association",
              ].map((partner, index) => (
                <div
                  key={index}
                  className="bg-card p-4 rounded border text-center"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="max-w-2xl mx-auto mb-6">
              Take our assessment and receive a personalized learning path
              designed specifically for your needs and context.
            </p>

            <Link href="/questionnaire">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Begin Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
