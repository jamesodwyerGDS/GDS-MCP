# Running Alert Component Regeneration

This guide shows how to regenerate the Alert component documentation with the improved border detection.

## Prerequisites

You need a Figma personal access token. Get one here:
https://www.figma.com/developers/api#access-tokens

## Option 1: Using the Regeneration Script

```bash
# Set your Figma token (replace with your actual token)
export FIGMA_TOKEN=figd_your_actual_token_here

# Run the regeneration script
node scripts/regenerate-alert.js
```

**Expected Output:**
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
   Image: https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/...

⚡ Rate limit status:
   Remaining: 998
   Resets at: 6:45:30 PM

📝 Next steps:
   1. Review the generated documentation
   2. Update CHANGELOG.md with this change
   3. Commit the updated documentation
```

## Option 2: Using npm Script

```bash
# Set your Figma token
export FIGMA_TOKEN=figd_your_actual_token_here

# Run using npm script
npm run docs:generate -- --file=WU01oSRfSHpOxUn3ThcvC5 --node=10410:52040
```

## Option 3: Provide Token Inline

```bash
# One-line command with token
FIGMA_TOKEN=figd_your_token node scripts/regenerate-alert.js
```

## What Will Be Updated

The regenerated `docs/components/atoms/alert.md` will include:

### 1. Component Image
```markdown
![Alert](https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/...)
```

### 2. Accurate Tokens with Types
```markdown
## Styling

### Colors

| Token | Type | Value |
|-------|------|-------|
| Alert/Background | COLOR | #ffffff |
| Alert/Border/Error | COLOR | #eb0000 |
| Alert/Border/Warning | COLOR | #ffb932 |
| Alert/Border/Info | COLOR | #024ddf |
| Alert/Border/Success | COLOR | #048851 |
```

### 3. Correct Border Information
```markdown
### Borders

**Component Border:** 4px top border

**Colors:** #eb0000, #ffb932, #024ddf, #048851

| Side | Weight |
|------|--------|
| Top  | 4px    |

**Special Elements:**

- **Status Strip**: 4px top border (indicates error, warning, info, or success)
```

## Verify the Changes

After regeneration, check these sections:

1. **Frontmatter** - Should have `imageUrl` field
2. **Overview** - Component image should be embedded
3. **Styling > Colors** - Should show Token/Type/Value columns
4. **Styling > Borders** - Should say "top border" not "left border"
5. **CSS Custom Properties** - Auto-generated from tokens
6. **Tailwind Configuration** - Updated with actual token mappings

## Compare Before/After

### Before (Incorrect)
```markdown
| Color Strip | 4px left border indicating status |
```

### After (Correct)
```markdown
### Borders

**Component Border:** 4px top border
```

## Troubleshooting

### Error: FIGMA_TOKEN not set
```bash
export FIGMA_TOKEN=figd_your_token_here
```

### Error: 403 Forbidden
- Verify your token has access to the file
- Check file isn't in a private workspace you don't have access to
- Generate a new token from Figma settings

### Error: 429 Rate Limited
- Script automatically retries with exponential backoff
- Wait time is shown in console
- Check rate limit status in output

### Error: Node not found
- Verify the node ID is correct: `10410:52040`
- Check the file key: `WU01oSRfSHpOxUn3ThcvC5`
- Ensure component exists in Figma

## After Regeneration

1. **Review** the updated documentation:
   ```bash
   cat docs/components/atoms/alert.md | head -100
   ```

2. **Check the diff**:
   ```bash
   git diff docs/components/atoms/alert.md
   ```

3. **Update CHANGELOG** if needed (already has an entry for border improvements)

4. **Commit changes**:
   ```bash
   git add docs/components/atoms/alert.md
   git commit -m "Regenerate Alert component with improved border detection"
   ```

## Next Steps

Once Alert is regenerated successfully, you can:

1. **Regenerate other components** with border issues
2. **Batch regenerate** all components:
   ```bash
   npm run docs:generate-all
   ```
3. **Create a PR** with the improvements

## Need Help?

- Review `BORDER_DETECTION.md` for technical details
- Check `FIGMA_API_IMPROVEMENTS.md` for complete API documentation
- See `ALERT_REGENERATION_EXAMPLE.md` for expected output
