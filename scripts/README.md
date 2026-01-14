# Scripts Directory

This directory contains the core scripts for generating and managing Global Design System documentation from Figma.

## Core Scripts

### `generate.js` - Single Component Documentation Generator

Generates markdown documentation for a single Figma component.

**Purpose:** Extract design data from a specific Figma component and generate structured markdown documentation optimized for LLM retrieval.

**Usage:**

```bash
# Using full Figma URL
npm run docs:generate -- --url="https://figma.com/file/ABC123/Design-System?node-id=1:234"

# Using file key and node ID separately
npm run docs:generate -- --file=ABC123 --node=1:234

# Custom output directory
npm run docs:generate -- --url="..." --output=./custom-docs
```

**Parameters:**

| Parameter | Description | Required | Example |
|-----------|-------------|----------|---------|
| `--url` | Full Figma component URL | Yes* | `https://figma.com/file/ABC123/...?node-id=1:234` |
| `--file` | Figma file key (alternative to URL) | Yes* | `ABC123` |
| `--node` | Figma node ID (used with --file) | No | `1:234` |
| `--output` | Output directory for documentation | No | `./docs/components` (default) |

*Either `--url` OR `--file` must be provided.

**Environment Variables:**

- `FIGMA_TOKEN` (required) - Your Figma personal access token

**Output:**

Generates a single markdown file at `docs/components/{category}/{component-name}.md` containing:
- Component overview and usage guidelines
- Variants and states
- Design properties and tokens
- Tailwind utility mappings
- CSS custom properties
- Accessibility information
- Related components

**Example:**

```bash
export FIGMA_TOKEN=figd_your_token_here
npm run docs:generate -- --url="https://figma.com/file/ABC123/GDS?node-id=1:234"

# Output:
# ✓ Successfully generated: docs/components/atoms/button.md
#   Component: Button
#   Category: atoms
```

**Exit Codes:**
- `0` - Success
- `1` - Error (missing token, invalid URL, API error, etc.)

---

### `generate-all.js` - Batch Component Documentation Generator

Generates documentation for multiple Figma components from a configuration file.

**Purpose:** Batch process multiple components for initial documentation generation or comprehensive updates.

**Usage:**

```bash
# Using default config file (components.json)
npm run docs:generate-all

# Using custom config file
npm run docs:generate-all -- --config=./custom-components.json

# Custom output directory
npm run docs:generate-all -- --config=components.json --output=./custom-docs
```

**Parameters:**

| Parameter | Description | Required | Default |
|-----------|-------------|----------|---------|
| `--config` | Path to configuration JSON file | No | `./components.json` |
| `--output` | Output directory for documentation | No | `./docs/components` |

**Configuration File Format:**

Create a JSON file (e.g., `components.json`) with the following structure:

```json
{
  "components": [
    {
      "url": "https://figma.com/file/ABC123/GDS?node-id=1:234"
    },
    {
      "file": "ABC123",
      "node": "1:456"
    },
    {
      "url": "https://figma.com/file/DEF789/GDS?node-id=2:345"
    }
  ]
}
```

See `components.example.json` in `/.example-configs/` for a complete example.

**Environment Variables:**

- `FIGMA_TOKEN` (required) - Your Figma personal access token

**Output:**

Generates multiple markdown files and provides a summary:

```
Generating documentation for 3 components...

--- Summary ---

✓ Successful: 2
  - Button (docs/components/atoms/button.md)
  - Alert (docs/components/atoms/alert.md)

✗ Failed: 1
  - https://figma.com/file/...: Component not found
```

**Exit Codes:**
- `0` - All components processed successfully
- `1` - One or more components failed

**Best Practices:**
- Start with a small batch (3-5 components) to validate configuration
- Use the `components.example.json` as a template
- Check output after each batch to ensure quality
- Update `CHANGELOG.md` after batch generation

---

### `validate.js` - Frontmatter Schema Validator

Validates YAML frontmatter in generated documentation files against the required schema.

**Purpose:** Ensure all documentation files have correct frontmatter structure, required fields, and valid values for categories, statuses, and tokens.

**Usage:**

```bash
# Validate all docs (default: ./docs)
npm run docs:validate

# Validate specific directory
npm run docs:validate -- --path=./docs/components

# Validate only atoms
npm run docs:validate -- --path=./docs/components/atoms
```

**Parameters:**

| Parameter | Description | Required | Default |
|-----------|-------------|----------|---------|
| `--path` | Directory to validate | No | `./docs` |

**Validation Rules:**

**Required Fields:**
- `name` - Component name
- `description` - Component description
- `category` - Must be: `atoms`, `molecules`, `organisms`, `foundations`, or `patterns`
- `status` - Must be: `draft`, `beta`, `stable`, or `deprecated`
- `version` - Semantic version (X.Y.Z format)
- `updated` - Last update date (YYYY-MM-DD format)

**Optional Fields (validated if present):**
- `tokens` - Must contain arrays for `colours`, `spacing`, or `typography`
- `accessibility.wcagLevel` - Must be: `A`, `AA`, or `AAA`
- `frameworks` - Each entry must have `framework` and `import` fields

