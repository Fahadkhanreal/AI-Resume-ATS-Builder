"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store/resume.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationYear: string;
}

export default function EducationEditor() {
  const { currentResume } = useResumeStore();
  const [entries, setEntries] = useState<EducationEntry[]>(
    currentResume?.education || []
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addEntry = () => {
    const newEntry: EducationEntry = {
      id: `edu_${Date.now()}`,
      school: "",
      degree: "",
      field: "",
      graduationYear: "",
    };
    setEntries([...entries, newEntry]);
    setExpandedId(newEntry.id);
  };

  const updateEntry = (id: string, updates: Partial<EducationEntry>) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, ...updates } : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-slate-300">Education</Label>
        <Button onClick={addEntry} size="sm" variant="outline" className="gap-2">
          <Plus size={16} />
          Add Education
        </Button>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border border-slate-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedId(expandedId === entry.id ? null : entry.id)
              }
              className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 flex justify-between items-center transition"
            >
              <div className="text-left">
                <p className="font-medium text-white">
                  {entry.degree || "Degree"}
                </p>
                <p className="text-sm text-slate-400">
                  {entry.school || "School"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteEntry(entry.id);
                }}
                className="h-6 w-6 p-0"
              >
                <Trash2 size={14} className="text-slate-400 hover:text-red-400" />
              </Button>
            </button>

            {expandedId === entry.id && (
              <div className="bg-slate-900 border-t border-slate-700 p-4 space-y-3">
                <div>
                  <Label className="text-xs text-slate-300">School/University</Label>
                  <Input
                    value={entry.school}
                    onChange={(e) =>
                      updateEntry(entry.id, { school: e.target.value })
                    }
                    placeholder="University Name"
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-slate-300">Degree</Label>
                    <Input
                      value={entry.degree}
                      onChange={(e) =>
                        updateEntry(entry.id, { degree: e.target.value })
                      }
                      placeholder="Bachelor's"
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-300">Field of Study</Label>
                    <Input
                      value={entry.field}
                      onChange={(e) =>
                        updateEntry(entry.id, { field: e.target.value })
                      }
                      placeholder="Computer Science"
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Graduation Year</Label>
                  <Input
                    type="number"
                    value={entry.graduationYear}
                    onChange={(e) =>
                      updateEntry(entry.id, { graduationYear: e.target.value })
                    }
                    placeholder="2023"
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-8 text-slate-400">
          <p>No education entries yet</p>
        </div>
      )}

      <Button type="submit" className="w-full">
        Save Education
      </Button>
    </div>
  );
}
