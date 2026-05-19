# Backend Implementation Plan: AI Resume + ATS Builder

**Feature Branch**: `1-resume-builder`  
**Created**: 2026-05-19  
**Status**: In Progress  
**Based On**: backend-spec.md (Approved)

---

## 1. Scope and Dependencies

### In Scope
- Prisma schema setup with User and Resume models
- Database migrations for Neon PostgreSQL
- Clerk authentication middleware and webhook
- Core CRUD endpoints for resumes
- AI integration endpoints (Gemini)
- ATS scoring and job matching
- PDF generation endpoint
- Rate limiting on AI endpoints
- Error handling and validation

### Out of Scope
- Payment/billing system (Phase 2)
- Public resume sharing (Phase 2)
- Analytics dashboard (Phase 2)
- Team workspaces (Phase 3)
- Resume versioning (Phase 3)

### External Dependencies
- **Neon PostgreSQL**: Database hosting (managed)
- **Clerk**: Authentication service (managed)
- **Google Gemini API**: AI service (requires API key)
- **Upstash**: Rate limiting service (optional, can use Vercel KV)
- **Puppeteer**: PDF generation (npm package)

---

## 2. Key Decisions and Rationale

### Decision 1: Next.js Fullstack vs Separate Backend
**Options Considered:**
- Option A: Next.js Route Handlers + Server Actions (chosen)
- Option B: Separate FastAPI backend

**Rationale:**
- Faster development cycle (single codebase, shared types)
- Better performance (no network latency between frontend/backend)
- Easier deployment (single Vercel deployment)
- Simpler authentication (Clerk middleware works seamlessly)
- Cost-effective for MVP phase

**Trade-offs:**
- Less separation of concerns
- Harder to scale backend independently later
- Mitigation: Clean API layer abstraction for future migration

---

### Decision 2: Prisma ORM + Neon PostgreSQL
**Options Considered:**
- Option A: Prisma + Neon (chosen)
- Option B: Raw SQL queries
- Option C: MongoDB

**Rationale:**
- Type-safe queries (TypeScript integration)
- Built-in migrations
- Neon serverless PostgreSQL (scales automatically)
- Better for relational data (User-Resume relationship)

**Trade-offs:**
- ORM overhead vs raw SQL
- Mitigation: Query optimization and indexing

---

### Decision 3: Google Gemini for AI
**Options Considered:**
- Option A: Google Gemini (chosen)
- Option B: OpenAI GPT-4
- Option C: Anthropic Claude

**Rationale:**
- Cost-effective (cheaper than OpenAI)
- JSON mode for structured output
- Good for resume improvement tasks
- Generous free tier for testing

**Trade-offs:**
- Less powerful than GPT-4
- Mitigation: Use structured prompts and templates

---

## 3. Implementation Phases

### Phase 1: Database & Auth (Week 1)
1. Setup Prisma schema
2. Create database migrations
3. Setup Clerk webhook
4. Create auth middleware

### Phase 2: Core CRUD (Week 1-2)
1. GET /api/resumes (list)
2. POST /api/resumes (create)
3. GET /api/resumes/[id] (get)
4. PATCH /api/resumes/[id] (update)
5. DELETE /api/resumes/[id] (delete)

### Phase 3: AI Integration (Week 2-3)
1. Setup Gemini client
2. POST /api/resumes/[id]/ai/summary
3. POST /api/resumes/[id]/ai/experience
4. POST /api/resumes/[id]/ai/ats-score
5. POST /api/resumes/[id]/ai/job-match

### Phase 4: Advanced Features (Week 3-4)
1. POST /api/resumes/[id]/duplicate
2. GET /api/resumes/[id]/pdf
3. GET /api/templates
4. Rate limiting
5. Error handling

---

## 4. API Contract Details

### Resume Data Structure (JSON)

```typescript
interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location?: string;
    summary?: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    currentlyWorking: boolean;
    description: string;
    bullets: string[];
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    graduationDate: string;
  }>;
  skills: Array<{
    id: string;
    category: string;
    items: string[];
  }>;
  certifications?: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
}
```

### Error Response Format

```typescript
interface ApiError {
  success: false;
  error: string;
  code: string;
  details?: Record<string, any>;
}
```

