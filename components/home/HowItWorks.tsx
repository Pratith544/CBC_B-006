"use client";

import { useState } from "react";
import { ClipboardList, BarChart3, Lightbulb, ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      icon: <ClipboardList size={24} />,
      title: "Complete the Questionnaire",
      description:
        "Answer questions about your land, climate, resources, and preferences to help us understand your unique farming situation.",
      image:
        "https://images.pexels.com/photos/8108089/pexels-photo-8108089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 1,
      icon: <BarChart3 size={24} />,
      title: "Receive Personalized Recommendations",
      description:
        "Our AI analyzes your data to generate tailored crop recommendations, resource optimization strategies, and yield projections.",
      image:
        "https://images.pexels.com/photos/8040311/pexels-photo-8040311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      icon: <Lightbulb size={24} />,
      title: "Learn Advanced Techniques",
      description:
        "Explore educational content specific to your recommended crops and farming conditions to improve your agricultural practices.",
      image:
        "https://images.pexels.com/photos/7728928/pexels-photo-7728928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How It Works"
          subtitle="Get from questionnaire to actionable insights in three simple steps"
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Steps */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeStep === step.id
                      ? "bg-white dark:bg-gray-800 shadow-md scale-105 border-l-4 border-green-500"
                      : "bg-gray-100 dark:bg-gray-850 hover:bg-white dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activeStep === step.id
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <button
                className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                onClick={() => {
                  if (activeStep < steps.length - 1) {
                    setActiveStep(activeStep + 1);
                  } else {
                    setActiveStep(0);
                  }
                }}
              >
                {activeStep < steps.length - 1 ? "Next Step" : "Start Again"}
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 h-[400px] overflow-hidden rounded-xl shadow-xl">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`h-full w-full transition-all duration-500 ${
                  activeStep === step.id ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
