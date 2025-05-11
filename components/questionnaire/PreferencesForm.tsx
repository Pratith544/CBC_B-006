'use client';

import { useState } from 'react';
import { FarmerData } from '@/types';
import { SectionHeading } from '@/components/ui/section-heading';
import { Heart, Loader2 } from 'lucide-react';

interface PreferencesFormProps {
  formData: Partial<FarmerData>;
  updateFormData: (data: Partial<FarmerData>) => void;
  onNext: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function PreferencesForm({ formData, updateFormData, onNext, onBack, loading }: PreferencesFormProps) {
  const [organicFarming, setOrganicFarming] = useState(formData.preferences?.organicFarming || false);
  const [sustainablePractices, setSustainablePractices] = useState(formData.preferences?.sustainablePractices || false);
  const [cropTypes, setCropTypes] = useState(formData.preferences?.cropTypes?.join(', ') || '');
  const [investmentCapacity, setInvestmentCapacity] = useState(formData.preferences?.investmentCapacity || 'medium');
  const [riskTolerance, setRiskTolerance] = useState(formData.preferences?.riskTolerance || 'medium');
  const [isFormValid, setIsFormValid] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFormData({
      preferences: {
        organicFarming,
        sustainablePractices,
        cropTypes: cropTypes.split(',').map(type => type.trim()).filter(Boolean),
        investmentCapacity: investmentCapacity as 'high' | 'medium' | 'low',
        riskTolerance: riskTolerance as 'high' | 'medium' | 'low',
      }
    });
    
    onNext();
  };

  return (
    <div>
      <SectionHeading
        title="Your Preferences"
        subtitle="Help us understand your farming goals and preferences"
        icon={<Heart size={28} className="text-red-500" />}
        align="center"
      />
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="organicFarming"
              checked={organicFarming}
              onChange={(e) => setOrganicFarming(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="organicFarming" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Are you interested in organic farming practices?
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sustainablePractices"
              checked={sustainablePractices}
              onChange={(e) => setSustainablePractices(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="sustainablePractices" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Do you want to implement sustainable farming practices?
            </label>
          </div>
        </div>
        
        <div>
          <label htmlFor="cropTypes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Preferred Crop Types (separated by commas)
          </label>
          <input
            type="text"
            id="cropTypes"
            value={cropTypes}
            onChange={(e) => setCropTypes(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            placeholder="e.g., Cereals, Pulses, Vegetables, Cash crops"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Leave blank if you have no specific preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="investmentCapacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Investment Capacity
            </label>
            <select
              id="investmentCapacity"
              value={investmentCapacity}
              onChange={(e) => setInvestmentCapacity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            >
              <option value="high">High - Can invest substantially in new techniques/crops</option>
              <option value="medium">Medium - Moderate capacity for investments</option>
              <option value="low">Low - Limited capacity for additional investments</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="riskTolerance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Risk Tolerance
            </label>
            <select
              id="riskTolerance"
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            >
              <option value="high">High - Willing to try new crops/techniques</option>
              <option value="medium">Medium - Some openness to innovation</option>
              <option value="low">Low - Prefer proven, traditional methods</option>
            </select>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            By submitting this form, you'll receive personalized crop recommendations, resource optimization strategies, and educational resources tailored to your specific farming situation.
          </p>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="px-6 py-2 rounded-md text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Back
          </button>
          
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`px-6 py-2 rounded-md text-white font-medium flex items-center ${
              isFormValid && !loading
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Generating Recommendations...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}