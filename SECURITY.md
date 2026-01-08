# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Email the security details to the maintainers directly
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes

We will acknowledge receipt within 48 hours and provide a detailed response within 7 days.

## Security Features

This MCP server implements the following security controls:

### Input Validation
- All tool inputs are validated and sanitized before processing
- Strict JSON Schema validation with `additionalProperties: false`
- Pattern matching for component names and queries
- Maximum length limits on all string inputs

### Path Traversal Prevention
- All file paths are validated against allowed base directories
- Path separators and `..` sequences are rejected
- Resolved paths must stay within designated directories

### Rate Limiting
- Built-in rate limiting (100 requests per minute per tool)
- Prevents denial of service attacks
- Automatic backoff with retry-after headers

### Audit Logging
- All tool invocations are logged with timestamps
- Security events (rate limits, path traversal attempts) are recorded
- Sensitive data is automatically redacted from logs

### Safe Error Handling
- Internal error details are not exposed to clients
- Generic error messages prevent information disclosure
- Full errors logged internally for debugging

## Configuration Security

### Environment Variables
Never commit secrets to version control. Use environment variables:

```bash
# Required for Figma API access
export FIGMA_TOKEN=your_token_here
```

### .gitignore
The following sensitive files are excluded from version control:
- `.env*` - Environment files
- `*.pem`, `*.key` - Cryptographic keys
- `credentials.json`, `secrets.json` - Credential files
- `*.log` - Log files (may contain sensitive data)

## Dependency Security

### Auditing Dependencies
```bash
# Check for known vulnerabilities
npm run security:audit

# Automatically fix vulnerabilities where possible
npm run security:audit-fix

# Check for high-severity issues (CI/CD gate)
npm run security:check
```

### Dependency Guidelines
- Keep dependencies updated regularly
- Review new dependencies before adding
- Prefer well-maintained packages with active security practices
- Lock versions in package-lock.json

## OWASP MCP Top 10 Mitigations

This project addresses the [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/):

| Risk | Mitigation Status |
|------|-------------------|
| MCP01: Token Mismanagement | :white_check_mark: Environment variables, no hard-coded secrets |
| MCP02: Privilege Escalation | :white_check_mark: Minimal tool permissions, read-only operations |
| MCP03: Tool Poisoning | :white_check_mark: Verified tool registry, no dynamic tool loading |
| MCP04: Supply Chain Attacks | :white_check_mark: Locked dependencies, npm audit |
| MCP05: Command Injection | :white_check_mark: No shell command execution, input validation |
| MCP06: Prompt Injection | :white_check_mark: Input sanitization, schema validation |
| MCP07: Auth/Authz Issues | :yellow_circle: Basic rate limiting (enhance with OAuth for production) |
| MCP08: Audit/Telemetry | :white_check_mark: Comprehensive audit logging |
| MCP09: Shadow MCP Servers | :white_check_mark: Single registered server in config |
| MCP10: Context Over-Sharing | :white_check_mark: Stateless design, no context persistence |

## Security Best Practices Reference

See [docs/MCP-SECURITY-BEST-PRACTICES.md](docs/MCP-SECURITY-BEST-PRACTICES.md) for comprehensive MCP security guidelines.

## Security Checklist for Contributors

Before submitting code:

- [ ] No hard-coded credentials or secrets
- [ ] Input validation on all user-provided data
- [ ] No direct file path construction from user input
- [ ] Error messages don't leak internal details
- [ ] New dependencies audited for known vulnerabilities
- [ ] Sensitive data not logged
- [ ] Rate limiting considered for new endpoints

## Contact

For security-related questions or concerns, please contact the project maintainers.
