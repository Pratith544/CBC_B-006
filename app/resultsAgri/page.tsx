'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FarmerData, RecommendationResponse } from '@/types';
import PageContainer from '@/components/layout/PageContainer';
import { SectionHeading } from '@/components/ui/section-heading';
import { Loader2, ChevronLeft, Download, Share2, Mail } from 'lucide-react';
import { getCroppingRecommendations } from '@/lib/openai';
import RecommendedCrops from '@/components/results/RecommendedCrops';
import SoilAnalysis from '@/components/results/SoilAnalysis';
import YieldEstimates from '@/components/results/YieldEstimates';
import ResourceOptimization from '@/components/results/ResourceOptimization';
import AdvancedTechniques from '@/components/results/AdvancedTechniques';

// Mock data for development purposes
const mockRecommendations: RecommendationResponse = {
  recommendedCrops: [
    {
      name: "Rice (Paddy)",
      type: "primary",
      seasonality: "Kharif season (June-November)",
      waterRequirements: "High - requires standing water",
      expectedYield: "4-6 tons/hectare",
      marketValue: "₹1800-2200/quintal"
    },
    {
      name: "Wheat",
      type: "primary",
      seasonality: "Rabi season (November-April)",
      waterRequirements: "Medium - regular irrigation needed",
      expectedYield: "3.5-5 tons/hectare",
      marketValue: "₹2000-2400/quintal"
    },
    {
      name: "Maize",
      type: "primary",
      seasonality: "Can be grown year-round",
      waterRequirements: "Medium - sensitive to drought",
      expectedYield: "2.5-4 tons/hectare",
      marketValue: "₹1700-2100/quintal"
    },
    {
      name: "Chickpea",
      type: "secondary",
      seasonality: "Rabi season (November-April)",
      waterRequirements: "Low - drought resistant",
      expectedYield: "1-1.5 tons/hectare",
      marketValue: "₹4500-5500/quintal"
    },
    {
      name: "Mustard",
      type: "secondary",
      seasonality: "Rabi season (October-March)",
      waterRequirements: "Low to medium",
      expectedYield: "1-1.5 tons/hectare",
      marketValue: "₹4000-5000/quintal"
    }
  ],
  soilAnalysis: {
    type: "alluvial",
    ph: 6.8,
    fertility: "Medium to high",
    improvement: "Consider adding organic matter like farmyard manure or compost to improve soil structure and water retention capacity. Crop rotation with legumes can help in nitrogen fixation."
  },
  explanations: {
    primary: "These primary crops are recommended based on your soil type, water availability, and climate conditions. Rice, wheat, and maize are well-suited for your alluvial soil and have good market demand in your region.",
    secondary: "These alternative crops can be grown in rotation with primary crops to improve soil health and diversify income sources. They require less water and can be suitable during periods of water scarcity."
  },
  resourceOptimization: [
    {
      title: "Water Management",
      description: "Implement drip irrigation for row crops to reduce water usage by up to 40%. For rice, consider Alternate Wetting and Drying (AWD) technique which can save 15-30% water without reducing yield."
    },
    {
      title: "Fertilizer Efficiency",
      description: "Use split applications of fertilizers based on crop growth stages. For nitrogen, apply in 3-4 splits to reduce losses and improve uptake efficiency."
    },
    {
      title: "Labor Optimization",
      description: "Consider mechanical transplanting for rice and mechanical sowing for wheat to reduce labor requirements during peak seasons."
    },
    {
      title: "Integrated Pest Management",
      description: "Adopt IPM practices combining biological controls, crop rotation, and targeted pesticide application only when necessary to reduce costs and environmental impact."
    }
  ],
  advancedTechniques: [
    {
      title: "Precision Farming",
      description: "Use soil testing and variable rate application of inputs based on soil fertility maps to optimize resource use. This can reduce input costs by 10-15% while maintaining or improving yields.",
      difficulty: "Medium",
      resourcesRequired: "Soil testing kits, GPS-enabled equipment"
    },
    {
      title: "Conservation Agriculture",
      description: "Implement minimum tillage, permanent soil cover, and crop rotation to improve soil health, reduce erosion, and lower production costs.",
      difficulty: "Easy",
      resourcesRequired: "Zero-till drill, mulching materials"
    },
    {
      title: "System of Rice Intensification (SRI)",
      description: "Adopt SRI methods for rice cultivation to increase yields by 20-50% while using less water, seeds, and chemical inputs.",
      difficulty: "Medium",
      resourcesRequired: "Mechanical weeders, compost"
    }
  ],
  yieldEstimates: [
    {
      crop: "Rice",
      lowEstimate: "4 tons/hectare",
      highEstimate: "6 tons/hectare",
      factors: "Yield can be higher with proper water management, timely planting, and balanced nutrition. SRI methods can further increase yields."
    },
    {
      crop: "Wheat",
      lowEstimate: "3.5 tons/hectare",
      highEstimate: "5 tons/hectare",
      factors: "Timely sowing (first half of November), adequate irrigation at critical stages, and rust disease management are key to achieving higher yields."
    },
    {
      crop: "Maize",
      lowEstimate: "2.5 tons/hectare",
      highEstimate: "4 tons/hectare",
      factors: "Hybrid varieties, proper spacing, and protection from fall armyworm can help achieve higher yields."
    }
  ]
};

