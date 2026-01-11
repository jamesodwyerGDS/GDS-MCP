# GDS-MCP Roadmap

This document outlines the planned development path for GDS-MCP. For a complete list of all features (completed and planned), see [FEATURES.md](./FEATURES.md).

## Current Focus

### Now: Token Efficiency & Design Specs

**Goal:** Reduce token usage while improving documentation quality

- [x] Figma Design Specs Extractor - Direct API approach (~75% token savings vs MCP)
- [x] Detailed design specs in generated documentation
- [ ] Benchmark and document token usage across different approaches
- [ ] Optimize MCP tool calls for batch operations

---

## Short Term

### Next: Real-Time Sync

**Goal:** Keep documentation automatically in sync with Figma

| Feature | Priority | Status |
|---------|----------|--------|
| Component Diff Detection | High | Planned |
| Figma Webhook Integration | High | Planned |
| Incremental Updates | High | Planned |
| Change Notifications | Medium | Planned |

**Expected outcome:** Documentation updates automatically when Figma components change, with notifications to relevant stakeholders.

### Next: Coverage Improvements

**Goal:** Close the documentation gaps

| Feature | Priority | Status |
|---------|----------|--------|
| Generate 29 missing design docs | High | Planned |
| Add 5 missing Storybook components | Medium | Planned |
| Staleness auto-detection | Medium | Planned |

**Current state:** 67 unified docs, but gaps exist between sources.

---

## Medium Term

### Search & Discovery

**Goal:** Make documentation easily searchable and discoverable

| Feature | Priority | Status |
|---------|----------|--------|
| REST Search API | Medium | Planned |
| Full-text search across all docs | Medium | Planned |
| Component relationship graph | Medium | Planned |
| Token usage analysis | Medium | Planned |

### Multi-Theme Support

**Goal:** Document light/dark mode and theme variants

| Feature | Priority | Status |
|---------|----------|--------|
| Theme variant extraction | Medium | Planned |
| Side-by-side theme comparison | Low | Under consideration |
| Theme token documentation | Medium | Planned |

### Metrics Dashboard

**Goal:** Visualize documentation health and coverage

| Feature | Priority | Status |
|---------|----------|--------|
| Web-based dashboard | Medium | Planned |
| Coverage visualization | Medium | Planned |
| Historical trends | Low | Under consideration |

---

## Long Term

### Under Consideration

These features are being evaluated but not yet committed to:

| Feature | Notes |
|---------|-------|
| PDF Export | For offline/print distribution |
| Figma Plugin | Preview docs directly in Figma |
| Component Playground | Interactive previews with Storybook embeds |
| AI-Generated Descriptions | LLM-enhanced component documentation |
| Design Review Workflow | PR-based approval for design changes |
| Accessibility Audit Tool | Automated WCAG compliance checking |
| Translation Support | i18n for global teams |
| Component Analytics | Track documentation usage |

---

## Completed Milestones

### v1.0 - Core Documentation Pipeline (Oct 2024)

- [x] Figma documentation generator
- [x] Storybook documentation generator
- [x] Vibe documentation generator (ShadCN, Tailwind, summary)
- [x] Unified documentation generator
- [x] MCP server with custom tools
- [x] GitHub Actions automation
- [x] Slack notifications
- [x] Efficiency monitoring

### v1.1 - Token Efficiency (Jan 2026)

- [x] Figma Design Specs Extractor
- [x] Direct Figma API integration
- [x] Detailed design specs section
- [x] Token usage estimation and comparison

---

## How to Contribute

1. **Feature requests:** Open an issue describing the feature and use case
2. **Priority feedback:** Comment on existing issues to help prioritize
3. **Implementation:** PRs welcome for any planned features

---

## Updates

This roadmap is reviewed and updated monthly. Last updated: January 2026.

For detailed feature status, see [FEATURES.md](./FEATURES.md).
