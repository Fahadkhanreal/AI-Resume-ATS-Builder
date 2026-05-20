import { GoogleGenerativeAI } from "@google/generative-ai";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

export function getEffectiveGeminiApiKey() {
  return (readLocalGeminiKey() || process.env.GOOGLE_API_KEY)
    ?.trim()
    .replace(/^['"]|['"]$/g, "");
}

function readLocalGeminiKey() {
  const envPath = join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return undefined;

  const line = readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .find((entry) => entry.trim().startsWith("GOOGLE_API_KEY="));

  return line?.split("=").slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
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
