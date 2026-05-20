"use client";

import { Resume } from "@/types";
import { useResumeStore } from "@/lib/store/resume.store";
import { getResumeTemplate, SharedResumeTemplate } from "./templates";

function hasObjectContent(value: any) {
  return value && Object.values(value).some((field) => {
    if (Array.isArray(field)) return field.length > 0;
    return field !== undefined && field !== null && field !== "";
  });
}

function preferFilledArray(primary: any, fallback: any) {
  return Array.isArray(primary) && primary.length > 0 ? primary : fallback ?? [];
}

function preferFilledObject(primary: any, fallback: any) {
  return hasObjectContent(primary) ? primary : fallback ?? {};
}

function withoutEmptyValues(value: any) {
  return Object.fromEntries(
    Object.entries(value ?? {}).filter(
      ([, field]) => field !== undefined && field !== null && field !== ""
    )
  );
}

function mergePersonalInfo(primary: any, fallback: any) {
  return {
    ...withoutEmptyValues(fallback),
    ...withoutEmptyValues(primary),
  };
}

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
  const personalInfo = mergePersonalInfo(resume.personalInfo, data.personalInfo);
  const previewResume = {
    ...resume,
    personalInfo,
    summary: resume.summary || (personalInfo as any).summary || data.personalInfo?.summary || "",
    experience: preferFilledArray(resume.experience, data.experience),
    education: preferFilledArray(resume.education, data.education),
    skills: preferFilledArray(resume.skills, data.skills),
    projects: preferFilledArray(resume.projects, data.projects),
    certifications: preferFilledArray(resume.certifications, data.certifications),
  } as Resume;
  const templateId = ((previewResume as any).templateId || previewResume.template || "modern") as string;
  const template = getResumeTemplate(templateId);

  return <SharedResumeTemplate resume={previewResume} config={template} />;
}
