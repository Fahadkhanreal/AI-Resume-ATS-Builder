import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { generateJsonResponse } from "@/lib/ai/gemini";

const prompts: Record<string, string> = {
  summary:
    "Improve this professional summary to be more compelling and ATS-friendly. Keep it concise in 2-3 sentences.",
  experience:
    "Improve these experience bullet points with action verbs, measurable impact, and ATS-friendly wording.",
  skills:
    "Improve this skills section by organizing and optimizing the wording for ATS relevance.",
  education:
    "Enhance this education entry with relevant professional wording.",
};

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text, context } = await request.json();

    if (!text || !context || !prompts[context]) {
      return NextResponse.json(
        { error: "Missing or invalid text/context" },
        { status: 400 }
      );
    }

    const result = await generateJsonResponse<{
      improved: string;
      suggestions?: string[];
    }>(`${prompts[context]}

Return only valid JSON in this shape:
{"improved":"...","suggestions":["..."]}

Text: ${JSON.stringify(text)}`);

    return NextResponse.json({
      original: text,
      improved: result.improved || text,
      suggestions: result.suggestions || [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to improve text";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
