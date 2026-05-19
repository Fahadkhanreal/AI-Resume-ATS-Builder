/**
 * Templates API Contracts
 * Public endpoints (no authentication required)
 */

// ============================================================================
// GET /api/templates - List Available Templates
// ============================================================================

export interface GetTemplatesResponse {
  success: true;
  data: Template[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: "modern" | "classic" | "minimal" | "corporate" | "tech";
  preview?: string; // URL to preview image
  isDefault: boolean;
}

export interface GetTemplatesError {
  success: false;
  error: string;
  code: "INTERNAL_ERROR";
}

// ============================================================================
// POST /api/auth/webhook - Clerk Webhook Handler
// ============================================================================

export interface ClerkWebhookEvent {
  type: "user.created" | "user.updated" | "user.deleted";
  data: {
    id: string;
    email_addresses: Array<{ email_address: string }>;
    first_name?: string;
    last_name?: string;
  };
}

export interface ClerkWebhookResponse {
  success: true;
}

export interface ClerkWebhookError {
  success: false;
  error: string;
  code: "INVALID_SIGNATURE" | "INTERNAL_ERROR";
}

// ============================================================================
// GET /api/health - Health Check
// ============================================================================

export interface HealthCheckResponse {
  success: true;
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  database: "connected" | "disconnected";
  version: string;
}

export interface HealthCheckError {
  success: false;
  error: string;
  code: "INTERNAL_ERROR";
}

// ============================================================================
// GET /api/resumes/[id]/pdf - Generate PDF
// ============================================================================

export interface GeneratePDFRequest {
  templateId?: string; // default: resume.templateId
}

export interface GeneratePDFResponse {
  // Returns PDF file as binary
  // Content-Type: application/pdf
  // Content-Disposition: attachment; filename="resume.pdf"
}

export interface GeneratePDFError {
  success: false;
  error: string;
  code: "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "INTERNAL_ERROR";
}
