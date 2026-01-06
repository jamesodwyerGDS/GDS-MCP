# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Overview

GDS-MCP generates structured markdown documentation from Figma designs for the Global Design System. Uses MCP tools to extract components, tokens, and patterns.

**Output: Markdown documentation only. Never generate React, Vue, or framework code.**

## Quick Start

```bash
# Generate docs from Figma URL
/figma-doc https://figma.com/design/ABC123/File?node-id=1:234

# CLI alternatives
npm run docs:generate -- --url="https://figma.com/file/..."
npm run docs:generate-all    # Batch (requires components.json)
npm run docs:validate        # Validate frontmatter
```

Requires `FIGMA_TOKEN` environment variable.

## Architecture

```
/core           # figma-client.js, markdown-transformer.js, documentation-generator.js
/scripts        # generate.js, generate-all.js, validate.js
/docs           # Generated: /components/{atoms,molecules,organisms}, /foundations, /patterns
/templates      # component.md template
/.claude/skills # /figma-doc skill
```

## Documentation Structure

Generated docs include: Overview, Variants, States, Properties, Styling (tokens), Accessibility, Do's/Don'ts, CSS Custom Properties, Tailwind mappings, Figma Variables, Related Components, Changelog.

Sections are self-contained (250-512 tokens) for RAG chunking. Filenames use kebab-case.

## Frontmatter Schema

```yaml
name, description, category, status, version, updated
tags, keywords, dependencies, relatedComponents
tokens: { colours, spacing, typography, elevation, breakpoints }
tailwind: # utility class mappings
cssVariables: # CSS custom properties
accessibility: { wcagLevel, keyboardNavigable, ariaRoles }
figmaNodeId, figmaFileKey
```

Categories: `atoms`, `molecules`, `organisms`, `foundations`, `patterns`
Statuses: `draft`, `beta`, `stable`, `deprecated`

## MCP Configuration

`mcp-config.json` configures:
- **figma**: `https://mcp.figma.com/mcp`
- **docs**: Filesystem MCP for reading generated documentation

## Changelog

Update `CHANGELOG.md` when documentation is generated, updated, deprecated, or tokens are modified.

## Plugin Installation

```bash
/plugin marketplace add <your-org>/GDS-MCP
/plugin install gds-mcp@gds-mcp-marketplace
```
