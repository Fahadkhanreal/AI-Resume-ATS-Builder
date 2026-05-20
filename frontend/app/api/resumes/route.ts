import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createResumeSchema } from "@/lib/schemas/resume";
import { handleApiError, successResponse } from "@/lib/errors/handlers";
import { getDefaultResumeData } from "@/lib/resume-utils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    const resumes = await prisma.resume.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        title: true,
        templateId: true,
        atsScore: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(resumes);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();

    const validatedData = createResumeSchema.parse(body);

    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
        title: validatedData.title,
        templateId: validatedData.templateId,
        data: getDefaultResumeData() as object,
      },
    });

    return successResponse(resume, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
