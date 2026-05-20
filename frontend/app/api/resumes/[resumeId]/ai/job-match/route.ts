import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { analyzeJobMatch } from "@/lib/job-match/analyzer";
import { jobMatchSchema } from "@/lib/schemas/ai";
import { checkAIRateLimit } from "@/lib/rate-limit";
import { ApiErrors } from "@/lib/errors/api-error";
import { handleApiError, successResponse } from "@/lib/errors/handlers";
import { ResumeData } from "@/types/resume";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const user = await getCurrentUser();
    const { resumeId } = await params;
    const limit = await checkAIRateLimit(user.id);

    if (!limit.success) {
      throw ApiErrors.tooManyRequests();
    }

    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    if (!resume) throw ApiErrors.notFound("Resume");
    if (resume.userId !== user.id) throw ApiErrors.forbidden();

    const body = jobMatchSchema.parse(await req.json());
    const result = analyzeJobMatch(
      body.resumeData as ResumeData,
      body.jobDescription
    );

    return successResponse(result);
  } catch (error) {
    return handleApiError(error);
  }
}
