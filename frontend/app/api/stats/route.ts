import { prisma } from "@/lib/db";
import { handleApiError, successResponse } from "@/lib/errors/handlers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [resumesBuilt, activeUsers, atsAggregate] = await Promise.all([
      prisma.resume.count(),
      prisma.user.count(),
      prisma.resume.aggregate({
        _avg: { atsScore: true },
        where: { atsScore: { not: null } },
      }),
    ]);

    return successResponse({
      resumesBuilt,
      activeUsers,
      averageATSScore: Math.round(atsAggregate._avg.atsScore ?? 0),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
