"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store/resume.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  link?: string;
  technologies?: string[];
}

export default function ProjectsEditor() {
  const { currentResume, updateProjects } = useResumeStore();
  const [entries, setEntries] = useState<ProjectEntry[]>(
    currentResume?.projects || []
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const setProjectEntries = (nextEntries: ProjectEntry[]) => {
    setEntries(nextEntries);
    updateProjects(nextEntries as any);
  };

  const addEntry = () => {
    const newEntry: ProjectEntry = {
      id: `proj_${Date.now()}`,
      name: "",
      description: "",
      link: "",
      technologies: [],
    };
    setProjectEntries([...entries, newEntry]);
    setExpandedId(newEntry.id);
  };

  const updateEntry = (id: string, updates: Partial<ProjectEntry>) => {
    setProjectEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, ...updates } : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setProjectEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-slate-300">Projects</Label>
        <Button onClick={addEntry} size="sm" variant="outline" className="gap-2">
          <Plus size={16} />
          Add Project
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
                  {entry.name || "Project Name"}
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
                <div>
                  <Label className="text-xs text-slate-300">Project Name</Label>
                  <Input
                    value={entry.name}
                    onChange={(e) =>
                      updateEntry(entry.id, { name: e.target.value })
                    }
                    placeholder="Project name"
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Description</Label>
                  <Textarea
                    value={entry.description}
                    onChange={(e) =>
                      updateEntry(entry.id, { description: e.target.value })
                    }
                    placeholder="Brief description of the project"
                    className="mt-1 bg-slate-700 border-slate-600 text-white min-h-[80px]"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Project Link</Label>
                  <Input
                    type="url"
                    value={entry.link || ""}
                    onChange={(e) =>
                      updateEntry(entry.id, { link: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Technologies</Label>
                  <Input
                    value={(entry.technologies || []).join(", ")}
                    onChange={(e) =>
                      updateEntry(entry.id, {
                        technologies: e.target.value
                          .split(",")
                          .map((t) => t.trim()),
                      })
                    }
                    placeholder="React, Node.js, PostgreSQL"
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
          <p>No projects added yet</p>
        </div>
      )}

      <p className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-400">
        Changes update the preview automatically. Use the top Save button to save the full resume.
      </p>
    </div>
  );
}