export default function ResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get farmer data from local storage
        const storedData = localStorage.getItem('farmerData');
        
        if (!storedData) {
          router.push('/questionnaire');
          return;
        }
        
        const parsedData = JSON.parse(storedData) as FarmerData;
        setFarmerData(parsedData);
        
        // In a production environment, uncomment this to call the LLM
        // const results = await getCroppingRecommendations(parsedData);
        // setRecommendations(results);
        
        // For development, use mock data
        setRecommendations(mockRecommendations);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('There was an error generating your recommendations. Please try again.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [router]);
  
  const handleBackToForm = () => {
    router.push('/questionnaire');
  };
  
  if (loading) {
    return (
      <PageContainer>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <Loader2 size={48} className="text-green-600 animate-spin mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Generating Your Recommendations
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md text-center">
            We're analyzing your data and preparing personalized farming recommendations. This may take a moment...
          </p>
        </div>
      </PageContainer>
    );
  }
  
  if (error || !recommendations) {
    return (
      <PageContainer>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 p-4 rounded-lg mb-4">
            <p>{error || 'Unable to generate recommendations. Please try again.'}</p>
          </div>
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            onClick={handleBackToForm}
          >
            Back to Questionnaire
          </button>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <div className="py-10 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <button
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 mb-4"
              onClick={handleBackToForm}
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Questionnaire
            </button>
            
            <SectionHeading
              title="Your Personalized Farming Recommendations"
              subtitle={farmerData ? `Based on your data for ${farmerData.landInfo.soilType} soil in ${farmerData.personalInfo.location}` : ''}
              className="mb-0"
            />
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Download size={16} className="mr-1" />
              Download
            </button>
            
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Share2 size={16} className="mr-1" />
              Share
            </button>
            
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Mail size={16} className="mr-1" />
              Email
            </button>
          </div>
        </div>
        
        <RecommendedCrops 
          crops={recommendations.recommendedCrops} 
          explanations={recommendations.explanations} 
        />
        
        <SoilAnalysis soilAnalysis={recommendations.soilAnalysis} />
        
        <YieldEstimates estimates={recommendations.yieldEstimates} />
        
        <ResourceOptimization optimizations={recommendations.resourceOptimization} />
        
        <AdvancedTechniques techniques={recommendations.advancedTechniques} />
        
        <div className="mt-8 bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-900/30">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            What's Next?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            These recommendations are based on the information you provided. For more detailed advice, consider consulting with local agricultural extension services or agronomy experts in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
              Connect with Local Experts
            </button>
            <button className="px-4 py-2 border border-green-600 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors">
              Explore More Resources
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}