---
name: clerk-catch-all-routes
description: Sign-in/sign-up pages use [[...rest]] structure with redirect logic for authenticated users
metadata:
  type: feedback
---

## Clerk Catch-All Routes Implementation

**Problem**: Clerk error - "The <SignIn/> component is not configured correctly. The '/sign-in' route is not a catch-all route."

**Root Cause**: Sign-in and Sign-up pages were at `/sign-in/page.tsx` and `/sign-up/page.tsx` instead of catch-all routes.

**Solution Applied**:

1. **Moved auth pages to catch-all structure**:
   - From: `app/(auth)/sign-in/page.tsx`
   - To: `app/(auth)/sign-in/[[...rest]]/page.tsx`
   - From: `app/(auth)/sign-up/page.tsx`
   - To: `app/(auth)/sign-up/[[...rest]]/page.tsx`

2. **Added redirect logic** (both pages):
   ```typescript
   "use client";
   import { SignIn } from "@clerk/nextjs";
   import { useUser } from "@clerk/nextjs";
   import { useRouter } from "next/navigation";
   import { useEffect } from "react";

   export default function SignInPage() {
     const { isLoaded, isSignedIn } = useUser();
     const router = useRouter();

     useEffect(() => {
       if (isLoaded && isSignedIn) {
         router.push("/dashboard");
       }
     }, [isLoaded, isSignedIn, router]);

     return (
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
         <div className="w-full max-w-md">
           <SignIn />
         </div>
       </div>
     );
   }
   ```

3. **Why catch-all routes**: Clerk needs to handle dynamic paths for OAuth callbacks and multi-step flows.

**Verification**:
- Clerk routing error resolved
- Sign-in page loads without errors
- Authenticated users redirect to /dashboard
- OAuth flows work correctly

**Why**: Clerk's SignIn/SignUp components require catch-all routes to handle internal routing and OAuth redirects.

**How to apply**: Always use [[...rest]] for Clerk auth pages. Never use static routes for Clerk components.
