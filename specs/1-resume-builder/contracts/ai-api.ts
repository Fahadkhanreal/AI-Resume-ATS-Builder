/**
 * AI Integration API Contracts
 * All endpoints require authentication (Clerk)
 * All endpoints have rate limiting: 10 requests per minute per user
 * All responses follow standard format: { success: boolean; data?: T; error?: string; code?: string }
 */

// ============================================================================
// POST /api/resumes/[id]/ai/summary - Improve Resume Summary
// ============================================================================

export interface ImproveAISummaryRequest {
  currentSummary: string;
  jobDescription?: string; // optional, for context
}

export interface ImproveAISummaryResponse {
  success: true;
  data: {
    suggestions: string[];
    selectedSuggestion?: string;
    score: number; // 0-100, quality score
  };
}

export interface ImproveAISummaryError {
  success: false;
  error: string;
  code: "VALIDATION_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "RATE_LIMIT_EXCEEDED" | "AI_ERROR" | "INTERNAL_ERROR";
}

// ============================================================================
// POST /api/resumes/[id]/ai/experience - Improve Experience Bullets
// ============================================================================

export interface ImproveAIExperienceRequest {
  experienceEntry: {
    company: string;
    position: string;
    description: string;
    bullets: string[];
  };
  jobDescription?: string;
}

export interface ImproveAIExperienceResponse {
  success: true;
  data: {
    improvedBullets: string[];
    suggestions: string[];
    score: number; // 0-100
  };
}

export interface ImproveAIExperienceError {
  success: false;
  error: string;
  code: "VALIDATION_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "RATE_LIMIT_EXCEEDED" | "AI_ERROR" | "INTERNAL_ERROR";
}

// ============================================================================
// POST /api/resumes/[id]/ai/skills - Optimize Skills Section
// ============================================================================

export interface ImproveAISkillsRequest {
  skills: Array<{
    category: string;
    items: string[];
  }>;
  jobDescription?: string;
}

export interface ImproveAISkillsResponse {
  success: true;
  data: {
    optimizedSkills: Array<{
      category: string;
      items: string[];
    }>;
    addedSkills: string[];
    score: number; // 0-100
  };
}

export interface ImproveAISkillsError {
  success: false;
  error: string;
  code: "VALIDATION_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "RATE_LIMIT_EXCEEDED" | "AI_ERROR" | "INTERNAL_ERROR";
}

// ============================================================================
// POST /api/resumes/[id]/ai/ats-score - Calculate ATS Score
// ============================================================================

export interface CalculateATSScoreRequest {
  resume: ResumeData;
  jobDescription?: string;
}

export interface CalculateATSScoreResponse {
  success: true;
  data: {
    atsScore: number; // 0-100
    breakdown: {
      keywords: number; // 0-100
      structure: number; // 0-100
      readability: number; // 0-100
      aiReview: number; // 0-100
    };
    suggestions: string[];
    missingKeywords: string[];
  };
}

export interface CalculateATSScoreError {
  success: false;
  error: string;
  code: "VALIDATION_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "RATE_LIMIT_EXCEEDED" | "AI_ERROR" | "INTERNAL_ERROR";
}

// ============================================================================
// POST /api/resumes/[id]/ai/job-match - Analyze Job Match
// ============================================================================

export interface AnalyzeJobMatchRequest {
  resume: ResumeData;
  jobDescription: string; // required
}

export interface AnalyzeJobMatchResponse {
  success: true;
  data: {
    matchPercentage: number; // 0-100
    matchedKeywords: string[];
    missingKeywords: string[];
    suggestions: string[];
    strengths: string[];
    improvements: string[];
  };
}

export interface AnalyzeJobMatchError {
  success: false;
  error: string;
  code: "VALIDATION_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "RATE_LIMIT_EXCEEDED" | "AI_ERROR" | "INTERNAL_ERROR";
}

// ============================================================================
// Data Types
// ============================================================================

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location?: string;
    summary?: string;
  };
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillEntry[];
  certifications?: CertificationEntry[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  description: string;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
}

export interface SkillEntry {
  id: string;
  category: string;
  items: string[];
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
}