**Output:**

```
Validating documentation in: ./docs

--- Validation Summary ---

✓ Valid: 8
✗ Invalid: 2

Issues found:

docs/components/atoms/button.md:
  - Invalid status: "active" (must be: draft, beta, stable, deprecated)
  - Invalid version format: "1.0" (must be: X.Y.Z)
```

**Exit Codes:**
- `0` - All files valid
- `1` - One or more files invalid

**Common Issues:**
- Missing required fields (usually `version` or `updated`)
- Invalid date format (must be `YYYY-MM-DD`)
- Invalid status or category values
- Malformed version numbers

---

### `analyze-efficiency.js` - Documentation Coverage Analyzer

Analyzes documentation coverage and generates an efficiency report.

**Purpose:** Identify documentation gaps, stale content, and opportunities for improvement.

**Usage:**

```bash
npm run analyze
```

**No parameters required.**

**Output:**

Prints a console report and generates `efficiency-report.json`:

```
============================================================
GDS Documentation Efficiency Analysis
============================================================

## Coverage
- Design docs: 12

## Gaps
Missing design docs (0):

## Suggestions
No efficiency improvements needed!

Full report saved to: efficiency-report.json
```

**Report Structure:**

The generated `efficiency-report.json` contains:

```json
{
  "coverage": {
    "design": 12
  },
  "gaps": {
    "totalComponents": 0
  },
  "staleness": {
    "lastUpdate": "2026-01-14T10:30:00.000Z"
  },
  "suggestions": []
}
```

**Exit Codes:**
- `0` - Analysis complete (always succeeds)

**When to Use:**
- After batch documentation generation
- Before planning documentation updates
- To identify components needing documentation
- To track documentation health over time

---

## Workflow Examples

### Creating Documentation for a New Component

```bash
# 1. Set your Figma token
export FIGMA_TOKEN=figd_your_token_here

# 2. Generate documentation
npm run docs:generate -- --url="https://figma.com/file/ABC123/GDS?node-id=1:234"

# 3. Validate the output
npm run docs:validate -- --path=./docs/components/atoms

# 4. Update CHANGELOG.md manually with the new component
```

### Updating Documentation from Figma Changes

```bash
# 1. Regenerate the component documentation
npm run docs:generate -- --file=ABC123 --node=1:234

# 2. Validate changes
npm run docs:validate

# 3. Update CHANGELOG.md with version bump and changes
```

### Batch Documentation Generation

```bash
# 1. Create components.json config file
# (See /.example-configs/components.example.json)

# 2. Run batch generation
npm run docs:generate-all

# 3. Validate all generated docs
npm run docs:validate

# 4. Check coverage
npm run analyze

# 5. Update CHANGELOG.md with batch update entry
```

---

## Troubleshooting

### "Error: FIGMA_TOKEN environment variable is required"

**Solution:** Set your Figma personal access token:
```bash
export FIGMA_TOKEN=figd_your_token_here
```

To persist across sessions, add to your shell profile (`~/.zshrc` or `~/.bashrc`):
```bash
echo 'export FIGMA_TOKEN=figd_your_token_here' >> ~/.zshrc
```

### "Error: Component not found"

**Causes:**
1. Invalid Figma file key or node ID
2. Token doesn't have access to the file
3. Component has been deleted or moved

**Solution:**
- Verify the URL in Figma's browser
- Check token permissions
- Ensure you're using the correct file key format (not the file name)

### "Parse error: Unexpected token"

**Causes:**
- Malformed JSON in config file
- Invalid Figma API response

**Solution:**
- Validate JSON syntax in your config file using a JSON validator
- Check Figma API status
- Try regenerating with a different component

### Validation errors for existing files

**Solution:**
1. Read the validation error message carefully
2. Open the file and check the frontmatter
3. Fix the specific field mentioned (date format, category value, etc.)
4. Re-run validation

---

## Integration with Claude Code

These scripts are designed to work with the `/figma-doc` skill in Claude Code:

```
/figma-doc https://figma.com/file/ABC123/GDS?node-id=1:234
```

The skill internally uses `generate.js` to create documentation and automatically updates `CHANGELOG.md`.

---

## Development Notes

### Script Dependencies

All scripts use ES modules and require:
- Node.js 18+
- Core dependencies: `gray-matter`, `@figma/rest-api-spec` (implied)
- Custom modules: `../core/documentation-generator.js`, `../core/figma-client.js`

### Adding New Scripts

When adding new scripts:
1. Add shebang: `#!/usr/bin/env node`
2. Include usage comment block at the top
3. Add npm script in `package.json`
4. Document in this README
5. Follow the parseArgs pattern for consistency
6. Handle errors gracefully with clear messages
7. Use appropriate exit codes

### Output Conventions

- ✓ Success messages in green context
- ✗ Error messages in red context
- Use consistent formatting for summaries
- Always provide actionable error messages

---

*Last updated: 2026-01-14*
