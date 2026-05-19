"use client";

import { useRef, useCallback } from "react";

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 5,
  windowMs: 60000, // 1 minute
};

export function useRateLimit(config: RateLimitConfig = DEFAULT_CONFIG) {
  const requestsRef = useRef<number[]>([]);

  const isAllowed = useCallback(() => {
    const now = Date.now();
    const windowStart = now - config.windowMs;

    requestsRef.current = requestsRef.current.filter((time) => time > windowStart);

    if (requestsRef.current.length < config.maxRequests) {
      requestsRef.current.push(now);
      return true;
    }

    return false;
  }, [config]);

  const getRemainingTime = useCallback(() => {
    if (requestsRef.current.length === 0) return 0;
    const oldestRequest = requestsRef.current[0];
    const remaining = config.windowMs - (Date.now() - oldestRequest);
    return Math.max(0, remaining);
  }, [config.windowMs]);

  return { isAllowed, getRemainingTime };
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries - 1) {
        const delayMs = initialDelayMs * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}
