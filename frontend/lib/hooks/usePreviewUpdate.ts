"use client";

import { useEffect, useRef } from "react";
import { useResumeStore } from "@/lib/store/resume.store";

export function usePreviewUpdate(debounceMs: number = 200) {
  const { currentResume } = useResumeStore();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (!currentResume) return;

    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateRef.current;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      lastUpdateRef.current = Date.now();
      // Trigger re-render by accessing store
      useResumeStore.getState().currentResume;
    }, Math.max(0, debounceMs - timeSinceLastUpdate));

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [currentResume, debounceMs]);
}
