# Backend Implementation Tasks: AI Resume + ATS Builder

**Feature Branch**: `1-resume-builder`  
**Status**: Ready for Implementation  
**Based On**: backend-plan.md

---

## Phase 1: Database & Authentication Setup

### Task 1.1: Setup Prisma Schema
**Priority**: P0 (Blocker)  
**Estimated**: 1-2 hours  
**Dependencies**: None

**Description**:
Set up Prisma ORM with PostgreSQL connection to Neon database. Create User and Resume models with proper relationships and indexes.

**Acceptance Criteria**:
- [ ] Prisma installed and configured
- [ ] `.env.local` has `DATABASE_URL` pointing to Neon
- [ ] `schema.prisma` contains User and Resume models
- [ ] User model has: id, clerkId (unique), email (unique), name, resumes relation, timestamps
- [ ] Resume model has: id, userId (FK), title, data (JSON), templateId, atsScore, isPublic, lastDownloaded, timestamps
- [ ] Index on Resume.userId for query performance
- [ ] `prisma generate` runs without errors
- [ ] Schema validates with `prisma validate`

**Implementation Notes**:
- Use CUID for primary keys
- Resume.data is JSON type to store flexible resume structure
- Add cascade delete on User-Resume relationship
- Neon connection string format: `postgresql://user:password@host/database`

**Files to Create/Modify**:
- `prisma/schema.prisma` (create)
- `.env.local` (update with DATABASE_URL)

---

### Task 1.2: Create Database Migrations
**Priority**: P0 (Blocker)  
**Estimated**: 30 minutes  
**Dependencies**: Task 1.1

**Description**:
Generate and run Prisma migrations to create database tables in Neon PostgreSQL.

**Acceptance Criteria**:
- [ ] Migration file created: `prisma/migrations/[timestamp]_init/migration.sql`
- [ ] Migration contains CREATE TABLE for users and resumes
- [ ] Migration includes indexes on userId
- [ ] `prisma migrate deploy` runs successfully
- [ ] Tables exist in Neon database (verify via Neon console)
- [ ] No migration errors or warnings

**Implementation Notes**:
- Run `prisma migrate dev --name init` to create migration
- Verify migration SQL before deploying
- Test migration is reversible with `prisma migrate resolve`

**Files to Create/Modify**:
- `prisma/migrations/` (auto-generated)

---

### Task 1.3: Setup Clerk Authentication Middleware
**Priority**: P0 (Blocker)  
**Estimated**: 1 hour  
**Dependencies**: Task 1.1

**Description**:
Create Next.js middleware to protect API routes and extract user context from Clerk authentication.

**Acceptance Criteria**:
- [ ] `middleware.ts` exists in project root
- [ ] Middleware protects `/api/resumes/*` routes
- [ ] Middleware protects `/dashboard` route
- [ ] Middleware allows `/api/templates` (public)
- [ ] Middleware allows `/api/auth/webhook` (webhook secret)
- [ ] `auth()` function available in API routes
- [ ] `userId` extractable from `auth().userId`
- [ ] Unauthenticated requests return 401 Unauthorized
- [ ] Middleware doesn't block `/sign-in` or `/sign-up`

**Implementation Notes**:
- Use `@clerk/nextjs` middleware
- Pattern: `const { userId } = auth(); if (!userId) return unauthorized();`
- Clerk session available in both Route Handlers and Server Actions

**Files to Create/Modify**:
- `middleware.ts` (create)

---

### Task 1.4: Create Clerk Webhook Handler
**Priority**: P1  
**Estimated**: 1 hour  
**Dependencies**: Task 1.1, Task 1.3

**Description**:
Implement webhook endpoint to sync Clerk user events (user.created, user.updated, user.deleted) with database.

**Acceptance Criteria**:
- [ ] `POST /api/auth/webhook` endpoint exists
- [ ] Webhook verifies Clerk signature using `svix` library
- [ ] On `user.created`: Create User record in database
- [ ] On `user.updated`: Update User record (email, name)
- [ ] On `user.deleted`: Delete User record (cascade deletes resumes)
- [ ] Webhook returns 200 OK on success
- [ ] Webhook returns 400 on invalid signature
- [ ] Webhook logs all events for debugging
- [ ] Webhook configured in Clerk dashboard

**Implementation Notes**:
- Use `svix` for webhook verification
- Extract clerkId, email, firstName, lastName from webhook payload
- Handle idempotency (same event fired multiple times)

**Files to Create/Modify**:
- `app/api/auth/webhook/route.ts` (create)

---

## Phase 2: Core CRUD Endpoints

### Task 2.1: GET /api/resumes (List All User Resumes)
**Priority**: P0  
**Estimated**: 1 hour  
**Dependencies**: Task 1.3