### Success Response Format

```typescript
interface ApiSuccess<T> {
  success: true;
  data: T;
}
```

---

## 5. Database Schema Details

### User Model
- `id`: Primary key (CUID)
- `clerkId`: Unique identifier from Clerk
- `email`: User email (unique)
- `name`: User full name
- `resumes`: Relation to Resume model
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Resume Model
- `id`: Primary key (CUID)
- `userId`: Foreign key to User
- `title`: Resume title
- `data`: JSON field containing all resume content
- `templateId`: Selected template (default: "modern")
- `atsScore`: Cached ATS score (0-100)
- `isPublic`: Public sharing flag
- `lastDownloaded`: Last PDF download timestamp
- `createdAt`: Timestamp
- `updatedAt`: Timestamp
- Index on `userId` for fast queries

---

## 6. Security Implementation

### Authentication Flow
1. User signs in via Clerk
2. Clerk sets session token in cookie
3. Middleware verifies token on protected routes
4. Extract `userId` from Clerk session
5. Pass `userId` to all API handlers

### Authorization Pattern
```typescript
// Every protected endpoint must verify userId
const userId = auth().userId;
if (!userId) return unauthorized();

// Verify resource ownership
const resume = await db.resume.findUnique({
  where: { id: resumeId }
});
if (resume.userId !== userId) return forbidden();
```

### Input Validation
- Use Zod schemas for all inputs
- Validate before database operations
- Return 422 Unprocessable Entity on validation failure

### Rate Limiting
- AI endpoints: 10 requests per minute per user
- Use Upstash Ratelimit or Vercel KV
- Return 429 Too Many Requests when exceeded

---

## 7. AI Integration Details

### Gemini Setup
```typescript
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
```

### Structured Output Pattern
- Use JSON mode for consistent responses
- Define schema for each AI task
- Implement retry logic (max 2 retries)
- Fallback message on failure

### AI Endpoints

**POST /api/resumes/[id]/ai/summary**
- Input: Current summary text
- Output: Improved summary suggestions
- Rate limit: 10/min

**POST /api/resumes/[id]/ai/experience**
- Input: Experience entry
- Output: Improved bullet points
- Rate limit: 10/min

**POST /api/resumes/[id]/ai/ats-score**
- Input: Full resume data + job description (optional)
- Output: ATS score (0-100) + suggestions
- Rate limit: 10/min

**POST /api/resumes/[id]/ai/job-match**
- Input: Resume data + job description
- Output: Match percentage + missing keywords
- Rate limit: 10/min

---

## 8. PDF Generation

### Approach
- Use Puppeteer for server-side rendering
- Generate HTML from resume template
- Convert to PDF
- Stream to client

### Endpoint
**GET /api/resumes/[id]/pdf**
- Query param: `templateId` (optional)
- Response: PDF file download
- Caching: Cache generated PDFs for 1 hour

---

## 9. Testing Strategy

### Unit Tests
- Zod validation schemas
- Error handling utilities
- AI prompt generation

### Integration Tests
- Database operations (CRUD)
- API endpoints with auth
- Clerk webhook handling

### E2E Tests
- Create resume flow
- Update resume flow
- AI improvement flow
- PDF generation flow

---

## 10. Deployment Checklist

- [ ] Environment variables configured (.env.local)
- [ ] Database migrations run
- [ ] Clerk webhook configured
- [ ] Google Gemini API key set
- [ ] Rate limiting service configured
- [ ] Error logging setup
- [ ] CORS configured
- [ ] Health check endpoint working
- [ ] All endpoints tested
- [ ] Performance benchmarks met

---

## 11. Performance Targets

- GET /api/resumes: < 200ms
- POST /api/resumes: < 500ms
- PATCH /api/resumes/[id]: < 500ms
- AI endpoints: < 5s (with retry)
- PDF generation: < 10s

---

## 12. Risks and Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Gemini API quota exceeded | AI features unavailable | Implement rate limiting + fallback messages |
| Database connection pool exhausted | API timeouts | Use connection pooling + Prisma optimization |
| Large resume JSON bloats database | Performance degradation | Implement JSON compression + archiving |

---

**Next Step**: Create backend tasks for implementation
