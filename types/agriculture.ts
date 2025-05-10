export interface CropRecommendation {
  cropName: string;
  confidence: number;
  plantingTime: string;
  harvestTime: string;
  expectedYield: string;
  requirements: {
    temperature: string;
    rainfall: string;
    humidity: string;
    soilType: string;
  };
  risks: string[];
  mitigationStrategies: string[];
}

export interface WeatherImpact {
  severity: 'low' | 'medium' | 'high';
  impact: string;
  recommendations: string[];
}

export interface SoilCondition {
  moisture: number;
  temperature: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface AgriculturalMetrics {
  growingDegreeDays: number;
  chillHours: number;
  evapotranspiration: number;
  soilConditions: SoilCondition;
}

export interface CropCalendar {
  crop: string;
  activities: Array<{
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    status: 'pending' | 'ongoing' | 'completed';
  }>;
}