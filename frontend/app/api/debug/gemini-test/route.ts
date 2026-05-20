import { NextResponse } from "next/server";
import { generateJsonResponse } from "@/lib/ai/gemini";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await generateJsonResponse<{ ok: boolean }>(
      'Return only this JSON: {"ok":true}'
    );

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown Gemini error",
      },
      { status: 500 }
    );
  }
}
