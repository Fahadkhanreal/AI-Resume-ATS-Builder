"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store/resume.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { AIImproveButton } from "@/components/resume/AIImproveButton";

export default function SkillsEditor() {
  const { currentResume } = useResumeStore();
  const [skills, setSkills] = useState<string[]>(currentResume?.skills || []);
  const [inputValue, setInputValue] = useState("");

  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      setSkills([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
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
    setSkills([...skills, ...newSkills]);
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

      <Button type="submit" className="w-full">
        Save Skills
      </Button>
    </div>
  );
}
