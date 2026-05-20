---
name: backend-specification-approved
description: Next.js fullstack architecture with Prisma, Clerk, Gemini AI approved for implementation
metadata:
  type: project
---

## Backend Architecture Approved

**Status**: Approved by Fahd on 2026-05-19

**Tech Stack**:
- Framework: Next.js 15 (App Router)
- Database: Neon PostgreSQL + Prisma ORM
- Auth: Clerk (server-side verification)
- AI: Google Gemini (structured JSON output)
- Validation: Zod
- Rate Limiting: Upstash Ratelimit or Vercel KV
- PDF: Puppeteer + @react-pdf/renderer

**Key Decisions**:
- Fullstack Next.js (not separate FastAPI backend) for faster development
- Prisma ORM for type-safe queries and migrations
- Gemini AI for cost-effectiveness and JSON mode support
- User isolation via userId checks in every request

**Database Models**:
- User: id, clerkId (unique), email (unique), name, resumes relation, timestamps
- Resume: id, userId (FK), title, data (JSON), templateId, atsScore, isPublic, lastDownloaded, timestamps

**API Routes** (13 endpoints):
- CRUD: GET/POST /api/resumes, GET/PATCH/DELETE /api/resumes/[id]
- Advanced: POST /api/resumes/[id]/duplicate, GET /api/resumes/[id]/pdf
- AI: POST /api/resumes/[id]/ai/{summary,experience,ats-score,job-match}
- Public: GET /api/templates, POST /api/auth/webhook, GET /api/health

**Security**:
- Clerk middleware protects /api/resumes/*, /dashboard
- Zod validation on all inputs
- Rate limiting: 10 AI requests/min per user
- Error responses never expose internal details
- User isolation enforced in every endpoint

**Implementation Phases**:
1. Phase 1: Database & Auth (Prisma, migrations, Clerk webhook)
2. Phase 2: Core CRUD (list, create, get, update, delete)
3. Phase 3: AI Integration (Gemini endpoints)
4. Phase 4: Advanced Features (duplicate, PDF, templates, rate limiting)

**Why**: SaaS product requires proper data isolation, cost control, and clean architecture. Fullstack Next.js enables faster iteration while maintaining security and scalability.

**How to apply**: All backend implementation must follow this spec exactly. No deviations without explicit approval.
