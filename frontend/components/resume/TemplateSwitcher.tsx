"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/lib/store/resume.store";
import { Palette, X } from "lucide-react";
import { AVAILABLE_TEMPLATES } from "./TemplateSystem";

export function TemplateSwitcher() {
  const { currentResume } = useResumeStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="gap-2"
      >
        <Palette size={16} />
        Change Template
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Choose Template</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {AVAILABLE_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => {
                // TODO: Update resume template
                setIsOpen(false);
              }}
              className={`p-4 rounded-lg border-2 transition ${
                currentResume?.template === template.id
                  ? "border-emerald-600 bg-emerald-600/10"
                  : "border-slate-700 bg-slate-700/50 hover:border-slate-600"
              }`}
            >
              <p className="font-medium text-white text-sm">{template.name}</p>
              <p className="text-xs text-slate-400 mt-1">
                {template.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
