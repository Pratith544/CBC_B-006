import OpenAI from "openai";

// This is a placeholder that would normally use the actual OpenRouter API key
// In a production app, this would be stored in environment variables
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "demo";

// Create OpenAI (OpenRouter) instance
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://krishimarket.example.com",
    "X-Title": "KrishiMarket",
  },
  dangerouslyAllowBrowser: true,
});

// Function to ask questions to the AI
export async function askAI(
  question: string,
  commodityId: string,
  commodityName: string
): Promise<string> {
  try {
    // In a real implementation, this would call the actual OpenRouter API

    // For the demo, we'll simulate responses without making actual API calls
    // This allows the app to work without requiring API keys

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate a contextual response based on the commodity and question
    return generateMockResponse(question, commodityId, commodityName);

    /* This would be the actual implementation in a production app
    
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-maverick:free",
      messages: [
        {
          role: "system",
          content: `You are an agricultural expert specializing in Indian farming, crops, and markets. 
                   You provide helpful, accurate information about ${commodityName} and other agricultural topics.
                   Keep responses concise, practical, and focused on helping farmers make better decisions.`
        },
        {
          role: "user",
          content: question
        }
      ],
    });

    return completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
    */
  } catch (error) {
    console.error("Error calling AI service:", error);
    return "I apologize, but I'm having trouble connecting to the AI service right now. Please try again later.";
  }
}

// Function to generate mock responses for demo purposes
function generateMockResponse(
  question: string,
  commodityId: string,
  commodityName: string
): string {
  // Convert question to lowercase for easier matching
  const q = question.toLowerCase();

  // Check for price-related questions
  if (
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("worth") ||
    q.includes("value")
  ) {
    if (commodityId === "rice") {
      return `The current market price for ${commodityName} is around ₹2,250 per quintal, which represents a 2.5% increase over the last month. This price increase is primarily driven by lower production estimates and strong export demand. Government procurement is also supporting prices at current levels.`;
    } else if (commodityId === "wheat") {
      return `${commodityName} is currently trading at approximately ₹1,960 per quintal, which is about 1.2% lower than last month. This slight decrease is due to adequate domestic supply and some pressure from international markets. The Minimum Support Price (MSP) is providing a floor, preventing further significant drops.`;
    } else {
      return `The current market price for ${commodityName} is approximately ₹2,000 per quintal. Prices have been relatively stable with minor fluctuations based on seasonal factors and regional demand variations. It's always good to check with your local mandi for the most accurate prices in your area.`;
    }
  }

  // Check for timing/when to sell questions
  else if (q.includes("when") && (q.includes("sell") || q.includes("market"))) {
    if (commodityId === "rice") {
      return `For ${commodityName}, the optimal selling period typically comes 2-3 months after the harvest season when initial market glut subsides. Based on current trends, prices may increase further in the next 1-2 months as stocks diminish and export demand remains strong. However, if you need immediate cash flow, current prices are already above average compared to last year.`;
    } else if (commodityId === "wheat") {
      return `The best time to sell ${commodityName} is usually within 1-2 months after harvest if you're not targeting government procurement. Current prices are slightly lower than last month, and the forecast suggests stable prices in the coming period. If you can store properly, you might wait for potential small increases when private trader buying picks up after the government procurement window ends.`;
    } else {
      return `The ideal time to sell ${commodityName} depends on several factors including your storage capacity, cash flow needs, and local market dynamics. Generally, prices tend to be lower immediately after harvest due to increased supply. Consider monitoring price trends and selling when you observe an upward movement, typically 1-3 months after peak harvest season.`;
    }
  }

  // Check for cultivation/growing questions
  else if (
    q.includes("grow") ||
    q.includes("cultivat") ||
    q.includes("farm") ||
    q.includes("produc")
  ) {
    if (commodityId === "rice") {
      return `For optimal ${commodityName} cultivation, ensure proper water management with 5-7 cm standing water during critical growth stages. Use appropriate varieties for your region - basmati types for northern regions and short/medium duration varieties for other areas. Transplant 25-30 day old seedlings with 2-3 seedlings per hill. Apply balanced fertilization with emphasis on nitrogen during vegetative stage. Monitor for pests like stem borer and diseases like blast, implementing integrated pest management practices.`;
    } else if (commodityId === "wheat") {
      return `For successful ${commodityName} cultivation, sow at the optimal time (early November in North India) to avoid temperature extremes during flowering. Use certified seeds of varieties recommended for your region at 100 kg/ha seeding rate. Apply balanced fertilization with proper nitrogen splitting (50% as basal, 25% at first irrigation, 25% at second irrigation). Ensure timely irrigation, especially at crown root initiation, tillering, flowering, and grain filling stages. Monitor for yellow rust and aphids which can significantly reduce yields.`;
    } else {
      return `For effective ${commodityName} cultivation, first select varieties suitable for your local climate and soil conditions. Prepare the land thoroughly and ensure proper seed treatment before sowing. Follow recommended spacing, fertilization schedules, and irrigation practices specific to ${commodityName}. Implement integrated pest management to control major pests and diseases. Harvest at the appropriate maturity stage to maximize both yield and quality.`;
    }
  }

  // Check for market forecast or trend questions
  else if (
    q.includes("forecast") ||
    q.includes("predict") ||
    q.includes("future") ||
    q.includes("trend")
  ) {
    if (commodityId === "rice") {
      return `The market forecast for ${commodityName} suggests a bullish trend with prices expected to increase by 3-5% over the next two months, reaching approximately ₹2,320-₹2,380 per quintal. This projection is based on lower production estimates, strong export demand, and reduced carryover stocks. Government procurement policies are also supporting the price floor. However, the arrival of the next crop could introduce price corrections, so timing remains important for maximizing returns.`;
    } else if (commodityId === "wheat") {
      return `The market outlook for ${commodityName} indicates stable prices with only minor fluctuations expected in the coming months, likely staying within the range of ₹1,940-₹2,000 per quintal. While domestic production has been adequate, international wheat prices could influence export competitiveness. The government's procurement at MSP provides a reliable price floor. Weather conditions for the upcoming crop season will be a significant factor to monitor for potential price movements in the longer term.`;
    } else {
      return `The market forecast for ${commodityName} suggests relatively stable prices in the near term, with potential for modest increases of 1-3% if current demand patterns continue. Key factors to watch include weather conditions affecting the next planting season, government policy announcements, and international market trends. Regional variations in price movements are likely, so connecting with traders in major markets could provide more specific insights for your location.`;
    }
  }

  // Default response for other questions
  else {
    return `Thank you for your question about ${commodityName}. To provide the most helpful information, could you be a bit more specific about what aspect of ${commodityName} you're interested in? I can offer insights on current market prices, cultivation practices, storage techniques, or market forecasts. Feel free to ask a more detailed question.`;
  }
}
