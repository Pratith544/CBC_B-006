import {
  Leaf,
  BarChart,
  BookOpen,
  Droplet,
  Sun,
  LineChart,
  Sprout,
  TrendingUp,
} from "lucide-react";
import { SectionHeading } from "../ui/section-heading";

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How KrushiSahayak Works"
          subtitle="Our platform combines agricultural expertise with advanced AI to provide personalized recommendations for farmers."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            icon={<Leaf size={24} />}
            title="Personalized Crop Selection"
            description="Get crop recommendations tailored to your specific soil type, climate conditions, and farming practices."
            iconBgColor="bg-green-100 dark:bg-green-900/30"
            iconColor="text-green-600 dark:text-green-400"
          />

          <FeatureCard
            icon={<BarChart size={24} />}
            title="Data-Driven Insights"
            description="Visualize projections, yield estimates, and resource needs with interactive charts and graphs."
            iconBgColor="bg-blue-100 dark:bg-blue-900/30"
            iconColor="text-blue-600 dark:text-blue-400"
          />

          <FeatureCard
            icon={<BookOpen size={24} />}
            title="Educational Resources"
            description="Access guides on advanced farming techniques, resource optimization, and sustainable practices."
            iconBgColor="bg-purple-100 dark:bg-purple-900/30"
            iconColor="text-purple-600 dark:text-purple-400"
          />

          <FeatureCard
            icon={<Droplet size={24} />}
            title="Water Management"
            description="Optimize irrigation practices based on crop needs, soil conditions, and local water availability."
            iconBgColor="bg-cyan-100 dark:bg-cyan-900/30"
            iconColor="text-cyan-600 dark:text-cyan-400"
          />

          <FeatureCard
            icon={<Sprout size={24} />}
            title="Soil Health Analysis"
            description="Get insights into your soil composition and recommendations for maintaining soil fertility."
            iconBgColor="bg-amber-100 dark:bg-amber-900/30"
            iconColor="text-amber-600 dark:text-amber-400"
          />

          <FeatureCard
            icon={<TrendingUp size={24} />}
            title="Yield Optimization"
            description="Learn techniques to maximize your yield while minimizing resource usage for sustainable farming."
            iconBgColor="bg-red-100 dark:bg-red-900/30"
            iconColor="text-red-600 dark:text-red-400"
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

function FeatureCard({
  icon,
  title,
  description,
  iconBgColor,
  iconColor,
}: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`w-12 h-12 rounded-lg ${iconBgColor} flex items-center justify-center ${iconColor} mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
