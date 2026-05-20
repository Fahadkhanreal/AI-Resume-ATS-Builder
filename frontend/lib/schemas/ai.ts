import { z } from "zod";

export const improveSummarySchema = z.object({
  currentSummary: z.string().optional(),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
});

export const improveExperienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  description: z.string(),
  achievements: z.array(z.string()).optional(),
});

export const optimizeSkillsSchema = z.object({
  skills: z.array(z.string()),
  jobDescription: z.string().optional(),
});

export const atsScoreSchema = z.object({
  resumeData: z.record(z.string(), z.any()),
  jobDescription: z.string().optional(),
});

export const jobMatchSchema = z.object({
  resumeData: z.record(z.string(), z.any()),
  jobDescription: z.string(),
});

export type ImproveSummaryInput = z.infer<typeof improveSummarySchema>;
export type ImproveExperienceInput = z.infer<typeof improveExperienceSchema>;
export type OptimizeSkillsInput = z.infer<typeof optimizeSkillsSchema>;
export type ATSScoreInput = z.infer<typeof atsScoreSchema>;
export type JobMatchInput = z.infer<typeof jobMatchSchema>;
