'use client';

import { useState, useEffect } from 'react';
import { FarmerData } from '@/types';
import { SectionHeading } from '@/components/ui/section-heading';
import { Map } from 'lucide-react';

interface LandInfoFormProps {
  formData: Partial<FarmerData>;
  updateFormData: (data: Partial<FarmerData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function LandInfoForm({ formData, updateFormData, onNext, onBack }: LandInfoFormProps) {
  const [soilType, setSoilType] = useState(formData.landInfo?.soilType || '');
  const [hasIrrigation, setHasIrrigation] = useState(formData.landInfo?.hasIrrigation || false);
  const [irrigationType, setIrrigationType] = useState(formData.landInfo?.irrigationType || '');
  const [waterSource, setWaterSource] = useState(formData.landInfo?.waterSource || '');
  const [waterAvailability, setWaterAvailability] = useState(formData.landInfo?.waterAvailability || 'sufficient');
  const [terrainType, setTerrainType] = useState(formData.landInfo?.terrainType || 'flat');
  const [previousCrops, setPreviousCrops] = useState(formData.landInfo?.previousCrops?.join(', ') || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const soilTypes = [
    { value: "alluvial", label: "Alluvial Soil" },
    { value: "black", label: "Black Soil (Regur)" },
    { value: "red", label: "Red Soil" },
    { value: "laterite", label: "Laterite Soil" },
    { value: "arid", label: "Arid Soil" },
    { value: "forest", label: "Forest Soil" },
    { value: "saline", label: "Saline Soil" },
    { value: "peaty", label: "Peaty/Marshy Soil" },
    { value: "other", label: "Other" }
  ];

  useEffect(() => {
    validateForm();
  }, [soilType, hasIrrigation, irrigationType, waterSource, waterAvailability, terrainType, previousCrops]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!soilType) newErrors.soilType = 'Soil type is required';
    if (hasIrrigation) {
      if (!irrigationType) newErrors.irrigationType = 'Irrigation type is required';
      if (!waterSource) newErrors.waterSource = 'Water source is required';
    }
    
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    updateFormData({
      landInfo: {
        soilType,
        hasIrrigation,
        irrigationType: hasIrrigation ? irrigationType : undefined,
        waterSource: hasIrrigation ? waterSource : undefined,
        waterAvailability: waterAvailability as 'abundant' | 'sufficient' | 'limited' | 'scarce',
        terrainType: terrainType as 'flat' | 'sloped' | 'terraced' | 'mixed',
        previousCrops: previousCrops.split(',').map(crop => crop.trim()).filter(Boolean),
      }
    });
    
    onNext();
  };

  return (
    <div>
      <SectionHeading
        title="Land Information"
        subtitle="Tell us about your land to help determine suitable crops"
        icon={<Map size={28} className="text-green-600" />}
        align="center"
      />
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Soil Type
          </label>
          <select
            id="soilType"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select soil type</option>
            {soilTypes.map(soil => (
              <option key={soil.value} value={soil.value}>{soil.label}</option>
            ))}
          </select>
          {errors.soilType && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.soilType}</p>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasIrrigation"
              checked={hasIrrigation}
              onChange={(e) => setHasIrrigation(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="hasIrrigation" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Do you have irrigation facilities?
            </label>
          </div>
          
          {hasIrrigation && (
            <div className="pl-6 space-y-4 border-l-2 border-gray-200 dark:border-gray-700">
              <div>
                <label htmlFor="irrigationType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Irrigation Type
                </label>
                <select
                  id="irrigationType"
                  value={irrigationType}
                  onChange={(e) => setIrrigationType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select irrigation type</option>
                  <option value="drip">Drip Irrigation</option>
                  <option value="sprinkler">Sprinkler System</option>
                  <option value="flood">Flood Irrigation</option>
                  <option value="furrow">Furrow Irrigation</option>
                  <option value="other">Other</option>
                </select>
                {errors.irrigationType && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.irrigationType}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="waterSource" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Water Source
                </label>
                <select
                  id="waterSource"
                  value={waterSource}
                  onChange={(e) => setWaterSource(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select water source</option>
                  <option value="well">Well</option>
                  <option value="borewell">Borewell</option>
                  <option value="canal">Canal</option>
                  <option value="river">River/Stream</option>
                  <option value="pond">Pond/Lake</option>
                  <option value="rainwater">Rainwater Harvesting</option>
                  <option value="other">Other</option>
                </select>
                {errors.waterSource && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.waterSource}</p>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="waterAvailability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Water Availability
          </label>
          <select
            id="waterAvailability"
            value={waterAvailability}
            onChange={(e) => setWaterAvailability(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="abundant">Abundant - Available throughout the year</option>
            <option value="sufficient">Sufficient - Adequate for most crops</option>
            <option value="limited">Limited - Available seasonally</option>
            <option value="scarce">Scarce - Often insufficient</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="terrainType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Terrain Type
          </label>
          <select
            id="terrainType"
            value={terrainType}
            onChange={(e) => setTerrainType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="flat">Flat Land</option>
            <option value="sloped">Sloped Land</option>
            <option value="terraced">Terraced Land</option>
            <option value="mixed">Mixed Terrain</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="previousCrops" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Previous Crops (separated by commas)
          </label>
          <textarea
            id="previousCrops"
            value={previousCrops}
            onChange={(e) => setPreviousCrops(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            placeholder="e.g., Rice, Wheat, Cotton"
            rows={3}
          />
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