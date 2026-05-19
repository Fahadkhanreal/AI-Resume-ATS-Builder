"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface AddSectionModalProps {
  onAdd: (sectionType: string) => void;
}

const AVAILABLE_SECTIONS = [
  { id: "summary", label: "Professional Summary" },
  { id: "experience", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "languages", label: "Languages" },
  { id: "volunteer", label: "Volunteer Experience" },
];

export function AddSectionModal({ onAdd }: AddSectionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = (sectionType: string) => {
    onAdd(sectionType);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} variant="outline" className="w-full gap-2">
        <Plus size={16} />
        Add Section
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-sm w-full mx-4 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Add Section</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2">
          {AVAILABLE_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleAdd(section.id)}
              className="w-full text-left px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition"
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
