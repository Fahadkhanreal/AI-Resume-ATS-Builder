# Backend Specification: AI Resume + ATS Builder

**Version:** 1.0  
**Date:** 2026-05-19  
**Project:** AI Resume + ATS Builder  
**Architecture:** Next.js 15 Fullstack (App Router)  
**Status:** Approved  
**Approved By:** Fahd

---

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

### Main Models

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

## Implementation Checklist

- [ ] Prisma schema setup with User and Resume models
- [ ] Database migrations
- [ ] Clerk authentication middleware
- [ ] GET /api/resumes (list all user resumes)
- [ ] POST /api/resumes (create new resume)
- [ ] GET /api/resumes/[id] (get single resume)
- [ ] PATCH /api/resumes/[id] (update resume)
- [ ] DELETE /api/resumes/[id] (delete resume)
- [ ] POST /api/resumes/[id]/duplicate (duplicate resume)
- [ ] GET /api/templates (list templates)
- [ ] POST /api/resumes/[id]/ai/summary (AI improve summary)
- [ ] POST /api/resumes/[id]/ai/experience (AI improve experience)
- [ ] POST /api/resumes/[id]/ai/ats-score (ATS scoring)
- [ ] POST /api/resumes/[id]/ai/job-match (Job matching)
- [ ] GET /api/resumes/[id]/pdf (PDF generation)
- [ ] Rate limiting implementation
- [ ] Error handling middleware
- [ ] Input validation with Zod
- [ ] Clerk webhook handler
- [ ] Health check endpoint

---

**This Backend Specification is the Source of Truth.**  
**No backend implementation will deviate from this spec.**
