"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { analyzeJobMatch } from "@/lib/ai";
import { useResumeStore } from "@/lib/store/resume.store";
import { Briefcase } from "lucide-react";

export function JobMatchAnalyzer() {
  const { currentResume } = useResumeStore();
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    matchPercentage: number;
    missingSkills: string[];
  } | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !currentResume) return;

    setLoading(true);
    try {
      const resumeText = JSON.stringify(currentResume);
      const analysis = await analyzeJobMatch(resumeText, jobDescription);
      setResult(analysis);
    } catch (error) {
      console.error("Error analyzing job match:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "bg-emerald-600";
    if (percentage >= 60) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase size={20} className="text-blue-500" />
        <h3 className="text-lg font-semibold text-white">Job Match Analyzer</h3>
      </div>

      <div>
        <Label htmlFor="jobDesc" className="text-slate-300">
          Paste Job Description
        </Label>
        <Textarea
          id="jobDesc"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="mt-2 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 min-h-[150px]"
        />
      </div>

      <Button
        onClick={handleAnalyze}
        disabled={loading || !jobDescription.trim()}
        className="w-full"
      >
        {loading ? "Analyzing..." : "Analyze Match"}
      </Button>

      {result && (
        <div className="space-y-4 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-4">
            <div
              className={`${getMatchColor(result.matchPercentage)} rounded-full w-20 h-20 flex items-center justify-center`}
            >
              <span className="text-3xl font-bold text-white">
                {result.matchPercentage}%
              </span>
            </div>
            <div>
              <p className="text-sm text-slate-300">Match Score</p>
              <p className="text-xs text-slate-400 mt-1">
                {result.matchPercentage >= 80
                  ? "Excellent match for this role"
                  : result.matchPercentage >= 60
                  ? "Good match, but some gaps"
                  : "Consider developing missing skills"}
              </p>
            </div>
          </div>

          {result.missingSkills.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-2">
                Missing Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-red-900/20 border border-red-700 text-red-300 px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
