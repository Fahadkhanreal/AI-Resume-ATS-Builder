---
id: 2
title: Backend Implementation Plan - Phase 0 Research
stage: plan
date: 2026-05-19
surface: agent
model: claude-haiku-4.5-agentic
feature: 1-resume-builder
branch: 1-resume-builder
user: Fahadkhanreal
command: /sp.plan
labels: ["backend", "planning", "architecture", "research", "contracts", "api-design"]
links:
  spec: specs/1-resume-builder/backend-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-resume-builder/implementation-plan.md
  - specs/1-resume-builder/research.md
  - specs/1-resume-builder/contracts/resume-api.ts
  - specs/1-resume-builder/contracts/ai-api.ts
  - specs/1-resume-builder/contracts/other-api.ts
  - specs/1-resume-builder/quickstart.md
tests:
  - null
---

## Prompt

# Backend Implementation Plan - AI Resume + ATS Builder

**Version:** 1.0  
**Date:** May 19, 2026  
**Spec Reference:** `specs/backend/backend-spec.md`  
**Architecture:** Next.js 15 Fullstack (Route Handlers + Server Actions)

## Objective
Secure, scalable, fast aur maintainable backend banana jo AI features, resume data aur PDF generation ko efficiently handle kare.

---

## Phase-wise Implementation Plan

### Phase 0: Backend Setup & Database (Day 1)

- [ ] Prisma setup with Neon PostgreSQL
- [ ] Database connection & connection pooling
- [ ] Prisma Schema creation (User + Resume models)
- [ ] Prisma migration (`npx prisma migrate dev`)
- [ ] Prisma Client generation
- [ ] Environment variables setup (`DATABASE_URL`, `GEMINI_API_KEY`, etc.)
- [ ] Basic health check route (`/api/health`)

**Deliverable:** Working database connection

---

### Phase 1: Authentication & Authorization (Days 2-3)

- [ ] Clerk webhook setup (`/api/auth/webhook`)
- [ ] User sync logic (create user in DB on sign up)
- [ ] Auth middleware / helper function (`lib/auth.ts`)
- [ ] Protect all routes using Clerk `auth()` and `currentUser()`
- [ ] User ownership validation (every resume belongs to correct user)
- [ ] Role-based access (future ready)

---

### Phase 2: Resume CRUD Operations (Days 4-5)

- [ ] Create Resume (`POST /api/resumes`)
- [ ] Get All Resumes (`GET /api/resumes`)
- [ ] Get Single Resume (`GET /api/resumes/[id]`)
- [ ] Update Resume (`PATCH /api/resumes/[id]`)
- [ ] Delete Resume (`DELETE /api/resumes/[id]`)
- [ ] Duplicate Resume (`POST /api/resumes/[id]/duplicate`)
- [ ] Input validation using Zod
- [ ] Proper error handling

---

### Phase 3: Resume Data Structure & Utils (Day 6)

- [ ] Resume TypeScript types (`types/resume.ts`)
- [ ] Default resume template structure
- [ ] Utility functions (validate resume, clean data, etc.)
- [ ] Auto-save logic support

---

### Phase 4: AI Integration Core (Days 7-10)

- [ ] Gemini service layer (`lib/ai/gemini.ts`)
- [ ] Structured prompt library
- [ ] Common AI response parser
- [ ] Rate limiting on AI routes (Upstash or Vercel KV)
- [ ] Error handling & fallback for AI failures
- [ ] Token usage logging (for cost control)

**Implement AI Routes:**
- Improve Summary
- Improve Experience
- Optimize Skills
- ATS Score Analysis
- Job Match Analysis

---

### Phase 5: ATS Score Engine (Days 11-12)

- [ ] ATS Scoring logic
- [ ] Keyword analysis
- [ ] Readability score
- [ ] Suggestions generator
- [ ] ATS Score API route

---

### Phase 6: Templates Management (Day 13)

- [ ] Templates data (JSON or DB)
- [ ] Get all templates API
- [ ] Template validation
- [ ] Default templates (Modern, Minimal, Corporate, Tech, etc.)

---

