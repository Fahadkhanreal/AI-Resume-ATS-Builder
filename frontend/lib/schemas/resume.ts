import { z } from "zod";

export const resumeSectionSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export const resumeDataSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().optional(),
    title: z.string().optional(),
    email: z.string().email().or(z.literal("")).optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    photoUrl: z.string().optional(),
    summary: z.string().optional(),
  }).passthrough().optional(),
  experience: z.array(z.object({
    company: z.string().optional(),
    position: z.string().optional(),
    jobTitle: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
    bullets: z.array(z.string()).optional(),
    achievements: z.array(z.string()).optional(),
    currentlyWorking: z.boolean().optional(),
  }).passthrough()).optional(),
  education: z.array(z.object({
    school: z.string().optional(),
    degree: z.string().optional(),
    field: z.string().optional(),
    graduationDate: z.string().optional(),
    graduationYear: z.string().optional(),
    gpa: z.string().optional(),
  }).passthrough()).optional(),
  skills: z.array(z.string()).optional(),
  projects: z.array(z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    link: z.string().optional(),
    technologies: z.array(z.string()).optional(),
  }).passthrough()).optional(),
  certifications: z.array(z.object({
    name: z.string().optional(),
    issuer: z.string().optional(),
    date: z.string().optional(),
    issueDate: z.string().optional(),
    expiryDate: z.string().optional(),
  }).passthrough()).optional(),
  languages: z.array(z.string()).optional(),
  sections: z.array(z.object({
    id: z.string(),
    type: z.string().optional(),
    title: z.string().optional(),
    content: z.string().optional(),
    order: z.number().optional(),
    isVisible: z.boolean().optional(),
  }).passthrough()).optional(),
}).passthrough();

export const createResumeSchema = z.object({
  title: z.string().min(1, "Resume title is required"),
  templateId: z.string().default("modern"),
});

export const updateResumeSchema = z.object({
  title: z.string().optional(),
  data: resumeDataSchema.optional(),
  templateId: z.string().optional(),
  atsScore: z.number().min(0).max(100).optional(),
});

export type ResumeData = z.infer<typeof resumeDataSchema>;
export type CreateResumeInput = z.infer<typeof createResumeSchema>;
export type UpdateResumeInput = z.infer<typeof updateResumeSchema>;
