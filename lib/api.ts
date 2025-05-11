import OpenAI from "openai";
import { LearningModule, ModuleContent, QuestionnaireResponse } from "./types";

// Initialize OpenAI client with OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "",
    "X-Title": "Rural Digital Transformation",
  },
});

// Function to generate learning modules based on questionnaire responses
export async function generateLearningModules(
  responses: QuestionnaireResponse
): Promise<LearningModule[]> {
  try {
    const userContext = formatResponsesForLLM(responses);

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-maverick:free",
      messages: [
        {
          role: "system",
          content: `You are an agricultural and rural development expert. Your task is to analyze a rural user's questionnaire responses and recommend personalized learning modules. 
          Return ONLY a JSON array of learning modules with the fields: id, title, description, tags, difficulty, estimatedTime. 
          Focus on practical knowledge that can improve agricultural practices, financial literacy, or rural business setup.
          Limit to 5-7 most relevant modules based on their needs.`,
        },
        {
          role: "user",
          content: `Based on these questionnaire responses, generate appropriate learning modules: ${userContext}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = completion.choices[0].message.content;
    if (!result) throw new Error("Failed to generate learning modules");

    // Parse the JSON response
    try {
      const parsedResult = JSON.parse(result);
      return parsedResult.modules || [];
    } catch (e) {
      console.error("Failed to parse LLM response:", e);
      throw new Error("Failed to parse learning modules from LLM");
    }
  } catch (error) {
    console.error("Error generating learning modules:", error);
    throw error;
  }
}

// Function to get detailed content for a specific module
export async function getModuleContent(
  moduleId: string,
  moduleTitle: string
): Promise<ModuleContent> {
  try {
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-maverick:free",
      messages: [
        {
          role: "system",
          content: `You are an agricultural and rural development expert. Generate detailed content for a learning module.
          Return a JSON object with fields: title, introduction, sections (array with title, content, imageDescription), conclusion, and resources.
          Make the content educational, practical, and accessible for rural users with varying literacy levels.
          Use simple language and focus on actionable knowledge.`,
        },
        {
          role: "user",
          content: `Create detailed content for the learning module titled: "${moduleTitle}". Include practical examples, step-by-step instructions where applicable, and suggestions for implementation in a rural setting.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = completion.choices[0].message.content;
    if (!result) throw new Error("Failed to generate module content");

    // Parse the JSON response
    try {
      const content = JSON.parse(result);

      // Process the content to add appropriate image URLs based on descriptions
      content.sections = content.sections.map((section: any) => {
        if (section.imageDescription) {
          section.imageUrl = generateImageUrl(section.imageDescription);
          delete section.imageDescription;
        }
        return section;
      });

      return content;
    } catch (e) {
      console.error("Failed to parse module content:", e);
      throw new Error("Failed to parse module content from LLM");
    }
  } catch (error) {
    console.error("Error generating module content:", error);
    throw error;
  }
}

// Helper function to format questionnaire responses for the LLM
function formatResponsesForLLM(responses: QuestionnaireResponse): string {
  let formattedResponses = "";

  for (const [key, value] of Object.entries(responses)) {
    formattedResponses += `${key}: ${
      Array.isArray(value) ? value.join(", ") : value
    }\n`;
  }

  return formattedResponses;
}

// Helper function to generate a relevant image URL based on description
function generateImageUrl(description: string): string {
  // In a real application, you might use an image generation API or a curated database
  // For this example, we'll use Pexels images related to agriculture and rural settings
  const agricultureImages = [
    "https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg", // Farmer in field
    "https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg", // Tractor in field
    "https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg", // Rural landscape
    "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg", // Crops
    "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg", // Farmer
    "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg", // Rural community
    "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg", // Irrigation system
    "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg", // Farmer with tools
  ];

  // Simple hash function to deterministically select an image based on the description
  const hash = description.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);

  return agricultureImages[hash % agricultureImages.length];
}
