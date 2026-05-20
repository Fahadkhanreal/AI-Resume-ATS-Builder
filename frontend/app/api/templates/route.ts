import { resumeTemplates } from "@/lib/templates";
import { successResponse } from "@/lib/errors/handlers";

export const dynamic = "force-dynamic";

export async function GET() {
  return successResponse(resumeTemplates);
}
