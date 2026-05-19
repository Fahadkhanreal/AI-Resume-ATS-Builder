"use client";

import { useUIStore } from "@/lib/store/ui.store";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Lightbulb } from "lucide-react";

interface ATSSuggestion {
  id: string;
  title: string;
  description: string;
  severity: "error" | "warning" | "info";
  section?: string;
}

interface ATSSuggestionsPanelProps {
  suggestions: ATSSuggestion[];
  onSuggestionClick?: (suggestion: ATSSuggestion) => void;
}

export function ATSSuggestionsPanel({
  suggestions,
  onSuggestionClick,
}: ATSSuggestionsPanelProps) {
  const { setActiveSection } = useUIStore();

  const handleClick = (suggestion: ATSSuggestion) => {
    if (suggestion.section) {
      setActiveSection(suggestion.section);
    }
    onSuggestionClick?.(suggestion);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <AlertCircle size={16} className="text-red-400" />;
      case "warning":
        return <AlertCircle size={16} className="text-yellow-400" />;
      default:
        return <Lightbulb size={16} className="text-blue-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "bg-red-900/20 border-red-700";
      case "warning":
        return "bg-yellow-900/20 border-yellow-700";
      default:
        return "bg-blue-900/20 border-blue-700";
    }
  };

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-8">
        <CheckCircle size={32} className="mx-auto text-emerald-400 mb-2" />
        <p className="text-slate-300">No ATS issues found!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-slate-300">
        Improvement Suggestions ({suggestions.length})
      </h4>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => handleClick(suggestion)}
          className={`w-full text-left p-3 rounded-lg border transition ${getSeverityColor(
            suggestion.severity
          )} hover:opacity-80`}
        >
          <div className="flex gap-2">
            {getSeverityIcon(suggestion.severity)}
            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                {suggestion.title}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {suggestion.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
