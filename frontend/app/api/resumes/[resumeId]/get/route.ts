import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApiErrors } from "@/lib/errors/api-error";
import { handleApiError, successResponse } from "@/lib/errors/handlers";
import { ResumeData } from "@/types/resume";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const user = await getCurrentUser();
    const { resumeId } = await params;
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });

    if (!resume) throw ApiErrors.notFound("Resume");
    if (resume.userId !== user.id) throw ApiErrors.forbidden();

    const data = resume.data as ResumeData;

    return successResponse({
      id: resume.id,
      userId: resume.userId,
      title: resume.title,
      template: resume.templateId,
      templateId: resume.templateId,
      personalInfo: data.personalInfo ?? {},
      summary: data.personalInfo?.summary ?? "",
      experience: data.experience ?? [],
      education: data.education ?? [],
      skills: data.skills ?? [],
      projects: data.projects ?? [],
      certifications: data.certifications ?? [],
      data,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
      atsScore: resume.atsScore ?? 0,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
