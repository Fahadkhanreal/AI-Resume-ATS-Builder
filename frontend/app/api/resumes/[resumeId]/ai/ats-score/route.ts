import { connection, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calculateATSScore } from "@/lib/ats/scorer";
import { atsScoreSchema } from "@/lib/schemas/ai";
import { ApiErrors } from "@/lib/errors/api-error";
import { handleApiError, successResponse } from "@/lib/errors/handlers";
import { ResumeData } from "@/types/resume";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    await connection();
    const user = await getCurrentUser();
    const { resumeId } = await params;
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });

    if (!resume) throw ApiErrors.notFound("Resume");
    if (resume.userId !== user.id) throw ApiErrors.forbidden();

    const body = atsScoreSchema.parse(await req.json());
    const result = calculateATSScore(
      body.resumeData as ResumeData,
      body.jobDescription
    );

    await prisma.resume.update({
      where: { id: resumeId },
      data: { atsScore: result.score },
    });

    return successResponse(result);
  } catch (error) {
    return handleApiError(error);
  }
}
