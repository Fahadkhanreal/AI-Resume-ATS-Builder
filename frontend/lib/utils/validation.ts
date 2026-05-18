import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  title: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

export const summarySchema = z.object({
  summary: z
    .string()
    .max(500, "Summary must be 500 characters or less")
    .optional(),
});

export const experienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
  bullets: z.array(z.string()).optional(),
});

export const educationSchema = z.object({
  school: z.string().min(1, "School is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().optional(),
  graduationYear: z.string().optional(),
});

export const skillSchema = z.object({
  skills: z.array(z.string()).min(1, "Add at least one skill"),
});

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  link: z.string().url("Invalid URL").optional().or(z.literal("")),
  technologies: z.array(z.string()).optional(),
});

export const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
});
