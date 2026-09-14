import { GoogleGenerativeAI } from "@google/generative-ai";

export function getEffectiveGeminiApiKey() {
  return (process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY)
    ?.trim()
    .replace(/^['"]|['"]$/g, "");
}

function getGeminiModel() {
  const apiKey = getEffectiveGeminiApiKey();

  if (!apiKey || apiKey.includes("REPLACE_WITH")) {
    throw new Error("GOOGLE_API_KEY is not configured");
  }

  if (!apiKey.startsWith("AIza")) {
    throw new Error("GOOGLE_API_KEY format is invalid. Use a Google AI Studio API key that starts with AIza.");
  }

  return new GoogleGenerativeAI(apiKey).getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.4,
    },
  });
}

export async function generateJsonResponse<T>(prompt: string): Promise<T> {
  const result = await getGeminiModel().generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text) as T;
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Gemini returned an invalid JSON response");
    }
    return JSON.parse(jsonMatch[0]) as T;
  }
}
