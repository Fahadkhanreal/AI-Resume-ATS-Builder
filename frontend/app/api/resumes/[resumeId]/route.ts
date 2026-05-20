import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { updateResumeSchema } from "@/lib/schemas/resume";
import { ApiErrors } from "@/lib/errors/api-error";
import { handleApiError, successResponse } from "@/lib/errors/handlers";
import { checkAPIRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(
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

    return successResponse(resume);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const user = await getCurrentUser();
    const limit = await checkAPIRateLimit(user.id);
    if (!limit.success) throw ApiErrors.tooManyRequests();

    const { resumeId } = await params;
    const body = await request.json();

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) {
      throw ApiErrors.notFound("Resume");
    }

    if (resume.userId !== user.id) {
      throw ApiErrors.forbidden();
    }

    const validatedData = updateResumeSchema.parse(body);
    const updateData: Prisma.ResumeUpdateInput = {
      ...validatedData,
      data: validatedData.data as Prisma.InputJsonValue | undefined,
    };

    const updated = await prisma.resume.update({
      where: { id: resumeId },
      data: updateData,
    });

    return successResponse(updated);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const user = await getCurrentUser();
    const limit = await checkAPIRateLimit(user.id);
    if (!limit.success) throw ApiErrors.tooManyRequests();

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

    await prisma.resume.delete({
      where: { id: resumeId },
    });

    return successResponse({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
