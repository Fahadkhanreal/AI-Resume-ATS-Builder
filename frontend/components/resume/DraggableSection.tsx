"use client";

import { ReactNode } from "react";
import {
  useSortable,
  CSS,
} from "@dnd-kit/sortable";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DraggableSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  onDelete?: () => void;
  isDragging?: boolean;
}

export function DraggableSection({
  id,
  title,
  children,
  onDelete,
  isDragging,
}: DraggableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border border-slate-700 rounded-lg overflow-hidden transition ${
        isSortableDragging ? "bg-slate-700/50" : "bg-slate-800"
      }`}
    >
      <div
        className="px-4 py-3 bg-slate-800 hover:bg-slate-700 flex items-center justify-between cursor-grab active:cursor-grabbing transition"
        {...attributes}
        {...listeners}
      >
        <div className="flex items-center gap-3">
          <GripVertical size={18} className="text-slate-500" />
          <span className="font-medium text-white">{title}</span>
        </div>
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
      <div className="p-4">{children}</div>
    </div>
  );
}
