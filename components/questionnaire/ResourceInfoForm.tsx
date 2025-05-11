'use client';

import { useState, useEffect } from 'react';
import { FarmerData } from '@/types';
import { SectionHeading } from '@/components/ui/section-heading';
import { Tractor, Store } from 'lucide-react';

interface ResourceInfoFormProps {
  formData: Partial<FarmerData>;
  updateFormData: (data: Partial<FarmerData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ResourceInfoForm({ formData, updateFormData, onNext, onBack }: ResourceInfoFormProps) {
  const [hasEquipment, setHasEquipment] = useState(formData.resourceInfo?.hasEquipment || false);
  const [equipmentTypes, setEquipmentTypes] = useState(formData.resourceInfo?.equipmentTypes?.join(', ') || '');
  const [laborAvailability, setLaborAvailability] = useState(formData.resourceInfo?.laborAvailability || 'medium');
  const [hasFertilizers, setHasFertilizers] = useState(formData.resourceInfo?.hasFertilizers || false);
  const [fertilizerTypes, setFertilizerTypes] = useState(formData.resourceInfo?.fertilizerTypes?.join(', ') || '');
  const [marketAccess, setMarketAccess] = useState(formData.resourceInfo?.marketAccess || 'good');
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    validateForm();
  }, [hasEquipment, equipmentTypes, hasFertilizers, fertilizerTypes]);

  const validateForm = () => {
    let valid = true;
    
    if (hasEquipment && !equipmentTypes.trim()) {
      valid = false;
    }
    
    if (hasFertilizers && !fertilizerTypes.trim()) {
      valid = false;
    }
    
    setIsFormValid(valid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    updateFormData({
      resourceInfo: {
        hasEquipment,
        equipmentTypes: hasEquipment 
          ? equipmentTypes.split(',').map(type => type.trim()).filter(Boolean)
          : undefined,
        laborAvailability: laborAvailability as 'high' | 'medium' | 'low',
        hasFertilizers,
        fertilizerTypes: hasFertilizers 
          ? fertilizerTypes.split(',').map(type => type.trim()).filter(Boolean)
          : undefined,
        marketAccess: marketAccess as 'excellent' | 'good' | 'limited' | 'poor',
      }
    });
    
    onNext();
  };

  return (
    <div>
      <SectionHeading
        title="Resource Information"
        subtitle="Tell us about the resources available to you for farming"
        icon={<Tractor size={28} className="text-amber-600" />}
        align="center"
      />
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasEquipment"
              checked={hasEquipment}
              onChange={(e) => setHasEquipment(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="hasEquipment" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Do you have access to farming equipment?
            </label>
          </div>
          
          {hasEquipment && (
            <div className="pl-6 border-l-2 border-gray-200 dark:border-gray-700">
              <label htmlFor="equipmentTypes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Equipment Types (separated by commas)
              </label>
              <input
                type="text"
                id="equipmentTypes"
                value={equipmentTypes}
                onChange={(e) => setEquipmentTypes(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="e.g., Tractor, Harvester, Pump"
              />
              {hasEquipment && !equipmentTypes.trim() && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">Please list your equipment</p>
              )}
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="laborAvailability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Labor Availability
          </label>
          <select
            id="laborAvailability"
            value={laborAvailability}
            onChange={(e) => setLaborAvailability(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="high">High - Readily available when needed</option>
            <option value="medium">Medium - Available with some planning</option>
            <option value="low">Low - Difficult to find workers</option>
          </select>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasFertilizers"
              checked={hasFertilizers}
              onChange={(e) => setHasFertilizers(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="hasFertilizers" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Do you use fertilizers?
            </label>
          </div>
          
          {hasFertilizers && (
            <div className="pl-6 border-l-2 border-gray-200 dark:border-gray-700">
              <label htmlFor="fertilizerTypes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fertilizer Types (separated by commas)
              </label>
              <input
                type="text"
                id="fertilizerTypes"
                value={fertilizerTypes}
                onChange={(e) => setFertilizerTypes(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="e.g., NPK, Urea, Organic compost"
              />
              {hasFertilizers && !fertilizerTypes.trim() && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">Please list your fertilizers</p>
              )}
            </div>
          )}
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <Store size={20} className="text-amber-600 dark:text-amber-400 mr-2" />
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">Market Access</h3>
          </div>
          
          <label htmlFor="marketAccess" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            How would you rate your access to markets for selling produce?
          </label>
          <select
            id="marketAccess"
            value={marketAccess}
            onChange={(e) => setMarketAccess(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="excellent">Excellent - Direct access to multiple markets</option>
            <option value="good">Good - Reasonable access to local markets</option>
            <option value="limited">Limited - Some difficulty reaching markets</option>
            <option value="poor">Poor - Very difficult to access markets</option>
          </select>
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