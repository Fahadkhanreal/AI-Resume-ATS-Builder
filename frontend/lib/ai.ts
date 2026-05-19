"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

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
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompts: Record<string, string> = {
    summary:
      "Improve this professional summary to be more compelling and ATS-friendly. Keep it concise (2-3 sentences). Return JSON with 'improved' and 'suggestions' array.",
    experience:
      "Improve these experience bullet points to be more impactful with action verbs and metrics. Return JSON with 'improved' and 'suggestions' array.",
    skills:
      "Suggest related skills that would complement these skills. Return JSON with 'improved' and 'suggestions' array.",
    education:
      "Enhance this education entry with relevant details. Return JSON with 'improved' and 'suggestions' array.",
  };

  const prompt = `${prompts[request.context]}\n\nText: "${request.text}"`;

  try {
    const result = await model.generateContent(prompt);
    const responseText =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      original: request.text,
      improved: parsed.improved || request.text,
      suggestions: parsed.suggestions || [],
    };
  } catch (error) {
    console.error("AI improvement error:", error);
    throw new Error("Failed to improve text with AI");
  }
}

export async function generateATSScore(resumeText: string): Promise<number> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Analyze this resume for ATS compatibility and return a score from 0-100. Consider: formatting, keywords, structure, clarity. Return only a JSON object with 'score' and 'suggestions' array.

Resume: ${resumeText}`;

  try {
    const result = await model.generateContent(prompt);
    const responseText =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return 75;
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return Math.min(100, Math.max(0, parsed.score || 75));
  } catch (error) {
    console.error("ATS score error:", error);
    return 75;
  }
}

export async function analyzeJobMatch(
  resumeText: string,
  jobDescription: string
): Promise<{ matchPercentage: number; missingSkills: string[] }> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Compare this resume against the job description. Return a JSON object with 'matchPercentage' (0-100) and 'missingSkills' array.

Resume: ${resumeText}

Job Description: ${jobDescription}`;

  try {
    const result = await model.generateContent(prompt);
    const responseText =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { matchPercentage: 50, missingSkills: [] };
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      matchPercentage: Math.min(100, Math.max(0, parsed.matchPercentage || 50)),
      missingSkills: parsed.missingSkills || [],
    };
  } catch (error) {
    console.error("Job match error:", error);
    return { matchPercentage: 50, missingSkills: [] };
  }
}
