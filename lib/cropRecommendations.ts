import { WeatherData } from './types';

interface CropRecommendation {
  name: string;
  description: string;
  idealTemperature: {
    min: number;
    max: number;
  };
  idealRainfall: {
    min: number; // mm per week
    max: number;
  };
  idealHumidity: {
    min: number;
    max: number;
  };
  growthPeriod: {
    min: number; // days
    max: number;
  };
  suitabilityScore?: number;
}

// Crop database with growing conditions
const crops: CropRecommendation[] = [
  {
    name: 'Tomatoes',
    description: 'Warm-season crop that thrives in full sun',
    idealTemperature: { min: 18, max: 29 },
    idealRainfall: { min: 20, max: 40 },
    idealHumidity: { min: 65, max: 85 },
    growthPeriod: { min: 60, max: 100 }
  },
  {
    name: 'Lettuce',
    description: 'Cool-season crop that prefers partial shade in hot weather',
    idealTemperature: { min: 10, max: 21 },
    idealRainfall: { min: 25, max: 40 },
    idealHumidity: { min: 60, max: 80 },
    growthPeriod: { min: 30, max: 70 }
  },
  {
    name: 'Carrots',
    description: 'Root vegetable that prefers cooler temperatures',
    idealTemperature: { min: 7, max: 24 },
    idealRainfall: { min: 20, max: 30 },
    idealHumidity: { min: 50, max: 75 },
    growthPeriod: { min: 50, max: 80 }
  },
  {
    name: 'Wheat',
    description: 'Cereal grain that adapts to various climates',
    idealTemperature: { min: 15, max: 24 },
    idealRainfall: { min: 25, max: 40 },
    idealHumidity: { min: 40, max: 70 },
    growthPeriod: { min: 100, max: 130 }
  },
  {
    name: 'Rice',
    description: 'Grain crop that requires flooded conditions',
    idealTemperature: { min: 20, max: 35 },
    idealRainfall: { min: 40, max: 70 },
    idealHumidity: { min: 70, max: 90 },
    growthPeriod: { min: 90, max: 150 }
  },
  {
    name: 'Corn (Maize)',
    description: 'Warm-season grain that needs full sun',
    idealTemperature: { min: 18, max: 33 },
    idealRainfall: { min: 30, max: 50 },
    idealHumidity: { min: 50, max: 80 },
    growthPeriod: { min: 60, max: 100 }
  },
  {
    name: 'Potatoes',
    description: 'Root vegetable that prefers cooler temperatures',
    idealTemperature: { min: 10, max: 25 },
    idealRainfall: { min: 30, max: 50 },
    idealHumidity: { min: 60, max: 80 },
    growthPeriod: { min: 70, max: 120 }
  },
  {
    name: 'Soybeans',
    description: 'Legume that fixes nitrogen in soil',
    idealTemperature: { min: 20, max: 30 },
    idealRainfall: { min: 30, max: 45 },
    idealHumidity: { min: 60, max: 80 },
    growthPeriod: { min: 80, max: 120 }
  },
  {
    name: 'Broccoli',
    description: 'Cool-season vegetable in the cabbage family',
    idealTemperature: { min: 13, max: 20 },
    idealRainfall: { min: 25, max: 40 },
    idealHumidity: { min: 60, max: 75 },
    growthPeriod: { min: 80, max: 100 }
  },
  {
    name: 'Peppers',
    description: 'Warm-season vegetable related to tomatoes',
    idealTemperature: { min: 18, max: 32 },
    idealRainfall: { min: 25, max: 40 },
    idealHumidity: { min: 65, max: 85 },
    growthPeriod: { min: 60, max: 95 }
  }
];

/**
 * Calculate weekly rainfall from forecast data
 */
function calculateWeeklyRainfall(weatherData: WeatherData): number {
  // Sum up precipitation for available forecast days
  return weatherData.forecast.forecastday.reduce((sum, day) => {
    return sum + day.day.totalprecip_mm;
  }, 0);
}

/**
 * Calculate average temperature from forecast data
 */
function calculateAverageTemperature(weatherData: WeatherData): number {
  const temps = weatherData.forecast.forecastday.map(day => day.day.avgtemp_c);
  return temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
}

/**
 * Calculate average humidity from forecast data
 */
function calculateAverageHumidity(weatherData: WeatherData): number {
  const humidities = weatherData.forecast.forecastday.map(day => day.day.avghumidity);
  return humidities.reduce((sum, humidity) => sum + humidity, 0) / humidities.length;
}

