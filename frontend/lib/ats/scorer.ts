import { ResumeData } from "@/types/resume";
import { getResumeText } from "@/lib/resume-utils";
import { analyzeKeywordMatch } from "./keyword-analyzer";
import { calculateReadabilityScore, calculateStructureScore } from "./readability";

export interface ATSScoreResult {
  score: number;
  breakdown: {
    keywords: number;
    structure: number;
    readability: number;
  };
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

function countWords(text?: string) {
  return String(text || "").trim().split(/\s+/).filter(Boolean).length;
}

function getCompletenessPenalty(resumeData: ResumeData, resumeText: string) {
  const personalInfo = resumeData.personalInfo ?? {};
  const experience = Array.isArray(resumeData.experience) ? resumeData.experience : [];
  const education = Array.isArray(resumeData.education) ? resumeData.education : [];
  const skills = Array.isArray(resumeData.skills) ? resumeData.skills : [];
  const suggestions: string[] = [];
  let penalty = 0;

  if (countWords(resumeText) < 120) {
    penalty += 25;
    suggestions.push("Resume content is too short for enterprise ATS screening; add complete experience, education, and skills details.");
  } else if (countWords(resumeText) < 220) {
    penalty += 12;
    suggestions.push("Add more role-specific detail so the resume has enough ATS-readable content.");
  }

  const missingContact = [personalInfo.fullName, personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).length < 4;
  if (missingContact) {
    penalty += 10;
    suggestions.push("Complete name, email, phone, and location fields.");
  }

  if (countWords(personalInfo.summary) < 25) {
    penalty += 10;
    suggestions.push("Write a 3-4 line professional summary with role, experience level, tools, and measurable strengths.");
  }

  const strongExperience = experience.filter((exp: Record<string, any>) => {
    const bullets = Array.isArray(exp.bullets) ? exp.bullets.filter(Boolean) : [];
    return (exp.jobTitle || exp.position) && exp.company && bullets.length >= 3;
  }).length;
  if (strongExperience === 0) {
    penalty += 20;
    suggestions.push("Add at least one complete experience entry with company, title, dates, and 3 achievement bullets.");
  }

  if (education.filter((edu: Record<string, any>) => edu.school && edu.degree).length === 0) {
    penalty += 10;
    suggestions.push("Add education with degree and institution.");
  }

  if (skills.length < 8) {
    penalty += 10;
    suggestions.push("Add at least 8-12 relevant hard skills and tools for better ATS matching.");
  }

  return { penalty: Math.min(60, penalty), suggestions };
}

export function calculateATSScore(
  resumeData: ResumeData,
  jobDescription = ""
): ATSScoreResult {
  const resumeText = getResumeText(resumeData);
  const keywordAnalysis = analyzeKeywordMatch(resumeText, jobDescription);
  const structure = calculateStructureScore(resumeData as Record<string, any>);
  const readability = calculateReadabilityScore(resumeText);
  const completeness = getCompletenessPenalty(resumeData, resumeText);

  const baseScore = Math.round(
    keywordAnalysis.score * 0.35 + structure * 0.45 + readability * 0.2
  );
  const score = Math.max(0, Math.min(100, baseScore - completeness.penalty));

  const suggestions: string[] = [...completeness.suggestions];
  if (keywordAnalysis.missingKeywords.length > 0) {
    suggestions.push("Add missing job keywords where relevant, but keep wording natural.");
  }
  if (structure < 80) {
    suggestions.push("Complete all core sections with ATS-readable details, not only headings.");
  }
  if (readability < 75) {
    suggestions.push("Use shorter, clearer bullet points with action verbs and measurable outcomes.");
  }

  return {
    score,
    breakdown: {
      keywords: keywordAnalysis.score,
      structure,
      readability,
    },
    matchedKeywords: keywordAnalysis.matchedKeywords,
    missingKeywords: keywordAnalysis.missingKeywords,
    suggestions: Array.from(new Set(suggestions)),
  };
}
