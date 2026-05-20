import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { handleApiError, successResponse } from "@/lib/errors/handlers";

export const dynamic = "force-dynamic";

type ResumeListItem = {
  id: string;
  title: string;
  templateId: string;
  atsScore: number | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function GET() {
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

    const formattedResumes = (resumes as ResumeListItem[]).map((resume, index) => ({
      ...resume,
      displayTitle: `Resume ${index + 1}`,
      title:
        resume.title && !/^New Resume$|^Resume \d+$/i.test(resume.title)
          ? resume.title
          : `Resume ${index + 1}`,
    }));

    return successResponse(formattedResumes);
  } catch (error) {
    return handleApiError(error);
  }
}
