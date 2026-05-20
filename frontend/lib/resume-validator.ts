import { ResumeData } from "@/types/resume";

export interface ResumeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateResume(data: ResumeData): ResumeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data.personalInfo) {
    errors.push("Personal information section is required");
  } else {
    if (!data.personalInfo.fullName) warnings.push("Full name is missing");
    if (!data.personalInfo.email) warnings.push("Email is missing");
    if (!data.personalInfo.summary) warnings.push("Professional summary is missing");
  }

  if (!Array.isArray(data.experience)) {
    errors.push("Experience must be an array");
  }

  if (!Array.isArray(data.education)) {
    errors.push("Education must be an array");
  }

  if (!Array.isArray(data.skills)) {
    errors.push("Skills must be an array");
  } else if (data.skills.length === 0) {
    warnings.push("Skills section is empty");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function hasMinimumResumeContent(data: ResumeData): boolean {
  return Boolean(
    data.personalInfo?.fullName &&
      data.personalInfo?.email &&
      data.personalInfo?.summary &&
      data.skills?.length
  );
}
