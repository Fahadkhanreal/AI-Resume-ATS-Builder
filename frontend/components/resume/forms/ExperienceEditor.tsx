"use client";

import { useMemo, useState } from "react";
import { useResumeStore } from "@/lib/store/resume.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { AIImproveButton } from "@/components/resume/AIImproveButton";

interface ExperienceEntry {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  bullets: string[];
}

function normalizeExperienceEntries(entries: unknown): ExperienceEntry[] {
  if (!Array.isArray(entries)) return [];

  return entries.map((entry: any, index) => ({
    id: entry?.id || `exp_${index}_${Date.now()}`,
    jobTitle: entry?.jobTitle || entry?.position || "",
    company: entry?.company || "",
    startDate: entry?.startDate || "",
    endDate: entry?.endDate || "",
    description: entry?.description || "",
    bullets: Array.isArray(entry?.bullets) ? entry.bullets.filter(Boolean) : [],
  }));
}

export default function ExperienceEditor() {
  const { currentResume, updateExperience } = useResumeStore();
  const initialEntries = useMemo(
    () => normalizeExperienceEntries(currentResume?.experience),
    [currentResume?.id]
  );
  const [entries, setEntries] = useState<ExperienceEntry[]>(initialEntries);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const setExperienceEntries = (nextEntries: ExperienceEntry[]) => {
    setEntries(nextEntries);
    updateExperience(nextEntries as any);
  };

  const addEntry = () => {
    const newEntry: ExperienceEntry = {
      id: `exp_${Date.now()}`,
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      bullets: [],
    };
    setExperienceEntries([...entries, newEntry]);
    setExpandedId(newEntry.id);
  };

  const updateEntry = (id: string, updates: Partial<ExperienceEntry>) => {
    setExperienceEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, ...updates } : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setExperienceEntries(entries.filter((entry) => entry.id !== id));
  };

  const addBullet = (id: string) => {
    updateEntry(id, {
      bullets: [...(entries.find((e) => e.id === id)?.bullets || []), ""],
    });
  };

  const updateBullet = (id: string, index: number, value: string) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    const newBullets = [...entry.bullets];
    newBullets[index] = value;
    updateEntry(id, { bullets: newBullets });
  };

  const deleteBullet = (id: string, index: number) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    updateEntry(id, {
      bullets: entry.bullets.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-slate-300">Work Experience</Label>
        <Button onClick={addEntry} size="sm" variant="outline" className="gap-2">
          <Plus size={16} />
          Add Experience
        </Button>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border border-slate-700 rounded-lg overflow-hidden"
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() =>
                setExpandedId(expandedId === entry.id ? null : entry.id)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpandedId(expandedId === entry.id ? null : entry.id);
                }
              }}
              className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 flex justify-between items-center transition cursor-pointer"
            >
              <div className="text-left">
                <p className="font-medium text-white">
                  {entry.jobTitle || "Job Title"}
                </p>
                <p className="text-sm text-slate-400">
                  {entry.company || "Company"}
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
            </div>

            {expandedId === entry.id && (
              <div className="bg-slate-900 border-t border-slate-700 p-4 space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <Label className="text-xs text-slate-300">Job Title</Label>
                    <Input
                      value={entry.jobTitle}
                      onChange={(e) =>
                        updateEntry(entry.id, { jobTitle: e.target.value })
                      }
                      placeholder="Senior Engineer"
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-300">Company</Label>
                    <Input
                      value={entry.company}
                      onChange={(e) =>
                        updateEntry(entry.id, { company: e.target.value })
                      }
                      placeholder="Tech Corp"
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <Label className="text-xs text-slate-300">Start Date</Label>
                    <Input
                      type="month"
                      value={entry.startDate}
                      onChange={(e) =>
                        updateEntry(entry.id, { startDate: e.target.value })
                      }
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-300">End Date</Label>
                    <Input
                      type="month"
                      value={entry.endDate}
                      onChange={(e) =>
                        updateEntry(entry.id, { endDate: e.target.value })
                      }
                      placeholder="Present"
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Description</Label>
                  <Textarea
                    value={entry.description}
                    onChange={(e) =>
                      updateEntry(entry.id, { description: e.target.value })
                    }
                    placeholder="Brief description of role"
                    className="mt-1 bg-slate-700 border-slate-600 text-white min-h-[80px]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-xs text-slate-300">
                      Key Achievements
                    </Label>
                    <Button
                      onClick={() => addBullet(entry.id)}
                      size="sm"
                      variant="ghost"
                      className="gap-1 h-6"
                    >
                      <Plus size={14} />
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {entry.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={bullet}
                          onChange={(e) =>
                            updateBullet(entry.id, idx, e.target.value)
                          }
                          placeholder="Achievement or responsibility"
                          className="bg-slate-700 border-slate-600 text-white text-sm"
                        />
                        <Button
                          onClick={() => deleteBullet(entry.id, idx)}
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0"
                        >
                          <Trash2 size={14} className="text-slate-400" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <AIImproveButton
                  text={entry.bullets.join(", ") || entry.description}
                  context="experience"
                  onAccept={(improved) => {
                    const bullets = improved
                      .split(/\n|•|-/)
                      .map((b) => b.trim())
                      .filter(Boolean);
                    updateEntry(entry.id, { bullets: bullets.length ? bullets : [improved] });
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-8 text-slate-400">
          <p>No experience entries yet</p>
        </div>
      )}

      <p className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-400">
        Changes update the preview automatically. Use the top Save button to save the full resume.
      </p>
    </div>
  );
}
