---
id: 1
title: Backend Specification - AI Resume + ATS Builder
stage: spec
date: 2026-05-19
surface: agent
model: claude-haiku-4.5-agentic
feature: 1-resume-builder
branch: 1-resume-builder
user: Fahadkhanreal
command: /sp.specify
labels: ["backend", "architecture", "specification", "nextjs", "prisma", "gemini"]
links:
  spec: specs/1-resume-builder/backend-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-resume-builder/backend-spec.md
  - specs/1-resume-builder/backend-plan.md
  - specs/1-resume-builder/backend-tasks.md
tests:
  - null
---

## Prompt

# Backend Specification - AI Resume + ATS Builder

**Version:** 1.0  
**Date:** May 19, 2026  
**Project:** AI Resume + ATS Builder  
**Architecture:** Next.js 15 Fullstack (App Router)  
**Status:** Approved

## 1. Backend Vision

Backend should be **fast, secure, scalable, and maintainable**. Since this is a SaaS product, proper data isolation, rate limiting, AI cost control, and clean architecture is mandatory.

We will use **Next.js Route Handlers + Server Actions** instead of separate backend (FastAPI) for faster development and better performance.

---

## 2. Tech Stack (Backend)

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Database**: Neon PostgreSQL + Prisma ORM
- **Auth**: Clerk (Server-side verification)
- **AI**: Google Gemini (via `@google/generative-ai`)
- **Validation**: Zod
- **Rate Limiting**: Upstash Ratelimit or Vercel KV
- **File Storage**: Vercel Blob (for future) or local for PDF
- **PDF Generation**: Puppeteer (server-side) + @react-pdf/renderer

---

## 3. Core Principles

- All API routes under `/api/` folder
- Proper user isolation (`userId` check in every request)
- Strict input validation using Zod
- Structured error handling
- Rate limiting on AI heavy endpoints
- No sensitive data in logs
- Clean, modular and well-documented code
- Server Actions for mutations where possible

---

## 4. Database Schema (Prisma)

**Main Models:**

```prisma
model User {
  id            String    @id @default(cuid())
  clerkId       String    @unique
  email         String    @unique
  name          String?
  resumes       Resume[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Resume {
  id            String    @id @default(cuid())
  userId        String
  title         String
  data          Json      // Complete resume data (sections, content, etc.)
  templateId    String    @default("modern")
  atsScore      Int?      @default(0)
  isPublic      Boolean   @default(false)
  lastDownloaded DateTime?
  
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([userId])
}
```

---

## 5. API Routes Structure

```
/app/api/
├── resumes/
│   ├── route.ts                 # GET (list), POST (create)
│   ├── [resumeId]/
│   │   ├── route.ts             # GET, PATCH, DELETE
│   │   ├── duplicate/route.ts
│   │   └── pdf/route.ts
│   └── [resumeId]/ai/
│       ├── summary/route.ts
│       ├── experience/route.ts
│       ├── ats-score/route.ts
│       └── job-match/route.ts
├── templates/
│   └── route.ts
├── auth/
│   └── webhook/route.ts         # Clerk webhook
└── health/route.ts
```

---

## 6. Key API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/resumes` | Get all user resumes | Yes |
| POST | `/api/resumes` | Create new resume | Yes |
| GET | `/api/resumes/[id]` | Get single resume | Yes |
| PATCH | `/api/resumes/[id]` | Update resume data | Yes |
| DELETE | `/api/resumes/[id]` | Delete resume | Yes |
| POST | `/api/resumes/[id]/duplicate` | Duplicate resume | Yes |
| POST | `/api/resumes/[id]/ai/summary` | Improve summary | Yes |
| POST | `/api/resumes/[id]/ai/experience` | Improve experience bullets | Yes |
| POST | `/api/resumes/[id]/ai/ats-score` | Get ATS Score + suggestions | Yes |
| POST | `/api/resumes/[id]/ai/job-match` | Job Match Analysis | Yes |
| GET | `/api/resumes/[id]/pdf` | Generate & download PDF | Yes |
| GET | `/api/templates` | Get available templates | No |
| POST | `/api/auth/webhook` | Clerk webhook | Webhook Secret |

---

## 7. AI Integration Standards

- All AI calls must go through server-side only
- Use structured JSON output (Gemini JSON mode)
- Implement retry logic (max 2 retries)
- Token usage tracking & cost monitoring
- Rate limiting (10 requests per minute for AI)
- Fallback message if AI fails

---

## 8. Security & Best Practices

- Clerk middleware for authentication
- Verify userId in every protected route
- Zod validation on all inputs
- Rate limiting on sensitive endpoints
- Error responses never expose internal details
- Input sanitization
- CORS properly configured

---

## 9. Error Handling Strategy

Use custom ApiError class with consistent error response format:

```json
{
  "success": false,
  "error": "Invalid input",
  "code": "VALIDATION_ERROR"
}
```

Error codes:
- `VALIDATION_ERROR` - Input validation failed
- `UNAUTHORIZED` - User not authenticated
- `FORBIDDEN` - User not authorized for resource
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource already exists
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `AI_ERROR` - AI service failed
- `INTERNAL_ERROR` - Server error

---

## 10. Performance Considerations

- Prisma query optimization
- JSON field indexing where needed
- Caching of templates
- Debounced updates
- Efficient PDF generation (background if possible)

---

## 11. Future Ready Features

- Usage & Billing tracking
- Resume versioning
- Public resume sharing
- Analytics
- Team workspaces

---

## Response snapshot

Created comprehensive backend specification with:
- **Tech Stack**: Next.js 15 fullstack, Prisma + Neon PostgreSQL, Clerk auth, Google Gemini AI
- **Database Schema**: User and Resume models with proper relationships and indexes
- **API Routes**: 13 endpoints covering CRUD, AI improvements, ATS scoring, PDF generation
- **Security**: User isolation, Zod validation, rate limiting, error handling
- **Implementation Checklist**: 19 tasks for backend setup

---

## Outcome

- ✅ Impact: Backend specification approved and ready for planning phase
- 🧪 Tests: Specification includes acceptance criteria for all endpoints
- 📁 Files: Created backend-spec.md, backend-plan.md, backend-tasks.md
- 🔁 Next prompts: `/sp.plan` for detailed implementation planning
- 🧠 Reflection: Specification covers all critical backend concerns (auth, data isolation, AI integration, error handling, security)

---

## Evaluation notes (flywheel)

- Failure modes observed: None - specification is comprehensive and approved
- Graders run and results (PASS/FAIL): PASS - all sections complete and validated
- Prompt variant (if applicable): null
- Next experiment: Begin Phase 1 implementation (Prisma setup, migrations, Clerk webhook)
