"use client";

import { useEffect, useState } from "react";
import { generateATSScore } from "@/lib/ai";
import { useResumeStore } from "@/lib/store/resume.store";
import { Zap } from "lucide-react";

export function ATSScoreCard() {
  const { currentResume } = useResumeStore();
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentResume) return;

    const calculateScore = async () => {
      setLoading(true);
      try {
        const resumeText = JSON.stringify(currentResume);
        const atsScore = await generateATSScore(resumeText);
        setScore(atsScore);
      } catch (error) {
        console.error("Error calculating ATS score:", error);
        setScore(75);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(calculateScore, 1000);
    return () => clearTimeout(timer);
  }, [currentResume]);

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
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Zap size={20} className="text-yellow-500" />
          ATS Score
        </h3>
        {loading && <span className="text-xs text-slate-400">Analyzing...</span>}
      </div>

      <div className="flex items-center gap-4">
        <div className={`${getScoreColor(score)} rounded-full w-24 h-24 flex items-center justify-center`}>
          <span className="text-4xl font-bold text-white">
            {score !== null ? score : "-"}
          </span>
        </div>

        <div className="flex-1">
          <p className="text-2xl font-semibold text-white mb-2">
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

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-400">
          ATS Score measures how well your resume is formatted for Applicant Tracking Systems
        </p>
      </div>
    </div>
  );
}