/**
 * Calculate suitability score for a crop based on weather conditions
 */
function calculateSuitabilityScore(crop: CropRecommendation, weatherData: WeatherData): number {
  const avgTemp = calculateAverageTemperature(weatherData);
  const weeklyRainfall = calculateWeeklyRainfall(weatherData);
  const avgHumidity = calculateAverageHumidity(weatherData);
  
  // Temperature score (0-1)
  let tempScore = 0;
  if (avgTemp >= crop.idealTemperature.min && avgTemp <= crop.idealTemperature.max) {
    tempScore = 1;
  } else {
    // Calculate how far outside the ideal range
    const tempMin = crop.idealTemperature.min;
    const tempMax = crop.idealTemperature.max;
    const tempRange = tempMax - tempMin;
    
    if (avgTemp < tempMin) {
      // Too cold
      const deviation = tempMin - avgTemp;
      tempScore = Math.max(0, 1 - (deviation / (tempRange / 2)));
    } else {
      // Too hot
      const deviation = avgTemp - tempMax;
      tempScore = Math.max(0, 1 - (deviation / (tempRange / 2)));
    }
  }
  
  // Rainfall score (0-1)
  let rainfallScore = 0;
  if (weeklyRainfall >= crop.idealRainfall.min && weeklyRainfall <= crop.idealRainfall.max) {
    rainfallScore = 1;
  } else {
    // Calculate how far outside the ideal range
    const rainMin = crop.idealRainfall.min;
    const rainMax = crop.idealRainfall.max;
    const rainRange = rainMax - rainMin;
    
    if (weeklyRainfall < rainMin) {
      // Too dry
      const deviation = rainMin - weeklyRainfall;
      rainfallScore = Math.max(0, 1 - (deviation / rainRange));
    } else {
      // Too wet
      const deviation = weeklyRainfall - rainMax;
      rainfallScore = Math.max(0, 1 - (deviation / rainRange));
    }
  }
  
  // Humidity score (0-1)
  let humidityScore = 0;
  if (avgHumidity >= crop.idealHumidity.min && avgHumidity <= crop.idealHumidity.max) {
    humidityScore = 1;
  } else {
    // Calculate how far outside the ideal range
    const humidityMin = crop.idealHumidity.min;
    const humidityMax = crop.idealHumidity.max;
    const humidityRange = humidityMax - humidityMin;
    
    if (avgHumidity < humidityMin) {
      // Too dry
      const deviation = humidityMin - avgHumidity;
      humidityScore = Math.max(0, 1 - (deviation / humidityRange));
    } else {
      // Too humid
      const deviation = avgHumidity - humidityMax;
      humidityScore = Math.max(0, 1 - (deviation / humidityRange));
    }
  }
  
  // Weighted average
  return (tempScore * 0.4) + (rainfallScore * 0.3) + (humidityScore * 0.3);
}

/**
 * Get crop recommendations based on weather data
 */
export function getCropRecommendations(weatherData: WeatherData, count: number = 5): CropRecommendation[] {
  // Calculate suitability scores for all crops
  const scoredCrops = crops.map(crop => {
    const score = calculateSuitabilityScore(crop, weatherData);
    return { ...crop, suitabilityScore: score };
  });
  
  // Sort by suitability score and return top recommendations
  return scoredCrops
    .sort((a, b) => (b.suitabilityScore || 0) - (a.suitabilityScore || 0))
    .slice(0, count);
}

export function getTopCropCategories(weatherData: WeatherData): Record<string, number> {
  const recommendations = getCropRecommendations(weatherData, 10);
  
  // Define categories based on temperature preferences
  const categories: Record<string, number> = {
    'Cool Weather Crops': 0,
    'Moderate Weather Crops': 0,
    'Warm Weather Crops': 0,
    'Heat-Tolerant Crops': 0
  };
  
  // Categorize crops
  recommendations.forEach(crop => {
    const maxTemp = crop.idealTemperature.max;
    
    if (maxTemp < 18) {
      categories['Cool Weather Crops'] += crop.suitabilityScore || 0;
    } else if (maxTemp < 24) {
      categories['Moderate Weather Crops'] += crop.suitabilityScore || 0;
    } else if (maxTemp < 30) {
      categories['Warm Weather Crops'] += crop.suitabilityScore || 0;
    } else {
      categories['Heat-Tolerant Crops'] += crop.suitabilityScore || 0;
    }
  });
  
  return categories;
}