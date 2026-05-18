"use client";

import { useEffect, useRef } from "react";
import { useResumeStore } from "@/lib/store/resume.store";

export function useAutoSave(resumeId: string, debounceMs: number = 3000) {
  const { currentResume, saveResume } = useResumeStore();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>("");

  useEffect(() => {
    if (!currentResume) return;

    const currentData = JSON.stringify(currentResume);

    if (currentData === lastSavedRef.current) {
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        await saveResume(resumeId);
        lastSavedRef.current = currentData;
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, debounceMs);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [currentResume, resumeId, saveResume, debounceMs]);
}
