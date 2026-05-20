"use client";

import { useEffect, useState } from "react";
import { useResumeStore } from "@/lib/store/resume.store";
import { calculateATSScore } from "@/lib/ats/scorer";
import { Zap } from "lucide-react";

export function ATSScoreCard() {
  const { currentResume, setATSScore } = useResumeStore();
  const [score, setScore] = useState<number | null>(currentResume?.atsScore ?? null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resumeContentKey = currentResume
    ? JSON.stringify({
        personalInfo: currentResume.personalInfo,
        experience: currentResume.experience ?? [],
        education: currentResume.education ?? [],
        skills: currentResume.skills ?? [],
        projects: currentResume.projects ?? [],
        certifications: currentResume.certifications ?? [],
      })
    : "";

  useEffect(() => {
    if (!currentResume?.id || !resumeContentKey) return;

    const resumeData = JSON.parse(resumeContentKey);

    const calculateScore = async () => {
      setLoading(true);
      setError("");
      try {
        const result = calculateATSScore(resumeData as any);
        const nextScore = Math.min(100, Math.max(0, result.score ?? 0));
        setScore(nextScore);
        setSuggestions(result.suggestions ?? []);
        setATSScore(nextScore);
        fetch(`/api/resumes/${currentResume.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ atsScore: nextScore }),
        }).catch((error) => {
          console.error("Error saving ATS score:", error);
        });
      } catch (error) {
        console.error("Error calculating ATS score:", error);
        setError(error instanceof Error ? error.message : "Failed to calculate ATS score");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(calculateScore, 1200);
    return () => clearTimeout(timer);
  }, [currentResume?.id, resumeContentKey, setATSScore]);

  const getScoreColor = (s: number | null) => {
    if (s === null) return "bg-slate-700";
    if (s >= 80) return "bg-emerald-600";
    if (s >= 60) return "bg-yellow-600";
    return "bg-red-600";
  };

  const getScoreLabel = (s: number | null) => {
    if (s === null) return "Calculating...";
    if (s >= 80) return "Excellent";
    if (s >= 60) return "Good";
    return "Needs Work";
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
          <Zap size={20} className="text-yellow-500" />
          ATS Score
        </h3>
        {loading && <span className="text-xs text-slate-400">Analyzing...</span>}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className={`${getScoreColor(score)} flex h-20 w-20 shrink-0 items-center justify-center rounded-full sm:h-24 sm:w-24`}>
          <span className="text-3xl font-bold text-white sm:text-4xl">
            {score !== null ? score : "-"}
          </span>
        </div>

        <div className="flex-1">
          <p className="mb-2 text-xl font-semibold text-white sm:text-2xl">
            {getScoreLabel(score)}
          </p>
          <p className="text-sm text-slate-400">
            {score !== null
              ? score >= 80
                ? "Your resume is well-optimized for ATS systems"
                : score >= 60
                ? "Your resume is moderately ATS-friendly. Consider improvements."
                : "Your resume needs significant ATS optimization."
              : "Calculating your ATS compatibility score..."}
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      {suggestions.length > 0 && (
        <div className="mt-4 rounded-md border border-slate-700 bg-slate-900/50 p-3">
          <p className="mb-2 text-sm font-medium text-white">Suggestions</p>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-400">
          ATS Score auto-updates and saves while you edit your resume.
        </p>
      </div>
    </div>
  );
}
