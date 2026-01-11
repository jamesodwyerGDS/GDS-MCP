# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GDS-MCP is an MCP-friendly documentation workflow for the Global Design System. It extracts foundations, components and patterns from Figma using MCP tools and generates structured markdown documentation optimized for LLM retrieval.

**This project generates design documentation only - no framework-specific code (React, Vue, etc.).**

**IMPORTANT:** When asked to "implement" a Figma design, ALWAYS generate markdown documentation. NEVER ask whether the user wants React, Vue, or other framework code - the answer is always markdown documentation only. Do not offer code generation options.

**Styling Reference:** Tailwind CSS (documentation includes Tailwind utility class mappings for design tokens)

## Quick Start

Use the `/figma-doc` skill to generate documentation from a Figma URL:

```
/figma-doc https://figma.com/design/ABC123/File?node-id=1:234
```

## Commands

```bash
# Install dependencies
npm install

# Generate docs for a single Figma component
npm run docs:generate -- --url="https://figma.com/file/..."
npm run docs:generate -- --file=ABC123 --node=1:234

# Generate docs for multiple components (requires components.json)
npm run docs:generate-all

# Validate frontmatter schema
npm run docs:validate
```

**Environment:** Set `FIGMA_TOKEN` before running generation scripts.

## Architecture

```
/core                     # Documentation generation engine
  figma-client.js         # Figma API/MCP wrapper
  markdown-transformer.js # Transforms Figma data -> markdown
  documentation-generator.js # Main orchestrator

/scripts                  # CLI entry points
  generate.js             # Single component generation
  generate-all.js         # Batch generation
  validate.js             # Frontmatter validation

/docs                     # Generated documentation
  /components/{atoms,molecules,organisms}
  /foundations            # Design tokens (colours, typography, spacing)
  /patterns               # Reusable patterns
  llms.txt                # AI context file for GitMCP

CHANGELOG.md              # Design system changelog (MUST be updated with any changes)

/templates
  component.md            # Component documentation template

/.claude
  /skills
    /figma-doc            # /figma-doc skill
      SKILL.md
    /project-summary      # /project-summary skill
      SKILL.md
    /resources            # Shared templates for skills
      project-summary-template.md

PROJECT-SUMMARY.md        # High-level project summary for team sharing

/.claude-plugin           # Plugin marketplace configuration
  plugin.json
  marketplace.json
```

## Documentation Structure

Generated docs include ONLY:

1. **Overview** - Component purpose, when to use/not use
2. **Variants** - Visual variants table
3. **States** - Component states (default, hover, pressed, disabled, focus)
4. **Properties** - Design properties and values (NOT React props)
5. **Styling** - Typography, spacing, colours, elevation tokens
6. **Accessibility** - WCAG compliance, keyboard navigation
7. **Do's and Don'ts** - Usage guidelines
8. **CSS Custom Properties** - CSS variable definitions
9. **Tailwind Configuration** - Tailwind utility mappings
10. **Figma Variables** - Token references from Figma
11. **Related Components** - Links to related docs
12. **Changelog** - Version history

**Excluded:** React imports, JSX code, framework-specific props (ReactNode, onClick handlers)

## MCP Configuration

The `mcp-config.json` configures two MCP servers:
- **figma**: Official Figma MCP at `https://mcp.figma.com/mcp`
- **docs**: Filesystem MCP for reading generated documentation

Add to Claude Desktop or Cursor settings to enable MCP access.

## Frontmatter Schema

All component docs use YAML frontmatter with:
- `name`, `description`, `category`, `status`, `version`, `updated`
- `tags`, `keywords`, `dependencies`, `relatedComponents`
- `tokens`: `{ colours, spacing, typography, elevation, breakpoints }` - design token references
- `tailwind`: Tailwind utility class mappings for the component
- `cssVariables`: CSS custom property definitions
- `accessibility`: `{ wcagLevel, keyboardNavigable, ariaRoles }`
- `figmaNodeId`, `figmaFileKey`: Source Figma references

Valid categories: `atoms`, `molecules`, `organisms`, `foundations`, `patterns`
Valid statuses: `draft`, `beta`, `stable`, `deprecated`

## Key Patterns

- Documentation sections are self-contained (250-512 tokens) for optimal RAG chunking
- Component filenames use kebab-case (e.g., `button.md`, `date-picker.md`)
- The `DocumentationGenerator` class is trigger-agnostic (CLI, GitHub Actions, webhooks)
- Output is markdown documentation with Tailwind utility mappings - no framework-specific code
- Single-file summaries can be generated for vibe coding tools like Figma Make or Lovable

## Skills

### /figma-doc

Generate design system documentation (markdown only, no code) from a Figma component URL.

**Usage:**
```
/figma-doc <figma-url>
/figma-doc https://figma.com/design/ABC123/File?node-id=1:234
```

**What it does:**
1. Extracts component data from Figma using MCP tools
2. Parses design tokens, variants, and properties
3. Generates a single markdown documentation file
4. Saves to `docs/components/{category}/{component-name}.md`
5. Updates `CHANGELOG.md` with the new/updated documentation entry

**Output:** One markdown file only. No React, Vue, or any framework code is generated.

### /project-summary

Update the PROJECT-SUMMARY.md with current features, learnings, and Claude tools used.

**Usage:**
```
/project-summary
```

**What it does:**
1. Explores the current codebase state
2. Calculates documentation coverage metrics
3. Updates PROJECT-SUMMARY.md with latest information
4. Records the update in CHANGELOG.md

**Output:** Updated PROJECT-SUMMARY.md suitable for sharing with the wider team.

**Template:** Uses `.claude/skills/resources/project-summary-template.md` for consistent structure.

## Changelog Maintenance

**IMPORTANT:** Any changes to documentation or Figma designs MUST be recorded in `CHANGELOG.md`.

Update the changelog when:
- New component documentation is generated
- Existing documentation is updated
- Components are deprecated or removed
- Design tokens are modified
- Figma components are updated

See `CHANGELOG.md` for the entry format and guidelines.

## Plugin Distribution

This project is packaged as a Claude Code plugin marketplace. Others can install with:

```bash
/plugin marketplace add <your-org>/GDS-MCP
/plugin install gds-mcp@gds-mcp-marketplace
```
