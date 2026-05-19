"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export function SectionHeader({
  title,
  isExpanded,
  onToggle,
  onDelete,
  onDuplicate,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition cursor-pointer">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 flex-1 text-left"
      >
        {isExpanded ? (
          <ChevronDown size={18} className="text-slate-400" />
        ) : (
          <ChevronRight size={18} className="text-slate-400" />
        )}
        <span className="font-medium text-white">{title}</span>
      </button>

      <div className="flex gap-1">
        {onDuplicate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="h-6 w-6 p-0"
          >
            <Copy size={14} className="text-slate-400 hover:text-emerald-400" />
          </Button>
        )}
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
