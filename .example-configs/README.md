# Example Configurations

This directory contains example configuration files for the GDS-MCP documentation workflow.

## Available Examples

### `components.example.json`

Example configuration for batch component documentation generation using `generate-all.js`.

**Purpose:** Demonstrates how to structure a configuration file for generating documentation for multiple Figma components in a single batch.

**Usage:**

1. Copy the example to your project root:
   ```bash
   cp .example-configs/components.example.json ./components.json
   ```

2. Edit `components.json` with your Figma file keys and node IDs:
   ```json
   {
     "components": [
       {
         "url": "https://figma.com/file/YOUR_FILE_KEY/YourFile?node-id=1:234"
       },
       {
         "file": "YOUR_FILE_KEY",
         "node": "1:456"
       }
     ]
   }
   ```

3. Run batch generation:
   ```bash
   npm run docs:generate-all
   ```

**Configuration Format:**

Each component entry can use either:

**Full URL format:**
```json
{
  "url": "https://figma.com/file/ABC123/Design-System?node-id=1:234"
}
```

**Separate file and node format:**
```json
{
  "file": "ABC123",
  "node": "1:234"
}
```

**File only (generates all components):**
```json
{
  "file": "ABC123"
}
```

**Finding Figma Keys:**

1. Open your component in Figma
2. Copy the URL from the browser address bar
3. Extract the file key and node ID:
   - URL: `https://figma.com/file/ABC123xyz/My-Design-System?node-id=1:234`
   - File key: `ABC123xyz`
   - Node ID: `1:234`

**Tips:**

- Start with a small batch (3-5 components) to test
- Use descriptive file names if managing multiple config files
- Keep separate configs for different component categories (atoms, molecules, etc.)
- Add comments in your working `components.json` by creating a separate `_notes` field:
  ```json
  {
    "_notes": "Production components only",
    "components": [...]
  }
  ```

## Creating Your Own Configuration

### For Development/Testing

Create `components.dev.json`:
```json
{
  "components": [
    {
      "url": "https://figma.com/file/.../test-component"
    }
  ]
}
```

Run with:
```bash
npm run docs:generate-all -- --config=components.dev.json
```

### For Production

Create `components.production.json`:
```json
{
  "components": [
    { "file": "ABC123", "node": "1:100" },
    { "file": "ABC123", "node": "1:200" },
    { "file": "ABC123", "node": "1:300" }
  ]
}
```

### For Specific Categories

Create `components.atoms.json`, `components.molecules.json`, etc.:
```json
{
  "components": [
    { "url": "https://figma.com/file/.../button" },
    { "url": "https://figma.com/file/.../input" },
    { "url": "https://figma.com/file/.../checkbox" }
  ]
}
```

## Version Control

### What to Commit

✅ **DO commit:**
- Example configuration files (`.example-configs/`)
- Template configurations
- Documentation about configuration format

❌ **DON'T commit:**
- Working `components.json` in project root (personal/team-specific)
- Configuration files with sensitive URLs or internal file keys
- Temporary test configurations

### .gitignore Setup

Add to your `.gitignore`:
```
components.json
components.*.json
!.example-configs/
```

This ensures:
- Your working configs stay local
- Example configs are tracked
- Team members can create their own configs

## Troubleshooting

### "Error reading config file"

**Cause:** JSON syntax error or file not found

**Solution:**
- Validate JSON syntax (use a JSON validator)
- Ensure file exists at the specified path
- Check for trailing commas (not valid in JSON)

### "Component not found" errors during batch

**Cause:** Invalid file keys or node IDs

**Solution:**
- Verify each URL in Figma browser
- Check that your `FIGMA_TOKEN` has access to all files
- Remove or fix invalid entries
- Run with a smaller batch to isolate the problem

### Mixed success/failure in batch

**Normal behavior:** Some components may fail while others succeed

**Action:**
- Review the summary output
- Fix failed entries
- Re-run with `--config` pointing to a file with only failed entries

## Related Scripts

- `scripts/generate.js` - Single component generation (no config needed)
- `scripts/generate-all.js` - Batch generation (uses config file)
- `scripts/validate.js` - Validate generated documentation

## Related Documentation

- `/scripts/README.md` - Comprehensive script documentation
- `/CLAUDE.md` - Project overview and workflow guide

---

*Last updated: 2026-01-14*
