export type PlanType = "free" | "pro";

const PLAN_LIMITS: Record<PlanType, { resumes: number; aiRequestsPerDay: number }> = {
  free: { resumes: 3, aiRequestsPerDay: 20 },
  pro: { resumes: 100, aiRequestsPerDay: 500 },
};

export function getPlanLimits(plan: PlanType = "free") {
  return PLAN_LIMITS[plan];
}

export function canCreateResume(currentCount: number, plan: PlanType = "free") {
  return currentCount < getPlanLimits(plan).resumes;
}

export function canUseAI(requestsToday: number, plan: PlanType = "free") {
  return requestsToday < getPlanLimits(plan).aiRequestsPerDay;
}
