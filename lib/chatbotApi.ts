import { ChatMessage } from './types';

// For a production app, this would be an environment variable
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = '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';

/**
 * Gets the user's current location
 */
export async function getUserLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => {
        console.error('Error getting location:', error);
        reject(error);
      }
    );
  });
}

/**
 * Fetches weather data for the given coordinates
 */
export async function getWeatherData(latitude: number, longitude: number): Promise<any> {
  // Use your existing weather API implementation or a third-party service
  // This is a placeholder - replace with your actual weather API call
  const WEATHER_API_URL = 'https://api.weatherapi.com/v1/forecast.json';
  const WEATHER_API_KEY = 'YOUR_WEATHER_API_KEY'; // Replace with your actual Weather API key
  
  try {
    const response = await fetch(
      `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&days=7&aqi=no&alerts=no`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

/**
 * Sends a message to the chatbot and gets a response
 */
export async function getChatbotResponse(
  messages: ChatMessage[],
  weatherData?: any
): Promise<string> {
  try {
    // Get weather data if not provided
    let currentWeatherData = weatherData;
    if (!currentWeatherData) {
      try {
        const { latitude, longitude } = await getUserLocation();
        currentWeatherData = await getWeatherData(latitude, longitude);
      } catch (error) {
        console.warn('Could not get weather data:', error);
        // Continue without weather data
      }
    }

    // Structure the messages for the API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Add system message with weather data if available
    if (currentWeatherData) {
      formattedMessages.unshift({
        role: 'system',
        content: `You are a helpful agricultural assistant. The current weather data is: 
          Location: ${currentWeatherData.location.name}, ${currentWeatherData.location.region}, ${currentWeatherData.location.country}
          Current temperature: ${currentWeatherData.current.temp_c}°C
          Humidity: ${currentWeatherData.current.humidity}%
          Precipitation: ${currentWeatherData.current.precip_mm}mm
          Condition: ${currentWeatherData.current.condition.text}
          Forecast: ${JSON.stringify(currentWeatherData.forecast.forecastday.map((day: any) => ({
            date: day.date,
            maxTemp: day.day.maxtemp_c,
            minTemp: day.day.mintemp_c,
            precipitation: day.day.totalprecip_mm,
            humidity: day.day.avghumidity,
            chanceOfRain: day.day.daily_chance_of_rain,
            condition: day.day.condition.text
          })))}
          
          Provide helpful advice about suitable crops based on this weather data when asked.`
      });
    }

    // Make the actual API call to OpenRouter with Phi-4
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.origin, // Optional. Site URL for rankings on openrouter.ai
        'X-Title': 'Agricultural Assistant', // Optional. Site title for rankings on openrouter.ai
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "microsoft/phi-4-reasoning:free",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get chatbot response');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    throw error;
  }
}