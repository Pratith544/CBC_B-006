import OpenAI from 'openai';
import { CropRecommendation, WeatherImpact } from '../types/agriculture';
import { WeatherData } from '../types/weather';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  defaultHeaders: {
    "HTTP-Referer": window.location.origin,
    "X-Title": "Agricultural Weather Assistant",
  },
    dangerouslyAllowBrowser: true, // Added this flag to enable browser usage

});

export const generateCropRecommendations = async (
  weatherData: WeatherData,
  location: string
): Promise<CropRecommendation[]> => {
  try {
    const prompt = `Based on the following weather data for ${location}:
      - Temperature: ${weatherData.current.temp_c}°C
      - Humidity: ${weatherData.current.humidity}%
      - Rainfall: ${weatherData.current.precip_mm}mm
      - Forecast: ${weatherData.forecast.forecastday.map(day => 
        `${day.date}: High ${day.day.maxtemp_c}°C, Low ${day.day.mintemp_c}°C, Rain ${day.day.totalprecip_mm}mm`
      ).join('; ')}

      Provide crop recommendations in the following JSON format:
      {
        "recommendations": [{
          "cropName": string,
          "confidence": number,
          "plantingTime": string,
          "harvestTime": string,
          "expectedYield": string,
          "requirements": {
            "temperature": string,
            "rainfall": string,
            "humidity": string,
            "soilType": string
          },
          "risks": string[],
          "mitigationStrategies": string[]
        }]
      }`;

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-scout:free",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const response = JSON.parse(completion.choices[0].message.content || "{}");
    return response.recommendations || [];
  } catch (error) {
    console.error('Error generating crop recommendations:', error);
    return [];
  }
};

export const analyzeWeatherImpact = async (
  weatherData: WeatherData,
  crops: string[]
): Promise<WeatherImpact[]> => {
  try {
    const prompt = `Analyze the impact of the following weather conditions on ${crops.join(', ')}:
      - Current Temperature: ${weatherData.current.temp_c}°C
      - Humidity: ${weatherData.current.humidity}%
      - Wind Speed: ${weatherData.current.wind_kph} kph
      - UV Index: ${weatherData.current.uv}
      - Precipitation: ${weatherData.current.precip_mm}mm

      Provide analysis in the following JSON format:
      {
        "impacts": [{
          "severity": "low" | "medium" | "high",
          "impact": string,
          "recommendations": string[]
        }]
      }`;

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-scout:free",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const response = JSON.parse(completion.choices[0].message.content || "{}");
    return response.impacts || [];
  } catch (error) {
    console.error('Error analyzing weather impact:', error);
    return [];
  }
};