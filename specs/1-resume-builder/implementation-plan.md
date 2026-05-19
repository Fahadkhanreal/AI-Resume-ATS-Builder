# Backend Implementation Plan - AI Resume + ATS Builder

**Version:** 1.0  
**Date:** 2026-05-19  
**Spec Reference:** `specs/1-resume-builder/backend-spec.md`  
**Architecture:** Next.js 15 Fullstack (Route Handlers + Server Actions)  
**Status:** In Planning

## Objective

Secure, scalable, fast aur maintainable backend banana jo AI features, resume data aur PDF generation ko efficiently handle kare.

---

## Phase 0: Research & Unknowns Resolution

### Technical Context Analysis

**Known Decisions:**
- ✅ Next.js 15 fullstack (Route Handlers + Server Actions)
- ✅ Prisma + Neon PostgreSQL
- ✅ Clerk authentication
- ✅ Google Gemini AI
- ✅ Zod validation
- ✅ Upstash rate limiting

**Unknowns to Resolve:**
- [ ] Prisma v5 schema syntax (directUrl vs url)
- [ ] Neon connection pooling configuration
- [ ] Gemini structured output format (JSON mode)
- [ ] Rate limiting implementation (Upstash vs Vercel KV)
- [ ] PDF generation library choice (Puppeteer vs @react-pdf/renderer)
- [ ] Resume data JSON schema structure
- [ ] ATS scoring algorithm approach

---

## Phase 1: Design & Data Models

### Data Model: User

```typescript
interface User {
  id: string;              // CUID
  clerkId: string;         // Unique from Clerk
  email: string;           // Unique
  name: string | null;
  resumes: Resume[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Data Model: Resume

```typescript
interface Resume {
  id: string;              // CUID
  userId: string;          // FK to User
  title: string;
  data: ResumeData;        // JSON
  templateId: string;      // Default: "modern"
  atsScore: number | null; // 0-100
  isPublic: boolean;
  lastDownloaded: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location?: string;
    summary?: string;
  };
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillEntry[];
  certifications?: CertificationEntry[];
}

interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  description: string;
  bullets: string[];
}

interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
}

interface SkillEntry {
  id: string;
  category: string;
  items: string[];
}

interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
}
```

---

## Phase 2: API Contracts

### Resume CRUD Endpoints

**POST /api/resumes** - Create Resume
```
Request: { title: string; templateId?: string }
Response: { success: true; data: Resume }
Errors: 400, 401, 422
```

**GET /api/resumes** - List Resumes
```
Request: ?page=1&limit=10
Response: { success: true; data: Resume[]; pagination: {...} }
Errors: 401
```

**GET /api/resumes/[id]** - Get Single Resume
```
Response: { success: true; data: Resume }
Errors: 401, 403, 404
```

**PATCH /api/resumes/[id]** - Update Resume
```
Request: Partial<Resume>
Response: { success: true; data: Resume }
Errors: 400, 401, 403, 404, 422
```

**DELETE /api/resumes/[id]** - Delete Resume
```
Response: { success: true }
Errors: 401, 403, 404
```

---

## Phase-wise Implementation Timeline

### Phase 0: Backend Setup & Database (Day 1)

- [ ] Prisma setup with Neon PostgreSQL
- [ ] Database connection & connection pooling
- [ ] Prisma Schema creation (User + Resume models)
- [ ] Prisma migration
- [ ] Prisma Client generation
- [ ] Environment variables setup
- [ ] Basic health check route

**Deliverable:** Working database connection

---

### Phase 1: Authentication & Authorization (Days 2-3)

- [ ] Clerk webhook setup
- [ ] User sync logic
- [ ] Auth middleware
- [ ] Route protection
- [ ] User ownership validation

---

### Phase 2: Resume CRUD Operations (Days 4-5)

- [ ] POST /api/resumes (Create)
- [ ] GET /api/resumes (List)
- [ ] GET /api/resumes/[id] (Get)
- [ ] PATCH /api/resumes/[id] (Update)
- [ ] DELETE /api/resumes/[id] (Delete)
- [ ] POST /api/resumes/[id]/duplicate
- [ ] Input validation with Zod
- [ ] Error handling

---

### Phase 3: Resume Data Structure & Utils (Day 6)

- [ ] Resume TypeScript types
- [ ] Default template structure
- [ ] Utility functions
- [ ] Auto-save support

---

### Phase 4: AI Integration Core (Days 7-10)

- [ ] Gemini service layer
- [ ] Structured prompts
- [ ] Rate limiting
- [ ] Error handling & fallback
- [ ] Token usage logging

**AI Routes:**
- POST /api/resumes/[id]/ai/summary
- POST /api/resumes/[id]/ai/experience
- POST /api/resumes/[id]/ai/skills
- POST /api/resumes/[id]/ai/ats-score
- POST /api/resumes/[id]/ai/job-match

---

### Phase 5: ATS Score Engine (Days 11-12)

- [ ] ATS scoring logic
- [ ] Keyword analysis
- [ ] Readability score
- [ ] Suggestions generator

---

### Phase 6: Templates Management (Day 13)

- [ ] Templates data
- [ ] GET /api/templates
- [ ] Template validation
- [ ] Default templates

---

### Phase 7: PDF Generation (Days 14-16)

- [ ] PDF generation setup
- [ ] GET /api/resumes/[id]/pdf
- [ ] Multiple template support
- [ ] ATS-friendly optimization

---

### Phase 8: Advanced Features & Security (Days 17-19)

- [ ] Job Match Analyzer
- [ ] Usage limits & quota
- [ ] Rate limiting on all routes
- [ ] Security audit
- [ ] Logging strategy

---

### Phase 9: Optimization & Polish (Days 20-21)

- [ ] Query optimization
- [ ] Caching strategy
- [ ] Response optimization
- [ ] Error standardization
- [ ] Documentation

---

### Phase 10: Testing & Finalization (Days 22-23)

- [ ] Manual API testing
- [ ] Edge cases
- [ ] AI fallback testing
- [ ] Security testing
- [ ] Performance testing

---

## Total Estimated Time: 3.5 Weeks (23 days)

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
- @google/generative-ai
- Puppeteer (or @react-pdf/renderer)
- Upstash Ratelimit
- Sonner (frontend toasts)

---

## Success Criteria

- ✅ All CRUD operations working with user isolation
- ✅ AI features returning structured responses
- ✅ ATS Score + Job Match working
- ✅ PDF download working
- ✅ Rate limiting & error handling in place
- ✅ Secure and clean code

---

**Status:** Ready for Phase 0 Research  
**Next:** Resolve unknowns, then proceed to Phase 1 Design
