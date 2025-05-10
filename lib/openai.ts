import OpenAI from "openai";

// Create OpenAI client with OpenRouter configuration
export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "REPLACE_WITH_YOUR_KEY",
  defaultHeaders: {
    "HTTP-Referer":
      process.env.NEXT_PUBLIC_SITE_URL || "https://rural-empowerment.com",
    "X-Title": "Rural Digital Empowerment",
  },
  dangerouslyAllowBrowser: true,
});

// Function to get cropping recommendations based on farmer data
export async function getCroppingRecommendations(farmerData: any) {
  try {
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-maverick:free",
      messages: [
        {
          role: "system",
          content: `You are an agricultural expert providing farming recommendations. 
          Analyze the provided farmer data and return a JSON response with:
          1. Recommended crops (primary and secondary choices)
          2. Explanation of why these crops are suitable
          3. Resource optimization strategies 
          4. Advanced farming techniques that would benefit this specific case
          5. Expected yield estimates for each recommended crop
          
          Your response must be valid JSON with these fields:
          {
            "recommendedCrops": [{"name": string, "type": "primary"|"secondary", "seasonality": string, "waterRequirements": string, "expectedYield": string, "marketValue": string}],
            "soilAnalysis": {"type": string, "ph": number, "fertility": string, "improvement": string},
            "explanations": {"primary": string, "secondary": string},
            "resourceOptimization": [{"title": string, "description": string}],
            "advancedTechniques": [{"title": string, "description": string, "difficulty": string, "resourcesRequired": string}],
            "yieldEstimates": [{"crop": string, "lowEstimate": string, "highEstimate": string, "factors": string}]
          }`,
        },
        {
          role: "user",
          content: JSON.stringify(farmerData),
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(completion.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw new Error("Failed to get recommendations");
  }
}
