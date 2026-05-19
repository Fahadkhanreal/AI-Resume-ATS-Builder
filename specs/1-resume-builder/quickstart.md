# Phase 1: Backend Implementation Quickstart

**Date:** 2026-05-19  
**Feature:** 1-resume-builder  
**Status:** Ready for Implementation

---

## Prerequisites

Before starting Phase 0 implementation, ensure you have:

- [ ] Node.js 18+ installed
- [ ] npm or yarn package manager
- [ ] Neon PostgreSQL account (free tier available)
- [ ] Clerk account with API keys
- [ ] Google Gemini API key
- [ ] Upstash Redis account (for rate limiting)

---

## Environment Setup

### Step 1: Create .env.local

```bash
# Database (from Neon dashboard)
DATABASE_URL="postgresql://user:password@host-pooler.neon.tech/database?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://user:password@host.neon.tech/database?sslmode=require"

# Clerk (from Clerk dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Google Gemini (from Google Cloud Console)
GOOGLE_API_KEY="AIzaSy..."

# Upstash (from Upstash dashboard)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

### Step 2: Install Dependencies

```bash
cd frontend
npm install @prisma/client prisma @clerk/nextjs zod @google/generative-ai @upstash/ratelimit @upstash/redis
```

---

## Phase 0: Database Setup

### Step 1: Create Prisma Schema

File: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DATABASE_URL_UNPOOLED")
}

model User {
  id        String     @id @default(cuid())
  clerkId   String     @unique
  email     String     @unique
  name      String?
  resumes   Resume[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model Resume {
  id               String    @id @default(cuid())
  userId           String
  title            String
  data             Json
  templateId       String    @default("modern")
  atsScore         Int?      @default(0)
  isPublic         Boolean   @default(false)
  lastDownloaded   DateTime?

  user             User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  @@index([userId])
}
```

### Step 2: Run Prisma Migration

```bash
npx prisma migrate dev --name init
```

This will:
- Create migration file
- Apply migration to Neon database
- Generate Prisma Client

### Step 3: Verify Database Connection

```bash
npx prisma db push
```

---

## Phase 1: Authentication Setup

### Step 1: Create Auth Middleware

File: `middleware.ts` (project root)

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/api/resumes(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

### Step 2: Create Auth Helper

File: `lib/auth.ts`

```typescript
import { auth } from "@clerk/nextjs/server";

export async function getCurrentUserId(): Promise<string> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
}

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  
  const { db } = await import("@/lib/db");
  return db.user.findUnique({
    where: { clerkId: userId },
  });
}
```

### Step 3: Create Clerk Webhook

File: `app/api/auth/webhook/route.ts`

```typescript
import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const payload = await req.json();
  const headersList = await headers();
  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let evt;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response("Error occured", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    
    await db.user.upsert({
      where: { clerkId: id },
      update: {
        email: email_addresses[0]?.email_address || "",
        name: `${first_name || ""} ${last_name || ""}`.trim(),
      },
      create: {
        clerkId: id,
        email: email_addresses[0]?.email_address || "",
        name: `${first_name || ""} ${last_name || ""}`.trim(),
      },
    });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    await db.user.delete({
      where: { clerkId: id },
    });
  }

  return new Response("Webhook processed", { status: 200 });
}
```

---

## Phase 2: Resume CRUD Endpoints

### Step 1: Create Prisma Client Export

File: `lib/db.ts`

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

### Step 2: Create Zod Schemas

File: `lib/schemas/resume.ts`

```typescript
import { z } from "zod";

export const createResumeSchema = z.object({
  title: z.string().min(1).max(255),
  templateId: z.string().default("modern"),
});

export const updateResumeSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  templateId: z.string().optional(),
  data: z.record(z.any()).optional(),
  isPublic: z.boolean().optional(),
});

export type CreateResumeInput = z.infer<typeof createResumeSchema>;
export type UpdateResumeInput = z.infer<typeof updateResumeSchema>;
```

---

## Testing Checklist

- [ ] Database connection working
- [ ] Prisma migrations applied
- [ ] Clerk webhook configured
- [ ] Auth middleware protecting routes
- [ ] User created in database on signup
- [ ] Can fetch current user

---

## Next Steps

1. Implement Phase 2: Resume CRUD endpoints
2. Add error handling utilities
3. Implement rate limiting
4. Add AI integration

---

**Status:** Quickstart complete  
**Next:** Begin Phase 0 implementation
