---
name: figma-doc
description: Generate design system documentation (markdown only, no code) from a Figma component URL. Triggers on "/figma-doc <url>", requests to "document this component", or when given a Figma design URL to document. Automatically updates the CHANGELOG.md after generating documentation.
---

# Figma Documentation Generator

Generate **markdown documentation only** from Figma components. This skill extracts design data using Figma MCP tools and produces structured markdown files optimized for LLM retrieval.

**Important:** This skill generates documentation files only. No React, Vue, Angular, or any framework code is generated.

## Usage

```
/figma-doc https://figma.com/design/ABC123/File?node-id=1:234
```

## Step-by-Step Workflow

When invoked, follow these steps exactly:

### Step 1: Parse the Figma URL

Extract from the URL:
- **fileKey**: The alphanumeric ID after `/design/` (e.g., `WU01oSRfSHpOxUn3ThcvC5`)
- **nodeId**: The `node-id` parameter, converting `-` to `:` (e.g., `38818-15812` → `38818:15812`)

Example URL: `https://figma.com/design/WU01oSRfSHpOxUn3ThcvC5/File?node-id=38818-15812`
- fileKey = `WU01oSRfSHpOxUn3ThcvC5`
- nodeId = `38818:15812`

### Step 2: Get Initial Design Context

Call `mcp__figma__get_design_context` with the extracted parameters:

```
fileKey: "{extracted fileKey}"
nodeId: "{extracted nodeId}"
clientLanguages: "css,html"
clientFrameworks: "none"
```

Note: We use "none" for frameworks since we're generating documentation only, not component code.

If the response says the design is too large, note the child node IDs for subsequent calls.

### Step 3: Get Variable Definitions

Call `mcp__figma__get_variable_defs` to extract all design tokens:

```
fileKey: "{fileKey}"
nodeId: "{nodeId}"
```

This returns color tokens, typography styles, spacing values, and elevation definitions.

### Step 4: Get Component Variants (if needed)

If the initial context was too large, call `mcp__figma__get_design_context` on specific variant nodes identified in Step 2. Common patterns:
- Look for nodes named with variants like `Type=Single Date, Desktop=Yes`
- Get context for 2-3 key variants to understand the full component

### Step 5: Get Screenshot

Call `mcp__figma__get_screenshot` for visual reference:

```
fileKey: "{fileKey}"
nodeId: "{nodeId}"
```

### Step 6: Read Template and Existing Docs

Read the template at `templates/component.md` and check existing docs in `docs/components/` to match formatting conventions.

### Step 7: Determine Category

Based on component complexity:
- **atoms**: Simple, single-purpose (button, input, icon, badge)
- **molecules**: Composite of atoms (date-picker, search-bar, card)
- **organisms**: Complex, multiple molecules (header, form, modal)

### Step 8: Generate Documentation

Create markdown file at `docs/components/{category}/{component-name}.md` with these sections:

#### Required Frontmatter

```yaml
---
name: Component Name
description: Brief description of the component
category: atoms | molecules | organisms
status: stable
version: 1.0.0
updated: YYYY-MM-DD
tags: [tag1, tag2]
keywords: [keyword1, keyword2]
dependencies: []
relatedComponents:
  - name: RelatedComponent
    relationship: alternative | variant | parent | child
tokens:
  colours:
    primary:
      default: "Token Name #HEX"
  spacing:
    paddingX: "Token Name Value"
  typography:
    label: "Font description"
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles: [role1, role2]
figmaNodeId: "{nodeId}"
figmaFileKey: "{fileKey}"
---
```

#### Required Sections

1. **# Component Name** - H1 title
2. **## Overview** - Purpose and use cases
3. **## Variants** - Table of visual variants
4. **## Anatomy** - ASCII diagram of component parts
5. **## States** - Table of interactive states
6. **## Properties** - Design properties (NOT framework props)
7. **## Styling** - Typography, Spacing, Colors subsections
8. **## Accessibility** - Keyboard nav, ARIA, screen readers
9. **## Do's and Don'ts** - Usage guidelines
10. **## CSS Custom Properties** - CSS variable definitions
11. **## Tailwind Configuration** - theme.extend mappings
12. **## Figma Variables** - Token reference table
13. **## Related Components** - Links to related docs
14. **## Changelog** - Version history

### Step 9: Save and Report

Save the **single markdown file** and report:
- File path created (e.g., `docs/components/atoms/button.md`)
- Component name
- Category assigned
- Key design tokens extracted

**Do NOT create any other files.** Only the markdown documentation file.

### Step 10: Update Changelog

**Important:** After generating or updating any documentation, you MUST update the changelog at `CHANGELOG.md`.

Add an entry with:
- **Date**: Current date in format `{Day}{Ordinal} {Month} {Year}` (e.g., "15th Jan 2025")
- **Change**: Description of what was documented
- **Type**: 🟢 Added (new docs), 🟡 Updated (modified docs), or 🔴 Deprecated
- **JIRA**: Link if available, otherwise "NA"
- **Figma**: Link to the Figma component
- **Storybook**: Link if available, otherwise "NA"

Example changelog entry:
```markdown
## 15th Jan 2025

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Added documentation for Button component | 🟢 Added | NA | [Figma Link](https://figma.com/...) | [Storybook Link](https://...) |
```

## What to Extract

### From Design Context
- Component name (from frame name)
- Variant property names and values
- Layout structure (auto-layout direction, gaps)
- Colors (hex values from Tailwind classes)
- Typography (font-family, size, weight, line-height, letter-spacing)
- Spacing (padding, margins, gaps)
- Border radius values

### From Variable Definitions
- Color token names and hex values
- Typography style definitions
- Spacing token names
- Elevation/shadow definitions
- Button/component-specific variables

### From Screenshot
- Visual confirmation of component appearance
- Verify variants and states shown

## Output: Markdown Documentation Only

**This skill outputs ONE file:** A markdown documentation file saved to `docs/components/{category}/{component-name}.md`

**Never generate:**
- React, Vue, Angular, Svelte, or any framework components
- JSX/TSX files or usage examples
- Import statements or code snippets showing component usage
- Framework-specific props (onClick, children, ReactNode, etc.)
- Event handlers or state management code
- TypeScript interfaces or type definitions
- Storybook stories
- Test files

## Example Output

**Single file created:** `docs/components/molecules/date-picker.md`

```markdown
---
name: Date Picker
description: ...
category: molecules
...
---

# Date Picker

## Overview
...

## Variants
| Variant | Description |
...

## Styling
### Typography
...

## Accessibility
...
```

No other files are created. No component code. Just documentation.

## Environment Requirements

- Figma MCP server must be connected
- User must have access to the Figma file
