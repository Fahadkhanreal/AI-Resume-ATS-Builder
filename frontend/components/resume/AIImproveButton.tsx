"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand2, Check, X } from "lucide-react";
import { improveWithAI, AIImproveRequest } from "@/lib/ai";

interface AIImproveSuggestion {
  original: string;
  improved: string;
  suggestions: string[];
}

interface AIImproveButtonProps {
  text: string;
  context: "summary" | "experience" | "skills" | "education";
  onAccept: (improvedText: string) => void;
  onReject?: () => void;
}

export function AIImproveButton({
  text,
  context,
  onAccept,
  onReject,
}: AIImproveButtonProps) {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AIImproveSuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImprove = async () => {
    if (!text.trim()) {
      setError("Please add some text before improving");
      return;
    }

    setLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const result = await improveWithAI({
        text,
        context,
      });
      setSuggestion(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to improve text"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    if (suggestion) {
      onAccept(suggestion.improved);
      setSuggestion(null);
    }
  };

  const handleReject = () => {
    setSuggestion(null);
    onReject?.();
  };

  if (suggestion) {
    return (
      <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-4 space-y-3">
        <div>
          <p className="text-xs text-emerald-300 font-semibold mb-2">
            AI Suggestion
          </p>
          <p className="text-sm text-white bg-slate-800 p-3 rounded">
            {suggestion.improved}
          </p>
        </div>

        {suggestion.suggestions.length > 0 && (
          <div>
            <p className="text-xs text-emerald-300 font-semibold mb-2">
              Tips
            </p>
            <ul className="text-xs text-slate-300 space-y-1">
              {suggestion.suggestions.map((tip, idx) => (
                <li key={idx} className="flex gap-2">
                  <span>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleAccept}
            size="sm"
            className="flex-1 gap-2"
          >
            <Check size={14} />
            Accept
          </Button>
          <Button
            onClick={handleReject}
            size="sm"
            variant="outline"
            className="flex-1 gap-2"
          >
            <X size={14} />
            Reject
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded p-2 text-xs text-red-300">
          {error}
        </div>
      )}
      <Button
        onClick={handleImprove}
        disabled={loading || !text.trim()}
        variant="outline"
        size="sm"
        className="w-full gap-2"
      >
        <Wand2 size={14} />
        {loading ? "Improving..." : "Improve with AI"}
      </Button>
    </div>
  );
}
