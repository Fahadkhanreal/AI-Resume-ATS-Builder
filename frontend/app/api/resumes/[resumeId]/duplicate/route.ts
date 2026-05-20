import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { handleApiError, successResponse } from "@/lib/errors/handlers";
import { ApiErrors } from "@/lib/errors/api-error";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const user = await getCurrentUser();
    const { resumeId } = await params;
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) {
      throw ApiErrors.notFound("Resume");
    }

    if (resume.userId !== user.id) {
      throw ApiErrors.forbidden();
    }

    const duplicated = await prisma.resume.create({
      data: {
        userId: user.id,
        title: `${resume.title} (Copy)`,
        templateId: resume.templateId,
        data: resume.data as object,
      },
    });

    return successResponse(duplicated, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
