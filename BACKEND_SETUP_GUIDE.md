# Backend Setup Guide - Phase 0

**Date:** 2026-05-19  
**Feature:** 1-resume-builder  
**Status:** Ready for Implementation

---

## Prerequisites

Before starting Phase 0 implementation, you need:

1. **Neon PostgreSQL Account**
   - Sign up: https://console.neon.tech
   - Create a new project
   - Get connection strings (pooled + unpooled)

2. **Clerk Account**
   - Sign up: https://dashboard.clerk.com
   - Create application
   - Get Publishable Key and Secret Key
   - Configure webhook pointing to `/api/auth/webhook`

3. **Google Gemini API Key**
   - Go to: https://console.cloud.google.com
   - Create project
   - Enable Generative Language API
   - Create API key

4. **Upstash Redis Account**
   - Sign up: https://console.upstash.com
   - Create Redis database
   - Get REST URL and Token

---

## Environment Setup

Create `frontend/.env.local` with your actual credentials:

```
DATABASE_URL="postgresql://user:password@host-pooler.neon.tech/database?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://user:password@host.neon.tech/database?sslmode=require"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."
GOOGLE_API_KEY="AIzaSy_..."
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

---

## Phase 0 Tasks (Day 1)

Execute tasks T001-T008 from `backend-tasks.md`:

1. Install Prisma: `npm install @prisma/client prisma`
2. Create `.env.local` with real credentials
3. Create `prisma/schema.prisma` with User + Resume models
4. Run migration: `npx prisma migrate dev --name init`
5. Create `lib/db.ts` - Prisma Client export
6. Create `app/api/health/route.ts` - Health check
7. Create `.env.example` - Template for others
8. Test connection: `npx prisma db push`

---

## Next Steps

After Phase 0 completes:
- Phase 1: Authentication & Clerk webhook (T009-T014)
- Phase 2: Error handling & validation (T015-T019)
- Phase 3: Resume CRUD (T020-T025)

---

**Status:** Ready to begin Phase 0  
**Estimated Time:** 1 day
