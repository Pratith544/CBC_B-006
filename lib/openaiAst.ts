import OpenAI from "openai";

// In production, use environment variables for API keys
// Replace "YOUR_OPENROUTER_API_KEY" with your actual key in .env.local
const OPENROUTER_API_KEY =
  process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ||
  "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";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "localhost:3001";
const SITE_NAME = "Rural Digital Empowerment Assistant";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": SITE_URL,
    "X-Title": SITE_NAME,
  },
  dangerouslyAllowBrowser: true,
});

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function getCompletion(messages: ChatMessage[]) {
  try {
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-maverick:free",
      messages: messages,
    });

    return {
      content: completion.choices[0].message.content || "",
      success: true,
    };
  } catch (error) {
    console.error("Error getting completion:", error);
    return {
      content:
        "I'm sorry, I couldn't process your request. Please try again later.",
      success: false,
    };
  }
}

// System prompt focused on rural empowerment and assistance
export const RURAL_EMPOWERMENT_SYSTEM_PROMPT = `
You are an assistant for rural communities in India, specializing in digital empowerment, 
financial literacy, and government schemes. Help users by:

1. Providing clear, simple explanations about financial concepts
2. Guiding them through application processes for government schemes
3. Offering practical advice for rural entrepreneurs
4. Suggesting relevant resources for agricultural improvements
5. Explaining digital tools and technologies in simple terms

Always be respectful, patient, and consider the unique challenges of rural communities.
Avoid using complex jargon, and when you must, explain terms clearly.
`;
