import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { resumeId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeId } = params;

    // TODO: Fetch resume from database
    const resume = {
      id: resumeId,
      userId,
      title: "My Resume",
      template: "modern",
      personalInfo: {
        fullName: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
      },
      summary: "",
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(resume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}
