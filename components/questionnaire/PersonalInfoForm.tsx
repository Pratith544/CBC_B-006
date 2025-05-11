'use client';

import { useState, useEffect } from 'react';
import { FarmerData } from '@/types';
import { SectionHeading } from '@/components/ui/section-heading';
import { User } from 'lucide-react';

interface PersonalInfoFormProps {
  formData: Partial<FarmerData>;
  updateFormData: (data: Partial<FarmerData>) => void;
  onNext: () => void;
}

export default function PersonalInfoForm({ formData, updateFormData, onNext }: PersonalInfoFormProps) {
  const [name, setName] = useState(formData.personalInfo?.name || '');
  const [age, setAge] = useState(formData.personalInfo?.age || '');
  const [experience, setExperience] = useState(formData.personalInfo?.experience || '');
  const [location, setLocation] = useState(formData.personalInfo?.location || '');
  const [landSize, setLandSize] = useState(formData.personalInfo?.landSize || '');
  const [landUnit, setLandUnit] = useState(formData.personalInfo?.landUnit || 'acres');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [name, age, experience, location, landSize, landUnit]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!age) newErrors.age = 'Age is required';
    else if (isNaN(Number(age)) || Number(age) < 18 || Number(age) > 120) newErrors.age = 'Please enter a valid age between 18 and 120';
    
    if (!experience) newErrors.experience = 'Experience is required';
    else if (isNaN(Number(experience)) || Number(experience) < 0) newErrors.experience = 'Please enter a valid experience in years';
    
    if (!location.trim()) newErrors.location = 'Location is required';
    
    if (!landSize) newErrors.landSize = 'Land size is required';
    else if (isNaN(Number(landSize)) || Number(landSize) <= 0) newErrors.landSize = 'Please enter a valid land size';
    
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    updateFormData({
      personalInfo: {
        name,
        age: Number(age),
        experience: Number(experience),
        location,
        landSize: Number(landSize),
        landUnit: landUnit as 'acres' | 'hectares' | 'bigha',
      }
    });
    
    onNext();
  };

  return (
    <div>
      <SectionHeading
        title="Tell us about yourself"
        subtitle="This information helps us personalize your farming recommendations"
        icon={<User size={28} className="text-green-600" />}
        align="center"
      />
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder="Enter your age"
              min="18"
              max="120"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.age}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Farming Experience (years)
            </label>
            <input
              type="number"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder="Years of farming experience"
              min="0"
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.experience}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location (Village/District/State)
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder="Enter your location"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="landSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Land Size
            </label>
            <input
              type="number"
              id="landSize"
              value={landSize}
              onChange={(e) => setLandSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder="Enter your land size"
              min="0.1"
              step="0.1"
            />
            {errors.landSize && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.landSize}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="landUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Land Unit
            </label>
            <select
              id="landUnit"
              value={landUnit}
              onChange={(e) => setLandUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            >
              <option value="acres">Acres</option>
              <option value="hectares">Hectares</option>
              <option value="bigha">Bigha</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end">
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