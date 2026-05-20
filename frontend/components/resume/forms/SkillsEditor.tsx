"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store/resume.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { AIImproveButton } from "@/components/resume/AIImproveButton";

function normalizeSkills(skills: unknown): string[] {
  if (!Array.isArray(skills)) return [];

  return skills
    .map((skill: any) =>
      typeof skill === "string" ? skill : skill?.name || skill?.label || ""
    )
    .filter(Boolean);
}

export default function SkillsEditor() {
  const { currentResume, updateSkills } = useResumeStore();
  const [skills, setSkills] = useState<string[]>(normalizeSkills(currentResume?.skills));
  const [inputValue, setInputValue] = useState("");

  const setSkillList = (nextSkills: string[]) => {
    setSkills(nextSkills);
    updateSkills(nextSkills);
  };

  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      setSkillList([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeSkill = (index: number) => {
    setSkillList(skills.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleAIAccept = (improvedText: string) => {
    const newSkills = improvedText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s && !skills.includes(s));
    setSkillList([...skills, ...newSkills]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-slate-300">Skills</Label>
      </div>

      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill (e.g., React, Python)"
          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
        />
        <Button onClick={addSkill} size="sm" className="gap-2">
          <Plus size={16} />
          Add
        </Button>
      </div>

      <AIImproveButton
        text={skills.join(", ")}
        context="skills"
        onAccept={handleAIAccept}
      />

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-emerald-600/20 border border-emerald-600 text-emerald-300 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
          >
            {skill}
            <button
              onClick={() => removeSkill(index)}
              className="hover:text-emerald-200"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-8 text-slate-400">
          <p>No skills added yet</p>
        </div>
      )}

      <p className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-400">
        Changes update the preview automatically. Use the top Save button to save the full resume.
      </p>
    </div>
  );
}