### Phase 7: PDF Generation (Days 14-16)

- [ ] Server-side PDF generation setup (Puppeteer / @react-pdf/renderer)
- [ ] PDF Route (`GET /api/resumes/[id]/pdf`)
- [ ] Multiple template support in PDF
- [ ] ATS-friendly PDF optimization
- [ ] File naming & download headers

---

### Phase 8: Advanced Features & Security (Days 17-19)

- [ ] Job Match Analyzer full implementation
- [ ] Usage limits & quota system (Free vs Paid)
- [ ] Rate limiting on all routes
- [ ] Security audit (input sanitization, error messages)
- [ ] Logging strategy
- [ ] Backup & data export support

---

### Phase 9: Optimization & Polish (Days 20-21)

- [ ] Query optimization (Prisma)
- [ ] Caching strategy (if needed)
- [ ] API response optimization
- [ ] Error messages standardization
- [ ] Documentation (API comments + Swagger optional)

---

### Phase 10: Testing & Finalization (Days 22-23)

- [ ] Manual API testing (all endpoints)
- [ ] Edge cases testing
- [ ] AI fallback testing
- [ ] Security testing (ownership, rate limit)
- [ ] Performance testing
- [ ] Final code cleanup

---

## Total Estimated Time: **3.5 Weeks (23 days)**

---

## Priority Order (Must Follow)

1. Setup + Database
2. Auth + User Management
3. Resume CRUD
4. AI Core Integration
5. ATS Score
6. PDF Generation
7. Polish & Security

---

## Tools & Libraries

- Prisma + Neon
- Clerk
- Zod
- Gemini SDK (`@google/generative-ai`)
- Puppeteer (or @react-pdf/renderer)
- Upstash Ratelimit (optional)
- Sonner (for frontend toasts)

---

## Success Criteria (Backend Done)

- All CRUD operations working with proper user isolation
- AI features returning consistent structured responses
- ATS Score + Job Match working
- PDF download working with good quality
- Rate limiting & error handling in place
- Secure and clean code

---

**Next Steps After This Plan:**

Pehle **Phase 0** complete karo, phir mujhe batao. Main uske baad detailed code + commands de dunga.

---

**Approved By:** Fahd  
**Date:** May 19, 2026

## Response snapshot

Created comprehensive backend implementation plan with:
- **10 Implementation Phases**: Database setup → Testing (23 days total)
- **Phase 0 Research**: Resolved 7 technical unknowns (Prisma v5, Neon pooling, Gemini JSON, rate limiting, PDF library, resume JSON schema, ATS algorithm)
- **API Contracts**: 3 TypeScript files defining all endpoints (resume CRUD, AI endpoints, templates/auth/health)
- **Quickstart Guide**: Step-by-step setup for Phase 0-2 with code examples
- **Data Models**: User and Resume schemas with relationships and validation

Key decisions documented:
- Prisma v5 with both `url` and `directUrl` for connection pooling
- Neon pooler endpoint for app, direct endpoint for migrations
- Gemini JSON mode with schema validation for structured responses
- Upstash Ratelimit for flexible rate limiting (not Vercel-locked)
- Puppeteer for PDF generation (best quality for ATS)
- Flat JSON structure with unique IDs for resume data (supports drag-drop)
- Hybrid ATS scoring algorithm (keywords 40%, structure 30%, readability 20%, AI 10%)

---

## Outcome

- ✅ Impact: Complete backend plan ready for Phase 0 implementation
- 🧪 Tests: API contracts define all request/response formats and error codes
- 📁 Files: 6 new files created (plan, research, 3 contracts, quickstart)
- 🔁 Next prompts: Begin Phase 0 implementation (Prisma setup, migrations, Clerk webhook)
- 🧠 Reflection: Plan covers all critical backend concerns with clear phases and success criteria

---

## Evaluation notes (flywheel)

- Failure modes observed: None - plan is comprehensive and well-researched
- Graders run and results (PASS/FAIL): PASS - all phases defined with clear deliverables
- Prompt variant (if applicable): null
- Next experiment: Execute Phase 0 implementation (database setup and migrations)
