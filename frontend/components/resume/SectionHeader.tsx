"use client";

import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete?: () => void;
}

export function SectionHeader({
  title,
  isExpanded,
  onToggle,
  onDelete,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-3 transition hover:bg-slate-700 sm:px-4 cursor-pointer">
      <button
        onClick={onToggle}
        className="flex min-w-0 flex-1 items-center gap-2 text-left"
      >
        {isExpanded ? (
          <ChevronDown size={18} className="text-slate-400" />
        ) : (
          <ChevronRight size={18} className="text-slate-400" />
        )}
        <span className="truncate text-sm font-medium text-white sm:text-base">{title}</span>
      </button>

      <div className="flex gap-1">
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="h-6 w-6 p-0"
          >
            <Trash2 size={14} className="text-slate-400 hover:text-red-400" />
          </Button>
        )}
      </div>
    </div>
  );
}
