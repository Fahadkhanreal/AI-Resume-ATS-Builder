"use client";

import { useState, useEffect } from "react";
import { useResumeStore } from "@/lib/store/resume.store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AIImproveButton } from "@/components/resume/AIImproveButton";

const MAX_SUMMARY_LENGTH = 500;

export default function SummaryEditor() {
  const { currentResume } = useResumeStore();
  const [summary, setSummary] = useState(currentResume?.summary || "");
  const [charCount, setCharCount] = useState(summary.length);

  useEffect(() => {
    setCharCount(summary.length);
  }, [summary]);

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, MAX_SUMMARY_LENGTH);
    setSummary(value);
  };

  const handleAIAccept = (improvedText: string) => {
    setSummary(improvedText);
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

      <Button type="submit" className="w-full">
        Save Summary
      </Button>
    </div>
  );
}