**Description**:
Implement endpoint to fetch all resumes for authenticated user with pagination support.

**Acceptance Criteria**:
- [ ] Endpoint returns 200 with array of resumes
- [ ] Only returns resumes owned by authenticated user
- [ ] Supports pagination: `?page=1&limit=10`
- [ ] Returns: id, title, templateId, atsScore, createdAt, updatedAt
- [ ] Does NOT return full resume.data (too large)
- [ ] Sorted by createdAt descending (newest first)
- [ ] Returns 401 if unauthenticated
- [ ] Returns empty array if no resumes

**Response Format**:
```json
{
  "success": true,
  "data": [
    {
      "id": "cuid123",
      "title": "My Resume",
      "templateId": "modern",
      "atsScore": 85,
      "createdAt": "2026-05-19T10:00:00Z",
      "updatedAt": "2026-05-19T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5
  }
}
```

**Files to Create/Modify**:
- `app/api/resumes/route.ts` (create GET handler)

---

### Task 2.2: POST /api/resumes (Create New Resume)
**Priority**: P0  
**Estimated**: 1.5 hours  
**Dependencies**: Task 1.3

**Description**:
Implement endpoint to create new resume with initial data structure.

**Acceptance Criteria**:
- [ ] Accepts POST request with title and optional templateId
- [ ] Validates input with Zod schema
- [ ] Creates resume with empty data structure
- [ ] Sets default templateId to "modern" if not provided
- [ ] Returns 201 Created with full resume object
- [ ] Returns 400 if title is missing or empty
- [ ] Returns 401 if unauthenticated
- [ ] Returns 422 if validation fails
- [ ] Resume data initialized with empty sections

**Request Format**:
```json
{
  "title": "My First Resume",
  "templateId": "modern"
}
```

**Response Format**:
```json
{
  "success": true,
  "data": {
    "id": "cuid123",
    "userId": "user123",
    "title": "My First Resume",
    "templateId": "modern",
    "atsScore": 0,
    "isPublic": false,
    "data": {
      "personalInfo": {},
      "experience": [],
      "education": [],
      "skills": [],
      "certifications": []
    },
    "createdAt": "2026-05-19T10:00:00Z",
    "updatedAt": "2026-05-19T10:00:00Z"
  }
}
```

**Files to Create/Modify**:
- `app/api/resumes/route.ts` (add POST handler)
- `lib/schemas/resume.ts` (create Zod schemas)

---

### Task 2.3: GET /api/resumes/[id] (Get Single Resume)
**Priority**: P0  
**Estimated**: 1 hour  
**Dependencies**: Task 1.3

**Description**:
Implement endpoint to fetch complete resume data for authenticated user.

**Acceptance Criteria**:
- [ ] Returns 200 with full resume object including data
- [ ] Only returns resume if owned by authenticated user
- [ ] Returns 404 if resume not found
- [ ] Returns 403 if resume owned by different user
- [ ] Returns 401 if unauthenticated
- [ ] Includes all resume fields: id, userId, title, data, templateId, atsScore, isPublic, timestamps

**Files to Create/Modify**:
- `app/api/resumes/[resumeId]/route.ts` (create GET handler)

---

### Task 2.4: PATCH /api/resumes/[id] (Update Resume)
**Priority**: P0  
**Estimated**: 1.5 hours  
**Dependencies**: Task 1.3

**Description**:
Implement endpoint to update resume data with validation and conflict detection.

**Acceptance Criteria**:
- [ ] Accepts PATCH request with partial resume data
- [ ] Validates input with Zod schema
- [ ] Only updates resume if owned by authenticated user
- [ ] Supports updating: title, templateId, data, isPublic
- [ ] Returns 200 with updated resume
- [ ] Returns 400 if data is invalid
- [ ] Returns 403 if not owner
- [ ] Returns 404 if resume not found
- [ ] Returns 401 if unauthenticated
- [ ] Updates updatedAt timestamp

**Request Format**:
```json
{
  "title": "Updated Title",
  "data": {
    "personalInfo": { "fullName": "John Doe" },
    "experience": [],
    "education": [],
    "skills": []
  }
}
```

**Files to Create/Modify**:
- `app/api/resumes/[resumeId]/route.ts` (add PATCH handler)

---

### Task 2.5: DELETE /api/resumes/[id] (Delete Resume)
**Priority**: P0  
**Estimated**: 45 minutes  
**Dependencies**: Task 1.3

**Description**:
Implement endpoint to delete resume with proper authorization checks.

**Acceptance Criteria**:
- [ ] Accepts DELETE request
- [ ] Only deletes resume if owned by authenticated user
- [ ] Returns 204 No Content on success
- [ ] Returns 403 if not owner
- [ ] Returns 404 if resume not found
- [ ] Returns 401 if unauthenticated
- [ ] Permanently removes resume from database

