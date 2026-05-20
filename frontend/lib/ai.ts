"use client";

export interface AIImproveRequest {
  text: string;
  context: "summary" | "experience" | "skills" | "education";
}

export interface AIImproveResponse {
  original: string;
  improved: string;
  suggestions: string[];
}

export async function improveWithAI(
  request: AIImproveRequest
): Promise<AIImproveResponse> {
  const response = await fetch("/api/ai/improve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to improve text with AI");
  }

  return result;
}

export async function generateATSScore(resumeText: string): Promise<number> {
  const response = await fetch("/api/ats/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeText }),
  });

  if (!response.ok) return 75;

  const result = await response.json();
  return Math.min(100, Math.max(0, result.score || result.data?.score || 75));
}

export async function analyzeJobMatch(
  resumeText: string,
  jobDescription: string
): Promise<{ matchPercentage: number; missingSkills: string[] }> {
  const response = await fetch("/api/job-match", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeText, jobDescription }),
  });

  if (!response.ok) return { matchPercentage: 50, missingSkills: [] };

  const result = await response.json();
  return {
    matchPercentage: result.matchPercentage || result.data?.matchPercentage || 50,
    missingSkills: result.missingSkills || result.data?.missingSkills || [],
  };
}
