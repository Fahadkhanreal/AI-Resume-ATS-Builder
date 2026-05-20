import { ResumeData } from "@/types/resume";
import { getResumeText } from "@/lib/resume-utils";
import { analyzeKeywordMatch } from "@/lib/ats/keyword-analyzer";

export interface JobMatchResult {
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export function analyzeJobMatch(
  resumeData: ResumeData,
  jobDescription: string
): JobMatchResult {
  const resumeText = getResumeText(resumeData);
  const keywordMatch = analyzeKeywordMatch(resumeText, jobDescription);
  const suggestions: string[] = [];

  if (keywordMatch.missingKeywords.length > 0) {
    suggestions.push("Add relevant missing keywords from the job description.");
  }

  if (keywordMatch.score < 60) {
    suggestions.push("Tailor your summary and experience bullets to this role.");
  }

  if (keywordMatch.score >= 80) {
    suggestions.push("Strong match. Review formatting and quantify achievements.");
  }

  return {
    matchPercentage: keywordMatch.score,
    matchedKeywords: keywordMatch.matchedKeywords,
    missingKeywords: keywordMatch.missingKeywords,
    suggestions,
  };
}
