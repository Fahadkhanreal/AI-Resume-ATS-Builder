# Backend Implementation Tasks - AI Resume + ATS Builder

**Feature:** 1-resume-builder  
**Spec Reference:** `specs/1-resume-builder/backend-spec.md`  
**Plan Reference:** `specs/1-resume-builder/implementation-plan.md`  
**Status:** Ready for Execution  
**Total Estimated Time:** 3.5-4 weeks

---

## Phase 1: Setup & Database Foundation

**Goal:** Initialize backend infrastructure and database connection  
**Deliverable:** Working Prisma setup with Neon PostgreSQL  
**Independent Test:** `npx prisma db push` succeeds, health check endpoint returns 200

### Setup Tasks

- [x] T001 Install Prisma and dependencies in `frontend/package.json`
- [x] T002 Create `.env.local` with database connection strings (DATABASE_URL, DATABASE_URL_UNPOOLED)
- [x] T003 Create `frontend/prisma/schema.prisma` with User and Resume models
- [x] T004 Run `npx prisma migrate dev --name init` to create database tables
- [x] T005 Create `frontend/lib/db.ts` - Prisma Client singleton export
- [x] T006 Create `frontend/app/api/health/route.ts` - Health check endpoint
- [x] T007 Create `.env.example` with all required environment variables
- [x] T008 Test database connection: `npx prisma db push` succeeds

---

## Phase 2: Authentication & Authorization Foundation

**Goal:** Setup Clerk authentication and user management  
**Deliverable:** User sync working, auth middleware protecting routes  
**Independent Test:** New Clerk user automatically created in database, protected routes return 401 without auth

### Authentication Tasks

- [x] T009 Create `frontend/middleware.ts` - Clerk auth middleware protecting `/api/resumes/*` and `/dashboard`
- [x] T010 Create `frontend/lib/auth.ts` - Auth helper functions (getCurrentUserId, getCurrentUser)
- [x] T011 Create `frontend/app/api/auth/webhook/route.ts` - Clerk webhook handler for user sync
- [x] T012 Install `svix` package for webhook signature verification
- [ ] T013 Configure Clerk webhook in Clerk dashboard pointing to `/api/auth/webhook`
- [ ] T014 Test auth flow: Sign up new user, verify created in database

---

## Phase 3: Error Handling & Validation Utilities

**Goal:** Establish consistent error handling and input validation patterns  
**Deliverable:** Reusable error handlers and Zod schemas  
**Independent Test:** Error responses follow spec format, validation rejects invalid input

### Utility Tasks

- [x] T015 Create `frontend/lib/errors/api-error.ts` - Custom ApiError class
- [x] T016 Create `frontend/lib/errors/handlers.ts` - Error response helpers (unauthorized, forbidden, notFound, etc.)
- [x] T017 Create `frontend/lib/schemas/resume.ts` - Zod schemas for resume validation
- [x] T018 Create `frontend/lib/schemas/ai.ts` - Zod schemas for AI endpoint validation
- [x] T019 Create `frontend/types/resume.ts` - TypeScript types for resume data structure

---

## Phase 4: Resume CRUD Operations (User Story 1)

**Goal:** Implement core resume management functionality  
**User Story:** User can create, read, update, delete resumes with real-time preview  
**Deliverable:** All CRUD endpoints working with proper user isolation  
**Independent Test:** User can create resume, see it in list, update it, delete it; User B cannot access User A's resume

### CRUD Implementation Tasks

- [x] T020 [P] [US1] Create `frontend/app/api/resumes/route.ts` - GET (list) and POST (create) handlers
- [x] T021 [P] [US1] Create `frontend/app/api/resumes/[resumeId]/route.ts` - GET, PATCH, DELETE handlers
- [x] T022 [P] [US1] Create `frontend/app/api/resumes/[resumeId]/duplicate/route.ts` - Duplicate endpoint
- [x] T023 [US1] Create `frontend/lib/resume-utils.ts` - Resume utility functions (default structure, validation)
- [ ] T024 [US1] Test all CRUD endpoints with Postman/Thunder Client
- [ ] T025 [US1] Test user isolation: Verify User B cannot access User A's resume

---

## Phase 5: Resume Data Structure & Defaults

**Goal:** Define and implement resume data schema  
**Deliverable:** Default resume structure, type safety  
**Independent Test:** New resume has all required sections, data structure matches schema

### Data Structure Tasks

- [x] T026 [P] Create default resume template in `frontend/lib/resume-utils.ts`
- [x] T027 [P] Create resume data sanitization functions in `frontend/lib/resume-utils.ts`
- [x] T028 Create `frontend/lib/resume-validator.ts` - Resume data validation logic
- [x] T029 Test default resume structure: New resume has all sections

