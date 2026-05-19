import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { improveWithAI } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text, context } = await request.json();

    if (!text || !context) {
      return NextResponse.json(
        { error: "Missing text or context" },
        { status: 400 }
      );
    }

    const result = await improveWithAI({ text, context });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error improving text:", error);
    return NextResponse.json(
      { error: "Failed to improve text" },
      { status: 500 }
    );
  }
}
