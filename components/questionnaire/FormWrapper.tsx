'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FarmerData } from '@/types';
import PersonalInfoForm from './PersonalInfoForm';
import LandInfoForm from './LandInfoForm';
import ClimateInfoForm from './ClimateInfoForm';
import ResourceInfoForm from './ResourceInfoForm';
import PreferencesForm from './PreferencesForm';
import FormProgress from './FormProgress';

export default function FormWrapper() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<FarmerData>>({
    personalInfo: {
      name: '',
      age: 0,
      experience: 0,
      location: '',
      landSize: 0,
      landUnit: 'acres',
    },
    landInfo: {
      soilType: '',
      hasIrrigation: false,
      waterAvailability: 'sufficient',
      terrainType: 'flat',
      previousCrops: [],
    },
    climateInfo: {
      region: '',
      annualRainfall: 0,
      rainyMonths: [],
      dryMonths: [],
      temperatureRange: {
        min: 0,
        max: 0,
      },
    },
    resourceInfo: {
      hasEquipment: false,
      laborAvailability: 'medium',
      hasFertilizers: false,
      marketAccess: 'good',
    },
    preferences: {
      organicFarming: false,
      sustainablePractices: false,
      cropTypes: [],
      investmentCapacity: 'medium',
      riskTolerance: 'medium',
    },
  });

  const totalSteps = 5;

  const updateFormData = (stepData: Partial<FarmerData>) => {
    setFormData({ ...formData, ...stepData });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // In a real application, we would validate the data before submission
    try {
      // Store the form data in local storage to access it on the results page
      localStorage.setItem('farmerData', JSON.stringify(formData));
      
      // Navigate to the results page
      router.push('/results');
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <FormProgress currentStep={step} totalSteps={totalSteps} />
      
      <div className="p-6 md:p-8">
        {step === 1 && (
          <PersonalInfoForm 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
          />
        )}
        
        {step === 2 && (
          <LandInfoForm 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {step === 3 && (
          <ClimateInfoForm 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {step === 4 && (
          <ResourceInfoForm 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {step === 5 && (
          <PreferencesForm 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}