**Files to Create/Modify**:
- `app/api/resumes/[resumeId]/route.ts` (add DELETE handler)

---

## Phase 3: Advanced Features (Part 1)

### Task 3.1: POST /api/resumes/[id]/duplicate (Duplicate Resume)
**Priority**: P1  
**Estimated**: 1 hour  
**Dependencies**: Task 2.1, Task 2.2

**Description**:
Implement endpoint to create a copy of existing resume with new title.

**Acceptance Criteria**:
- [ ] Accepts POST request with optional newTitle
- [ ] Creates exact copy of resume data
- [ ] Sets title to "Copy of {original title}" if newTitle not provided
- [ ] Returns 201 Created with new resume
- [ ] Returns 403 if not owner
- [ ] Returns 404 if source resume not found
- [ ] Returns 401 if unauthenticated

**Request Format**:
```json
{
  "newTitle": "My Resume - Copy"
}
```

**Files to Create/Modify**:
- `app/api/resumes/[resumeId]/duplicate/route.ts` (create)

---

### Task 3.2: GET /api/templates (List Available Templates)
**Priority**: P1  
**Estimated**: 1 hour  
**Dependencies**: None

**Description**:
Implement public endpoint to list available resume templates.

**Acceptance Criteria**:
- [ ] Returns 200 with array of templates
- [ ] No authentication required
- [ ] Each template includes: id, name, description, preview (optional)
- [ ] Returns at least 3 templates: modern, classic, minimal
- [ ] Template data is cached (no database queries)
- [ ] Response format is consistent

**Response Format**:
```json
{
  "success": true,
  "data": [
    {
      "id": "modern",
      "name": "Modern",
      "description": "Clean and contemporary design",
      "preview": "https://..."
    }
  ]
}
```

**Files to Create/Modify**:
- `app/api/templates/route.ts` (create)
- `lib/templates/index.ts` (create template definitions)

---

## Phase 4: Error Handling & Utilities

### Task 4.1: Create Error Handling Utilities
**Priority**: P1  
**Estimated**: 1.5 hours  
**Dependencies**: None

**Description**:
Implement centralized error handling with custom ApiError class and response helpers.

**Acceptance Criteria**:
- [ ] ApiError class with code, message, statusCode
- [ ] Helper functions: unauthorized(), forbidden(), notFound(), badRequest(), conflict(), rateLimitExceeded(), internalError()
- [ ] All helpers return proper JSON response with error code
- [ ] Error responses follow spec format: { success: false, error, code }
- [ ] Error logging captures stack traces
- [ ] No sensitive data in error messages

**Files to Create/Modify**:
- `lib/errors/api-error.ts` (create)
- `lib/errors/handlers.ts` (create)

---

### Task 4.2: Create Input Validation Schemas
**Priority**: P1  
**Estimated**: 1.5 hours  
**Dependencies**: None

**Description**:
Implement Zod schemas for all API inputs with proper validation rules.

**Acceptance Criteria**:
- [ ] Schema for resume creation (title, templateId)
- [ ] Schema for resume update (title, templateId, data)
- [ ] Schema for AI endpoints (text inputs, job descriptions)
- [ ] All schemas validate string lengths, required fields
- [ ] Schemas provide helpful error messages
- [ ] Schemas are reusable across endpoints

**Files to Create/Modify**:
- `lib/schemas/resume.ts` (create)
- `lib/schemas/ai.ts` (create)

---

## Phase 5: Health Check

### Task 5.1: GET /api/health (Health Check Endpoint)
**Priority**: P2  
**Estimated**: 30 minutes  
**Dependencies**: Task 1.1

**Description**:
Implement public health check endpoint for monitoring and deployment verification.

**Acceptance Criteria**:
- [ ] Returns 200 OK
- [ ] No authentication required
- [ ] Includes: status, timestamp, database connection status
- [ ] Database check verifies Prisma connection
- [ ] Response format: { success: true, status: "healthy", timestamp, database: "connected" }

**Files to Create/Modify**:
- `app/api/health/route.ts` (create)

---

## Implementation Order

1. **Week 1 (Days 1-2)**: Tasks 1.1, 1.2, 1.3, 1.4
2. **Week 1 (Days 3-5)**: Tasks 2.1, 2.2, 2.3, 2.4, 2.5
3. **Week 2 (Days 1-2)**: Tasks 3.1, 3.2, 4.1, 4.2
4. **Week 2 (Day 3)**: Task 5.1

---

## Testing Requirements

Each task must include:
- [ ] Unit tests for validation schemas
- [ ] Integration tests for API endpoints
- [ ] Manual testing with Postman/curl
- [ ] Authorization checks verified
- [ ] Error cases tested

---

**Next Step**: Begin Phase 1 implementation with Task 1.1
