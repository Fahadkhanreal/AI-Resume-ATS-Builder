import { z } from "zod";

export function parseAIJson<T>(text: string, schema: z.ZodSchema<T>): T {
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned);
  return schema.parse(parsed);
}

export function safeParseAIJson<T>(text: string, schema: z.ZodSchema<T>) {
  try {
    return { success: true as const, data: parseAIJson(text, schema) };
  } catch (error) {
    return { success: false as const, error };
  }
}
