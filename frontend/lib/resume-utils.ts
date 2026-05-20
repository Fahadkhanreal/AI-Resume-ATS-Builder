import { ResumeData } from "@/types/resume";

export function getDefaultResumeData(): ResumeData {
  return {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: [],
    projects: [],
  };
}

export function sanitizeResumeData(data: any): ResumeData {
  return {
    personalInfo: {
      fullName: data?.personalInfo?.fullName || "",
      email: data?.personalInfo?.email || "",
      phone: data?.personalInfo?.phone || "",
      location: data?.personalInfo?.location || "",
      summary: data?.personalInfo?.summary || "",
    },
    experience: Array.isArray(data?.experience) ? data.experience : [],
    education: Array.isArray(data?.education) ? data.education : [],
    skills: Array.isArray(data?.skills) ? data.skills : [],
    certifications: Array.isArray(data?.certifications) ? data.certifications : [],
    languages: Array.isArray(data?.languages) ? data.languages : [],
    projects: Array.isArray(data?.projects) ? data.projects : [],
  };
}

export function validateResumeData(data: any): boolean {
  if (!data || typeof data !== "object") return false;
  if (data.personalInfo && typeof data.personalInfo !== "object") return false;
  if (!Array.isArray(data.experience)) return false;
  if (!Array.isArray(data.education)) return false;
  if (!Array.isArray(data.skills)) return false;
  return true;
}

export function getResumeText(data: ResumeData): string {
  const lines: string[] = [];

  if (data.personalInfo?.fullName) {
    lines.push(data.personalInfo.fullName);
  }
  if (data.personalInfo?.email) {
    lines.push(data.personalInfo.email);
  }
  if (data.personalInfo?.phone) {
    lines.push(data.personalInfo.phone);
  }
  if (data.personalInfo?.summary) {
    lines.push(data.personalInfo.summary);
  }

  data.experience?.forEach((exp) => {
    if (exp.company) lines.push(exp.company);
    if ((exp as any).jobTitle) lines.push((exp as any).jobTitle);
    if (exp.position) lines.push(exp.position);
    if (exp.description) lines.push(exp.description);
    if (Array.isArray((exp as any).bullets)) lines.push((exp as any).bullets.join(" "));
  });

  data.education?.forEach((edu) => {
    if (edu.school) lines.push(edu.school);
    if (edu.degree) lines.push(edu.degree);
    if (edu.field) lines.push(edu.field);
  });

  if (data.skills) {
    lines.push(data.skills.join(" "));
  }

  return lines.join(" ");
}
