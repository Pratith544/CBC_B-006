"use client";

import { ArrowRight, Leaf, Droplet, Sun, Wind } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950 pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 top-20 w-72 h-72 bg-green-200/30 dark:bg-green-900/10 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-6">
              <Leaf size={14} className="mr-1" />
              <span>Digital Empowerment for Rural Communities</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Grow{" "}
              <span className="text-green-600 dark:text-green-500">Better</span>{" "}
              with <br className="hidden md:block" />
              Data-Driven Farming
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              Get personalized cropping recommendations, resource optimization
              strategies, and cultivation guidance tailored to your specific
              conditions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/questionnaireAgri"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-all transform hover:scale-105"
              >
                Get Started
                <ArrowRight size={18} className="ml-2" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all"
              >
                Learn More
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <Leaf size={18} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Smart Recommendations
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Droplet size={18} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Water Optimization
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                  <Sun size={18} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Weather Analysis
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image/illustration */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Farmer in field"
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <p className="text-white font-medium text-lg">
                    Transform your farming practices with data-driven insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
