"use client";

import { useEffect } from "react";
import { useResumeStore } from "@/lib/store/resume.store";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AIImproveButton } from "@/components/resume/AIImproveButton";

const MAX_SUMMARY_LENGTH = 500;

export default function SummaryEditor() {
  const { currentResume, updateSummary } = useResumeStore();
  const summary = currentResume?.summary || currentResume?.personalInfo?.summary || "";
  const charCount = summary.length;

  const updateSummaryValue = (value: string) => {
    const nextSummary = value.slice(0, MAX_SUMMARY_LENGTH);
    updateSummary(nextSummary);
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSummaryValue(e.target.value);
  };

  const handleAIAccept = (improvedText: string) => {
    updateSummaryValue(improvedText);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="summary" className="text-slate-300">
          Professional Summary
        </Label>
        <p className="text-xs text-slate-400 mt-1">
          Brief overview of your professional background and goals
        </p>
      </div>

      <Textarea
        id="summary"
        value={summary}
        onChange={handleSummaryChange}
        placeholder="Write a compelling summary about yourself..."
        className="mt-2 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 min-h-[150px]"
      />

      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400">
          {charCount} / {MAX_SUMMARY_LENGTH} characters
        </span>
      </div>

      <AIImproveButton
        text={summary}
        context="summary"
        onAccept={handleAIAccept}
      />

      <p className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-400">
        Changes update the preview automatically. Use the top Save button to save the full resume.
      </p>
    </div>
  );
}
