// Resume Types
export interface Resume {
  id: string;
  userId: string;
  title: string;
  template: string;
  sections: Section[];
  personalInfo?: PersonalInfo;
  summary?: string;
  experience?: ExperienceEntry[];
  education?: EducationEntry[];
  skills?: string[];
  projects?: ProjectEntry[];
  certifications?: CertificationEntry[];
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
  sectionId?: string;
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
  photoUrl?: string;
}

export interface ExperienceEntry extends Entry {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
  bullets: string[];
}

export interface EducationEntry extends Entry {
  school: string;
  degree: string;
  field: string;
  graduationYear: string;
  description?: string;
}

export interface SkillEntry extends Entry {
  name: string;
  proficiency?: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface ProjectEntry extends Entry {
  name: string;
  description: string;
  link?: string;
  technologies?: string[];
}

export interface CertificationEntry extends Entry {
  name: string;
  issuer: string;
  issueDate?: string;
  expiryDate?: string;
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
