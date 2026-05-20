import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateResumePdf } from "@/lib/pdf/generator";
import { ApiErrors } from "@/lib/errors/api-error";
import { handleApiError } from "@/lib/errors/handlers";
import { ResumeData } from "@/types/resume";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const user = await getCurrentUser();
    const { resumeId } = await params;
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });

    if (!resume) throw ApiErrors.notFound("Resume");
    if (resume.userId !== user.id) throw ApiErrors.forbidden();

    const pdf = await generateResumePdf(resume.data as ResumeData, resume.title);

    await prisma.resume.update({
      where: { id: resumeId },
      data: { lastDownloaded: new Date() },
    });

    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${resume.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.pdf"`,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
