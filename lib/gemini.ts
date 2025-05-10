import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export async function processVoiceInput(
  text: string,
  targetLanguage: string = "en"
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Act as a helpful agricultural advisor conducting an assessment interview.
      The following is a voice input from a farmer in their local language.
      Please:
      1. Translate it to English if needed
      2. Extract relevant information about their farming practices
      3. Format the response in a natural, conversational way
      4. Suggest relevant follow-up questions

      Input: ${text}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error processing voice input:", error);
    throw error;
  }
}

export async function generateResponse(context: string, language: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a helpful agricultural advisor speaking to a farmer in their preferred language (${language}).
      Based on the conversation context, generate a natural, empathetic response that:
      1. Acknowledges their input
      2. Shows understanding of their situation
      3. Asks relevant follow-up questions
      4. Provides immediate helpful suggestions if applicable

      Context: ${context}

      Generate the response in the specified language: ${language}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}
