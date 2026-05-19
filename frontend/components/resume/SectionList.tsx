"use client";

import { useResumeStore } from "@/lib/store/resume.store";
import { useUIStore } from "@/lib/store/ui.store";
import { useState } from "react";
import { AddSectionModal } from "./AddSectionModal";
import { SectionHeader } from "./SectionHeader";

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
  const { currentResume, deleteSection, duplicateSection } = useResumeStore();
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

  const handleDeleteSection = (section: string) => {
    if (confirm(`Delete ${SECTION_LABELS[section]}?`)) {
      deleteSection(section);
    }
  };

  const handleDuplicateSection = (section: string) => {
    duplicateSection(section);
  };

  const sections = Object.keys(SECTION_LABELS);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-300 px-2 mb-4">Sections</h3>

      {sections.map((section) => (
        <div key={section} className="border border-slate-700 rounded-lg overflow-hidden">
          <SectionHeader
            title={SECTION_LABELS[section]}
            isExpanded={expandedSections.has(section)}
            onToggle={() => {
              setActiveSection(section);
              toggleSection(section);
            }}
            onDelete={() => handleDeleteSection(section)}
            onDuplicate={() => handleDuplicateSection(section)}
          />

          {expandedSections.has(section) && (
            <div className="bg-slate-900 border-t border-slate-700 p-4 text-sm text-slate-400">
              <p>Section content editor will appear here</p>
            </div>
          )}
        </div>
      ))}

      <AddSectionModal onAdd={(sectionType) => {
        console.log("Add section:", sectionType);
      }} />
    </div>
  );
}
