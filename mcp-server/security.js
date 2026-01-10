/**
 * MCP Security Utilities
 *
 * Provides input validation, sanitization, and security controls
 * for the GDS MCP server.
 *
 * Security controls implemented:
 * - Input validation and sanitization
 * - Path traversal prevention
 * - Rate limiting
 * - Secure error handling
 * - Audit logging
 */

import path from 'path';

// =============================================================================
// Configuration
// =============================================================================

const SECURITY_CONFIG = {
  // Maximum length for string inputs
  maxInputLength: 200,

  // Allowed characters for component names (alphanumeric, hyphens, underscores)
  componentNamePattern: /^[a-zA-Z][a-zA-Z0-9\-_]*$/,

  // Maximum search query length
  maxQueryLength: 500,

  // Maximum results limit
  maxResultsLimit: 50,

  // Rate limiting: requests per minute per tool
  rateLimitPerMinute: 100,

  // Enable audit logging
  enableAuditLog: true,
};

// Rate limiting state
const rateLimitState = new Map();

// Maximum entries in rate limit state (prevent memory bloat)
const MAX_RATE_LIMIT_ENTRIES = 1000;

// Cleanup interval for rate limit state (every 2 minutes)
const RATE_LIMIT_CLEANUP_INTERVAL = 2 * 60 * 1000;

/**
 * Clean up expired rate limit entries to prevent memory leaks
 */
function cleanupRateLimitState() {
  const now = Date.now();
  const windowMs = 60000;

  for (const [key, state] of rateLimitState.entries()) {
    if (now - state.windowStart > windowMs) {
      rateLimitState.delete(key);
    }
  }

  // If still too many entries, remove oldest
  if (rateLimitState.size > MAX_RATE_LIMIT_ENTRIES) {
    const entries = [...rateLimitState.entries()]
      .sort((a, b) => a[1].windowStart - b[1].windowStart);
    const toRemove = entries.slice(0, entries.length - MAX_RATE_LIMIT_ENTRIES);
    toRemove.forEach(([key]) => rateLimitState.delete(key));
  }
}

// Start cleanup interval (unref to not block process exit)
setInterval(cleanupRateLimitState, RATE_LIMIT_CLEANUP_INTERVAL).unref();

// =============================================================================
// Input Validation
// =============================================================================

/**
 * Validate and sanitize a component name
 * @param {string} name - Raw component name input
 * @returns {{ valid: boolean, sanitized?: string, error?: string }}
 */
export function validateComponentName(name) {
  // Type check
  if (typeof name !== 'string') {
    return { valid: false, error: 'Component name must be a string' };
  }

  // Trim whitespace
  const trimmed = name.trim();

  // Length check
  if (trimmed.length === 0) {
    return { valid: false, error: 'Component name cannot be empty' };
  }

  if (trimmed.length > SECURITY_CONFIG.maxInputLength) {
    return {
      valid: false,
      error: `Component name exceeds maximum length of ${SECURITY_CONFIG.maxInputLength}`,
    };
  }

  // Sanitize: convert to lowercase, replace spaces/underscores with hyphens
  const sanitized = trimmed
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9\-]/g, '') // Remove any non-allowed characters
    .replace(/--+/g, '-') // Collapse multiple hyphens
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

  // Validate sanitized result
  if (sanitized.length === 0) {
    return { valid: false, error: 'Component name contains no valid characters' };
  }

  if (!SECURITY_CONFIG.componentNamePattern.test(sanitized)) {
    return { valid: false, error: 'Component name contains invalid characters' };
  }

  return { valid: true, sanitized };
}

/**
 * Validate search query
 * @param {string} query - Raw search query input
 * @returns {{ valid: boolean, sanitized?: string, error?: string }}
 */
export function validateSearchQuery(query) {
  // Type check
  if (typeof query !== 'string') {
    return { valid: false, error: 'Search query must be a string' };
  }

  // Trim whitespace
  const trimmed = query.trim();

  // Length checks
  if (trimmed.length === 0) {
    return { valid: false, error: 'Search query cannot be empty' };
  }

  if (trimmed.length > SECURITY_CONFIG.maxQueryLength) {
    return {
      valid: false,
      error: `Search query exceeds maximum length of ${SECURITY_CONFIG.maxQueryLength}`,
    };
  }

  // Sanitize: remove potentially dangerous characters while preserving search intent
  const sanitized = trimmed
    .replace(/[<>{}\\]/g, '') // Remove potentially dangerous chars
    .substring(0, SECURITY_CONFIG.maxQueryLength);

  return { valid: true, sanitized };
}

/**
 * Validate and constrain a numeric limit
 * @param {any} limit - Raw limit input
 * @param {number} defaultValue - Default if not provided
 * @returns {number}
 */
export function validateLimit(limit, defaultValue = 5) {
  if (limit === undefined || limit === null) {
    return defaultValue;
  }

  const num = parseInt(limit, 10);

  if (isNaN(num) || num < 1) {
    return defaultValue;
  }

  return Math.min(num, SECURITY_CONFIG.maxResultsLimit);
}

/**
 * Validate audience parameter
 * @param {string} audience - Raw audience input
 * @returns {string}
 */
export function validateAudience(audience) {
  const allowed = ['all', 'design', 'engineer', 'vibe'];
  const value = String(audience || 'all').toLowerCase();
  return allowed.includes(value) ? value : 'all';
}

/**
 * Validate token type parameter
 * @param {string} tokenType - Raw token type input
 * @returns {string}
 */
