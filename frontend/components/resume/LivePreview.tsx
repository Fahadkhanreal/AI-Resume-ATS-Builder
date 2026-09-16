"use client";

import { Resume } from "@/types";
import { useResumeStore } from "@/lib/store/resume.store";
import { getResumeTemplate, SharedResumeTemplate } from "./templates";

export default function LivePreview() {
  const resume = useResumeStore((state) => state.currentResume);

  if (!resume) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No resume data</p>
      </div>
    );
  }

  const data = (resume as any).data ?? {};
  const personalInfo = resume.personalInfo ?? data.personalInfo ?? {};
  const previewResume = {
    ...resume,
    personalInfo,
    summary: resume.summary ?? personalInfo.summary ?? data.personalInfo?.summary ?? "",
    experience: resume.experience ?? data.experience ?? [],
    education: resume.education ?? data.education ?? [],
    skills: resume.skills ?? data.skills ?? [],
    projects: resume.projects ?? data.projects ?? [],
    certifications: resume.certifications ?? data.certifications ?? [],
  } as Resume;
  const templateId = ((previewResume as any).templateId || previewResume.template || "modern") as string;
  const template = getResumeTemplate(templateId);

  return <SharedResumeTemplate resume={previewResume} config={template} />;
}

