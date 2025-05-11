'use client';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  const steps = [
    { step: 1, label: "Personal" },
    { step: 2, label: "Land" },
    { step: 3, label: "Climate" },
    { step: 4, label: "Resources" },
    { step: 5, label: "Preferences" }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Step {currentStep} of {totalSteps}
        </p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {Math.round(progress)}% Complete
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mt-4">
        {steps.map((step) => (
          <div key={step.step} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                currentStep >= step.step 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {step.step}
            </div>
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400 hidden sm:block">
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}