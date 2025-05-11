'use client';

import { useState, useEffect } from 'react';
import { FarmerData } from '@/types';
import { SectionHeading } from '@/components/ui/section-heading';
import { Cloud, Thermometer } from 'lucide-react';

interface ClimateInfoFormProps {
  formData: Partial<FarmerData>;
  updateFormData: (data: Partial<FarmerData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ClimateInfoForm({ formData, updateFormData, onNext, onBack }: ClimateInfoFormProps) {
  const [region, setRegion] = useState(formData.climateInfo?.region || '');
  const [annualRainfall, setAnnualRainfall] = useState(formData.climateInfo?.annualRainfall || '');
  const [rainyMonths, setRainyMonths] = useState(formData.climateInfo?.rainyMonths?.join(', ') || '');
  const [dryMonths, setDryMonths] = useState(formData.climateInfo?.dryMonths?.join(', ') || '');
  const [minTemp, setMinTemp] = useState(formData.climateInfo?.temperatureRange?.min || '');
  const [maxTemp, setMaxTemp] = useState(formData.climateInfo?.temperatureRange?.max || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const regions = [
    { value: "northern", label: "Northern India" },
    { value: "western", label: "Western India" },
    { value: "eastern", label: "Eastern India" },
    { value: "southern", label: "Southern India" },
    { value: "central", label: "Central India" },
    { value: "northeastern", label: "North-Eastern India" },
    { value: "himalayan", label: "Himalayan Region" },
    { value: "coastal", label: "Coastal Region" }
  ];

  useEffect(() => {
    validateForm();
  }, [region, annualRainfall, rainyMonths, dryMonths, minTemp, maxTemp]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!region) newErrors.region = 'Region is required';
    
    if (!annualRainfall) newErrors.annualRainfall = 'Annual rainfall is required';
    else if (isNaN(Number(annualRainfall)) || Number(annualRainfall) < 0) {
      newErrors.annualRainfall = 'Please enter a valid rainfall amount';
    }
    
    if (!minTemp) newErrors.minTemp = 'Minimum temperature is required';
    else if (isNaN(Number(minTemp))) {
      newErrors.minTemp = 'Please enter a valid temperature';
    }
    
    if (!maxTemp) newErrors.maxTemp = 'Maximum temperature is required';
    else if (isNaN(Number(maxTemp))) {
      newErrors.maxTemp = 'Please enter a valid temperature';
    }
    
    if (minTemp && maxTemp && Number(minTemp) > Number(maxTemp)) {
      newErrors.maxTemp = 'Maximum temperature must be higher than minimum temperature';
    }
    
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    updateFormData({
      climateInfo: {
        region,
        annualRainfall: Number(annualRainfall),
        rainyMonths: rainyMonths.split(',').map(month => month.trim()).filter(Boolean),
        dryMonths: dryMonths.split(',').map(month => month.trim()).filter(Boolean),
        temperatureRange: {
          min: Number(minTemp),
          max: Number(maxTemp)
        }
      }
    });
    
    onNext();
  };

  return (
    <div>
      <SectionHeading
        title="Climate Information"
        subtitle="Details about your local climate help us recommend suitable crops"
        icon={<Cloud size={28} className="text-blue-600" />}
        align="center"
      />
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Geographical Region
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select region</option>
            {regions.map(reg => (
              <option key={reg.value} value={reg.value}>{reg.label}</option>
            ))}
          </select>
          {errors.region && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.region}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="annualRainfall" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Annual Rainfall (mm)
          </label>
          <input
            type="number"
            id="annualRainfall"
            value={annualRainfall}
            onChange={(e) => setAnnualRainfall(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            placeholder="e.g., 1000"
            min="0"
          />
          {errors.annualRainfall && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.annualRainfall}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="rainyMonths" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rainy Months (separated by commas)
            </label>
            <input
              type="text"
              id="rainyMonths"
              value={rainyMonths}
              onChange={(e) => setRainyMonths(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder="e.g., June, July, August"
            />
          </div>
          
          <div>
            <label htmlFor="dryMonths" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Dry Months (separated by commas)
            </label>
            <input
              type="text"
              id="dryMonths"
              value={dryMonths}
              onChange={(e) => setDryMonths(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder="e.g., December, January, February"
            />
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <Thermometer size={20} className="text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">Temperature Range</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="minTemp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Minimum Temperature (°C)
              </label>
              <input
                type="number"
                id="minTemp"
                value={minTemp}
                onChange={(e) => setMinTemp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="e.g., 10"
                step="0.1"
              />
              {errors.minTemp && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.minTemp}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="maxTemp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Maximum Temperature (°C)
              </label>
              <input
                type="number"
                id="maxTemp"
                value={maxTemp}
                onChange={(e) => setMaxTemp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="e.g., 35"
                step="0.1"
              />
              {errors.maxTemp && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.maxTemp}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 rounded-md text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Back
          </button>
          
          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              isFormValid 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}