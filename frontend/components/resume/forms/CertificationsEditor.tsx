"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store/resume.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
}

export default function CertificationsEditor() {
  const { currentResume } = useResumeStore();
  const [entries, setEntries] = useState<CertificationEntry[]>(
    currentResume?.certifications || []
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addEntry = () => {
    const newEntry: CertificationEntry = {
      id: `cert_${Date.now()}`,
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
    };
    setEntries([...entries, newEntry]);
    setExpandedId(newEntry.id);
  };

  const updateEntry = (id: string, updates: Partial<CertificationEntry>) => {
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
        <Label className="text-slate-300">Certifications</Label>
        <Button onClick={addEntry} size="sm" variant="outline" className="gap-2">
          <Plus size={16} />
          Add Certification
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
                  {entry.name || "Certification"}
                </p>
                <p className="text-sm text-slate-400">
                  {entry.issuer || "Issuer"}
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
                  <Label className="text-xs text-slate-300">Certification Name</Label>
                  <Input
                    value={entry.name}
                    onChange={(e) =>
                      updateEntry(entry.id, { name: e.target.value })
                    }
                    placeholder="AWS Certified Solutions Architect"
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Issuing Organization</Label>
                  <Input
                    value={entry.issuer}
                    onChange={(e) =>
                      updateEntry(entry.id, { issuer: e.target.value })
                    }
                    placeholder="Amazon Web Services"
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-slate-300">Issue Date</Label>
                    <Input
                      type="month"
                      value={entry.issueDate}
                      onChange={(e) =>
                        updateEntry(entry.id, { issueDate: e.target.value })
                      }
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-300">Expiry Date (Optional)</Label>
                    <Input
                      type="month"
                      value={entry.expiryDate || ""}
                      onChange={(e) =>
                        updateEntry(entry.id, { expiryDate: e.target.value })
                      }
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-8 text-slate-400">
          <p>No certifications added yet</p>
        </div>
      )}

      <Button type="submit" className="w-full">
        Save Certifications
      </Button>
    </div>
  );
}
