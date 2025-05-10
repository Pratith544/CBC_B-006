import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_KEY!);

// Your questionnaire definition here (IDs + text)
const QUESTIONS = [
  {
    id: "name",
    text: "What is your name?",
    type: "text",
    category: "personal",
    required: true,
  },
  {
    id: "age",
    text: "What is your age?",
    type: "text",
    category: "personal",
    required: true,
  },
  {
    id: "location",
    text: "Where do you live? (Village, District, State)",
    type: "text",
    category: "personal",
    required: true,
  },
  {
    id: "farmingExperience",
    text: "How many years of farming experience do you have?",
    type: "text",
    category: "agriculture",
    required: true,
  },
  {
    id: "cropTypes",
    text: "What crops do you currently grow?",
    type: "multiselect",
    options: [
      "Rice",
      "Wheat",
      "Corn",
      "Pulses",
      "Vegetables",
      "Fruits",
      "Cotton",
      "Other",
    ],
    category: "agriculture",
    required: true,
  },
  {
    id: "landSize",
    text: "How much land do you farm (in acres)?",
    type: "text",
    category: "agriculture",
    required: true,
  },
  {
    id: "challenges",
    text: "What are your biggest farming challenges?",
    type: "multiselect",
    options: [
      "Water scarcity",
      "Soil health",
      "Pests and diseases",
      "Market access",
      "Finance",
      "Weather unpredictability",
      "Labor shortage",
      "Technology adoption",
    ],
    category: "agriculture",
    required: true,
  },
  {
    id: "financialLiteracy",
    text: "How would you rate your understanding of financial matters?",
    type: "radio",
    options: ["Beginner", "Some knowledge", "Moderate", "Advanced"],
    category: "financial",
    required: true,
  },
  {
    id: "deviceAccess",
    text: "Which devices do you have access to?",
    type: "multiselect",
    options: ["Basic phone", "Smartphone", "Computer/Laptop", "Tablet", "None"],
    category: "technical",
    required: true,
  },
  {
    id: "internetAccess",
    text: "How reliable is your internet connection?",
    type: "radio",
    options: ["No access", "Poor", "Moderate", "Good", "Excellent"],
    category: "technical",
    required: true,
  },
  {
    id: "learningInterests",
    text: "What topics are you most interested in learning about?",
    type: "multiselect",
    options: [
      "Sustainable farming practices",
      "Irrigation techniques",
      "Crop diversification",
      "Organic farming",
      "Farm mechanization",
      "Financial management",
      "Market linkages",
      "Rural entrepreneurship",
    ],
    category: "agriculture",
    required: true,
  },
  {
    id: "preferredLearningMethod",
    text: "How do you prefer to learn new information?",
    type: "multiselect",
    options: [
      "Reading",
      "Videos",
      "Hands-on practice",
      "Discussion with experts",
      "Group learning",
    ],
    category: "personal",
    required: true,
  },
];

export async function POST(req: NextRequest) {
  try {
    const { history, language } = (await req.json()) as {
      history: { role: string; content: string }[];
      language: string;
    };

    // On first call, kick things off:
    if (history.length === 0) {
      const firstQ = QUESTIONS[0].text;
      const greeting = language.startsWith("hi")
        ? "नमस्ते! मैं आपका कृषि सहायक हूँ।"
        : "Hello! I am your agriculture assistant.";
      return NextResponse.json({
        assistant: `${greeting} पहला सवाल: ${firstQ}`,
        done: false,
      });
    }

    // Build a system prompt that instructs Gemini to use the selected language
    const system = {
      role: "system",
      content: `
You are an agricultural learning assistant. 
Ask each question in the user's chosen language (${language}), 
wait for their reply in that same language, 
then proceed to the next question. 
After all ${QUESTIONS.length} questions are answered, 
output a JSON object mapping each question id to the user's answer and say "Complete."`.trim(),
    };

    // Map history for Gemini
    const convo = [system, ...history].map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const chat = model.startChat({ history: convo });
    const result = await chat.sendMessage("");
    const assistant = await result.response.text();

    // Try to detect the final JSON
    let done = false;
    let responses: Record<string, string> | undefined;
    if (assistant.includes("Complete.")) {
      const match = assistant.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          responses = JSON.parse(match[0]);
          done = true;
        } catch {}
      }
    }

    return NextResponse.json({ assistant, done, responses });
  } catch (err) {
    console.error("❌ /api/voice-questionnaire error:", err);
    return NextResponse.json(
      { assistant: "इंटरनल सर्वर त्रुटि हुई।", done: true },
      { status: 500 }
    );
  }
}
