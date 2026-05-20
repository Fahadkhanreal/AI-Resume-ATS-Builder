import { ResumeData } from "@/types/resume";

export function summaryPrompt(input: {
  currentSummary?: string;
  jobTitle?: string;
  industry?: string;
}) {
  return `Return JSON only: {"summary":"ATS-friendly professional summary"}. Improve this summary: ${input.currentSummary || ""}. Job title: ${input.jobTitle || ""}. Industry: ${input.industry || ""}.`;
}

export function experiencePrompt(input: {
  company: string;
  position: string;
  description: string;
}) {
  return `Return JSON only: {"bullets":["achievement bullet"]}. Improve experience for ${input.position} at ${input.company}: ${input.description}`;
}

export function skillsPrompt(input: { skills: string[]; jobDescription?: string }) {
  return `Return JSON only: {"skills":["skill"],"missingKeywords":["keyword"]}. Optimize these skills: ${input.skills.join(", ")}. Job description: ${input.jobDescription || ""}`;
}

export function atsPrompt(resumeData: ResumeData, jobDescription?: string) {
  return `Return JSON only: {"score":0,"breakdown":{"keywords":0,"structure":0,"readability":0},"suggestions":["suggestion"]}. Analyze resume: ${JSON.stringify(resumeData)}. Job description: ${jobDescription || ""}`;
}

export function jobMatchPrompt(resumeData: ResumeData, jobDescription: string) {
  return `Return JSON only: {"matchPercentage":0,"matchedKeywords":["keyword"],"missingKeywords":["keyword"],"suggestions":["suggestion"]}. Resume: ${JSON.stringify(resumeData)}. Job description: ${jobDescription}`;
}
