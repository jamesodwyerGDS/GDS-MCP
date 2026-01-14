# Project Summary Template

This template defines the structure for `PROJECT-SUMMARY.md`. Use this as a reference when running `/project-summary`.

---

## Required Sections

### 1. Title and Overview

```markdown
# GDS-MCP Project Summary

> Last updated: {DATE}

## What It Is

{One paragraph describing the project purpose and value proposition. Keep it under 50 words.}
```

### 2. Key Features Built

```markdown
## Key Features Built

| Feature | Description |
|---------|-------------|
| **{Feature Name}** | {Brief description of what it does} |
| **{Feature Name}** | {Brief description of what it does} |
```

**How to populate:**
- List each major capability of the system
- Focus on user-facing features and tools
- Include both CLI commands and automated features
- Group related features together

### 3. Current Coverage

```markdown
## Current Coverage

| Metric | Count |
|--------|-------|
| Design docs | {N} |
| Storybook specs | {N} |
| Total documentation lines | {N}+ |
```

**How to calculate:**
- Count files in `docs/components/**/*.md`
- Count files in `docs-storybook/**/*.md`
- Estimate lines with `wc -l docs/**/*.md`

### 4. Claude Tools Used

```markdown
## Key Claude Tools Used

| Tool | Purpose |
|------|---------|
| **{Tool Name}** | {How it's used in this project} |
```

**Required tools to document:**
- Figma MCP - Design extraction
- GitMCP - Remote documentation access
- Custom MCP servers - Any project-specific servers
- Claude Code Skills - List all `/skill-name` commands
- Filesystem MCP - If used for file operations

### 5. Key Learnings

```markdown
## Key Learnings

1. **{Learning Title}** - {Brief explanation of the insight and why it matters}

2. **{Learning Title}** - {Brief explanation of the insight and why it matters}
```

**What to capture:**
- Architectural decisions and their rationale
- Patterns that worked well
- Constraints that shaped the design
- Performance or efficiency insights
- Integration lessons

### 6. Architecture Diagram

```markdown
## Architecture

\`\`\`
┌─────────────┐     ┌─────────────────┐     ┌──────────────────┐
│  {Input}    │────▶│  {Processor}    │────▶│  {Output}        │
└─────────────┘     └─────────────────┘     └──────────────────┘
\`\`\`
```

**Guidelines:**
- Use ASCII box drawing characters
- Show data flow left-to-right or top-to-bottom
- Include major components only
- Label connections if needed

### 7. Quick Start

```markdown
## Quick Start

\`\`\`bash
# Clone and install
git clone {repo-url}
npm install

# Set required environment variables
export {VAR}={value}

# Run main command
{command}
\`\`\`
```

**Include:**
- Installation steps
- Required environment variables
- Primary usage command
- Link to full documentation if available

### 8. Recent Updates

```markdown
## Recent Updates

| Date | Change |
|------|--------|
| {Date} | {Description} |
```

**Guidelines:**
- Include last 3-5 significant updates
- Pull from CHANGELOG.md
- Focus on user-visible changes
- Use consistent date format

---

## Formatting Guidelines

1. **Keep it scannable** - Use tables and bullet points over long paragraphs
2. **Be specific** - Include actual numbers, not vague descriptions
3. **Stay current** - Update metrics every time the skill runs
4. **Link appropriately** - Reference other docs where relevant
5. **Team-friendly** - Write for someone new to the project

## File Location

Save as: `PROJECT-SUMMARY.md` (repository root)

## Update Frequency

Run `/project-summary` when:
- Major features are added
- Significant milestones are reached
- Sharing progress with stakeholders
- Onboarding new team members
