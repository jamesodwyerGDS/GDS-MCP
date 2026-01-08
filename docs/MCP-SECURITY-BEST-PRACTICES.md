# MCP Security Best Practices Reference

A comprehensive guide to securing Model Context Protocol (MCP) servers and clients, based on industry standards, OWASP guidelines, and real-world vulnerabilities.

---

## Table of Contents

1. [OWASP MCP Top 10](#owasp-mcp-top-10)
2. [Authentication & Authorization](#authentication--authorization)
3. [Input Validation & Sanitization](#input-validation--sanitization)
4. [Tool Security](#tool-security)
5. [Secret Management](#secret-management)
6. [Session Security](#session-security)
7. [Sandboxing & Isolation](#sandboxing--isolation)
8. [Supply Chain Security](#supply-chain-security)
9. [Logging & Monitoring](#logging--monitoring)
10. [Security Checklist](#security-checklist)

---

## OWASP MCP Top 10

The [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) identifies the most critical security risks in MCP-enabled systems:

### MCP01: Token Mismanagement & Secret Exposure

**Risk:** Hard-coded credentials, long-lived tokens, and secrets exposed in model memory or logs.

**Mitigations:**
- Never hard-code API keys or tokens in source code
- Use environment variables or secure secret managers
- Implement token rotation with short-lived credentials
- Sanitize logs to remove sensitive data
- Use OAuth 2.0 with refresh tokens instead of long-lived API keys

### MCP02: Privilege Escalation via Scope Creep

**Risk:** Temporary permissions expand over time, granting agents excessive capabilities.

**Mitigations:**
- Implement principle of least privilege
- Define explicit, narrow tool permissions
- Regular permission audits
- Time-bound access grants
- Deny by default, allow by exception

### MCP03: Tool Poisoning

**Risk:** Adversaries compromise tools, plugins, or outputs to manipulate model behavior.

**Mitigations:**
- Maintain a verified registry of trusted MCP tools
- Validate tool metadata and descriptions
- Monitor for unauthorized tool modifications
- Implement code signing for tool packages
- Sandbox tool execution environments

### MCP04: Software Supply Chain Attacks

**Risk:** Compromised dependencies alter agent behavior or introduce backdoors.

**Mitigations:**
- Lock dependency versions (package-lock.json)
- Use Software Composition Analysis (SCA) tools
- Verify package integrity with checksums
- Monitor for known vulnerabilities (npm audit)
- Prefer well-maintained, widely-used packages

### MCP05: Command Injection & Execution

**Risk:** AI agents execute system commands using untrusted input without validation.

**Mitigations:**
- Never construct shell commands from user input
- Use parameterized APIs instead of string concatenation
- Whitelist allowed commands and arguments
- Validate and sanitize all inputs
- Run with minimal OS privileges

### MCP06: Prompt Injection via Contextual Payloads

**Risk:** Malicious inputs manipulate AI behavior through prompt injection.

**Mitigations:**
- Sanitize untrusted data before model consumption
- Enforce strict schemas for tool inputs (JSON Schema)
- Separate system instructions from user content
- Implement output validation
- Use context boundaries and session segmentation

### MCP07: Insufficient Authentication & Authorization

**Risk:** Weak identity verification exposes attack paths.

**Mitigations:**
- Require authentication for all MCP interactions
- Implement OAuth 2.0 with Resource Indicators (RFC 8707)
- Verify client and server identities mutually
- Use short-lived access tokens
- Implement rate limiting

### MCP08: Lack of Audit and Telemetry

**Risk:** Limited logging impedes investigation and incident response.

**Mitigations:**
- Log all tool invocations with timestamps
- Record context changes and user-agent interactions
- Use immutable audit trails
- Implement alerting for anomalous behavior
- Retain logs for compliance periods

### MCP09: Shadow MCP Servers

**Risk:** Unauthorized MCP servers operate without proper oversight.

**Mitigations:**
- Maintain an inventory of authorized MCP servers
- Monitor network for unauthorized MCP traffic
- Implement server discovery controls
- Require explicit server registration
- Regular security assessments

### MCP10: Context Injection & Over-Sharing

**Risk:** Sensitive information leaks across tasks, users, or agents through shared context.

**Mitigations:**
- Implement context isolation between sessions
- Clear context after sensitive operations
- Scope context windows appropriately
- Avoid persisting sensitive data in context
- Implement data classification controls

---

## Authentication & Authorization

### Best Practices

1. **Use Modern Authentication:**
   - Prefer OAuth 2.0 over static API keys
   - Implement Resource Indicators (RFC 8707) to prevent token confusion
   - Delegate authentication to established identity providers

2. **Token Security:**
   - Use short-lived access tokens (< 1 hour)
   - Implement refresh token rotation
   - Never expose tokens in URLs or logs
   - Use secure storage (not localStorage for web clients)

3. **Authorization Controls:**
   - Implement fine-grained tool-level permissions
   - Verify authorization on every request (not just authentication)
   - Use role-based or attribute-based access control
   - Log all authorization decisions

### Implementation Example

```javascript
// Good: Environment-based token with validation
const token = process.env.FIGMA_TOKEN;
if (!token || token.length < 20) {
  throw new Error('Invalid or missing FIGMA_TOKEN');
}

// Bad: Hard-coded token
const token = 'figd_abc123...'; // NEVER DO THIS
```

---

## Input Validation & Sanitization

### Principles

1. **Validate All Inputs:**
   - Validate type, length, format, and range
   - Use allowlists over blocklists
   - Reject invalid input immediately

2. **Sanitize Before Use:**
   - Escape special characters for the target context
   - Use parameterized queries/APIs
   - Encode output appropriately

3. **Schema Enforcement:**
   - Define strict JSON Schema for tool inputs
   - Validate against schema before processing
   - Reject requests with extra or missing fields

### Implementation Example

```javascript
// Good: Input validation with allowlist
function normalizeComponentName(name) {
  // Only allow alphanumeric, hyphens, and underscores
  const sanitized = name
    .toLowerCase()
    .replace(/[^a-z0-9\-_]/g, '')
    .substring(0, 100); // Length limit

  if (!sanitized || sanitized.length === 0) {
    throw new Error('Invalid component name');
  }

  return sanitized;
}

// Good: Path traversal prevention
function validateFilePath(requestedPath, baseDir) {
  const resolvedPath = path.resolve(baseDir, requestedPath);
  if (!resolvedPath.startsWith(path.resolve(baseDir))) {
    throw new Error('Path traversal attempt detected');
  }
  return resolvedPath;
}
```

---

## Tool Security

### Tool Definition Security

1. **Minimal Tool Surface:**
   - Only expose necessary tools
   - Remove unused tools
   - Document each tool's purpose and risks

2. **Strict Input Schemas:**
   - Define explicit JSON Schema for each tool
   - Use enums for known value sets
   - Set maximum lengths for string inputs

3. **Output Sanitization:**
   - Validate and sanitize tool outputs
   - Don't expose internal errors to clients
   - Limit response sizes

### Secure Tool Schema Example

```javascript
{
  name: 'get_component_docs',
  description: 'Get documentation for a GDS component by name',
  inputSchema: {
    type: 'object',
    properties: {
      componentName: {
        type: 'string',
        description: 'Component name (e.g., "button")',
        pattern: '^[a-z][a-z0-9-]*$',
        minLength: 1,
        maxLength: 50
      },
      audience: {
        type: 'string',
        enum: ['all', 'design', 'engineer', 'vibe'],
        default: 'all'
      }
    },
    required: ['componentName'],
    additionalProperties: false
  }
}
```

---

## Secret Management

### Best Practices

1. **Environment Variables:**
   - Store secrets in environment variables
   - Never commit secrets to version control
   - Use `.env` files only for development (add to `.gitignore`)

2. **Secret Rotation:**
   - Rotate secrets regularly
   - Support multiple active secrets during rotation
   - Automate rotation where possible

3. **Access Control:**
   - Limit who can access secrets
   - Audit secret access
   - Use separate secrets per environment

### Required .gitignore Entries

```gitignore
# Secrets
.env
.env.*
*.pem
*.key
credentials.json
secrets/
```

---

## Session Security

### Best Practices

1. **Session Management:**
   - Use secure, non-deterministic session IDs
   - Implement session timeouts
   - Don't use sessions alone for authentication

2. **Session Hijacking Prevention:**
   - Verify additional context (IP, User-Agent)
   - Regenerate session IDs after privilege changes
   - Use secure cookies (HttpOnly, Secure, SameSite)

3. **Context Isolation:**
   - Isolate sessions between users
   - Clear sensitive context after use
   - Don't persist PII in session storage

---

## Sandboxing & Isolation

### Recommended Controls

1. **Process Isolation:**
   - Run MCP servers in separate processes
   - Use containers for deployment
   - Limit file system access

2. **Network Isolation:**
   - Restrict outbound connections
   - Use allowlists for external APIs
   - Monitor for unexpected traffic

3. **Resource Limits:**
   - Set CPU and memory limits
   - Implement request timeouts
   - Rate limit tool invocations

### Docker Security Example

```dockerfile
FROM node:20-alpine

# Run as non-root user
RUN addgroup -g 1001 mcp && adduser -D -u 1001 -G mcp mcp
USER mcp

# Read-only file system where possible
WORKDIR /app
COPY --chown=mcp:mcp . .

# Minimal capabilities
CMD ["node", "mcp-server/index.js"]
```

---

## Supply Chain Security

### Dependency Management

1. **Lock Versions:**
   ```bash
   npm ci  # Use lockfile for deterministic installs
   ```

2. **Audit Dependencies:**
   ```bash
   npm audit
   npm audit fix
   ```

3. **Monitor Vulnerabilities:**
   - Enable GitHub Dependabot
   - Use Snyk or similar tools
   - Subscribe to security advisories

### Verification

```bash
# Verify package integrity
npm ci --audit

# Check for known vulnerabilities
npm audit --audit-level=high

# Update lockfile securely
npm update --save-exact
```

---

## Logging & Monitoring

### What to Log

- Tool invocations (name, sanitized parameters, timestamp)
- Authentication events (success, failure, token refresh)
- Authorization decisions (allowed, denied)
- Errors and exceptions (without sensitive data)
- Session lifecycle events

### What NOT to Log

- Passwords or API keys
- Full authentication tokens
- Personal identifiable information (PII)
- Credit card numbers or financial data

### Logging Example

```javascript
// Good: Safe logging
console.error(`[${new Date().toISOString()}] Tool invocation: ${toolName}, user: ${userId}`);

// Bad: Sensitive data in logs
console.error(`Token: ${apiToken}, User data: ${JSON.stringify(userData)}`);
```

---

## Security Checklist

### Pre-Deployment

- [ ] All secrets stored in environment variables
- [ ] No hard-coded credentials in source code
- [ ] .gitignore includes secret files (.env, *.pem, etc.)
- [ ] Dependencies audited for vulnerabilities
- [ ] Input validation on all tool parameters
- [ ] Path traversal prevention implemented
- [ ] JSON Schema defined for all tool inputs
- [ ] Error messages don't leak sensitive information

### Runtime Security

- [ ] Authentication required for all endpoints
- [ ] Authorization checked on every request
- [ ] Rate limiting implemented
- [ ] Request timeouts configured
- [ ] Logging enabled (without sensitive data)
- [ ] HTTPS/TLS for all network communication

### Operational Security

- [ ] Regular dependency updates scheduled
- [ ] Security monitoring/alerting configured
- [ ] Incident response plan documented
- [ ] Access controls reviewed periodically
- [ ] Secrets rotated on schedule
- [ ] Audit logs retained and reviewed

---

## References

### Official Documentation
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)

### OWASP Resources
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- [OWASP Practical Guide for MCP Servers](https://genai.owasp.org/resource/cheatsheet-a-practical-guide-for-securely-using-third-party-mcp-servers-1-0/)
- [OWASP Prompt Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)

### Industry Analysis
- [RedHat: MCP Security Risks and Controls](https://www.redhat.com/en/blog/model-context-protocol-mcp-understanding-security-risks-and-controls)
- [Microsoft: Protecting Against Indirect Prompt Injection](https://developer.microsoft.com/blog/protecting-against-indirect-injection-attacks-mcp)
- [Palo Alto Networks: MCP Security Overview](https://www.paloaltonetworks.com/blog/cloud-security/model-context-protocol-mcp-a-security-overview/)
- [State of MCP Server Security 2025](https://astrix.security/learn/blog/state-of-mcp-server-security-2025/)

### Vulnerability Research
- [MCP Security Vulnerabilities Guide](https://composio.dev/blog/mcp-vulnerabilities-every-developer-should-know)
- [Top 25 MCP Vulnerabilities](https://adversa.ai/mcp-security-top-25-mcp-vulnerabilities/)

---

*Document Version: 1.0.0*
*Last Updated: 2026-01-08*
