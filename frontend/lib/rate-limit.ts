import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

export const aiRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      analytics: true,
      prefix: "ai-rate-limit",
    })
  : null;

export const apiRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, "1 m"),
      analytics: true,
      prefix: "api-rate-limit",
    })
  : null;

export async function checkAIRateLimit(userId: string) {
  if (!aiRateLimit) {
    return { success: true, remaining: 10, reset: Date.now() + 60000 };
  }

  try {
    return await aiRateLimit.limit(userId);
  } catch (error) {
    console.error("AI rate limit check failed:", error);
    return { success: true, remaining: 10, reset: Date.now() + 60000 };
  }
}

export async function checkAPIRateLimit(userId: string) {
  if (!apiRateLimit) {
    return { success: true, remaining: 60, reset: Date.now() + 60000 };
  }

  try {
    return await apiRateLimit.limit(userId);
  } catch (error) {
    console.error("API rate limit check failed:", error);
    return { success: true, remaining: 60, reset: Date.now() + 60000 };
  }
}
