# Phase 0: Research & Unknowns Resolution

**Date:** 2026-05-19  
**Feature:** 1-resume-builder  
**Status:** Research Complete

---

## Unknown 1: Prisma v5 Schema Syntax

**Question:** Should we use `url` or `directUrl` in datasource?

**Research:**
- Prisma v5+ requires `directUrl` for direct database connections
- `url` is used for connection pooling (Neon Pooler)
- Neon provides both URLs: regular (pooled) and unpooled (direct)

**Decision:** Use both
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")           // Pooled connection
  directUrl = env("DATABASE_URL_UNPOOLED")  // Direct connection for migrations
}
```

**Rationale:** Pooled for app, direct for migrations (Prisma requirement)

---

## Unknown 2: Neon Connection Pooling

**Question:** How to configure Neon connection pooling?

**Research:**
- Neon provides built-in connection pooling via PgBouncer
- Connection string format: `postgresql://user:password@host/database?sslmode=require`
- Pooler endpoint: `host-pooler.neon.tech` (for pooled connections)
- Direct endpoint: `host.neon.tech` (for direct connections)

**Decision:** Use Neon's pooler endpoint for app connections

**Configuration:**
```
DATABASE_URL="postgresql://user:password@host-pooler.neon.tech/database?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://user:password@host.neon.tech/database?sslmode=require"
```

**Rationale:** Pooler prevents connection exhaustion in serverless environment

---

## Unknown 3: Gemini Structured Output (JSON Mode)

**Question:** How to get structured JSON responses from Gemini?

**Research:**
- Gemini 1.5 Pro supports JSON mode via `response_mime_type`
- Use `application/json` to enforce JSON output
- Define schema using `response_schema` parameter
- Responses are guaranteed valid JSON

**Decision:** Use JSON mode with schema validation

**Implementation Pattern:**
```typescript
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        suggestions: { type: "array", items: { type: "string" } },
        score: { type: "number" }
      }
    }
  }
});
```

**Rationale:** Ensures consistent, parseable responses for AI features

---

## Unknown 4: Rate Limiting Implementation

**Question:** Upstash vs Vercel KV for rate limiting?

**Research:**
- **Upstash**: Dedicated rate limiting service, more features, pay-per-use
- **Vercel KV**: Integrated with Vercel, simpler setup, included in Pro plan
- Both work with Next.js Route Handlers
- Upstash has better documentation for rate limiting patterns

**Decision:** Use Upstash Ratelimit for flexibility

**Rationale:** 
- Better for AI endpoints (need fine-grained control)
- Works on any hosting (not Vercel-locked)
- Easier to test locally

**Configuration:**
```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
});
```

---

## Unknown 5: PDF Generation Library

**Question:** Puppeteer vs @react-pdf/renderer?

**Research:**
- **Puppeteer**: Full browser rendering, best quality, larger bundle, slower
- **@react-pdf/renderer**: React components, lightweight, faster, limited styling
- For ATS-friendly PDFs, need clean HTML structure
- Puppeteer better for complex layouts

**Decision:** Use Puppeteer for Phase 7

**Rationale:**
- Better ATS compatibility (renders as real PDF)
- Supports complex resume layouts
- Can use HTML templates
- Worth the performance trade-off for quality

**Alternative:** Start with @react-pdf/renderer if performance critical, migrate to Puppeteer later

---

## Unknown 6: Resume Data JSON Schema

**Question:** What's the optimal JSON structure for resume data?

**Research:**
- Need flexibility for different resume types
- Must support drag-and-drop reordering
- Should be ATS-friendly (flat structure better than nested)
- Need unique IDs for each section item

**Decision:** Flat structure with section arrays

**Schema:**
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

**Rationale:**
- Flat arrays support drag-and-drop
- Unique IDs enable precise updates
- Optional fields for flexibility
- ATS-friendly (no deep nesting)

---

## Unknown 7: ATS Scoring Algorithm

**Question:** How to calculate ATS score?

**Research:**
- ATS systems check: keyword match, formatting, structure
- Key factors: skills match, experience relevance, readability
- Score typically 0-100 scale
- Can use Gemini to analyze resume against job description

**Decision:** Hybrid approach

**Algorithm:**
1. **Keyword Analysis** (40%): Match resume keywords to job description
2. **Structure Score** (30%): Check for proper sections, formatting
3. **Readability** (20%): Sentence length, bullet point clarity
4. **AI Analysis** (10%): Gemini review for overall quality

**Implementation:**
```typescript
const atsScore = {
  keywords: calculateKeywordMatch(resume, jobDescription) * 0.4,
  structure: calculateStructureScore(resume) * 0.3,
  readability: calculateReadabilityScore(resume) * 0.2,
  aiReview: await getAIReview(resume) * 0.1
};
```

**Rationale:**
- Combines multiple factors for accuracy
- Gemini adds intelligence without being sole source
- Transparent scoring helps users improve

---

## Summary of Decisions

| Unknown | Decision | Rationale |
|---------|----------|-----------|
| Prisma v5 | Use both `url` and `directUrl` | Pooled for app, direct for migrations |
| Neon Pooling | Use pooler endpoint | Prevents connection exhaustion |
| Gemini JSON | Use JSON mode with schema | Ensures structured responses |
| Rate Limiting | Use Upstash | Flexible, not Vercel-locked |
| PDF Generation | Use Puppeteer | Best quality for ATS |
| Resume JSON | Flat structure with IDs | Supports drag-drop, ATS-friendly |
| ATS Scoring | Hybrid algorithm | Combines multiple factors |

---

**Status:** All unknowns resolved ✅  
**Next Phase:** Phase 1 Design & Contracts
