import { getEffectiveGeminiApiKey } from "@/lib/ai/gemini";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const key = getEffectiveGeminiApiKey() || "";

  return NextResponse.json({
    hasKey: key.length > 0,
    length: key.length,
    startsWithAIza: key.startsWith("AIza"),
    first8: key.slice(0, 8),
    last4: key.slice(-4),
    hasReplace: /REPLACE|placeholder|your/i.test(key),
  });
}
