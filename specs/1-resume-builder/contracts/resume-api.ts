/**
 * Resume API Contracts
 * All endpoints require authentication (Clerk)
 * All responses follow standard format: { success: boolean; data?: T; error?: string; code?: string }
 */

// ============================================================================
// POST /api/resumes - Create New Resume
// ============================================================================

export interface CreateResumeRequest {
  title: string;
  templateId?: string; // default: "modern"
}

export interface CreateResumeResponse {
  success: true;
  data: {
    id: string;
    userId: string;
    title: string;
    templateId: string;
    atsScore: number;
    isPublic: boolean;
    data: ResumeData;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CreateResumeError {
  success: false;
  error: string;
  code: "VALIDATION_ERROR" | "UNAUTHORIZED" | "INTERNAL_ERROR";
}

// ============================================================================
// GET /api/resumes - List All User Resumes
// ============================================================================

export interface ListResumesRequest {
  page?: number; // default: 1
  limit?: number; // default: 10, max: 50
}

export interface ListResumesResponse {
  success: true;
  data: Array<{
    id: string;
    userId: string;
    title: string;
    templateId: string;
    atsScore: number | null;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ListResumesError {
  success: false;
  error: string;
  code: "UNAUTHORIZED" | "INTERNAL_ERROR";
}

// ============================================================================
// GET /api/resumes/[id] - Get Single Resume
// ============================================================================

export interface GetResumeResponse {
  success: true;
  data: {
    id: string;
    userId: string;
    title: string;
    templateId: string;
    atsScore: number | null;
    isPublic: boolean;
    data: ResumeData;
    lastDownloaded: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface GetResumeError {
  success: false;
  error: string;
  code: "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "INTERNAL_ERROR";
}

// ============================================================================
// PATCH /api/resumes/[id] - Update Resume
// ============================================================================

export interface UpdateResumeRequest {
  title?: string;
  templateId?: string;
  data?: Partial<ResumeData>;
  isPublic?: boolean;
}

export interface UpdateResumeResponse {
  success: true;
  data: {
    id: string;
    userId: string;
    title: string;
    templateId: string;
    atsScore: number | null;
    isPublic: boolean;
    data: ResumeData;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UpdateResumeError {
  success: false;
  error: string;
  code: "VALIDATION_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "INTERNAL_ERROR";
}

// ============================================================================
// DELETE /api/resumes/[id] - Delete Resume
// ============================================================================

export interface DeleteResumeResponse {
  success: true;
  data: { id: string };
}

export interface DeleteResumeError {
  success: false;
  error: string;
  code: "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "INTERNAL_ERROR";
}

// ============================================================================
// POST /api/resumes/[id]/duplicate - Duplicate Resume
// ============================================================================

export interface DuplicateResumeRequest {
  newTitle?: string; // default: "Copy of {original title}"
}

export interface DuplicateResumeResponse {
  success: true;
  data: {
    id: string;
    userId: string;
    title: string;
    templateId: string;
    atsScore: number;
    isPublic: boolean;
    data: ResumeData;
    createdAt: string;
    updatedAt: string;
  };
}

export interface DuplicateResumeError {
  success: false;
  error: string;
  code: "VALIDATION_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "INTERNAL_ERROR";
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
