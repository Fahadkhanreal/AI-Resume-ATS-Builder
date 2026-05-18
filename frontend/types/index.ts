// Resume Types
export interface Resume {
  id: string;
  userId: string;
  title: string;
  template: string;
  sections: Section[];
  createdAt: Date;
  updatedAt: Date;
  atsScore?: number;
}

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  content: string;
  order: number;
  isVisible: boolean;
  entries?: Entry[];
}

export type SectionType =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications";

export interface Entry {
  id: string;
  sectionId: string;
  [key: string]: any;
}

export interface PersonalInfo extends Entry {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface ExperienceEntry extends Entry {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  bulletPoints: string[];
}

export interface EducationEntry extends Entry {
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
  description?: string;
}

export interface SkillEntry extends Entry {
  name: string;
  proficiency?: "beginner" | "intermediate" | "advanced" | "expert";
}

// AI Types
export interface AIImproveRequest {
  type: "summary" | "experience" | "skills";
  content: string;
  context?: string;
}

export interface AIImproveResponse {
  suggestions: string[];
  confidence: number;
}

// ATS Types
export interface ATSScoreRequest {
  resume: Resume;
}

export interface ATSScoreResponse {
  score: number;
  suggestions: ATSSuggestion[];
}

export interface ATSSuggestion {
  category: string;
  message: string;
  severity: "low" | "medium" | "high";
}

// Job Match Types
export interface JobMatchRequest {
  resume: Resume;
  jobDescription: string;
}

export interface JobMatchResponse {
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
}
