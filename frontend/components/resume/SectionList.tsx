"use client";

import { useResumeStore } from "@/lib/store/resume.store";
import { useUIStore } from "@/lib/store/ui.store";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const SECTION_LABELS: Record<string, string> = {
  personalInfo: "Personal Information",
  summary: "Professional Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
};

export default function SectionList() {
  const { currentResume } = useResumeStore();
  const { activeSection, setActiveSection } = useUIStore();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["personalInfo", "summary", "experience"])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const sections = Object.keys(SECTION_LABELS);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-300 px-2 mb-4">Sections</h3>

      {sections.map((section) => (
        <div key={section} className="border border-slate-700 rounded-lg overflow-hidden">
          <button
            onClick={() => {
              setActiveSection(section);
              toggleSection(section);
            }}
            className={`w-full px-4 py-3 flex items-center justify-between transition ${
              activeSection === section
                ? "bg-emerald-600/20 border-emerald-600"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              {expandedSections.has(section) ? (
                <ChevronDown size={16} className="text-slate-400" />
              ) : (
                <ChevronRight size={16} className="text-slate-400" />
              )}
              <span className="text-sm font-medium text-white">
                {SECTION_LABELS[section]}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="h-6 w-6 p-0"
            >
              <Trash2 size={14} className="text-slate-400 hover:text-red-400" />
            </Button>
          </button>

          {expandedSections.has(section) && (
            <div className="bg-slate-900 border-t border-slate-700 p-4 text-sm text-slate-400">
              <p>Section content editor will appear here</p>
            </div>
          )}
        </div>
      ))}

      <Button className="w-full mt-4 gap-2" variant="outline">
        <Plus size={16} />
        Add Custom Section
      </Button>
    </div>
  );
}
