import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_KEY!);

export async function POST(req: NextRequest) {
  const { messages, language } = await req.json();

  /* Gemini chat expects: [{role:"user"| "model", parts:[{text:"…"}]}] */
  const geminiMessages = (messages as { role: string; content: string }[]).map(
    (m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })
  );

  // Pick Gemini 2.0 Flash Lite
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
  const chat = model.startChat({ history: geminiMessages });

  const result = await chat.sendMessage(
    "Respond in " + language + " if possible."
  );
  const text = result.response.text();

  return NextResponse.json({ assistant: text });
}
