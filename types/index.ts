export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  seller: {
    name: string;
    location: string;
  };
  rating: number;
  freshness: string;
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  sellerLocation: string;
}

export interface SortOption {
  label: string;
  value: string;
}

export interface FarmerData {
  personalInfo: {
    name: string;
    age: number;
    experience: number;
    location: string;
    landSize: number;
    landUnit: "acres" | "hectares" | "bigha";
  };
  landInfo: {
    soilType: string;
    hasIrrigation: boolean;
    irrigationType?: string;
    waterSource?: string;
    waterAvailability: "abundant" | "sufficient" | "limited" | "scarce";
    terrainType: "flat" | "sloped" | "terraced" | "mixed";
    previousCrops: string[];
  };
  climateInfo: {
    region: string;
    annualRainfall: number;
    rainyMonths: string[];
    dryMonths: string[];
    temperatureRange: {
      min: number;
      max: number;
    };
  };
  resourceInfo: {
    hasEquipment: boolean;
    equipmentTypes?: string[];
    laborAvailability: "high" | "medium" | "low";
    hasFertilizers: boolean;
    fertilizerTypes?: string[];
    marketAccess: "excellent" | "good" | "limited" | "poor";
  };
  preferences: {
    organicFarming: boolean;
    sustainablePractices: boolean;
    cropTypes: string[];
    investmentCapacity: "high" | "medium" | "low";
    riskTolerance: "high" | "medium" | "low";
  };
}

export interface CropRecommendation {
  name: string;
  type: "primary" | "secondary";
  seasonality: string;
  waterRequirements: string;
  expectedYield: string;
  marketValue: string;
}

export interface SoilAnalysis {
  type: string;
  ph: number;
  fertility: string;
  improvement: string;
}

export interface ResourceOptimization {
  title: string;
  description: string;
}

export interface AdvancedTechnique {
  title: string;
  description: string;
  difficulty: string;
  resourcesRequired: string;
}

export interface YieldEstimate {
  crop: string;
  lowEstimate: string;
  highEstimate: string;
  factors: string;
}

export interface RecommendationResponse {
  recommendedCrops: CropRecommendation[];
  soilAnalysis: SoilAnalysis;
  explanations: {
    primary: string;
    secondary: string;
  };
  resourceOptimization: ResourceOptimization[];
  advancedTechniques: AdvancedTechnique[];
  yieldEstimates: YieldEstimate[];
}
