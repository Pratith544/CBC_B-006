"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Sprout,
  Droplet,
  Sun,
  CircleDollarSign,
  Scale,
  Info,
} from "lucide-react";
import { CropRecommendation } from "@/types";

interface RecommendedCropsProps {
  crops: CropRecommendation[];
  explanations: {
    primary: string;
    secondary: string;
  };
}

export default function RecommendedCrops({
  crops,
  explanations,
}: RecommendedCropsProps) {
  const [activeTab, setActiveTab] = useState<"primary" | "secondary">(
    "primary"
  );

  const primaryCrops = crops.filter((crop) => crop.type === "primary");
  const secondaryCrops = crops.filter((crop) => crop.type === "secondary");

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "primary"
                ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("primary")}
          >
            Primary Recommendations
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "secondary"
                ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("secondary")}
          >
            Alternative Options
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === "primary" ? (
          <>
            <div className="mb-6">
              <div className="flex items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3 mt-1">
                  <Info size={18} />
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {explanations.primary}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {primaryCrops.map((crop, index) => (
                <CropCard key={index} crop={crop} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mr-3 mt-1">
                  <Info size={18} />
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {explanations.secondary}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryCrops.map((crop, index) => (
                <CropCard key={index} crop={crop} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CropCard({ crop }: { crop: CropRecommendation }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
          <Sprout size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {crop.name}
        </h3>
      </div>

      <div className="space-y-3">
        <CropInfoItem
          icon={<Sun size={16} />}
          label="Seasonality"
          value={crop.seasonality}
        />
        <CropInfoItem
          icon={<Droplet size={16} />}
          label="Water Requirements"
          value={crop.waterRequirements}
        />
        <CropInfoItem
          icon={<Scale size={16} />}
          label="Expected Yield"
          value={crop.expectedYield}
        />
        <CropInfoItem
          icon={<CircleDollarSign size={16} />}
          label="Market Value"
          value={crop.marketValue}
        />
      </div>
    </div>
  );
}

function CropInfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center">
      <div className="text-gray-500 dark:text-gray-400 mr-2">{icon}</div>
      <div>
        <span className="text-xs text-gray-500 dark:text-gray-400 block">
          {label}
        </span>
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {value}
        </span>
      </div>
    </div>
  );
}
