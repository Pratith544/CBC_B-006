"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getModuleContent } from "@/lib/api";
import { ModuleContent } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import ModuleContentDisplay from "@/components/module-content/ModuleContentDisplay";

// Sample module content for demo purposes
const sampleModuleContent: ModuleContent = {
  title: "Sustainable Irrigation Techniques",
  introduction:
    "<p>Welcome to this module on sustainable irrigation techniques. Water is one of the most precious resources for agriculture, and using it efficiently is crucial for both environmental sustainability and farm profitability.</p><p>In this module, you'll learn about various irrigation methods that can help you conserve water while ensuring your crops receive adequate moisture.</p>",
  sections: [
    {
      title: "Understanding Water Needs",
      content:
        "<p>Different crops have different water requirements. Understanding these needs is the first step in developing an efficient irrigation strategy.</p><p>Factors that affect water needs include:</p><ul><li>Crop type and growth stage</li><li>Soil type and structure</li><li>Climate and seasonal conditions</li><li>Root depth</li></ul><p>By assessing these factors, you can determine how much water your crops actually need, avoiding both under-watering (which reduces yields) and over-watering (which wastes water and can damage plants).</p>",
      imageUrl:
        "https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg",
    },
    {
      title: "Drip Irrigation Systems",
      content:
        "<p>Drip irrigation is one of the most efficient watering methods, delivering water directly to the plant's root zone through a system of tubes, valves, and emitters.</p><p><strong>Benefits of drip irrigation:</strong></p><ul><li>Water efficiency: Uses 30-50% less water than conventional methods</li><li>Reduced weed growth by watering only the intended plants</li><li>Decreased labor once the system is installed</li><li>Minimized soil erosion and nutrient runoff</li></ul><p><strong>Components of a basic drip system:</strong></p><ul><li>Water source and pump (if needed)</li><li>Filters to remove particles</li><li>Pressure regulator</li><li>Main and submain lines</li><li>Drip tape or tubing</li><li>Emitters</li></ul>",
      imageUrl:
        "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg",
    },
    {
      title: "Sprinkler Systems",
      content:
        "<p>Sprinkler irrigation systems spray water through the air to simulate rainfall. While not as efficient as drip irrigation, modern sprinkler systems have improved significantly in water use efficiency.</p><p><strong>Types of sprinkler systems:</strong></p><ul><li>Fixed systems: Permanently installed in the field</li><li>Portable systems: Can be moved between fields</li><li>Center pivot systems: Rotate around a central point covering circular areas</li><li>Traveling systems: Move across the field in a straight line</li></ul><p><strong>Best practices for sprinkler irrigation:</strong></p><ul><li>Irrigate during early morning or evening to reduce evaporation</li><li>Monitor wind conditions</li><li>Ensure uniform distribution by proper spacing</li><li>Regularly check for and repair leaks or clogged nozzles</li></ul>",
      imageUrl:
        "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg",
    },
    {
      title: "Rainwater Harvesting",
      content:
        "<p>Rainwater harvesting involves collecting and storing rainwater for future use. This sustainable practice can provide a supplemental water source during dry periods.</p><p><strong>Basic components of a rainwater harvesting system:</strong></p><ul><li>Collection surface (often rooftops)</li><li>Gutters and downspouts</li><li>First flush diverter (to remove initial debris)</li><li>Storage tanks or reservoirs</li><li>Distribution system</li></ul><p>Even a small farm can collect significant amounts of water. For example, a 1,000 square foot roof can collect approximately 600 gallons of water from just 1 inch of rainfall.</p>",
      imageUrl:
        "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg",
    },
    {
      title: "Soil Moisture Monitoring",
      content:
        "<p>Knowing when to irrigate is just as important as knowing how to irrigate. Soil moisture monitoring helps you make informed decisions about irrigation timing and amounts.</p><p><strong>Methods for monitoring soil moisture:</strong></p><ul><li>Feel method: Using your hands to feel soil moisture (simple but requires experience)</li><li>Tensiometers: Measure soil water tension</li><li>Electrical resistance blocks: Measure soil water by electrical resistance</li><li>Time domain reflectometry (TDR): More advanced technology for precise measurements</li></ul><p>By monitoring soil moisture, you can apply water only when crops need it, avoiding wasteful irrigation practices.</p>",
      imageUrl:
        "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg",
    },
  ],
  conclusion:
    "<p>Implementing sustainable irrigation practices can significantly reduce water usage while maintaining or even improving crop yields. Remember that the best irrigation system for your farm depends on various factors including crop type, climate, soil conditions, and available resources.</p><p>Start by assessing your current irrigation practices and identify areas for improvement. Even small changes can lead to significant water savings over time.</p><p>In the next module, we'll explore how sustainable irrigation fits into a broader water management strategy for your farm.</p>",
  resources: [
    {
      title: "FAO Guidelines on Irrigation Water Management",
      url: "http://www.fao.org/3/a-i3765e.pdf",
      type: "pdf",
    },
    {
      title: "Drip Irrigation Installation Guide",
      url: "https://extension.umn.edu/irrigation/drip-irrigation-planning-and-installation",
      type: "website",
    },
    {
      title: "Rainwater Harvesting for Agriculture",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      type: "video",
    },
  ],
};

export default function ModulePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const moduleId = params.id;

  const [loading, setLoading] = useState(true);
  const [moduleContent, setModuleContent] = useState<ModuleContent | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModuleContent() {
      try {
        setLoading(true);

        // For demo purposes, use the sample module content
        // In production, uncomment this to use the actual API call:
        // const content = await getModuleContent(moduleId, "Module Title");

        setTimeout(() => {
          setModuleContent(sampleModuleContent);
          setLoading(false);
        }, 1500);
      } catch (err) {
        console.error("Error fetching module content:", err);
        setError("Failed to load module content. Please try again.");
        setLoading(false);
      }
    }

    fetchModuleContent();
  }, [moduleId]);

  const handleModuleComplete = () => {
    router.push("/results");
  };

  return (
    <div className="container mx-auto py-8">
      {loading ? (
        <div className="text-center py-16">
          <div className="w-full max-w-md mx-auto">
            <Progress value={60} className="h-2 mb-2" />
            <p>Loading module content...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg text-center">
          <p>{error}</p>
          <Button
            variant="outline"
            onClick={() => router.push("/results")}
            className="mt-4"
          >
            Return to Learning Path
          </Button>
        </div>
      ) : (
        moduleContent && (
          <ModuleContentDisplay
            moduleId={moduleId}
            moduleContent={moduleContent}
            onComplete={handleModuleComplete}
            onBack={() => router.push("/results")}
          />
        )
      )}
    </div>
  );
}