export function validateTokenType(tokenType) {
  const allowed = ['color', 'spacing', 'typography', 'all'];
  const value = String(tokenType || 'all').toLowerCase();
  return allowed.includes(value) ? value : 'all';
}

// =============================================================================
// Path Security
// =============================================================================

/**
 * Validate that a file path is within an allowed base directory
 * Prevents path traversal attacks
 *
 * @param {string} filePath - The file path to validate
 * @param {string} baseDir - The allowed base directory
 * @returns {{ valid: boolean, resolvedPath?: string, error?: string }}
 */
export function validateFilePath(filePath, baseDir) {
  try {
    // Resolve both paths to absolute paths
    const resolvedBase = path.resolve(baseDir);
    const resolvedPath = path.resolve(baseDir, filePath);

    // Check that the resolved path starts with the base directory
    // This prevents ../ attacks
    if (!resolvedPath.startsWith(resolvedBase + path.sep) && resolvedPath !== resolvedBase) {
      auditLog('PATH_TRAVERSAL_ATTEMPT', { attempted: filePath, baseDir });
      return { valid: false, error: 'Access denied: path outside allowed directory' };
    }

    return { valid: true, resolvedPath };
  } catch (error) {
    return { valid: false, error: 'Invalid file path' };
  }
}

/**
 * Sanitize a filename to prevent directory traversal
 * @param {string} filename - Raw filename
 * @returns {string}
 */
export function sanitizeFilename(filename) {
  return String(filename)
    .replace(/\.\./g, '') // Remove ..
    .replace(/[/\\]/g, '') // Remove path separators
    .replace(/[<>:"|?*]/g, '') // Remove Windows-illegal chars
    .substring(0, 255); // Limit length
}

// =============================================================================
// Rate Limiting
// =============================================================================

/**
 * Check if a request should be rate limited
 * @param {string} toolName - Name of the tool being called
 * @param {string} clientId - Optional client identifier
 * @returns {{ allowed: boolean, retryAfter?: number }}
 */
export function checkRateLimit(toolName, clientId = 'default') {
  const key = `${clientId}:${toolName}`;
  const now = Date.now();
  const windowMs = 60000; // 1 minute window

  if (!rateLimitState.has(key)) {
    rateLimitState.set(key, { count: 1, windowStart: now });
    return { allowed: true };
  }

  const state = rateLimitState.get(key);

  // Reset window if expired
  if (now - state.windowStart > windowMs) {
    rateLimitState.set(key, { count: 1, windowStart: now });
    return { allowed: true };
  }

  // Check limit
  if (state.count >= SECURITY_CONFIG.rateLimitPerMinute) {
    const retryAfter = Math.ceil((state.windowStart + windowMs - now) / 1000);
    auditLog('RATE_LIMIT_EXCEEDED', { toolName, clientId });
    return { allowed: false, retryAfter };
  }

  // Increment counter
  state.count++;
  return { allowed: true };
}

// =============================================================================
// Error Handling
// =============================================================================

/**
 * Create a safe error response that doesn't leak internal details
 * @param {Error|string} error - The original error
 * @param {string} context - Context about what operation failed
 * @returns {{ content: Array, isError: boolean }}
 */
export function createSafeErrorResponse(error, context) {
  // Log the full error internally
  const errorMessage = error instanceof Error ? error.message : String(error);
  auditLog('ERROR', { context, error: errorMessage });

  // Return sanitized error to client
  const safeMessages = {
    ENOENT: 'The requested resource was not found',
    EACCES: 'Access denied',
    ETIMEDOUT: 'The request timed out',
    default: 'An error occurred processing your request',
  };

  let safeMessage = safeMessages.default;

  if (error instanceof Error) {
    if (error.code && safeMessages[error.code]) {
      safeMessage = safeMessages[error.code];
    } else if (errorMessage.includes('not found')) {
      safeMessage = safeMessages.ENOENT;
    }
  }

  return {
    content: [{ type: 'text', text: `${context}: ${safeMessage}` }],
    isError: true,
  };
}

// =============================================================================
// Audit Logging
// =============================================================================

/**
 * Log security-relevant events
 * @param {string} event - Event type
 * @param {object} details - Event details (will be sanitized)
 */
export function auditLog(event, details = {}) {
  if (!SECURITY_CONFIG.enableAuditLog) return;

  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    // Sanitize details to avoid logging sensitive data
    details: sanitizeLogDetails(details),
  };

  // In production, this should write to a secure audit log
  // For now, write to stderr to separate from stdout (MCP transport)
  console.error(`[AUDIT] ${JSON.stringify(logEntry)}`);
}

/**
 * Sanitize log details to remove potentially sensitive data
 * @param {object} details - Raw details object
 * @returns {object}
 */
function sanitizeLogDetails(details) {
  const sanitized = {};
  const sensitiveKeys = ['token', 'key', 'secret', 'password', 'auth', 'credential'];

  for (const [key, value] of Object.entries(details)) {
    // Redact sensitive keys
    if (sensitiveKeys.some((sk) => key.toLowerCase().includes(sk))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'string' && value.length > 500) {
      // Truncate long strings
      sanitized[key] = value.substring(0, 500) + '...[truncated]';
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Log a tool invocation for audit purposes
 * @param {string} toolName - Name of the tool
 * @param {object} args - Tool arguments (will be sanitized)
 */
export function logToolInvocation(toolName, args) {
  auditLog('TOOL_INVOCATION', {
    tool: toolName,
    args: args,
  });
}

// =============================================================================
// Exports
// =============================================================================

export const SecurityConfig = SECURITY_CONFIG;
