import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title } = await request.json();

    // TODO: Create resume in database
    const newResume = {
      id: `resume_${Date.now()}`,
      userId,
      title: title || "New Resume",
      template: "modern",
      sections: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    console.error("Error creating resume:", error);
    return NextResponse.json(
      { error: "Failed to create resume" },
      { status: 500 }
    );
  }
}
