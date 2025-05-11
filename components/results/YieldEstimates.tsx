"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { BarChart, LineChart, Info } from "lucide-react";
import { YieldEstimate } from "@/types";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface YieldEstimatesProps {
  estimates: YieldEstimate[];
}

export default function YieldEstimates({ estimates }: YieldEstimatesProps) {
  const [activeTab, setActiveTab] = useState<"chart" | "details">("chart");

  // Process data for chart
  const chartData = estimates.map((estimate) => {
    const lowValue = parseFloat(estimate.lowEstimate.replace(/[^0-9.]/g, ""));
    const highValue = parseFloat(estimate.highEstimate.replace(/[^0-9.]/g, ""));

    return {
      name: estimate.crop,
      Low: lowValue,
      High: highValue,
      Average: (lowValue + highValue) / 2,
    };
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex">
          <button
            className={`px-6 py-3 text-sm font-medium flex items-center ${
              activeTab === "chart"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("chart")}
          >
            <BarChart size={16} className="mr-2" />
            Yield Chart
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium flex items-center ${
              activeTab === "details"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("details")}
          >
            <Info size={16} className="mr-2" />
            Detailed Analysis
          </button>
        </div>
      </div>

      <div className="p-6">
        <SectionHeading
          title="Expected Yield Estimates"
          subtitle="Projected harvest yields for recommended crops"
          icon={<LineChart size={24} className="text-blue-600" />}
        />

        {activeTab === "chart" ? (
          <div className="mt-6 h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Low"
                  fill="hsl(var(--chart-1))"
                  name="Low Estimate"
                />
                <Bar
                  dataKey="High"
                  fill="hsl(var(--chart-2))"
                  name="High Estimate"
                />
                <Bar
                  dataKey="Average"
                  fill="hsl(var(--chart-3))"
                  name="Average Yield"
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6">
            {estimates.map((estimate, index) => (
              <YieldEstimateCard key={index} estimate={estimate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function YieldEstimateCard({ estimate }: { estimate: YieldEstimate }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        {estimate.crop}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Low Estimate
          </span>
          <p className="text-base font-medium text-gray-900 dark:text-white">
            {estimate.lowEstimate}
          </p>
        </div>

        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            High Estimate
          </span>
          <p className="text-base font-medium text-gray-900 dark:text-white">
            {estimate.highEstimate}
          </p>
        </div>
      </div>

      <div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Key Factors
        </span>
        <p className="text-base text-gray-700 dark:text-gray-300 mt-1">
          {estimate.factors}
        </p>
      </div>
    </div>
  );
}
