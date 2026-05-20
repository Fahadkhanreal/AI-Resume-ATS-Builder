export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = "ApiError";
  }

  toJSON() {
    return {
      success: false,
      error: this.message,
      code: this.code,
      ...(this.details && { details: this.details }),
    };
  }
}

export const ApiErrors = {
  unauthorized: () =>
    new ApiError(401, "UNAUTHORIZED", "Authentication required"),
  forbidden: () =>
    new ApiError(403, "FORBIDDEN", "You don't have permission to access this resource"),
  notFound: (resource: string) =>
    new ApiError(404, "NOT_FOUND", `${resource} not found`),
  badRequest: (message: string) =>
    new ApiError(400, "BAD_REQUEST", message),
  conflict: (message: string) =>
    new ApiError(409, "CONFLICT", message),
  tooManyRequests: () =>
    new ApiError(429, "RATE_LIMITED", "Too many requests. Please try again later"),
  internalError: (message: string = "Internal server error") =>
    new ApiError(500, "INTERNAL_ERROR", message),
};
