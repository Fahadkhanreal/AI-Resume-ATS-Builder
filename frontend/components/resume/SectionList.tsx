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
  const { currentResume, deleteSection } = useResumeStore();
  const { activeSection, setActiveSection } = useUIStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "personalInfo"
  );

  const toggleSection = (section: string) => {
    setExpandedSection((current) => (current === section ? null : section));
  };

  const handleDeleteSection = (section: string) => {
    if (confirm(`Delete ${SECTION_LABELS[section]}?`)) {
      deleteSection(section);
    }
  };


  const hiddenSections = new Set(
    (currentResume?.sections ?? [])
      .filter((section) => section.isVisible === false)
      .map((section) => section.id)
  );
  const sections = Object.keys(SECTION_LABELS).filter(
    (section) => !hiddenSections.has(section)
  );

  return (
    <div className="space-y-2">
      <h3 className="mb-3 px-1 text-sm font-semibold text-slate-300 sm:mb-4 sm:px-2">Sections</h3>

      {sections.map((section) => (
        <div key={section} className="border border-slate-700 rounded-lg overflow-hidden">
          <SectionHeader
            title={SECTION_LABELS[section]}
            isExpanded={expandedSection === section}
            onToggle={() => {
              setActiveSection(section);
              toggleSection(section);
            }}
            onDelete={() => handleDeleteSection(section)}
          />

          {expandedSection === section && (
            <div className="border-t border-slate-700 bg-slate-900 p-3 text-xs text-slate-400 sm:p-4 sm:text-sm">
              <p>Select this section to edit its details below.</p>
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