---

## Phase 6: AI Integration Core (User Story 2)

**Goal:** Setup Gemini AI service and structured responses  
**User Story:** User can improve resume content with AI suggestions  
**Deliverable:** Gemini service working with JSON mode, rate limiting active  
**Independent Test:** AI endpoint returns structured JSON response, rate limiting blocks 11th request

### AI Core Tasks

- [x] T030 [P] Install `@google/generative-ai` package
- [x] T031 [P] Install `@upstash/ratelimit` and `@upstash/redis` packages
- [x] T032 Create `frontend/lib/ai/gemini.ts` - Gemini service layer with JSON mode
- [x] T033 Create `frontend/lib/ai/prompts.ts` - Prompt templates for each AI task
- [x] T034 Create `frontend/lib/ai/parser.ts` - JSON response parser and validator
- [x] T035 Create `frontend/lib/rate-limit.ts` - Rate limiting helper (10 requests/min per user)
- [ ] T036 Test Gemini connection: Call API and verify JSON response

---

## Phase 7: AI Improvement Endpoints (User Story 2)

**Goal:** Implement AI-powered resume improvement endpoints  
**User Story:** User can improve summary, experience, skills with AI  
**Deliverable:** All AI endpoints working with rate limiting  
**Independent Test:** Each endpoint returns suggestions, rate limiting enforced

### AI Endpoints Tasks

- [x] T037 [P] [US2] Create `frontend/app/api/resumes/[id]/ai/summary/route.ts` - Improve summary
- [x] T038 [P] [US2] Create `frontend/app/api/resumes/[id]/ai/experience/route.ts` - Improve experience
- [x] T039 [P] [US2] Create `frontend/app/api/resumes/[id]/ai/skills/route.ts` - Optimize skills
- [ ] T040 [US2] Test all AI endpoints with sample data
- [ ] T041 [US2] Test rate limiting: Verify 11th request returns 429

---

## Phase 8: ATS Score Engine (User Story 3)

**Goal:** Implement ATS scoring and analysis  
**User Story:** User can check ATS score and get improvement suggestions  
**Deliverable:** ATS score calculation working, suggestions generated  
**Independent Test:** Resume returns ATS score 0-100 with breakdown and suggestions

### ATS Scoring Tasks

- [x] T042 [P] Create `frontend/lib/ats/keyword-analyzer.ts` - Keyword extraction and matching
- [x] T043 [P] Create `frontend/lib/ats/readability.ts` - Readability score calculation
- [x] T044 Create `frontend/lib/ats/scorer.ts` - Main ATS scoring algorithm (hybrid approach)
- [x] T045 Create `frontend/app/api/resumes/[id]/ai/ats-score/route.ts` - ATS score endpoint
- [x] T046 Test ATS scoring: Verify score calculation and suggestions

---

## Phase 9: Job Match Analysis (User Story 4)

**Goal:** Implement job description matching  
**User Story:** User can analyze resume match against job description  
**Deliverable:** Job match endpoint working with keyword analysis  
**Independent Test:** Endpoint returns match percentage and missing keywords

### Job Match Tasks

- [x] T047 [P] Create `frontend/lib/job-match/analyzer.ts` - Job description analysis
- [x] T048 Create `frontend/app/api/resumes/[id]/ai/job-match/route.ts` - Job match endpoint
- [x] T049 Test job matching: Verify match percentage and keyword suggestions

---

## Phase 10: Templates Management (User Story 5)

**Goal:** Implement resume templates  
**User Story:** User can select from multiple resume templates  
**Deliverable:** Templates API working, templates selectable  
**Independent Test:** GET /api/templates returns list of templates

### Templates Tasks

- [x] T050 Create `frontend/lib/templates/index.ts` - Template definitions (Modern, Classic, Minimal, Corporate, Tech)
- [x] T051 Create `frontend/app/api/templates/route.ts` - Get templates endpoint
- [x] T052 Test templates: Verify all templates returned with correct structure

---

## Phase 11: PDF Generation (User Story 6)

**Goal:** Implement PDF export functionality  
**User Story:** User can download resume as PDF  
**Deliverable:** PDF generation working, multiple templates supported  
**Independent Test:** PDF endpoint returns valid PDF file

### PDF Generation Tasks

