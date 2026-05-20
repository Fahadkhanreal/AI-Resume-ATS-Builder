import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/api/resumes(.*)",
  "/api/ai(.*)",
  "/api/ats(.*)",
  "/api/templates(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/dashboard(.*)",
    "/resume(.*)",
    "/api/resumes(.*)",
    "/api/ai(.*)",
    "/api/ats(.*)",
    "/api/templates(.*)",
  ],
};
