# Alert Component Regeneration Example

This document shows what the Alert component documentation would look like when regenerated using the improved Figma API integration.

## How to Regenerate

```bash
# Set your Figma token
export FIGMA_TOKEN=your_figma_personal_access_token

# Run the regeneration script
node scripts/regenerate-alert.js
```

Or use the original generation script:

```bash
npm run docs:generate -- --file=WU01oSRfSHpOxUn3ThcvC5 --node=10410:52040
```

## What's Different

### Before (Old API Integration)

**Frontmatter tokens:**
```yaml
tokens:
  colours:
    background: "Spotlight #FFFFFF"
    text:
      title: "Cosmos #121212"
      body: "Cosmos #121212"
  spacing:
    containerPadding: "Auditorium 16px"
  typography:
    title: "Boise"
    body: "Rainier"
```

**Issues:**
- Token names are inconsistent (some as strings, some as objects)
- No type information
- Manual color hex values (may be outdated)
- No automatic image

### After (Improved API Integration)

**Frontmatter tokens:**
```yaml
tokens:
  colours:
    - Alert/Background
    - Alert/Border/Error
    - Alert/Border/Warning
    - Alert/Border/Info
    - Alert/Border/Success
    - Alert/Text/Title
    - Alert/Text/Body
  spacing:
    - Alert/Padding/Container
    - Alert/Gap/Icon-Text
    - Alert/Gap/Title-Body
  typography:
    - Alert/Title/Font
    - Alert/Body/Font
  imageUrl: https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/...
```

**Improvements:**
- Extracted directly from Figma Variables using `resolvedType`
- Consistent array format
- Actual token names from design system
- Automatic component screenshot embedded

**Documentation body:**
```markdown
# Alert

![Alert](https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/...)

## Overview

An alert component that displays important messages to users...

## Styling

### Colors

| Token | Type | Value |
|-------|------|-------|
| Alert/Background | COLOR | #ffffff |
| Alert/Border/Error | COLOR | #eb0000 |
| Alert/Border/Warning | COLOR | #ffb932 |
| Alert/Border/Info | COLOR | #024ddf |
| Alert/Border/Success | COLOR | #048851 |

### Spacing

| Token | Type | Value |
|-------|------|-------|
| Alert/Padding/Container | FLOAT | 16px |
| Alert/Gap/Icon-Text | FLOAT | 16px |
| Alert/Gap/Title-Body | FLOAT | 8px |

### Typography

| Token | Type | Value |
|-------|------|-------|
| Alert/Title/Font | STRING | Averta |
| Alert/Body/Font | STRING | Averta |
```

## Benefits of Regeneration

1. **Accurate Token References** - Pulled directly from Figma Variables API with proper types
2. **Visual Preview** - Component screenshot automatically embedded
3. **Up-to-Date Data** - Current values from Figma, not manually entered
4. **Better DX** - Tailwind and CSS variable configs auto-generated from tokens
5. **Type Safety** - Token types (COLOR, FLOAT, STRING) included in tables

## Expected Output

When you run the regeneration script with a valid FIGMA_TOKEN:

```
🚀 Regenerating Alert component documentation with improved API...

📥 Fetching component data from Figma...
   File: WU01oSRfSHpOxUn3ThcvC5
   Node: 10410:52040

Extracting component data from Figma...
Exporting component image...
Transforming to markdown...
Documentation generated: docs/components/atoms/alert.md

✅ Documentation generated successfully!

📄 Details:
   Component: Alert
   Category: atoms
   Path: docs/components/atoms/alert.md
   Image: https://figma-alpha-api.s3.us-west-2.amazonaws.com/images...

⚡ Rate limit status:
   Remaining: 998
   Resets at: 6:45:30 PM

📝 Next steps:
   1. Review the generated documentation
   2. Update CHANGELOG.md with this change
   3. Commit the updated documentation
```

## Token Structure Comparison

### Old Structure (Manual)
```javascript
{
  colours: {
    background: "Spotlight #FFFFFF",
    status: {
      error: "Mars #EB0000"
    }
  }
}
```

**Problems:**
- Mixed string/object structure
- Manual token names with hex values
- No type information
- Difficult to parse programmatically

### New Structure (From API)
```javascript
{
  colours: [
    {
      name: "Alert/Background",
      type: "COLOR",
      value: "#ffffff"
    },
    {
      name: "Alert/Status/Error",
      type: "COLOR",
      value: "#eb0000"
    }
  ]
}
```

**Benefits:**
- Consistent array structure
- Extracted from Figma's `resolvedType` field
- Actual design token names
- Easy to transform to CSS vars, Tailwind config, etc.

## Next Steps

To regenerate all component documentation with the improved API:

1. **Set Figma Token:**
   ```bash
   export FIGMA_TOKEN=your_token_here
   ```

2. **Regenerate Single Component:**
   ```bash
   node scripts/regenerate-alert.js
   ```

3. **Regenerate All Components:**
   ```bash
   npm run docs:generate-all
   ```

4. **Verify Improvements:**
   - Check for component images in markdown
   - Review token tables have Type and Value columns
   - Verify Tailwind config includes fontSize
   - Confirm CSS variables match token names

5. **Update Changelog:**
   Add entry to `CHANGELOG.md` noting the regeneration

## Performance

With the new caching system:
- **First component:** ~2-3 seconds
- **Same component again:** ~200ms (from cache)
- **Rate limit hits:** Automatic retry with backoff
- **Batch operations:** Progress tracking with rate limit status

## Troubleshooting

**Error: FIGMA_TOKEN not set**
```bash
export FIGMA_TOKEN=figd_your_actual_token
```

**Error: 429 Rate Limit**
- Script will automatically retry
- Check status: `generator.figma.getRateLimitStatus()`
- Wait time shown in console

**Error: 403 Forbidden**
- Verify token has file access
- Check file isn't in private workspace

**Error: Node not found**
- Verify node ID format (use `:` not `-`)
- Check component exists in file