- [x] T053 [P] Install `puppeteer` package
- [x] T054 Create `frontend/lib/pdf/generator.ts` - PDF generation service
- [x] T055 Create `frontend/lib/pdf/templates.ts` - PDF template rendering
- [x] T056 Create `frontend/app/api/resumes/[id]/pdf/route.ts` - PDF download endpoint
- [x] T057 Test PDF generation: Download PDF and verify file validity

---

## Phase 12: Advanced Features & Security

**Goal:** Implement quota system, rate limiting, security hardening  
**Deliverable:** Rate limiting on all routes, input sanitization, security audit complete  
**Independent Test:** Rate limiting blocks excessive requests, user isolation verified on all endpoints

### Advanced Features Tasks

- [x] T058 [P] Create `frontend/lib/quota.ts` - Usage quota system (Free vs Paid)
- [x] T059 Create `frontend/lib/sanitize.ts` - Input sanitization utilities
- [x] T060 Add rate limiting to all major routes (PATCH, DELETE, AI endpoints)
- [x] T061 Security audit: Verify user isolation on all endpoints
- [x] T062 Create `frontend/lib/logging.ts` - Structured logging for debugging
- [ ] T063 Test security: Verify User B cannot access User A data on all endpoints

---

## Phase 13: Optimization & Polish

**Goal:** Optimize queries, standardize responses, clean up code  
**Deliverable:** Optimized queries, consistent error messages, clean code  
**Independent Test:** API responses < 500ms, error messages consistent

### Optimization Tasks

- [x] T064 [P] Optimize Prisma queries: Add select/include to reduce data transfer
- [x] T065 [P] Create response wrapper: Standardize all API responses
- [x] T066 Standardize error messages across all endpoints
- [x] T067 Add code comments and documentation
- [ ] T068 Test performance: Verify API response times < 500ms

---

## Phase 14: Testing & Finalization

**Goal:** Comprehensive testing and final validation  
**Deliverable:** All endpoints tested, edge cases handled, ready for production  
**Independent Test:** All endpoints pass manual testing, edge cases handled

### Testing Tasks

- [ ] T069 [P] Test all CRUD endpoints with various data
- [ ] T070 [P] Test all AI endpoints with edge cases
- [ ] T071 Test user isolation on all endpoints
- [ ] T072 Test rate limiting on all protected endpoints
- [ ] T073 Test error handling: Invalid input, missing fields, unauthorized access
- [ ] T074 Test PDF generation with different templates
- [ ] T075 Final security review: Check for vulnerabilities
- [x] T076 Final code cleanup and documentation

---

## Dependency Graph

```
Phase 1 (Setup) → Phase 2 (Auth) → Phase 3 (Utils)
                                  ↓
                    Phase 4 (CRUD) [US1]
                    Phase 6 (AI Core) → Phase 7 (AI Endpoints) [US2]
                    Phase 8 (ATS) [US3]
                    Phase 9 (Job Match) [US4]
                    Phase 10 (Templates) [US5]
                    Phase 11 (PDF) [US6]
                                  ↓
                    Phase 12 (Security)
                    Phase 13 (Optimization)
                    Phase 14 (Testing)
```

---

## Parallel Execution Opportunities

**Can run in parallel after Phase 3:**
- Phase 4 (CRUD) - Independent user story
- Phase 6 (AI Core) - Independent user story
- Phase 8 (ATS) - Independent user story
- Phase 9 (Job Match) - Independent user story
- Phase 10 (Templates) - Independent user story
- Phase 11 (PDF) - Independent user story

**Recommended MVP Scope (Week 1):**
- Phase 1: Setup & Database
- Phase 2: Authentication
- Phase 3: Utils
- Phase 4: Resume CRUD (User Story 1)

**Recommended Phase 2 Scope (Week 2):**
- Phase 6: AI Core + Phase 7: AI Endpoints (User Story 2)
- Phase 8: ATS Score (User Story 3)

---

## Implementation Strategy

1. **Week 1 (MVP):** Phases 1-4 (Database, Auth, CRUD)
2. **Week 2:** Phases 6-9 (AI, ATS, Job Match)
3. **Week 3:** Phases 10-11 (Templates, PDF)
4. **Week 4:** Phases 12-14 (Security, Optimization, Testing)

---

## Success Criteria

- ✅ All CRUD operations working with user isolation
- ✅ AI features returning structured JSON responses
- ✅ ATS Score + Job Match working
- ✅ PDF download working with good quality
- ✅ Rate limiting enforced on all endpoints
- ✅ Error handling consistent across all endpoints
- ✅ Security audit passed (user isolation verified)
- ✅ All endpoints tested and working

---

**Status:** Ready for Phase 1 execution  
**Next:** Begin Phase 1 setup tasks



