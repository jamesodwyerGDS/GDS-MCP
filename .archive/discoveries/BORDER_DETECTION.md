# Border Detection Feature

This document explains the new border detection capability that correctly identifies which sides of a component have borders, fixing issues like the Alert component's top border being incorrectly documented as a left border.

## Problem Statement

The Alert component has a **4px top border** (color strip) that indicates status, but the documentation incorrectly stated it was a "left border". This happened because the previous implementation didn't extract detailed border information from Figma.

## Solution

Added comprehensive border analysis to the Figma API client that:
1. Extracts individual border weights for each side (top, bottom, left, right)
2. Detects border colors and converts them to hex/rgba
3. Identifies uniform vs. non-uniform borders
4. Provides human-readable descriptions

## How It Works

### 1. Enhanced Data Extraction (`figma-client.js`)

The `getDesignContext()` method now extracts:

```javascript
{
  strokeWeight: 4,           // Overall border weight
  strokeAlign: 'INSIDE',     // Border alignment
  strokeTopWeight: 4,        // Top border: 4px
  strokeBottomWeight: 0,     // Bottom border: none
  strokeLeftWeight: 0,       // Left border: none
  strokeRightWeight: 0,      // Right border: none
  strokes: [                 // Border colors
    {
      type: 'SOLID',
      color: { r: 0.93, g: 0, b: 0, a: 1 }
    }
  ]
}
```

### 2. Border Analysis Method

The `analyzeBorders()` method processes this data:

```javascript
const borders = client.analyzeBorders(context);

// Result for Alert component:
{
  hasBorder: true,
  uniform: false,           // Not all sides have borders
  sides: {
    top: 4                  // Only top has 4px border
  },
  weight: 4,
  align: 'INSIDE',
  colors: ['#eb0000']       // Red for error status
}
```

### 3. Human-Readable Description

The `describeBorders()` method generates documentation text:

```javascript
// For Alert with 4px top border:
"4px top border"

// For a component with all borders:
"4px border on all sides"

// For mixed borders:
"Border (top: 4px, bottom: 2px)"
```

## Generated Documentation

### Before (Incorrect)

```markdown
## Anatomy

| Part | Description |
|------|-------------|
| Color Strip | 4px left border indicating status |
```

### After (Correct)

```markdown
## Styling

### Borders

**Component Border:** 4px top border

**Colors:** #eb0000

| Side | Weight |
|------|--------|
| Top  | 4px    |

**Special Elements:**

- **Status Strip**: 4px top border (#eb0000, #ffb932, #024ddf, #048851 for different statuses)
```

## Usage Example

When regenerating the Alert component:

```bash
export FIGMA_TOKEN=your_token
node scripts/regenerate-alert.js
```

The generated documentation will now correctly state:

```markdown
### Color Strip

The **top border** indicates status:
- Width: 4px
- Color: Matches status color token
- Position: Top edge of the container
- Styles: Error (Red), Warning (Yellow), Info (Blue), Success (Green)
```

## API Reference

### `analyzeBorders(node)`

Analyzes border configuration for a Figma node.

**Parameters:**
- `node` - Node object with stroke properties from Figma API

**Returns:**
```javascript
{
  hasBorder: boolean,        // True if any border exists
  uniform: boolean,          // True if all sides are equal
  sides: {                   // Weight for each side
    top?: number,
    bottom?: number,
    left?: number,
    right?: number
  },
  weight: number,            // Primary weight (for uniform borders)
  align: string,             // 'INSIDE', 'OUTSIDE', or 'CENTER'
  colors: string[]           // Hex/rgba color values
}
```

### `describeBorders(borders)`

Generates human-readable border description.

**Parameters:**
- `borders` - Result from `analyzeBorders()`

**Returns:** String description like "4px top border" or "Border (top: 4px, left: 2px)"

## Border Detection Logic

### Individual Side Weights

Figma provides separate properties for each side:
- `strokeTopWeight`
- `strokeBottomWeight`
- `strokeLeftWeight`
- `strokeRightWeight`

If any of these are non-zero, they take precedence over the general `strokeWeight`.

### Uniform Borders

A border is considered "uniform" if:
1. All four sides have the same weight, OR
2. Only `strokeWeight` is set (no individual side weights)

### Color Extraction

Border colors are extracted from the `strokes` array:
- Converts Figma color objects (`{r, g, b, a}` with 0-1 values)
- Outputs as hex for solid colors: `#rrggbb`
- Outputs as rgba for transparency: `rgba(r, g, b, a)`

### Child Element Borders

The system also analyzes borders on child elements, which is useful for detecting:
- Color strips (like Alert's status border)
- Dividers between sections
- Decorative accents

## Example Scenarios

### Alert Component (Top Border Only)

```javascript
// Input from Figma:
{
  strokeTopWeight: 4,
  strokeBottomWeight: 0,
  strokeLeftWeight: 0,
  strokeRightWeight: 0,
  strokes: [{ type: 'SOLID', color: { r: 0.93, g: 0, b: 0, a: 1 }}]
}

// Output:
"4px top border"
// Colors: #eb0000
```

### Card Component (All Sides)

```javascript
// Input from Figma:
{
  strokeWeight: 1,
  strokes: [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }}]
}

// Output:
"1px border on all sides"
// Colors: #e6e6e6
```

### Divider (Bottom Border Only)

```javascript
// Input from Figma:
{
  strokeTopWeight: 0,
  strokeBottomWeight: 2,
  strokeLeftWeight: 0,
  strokeRightWeight: 0,
  strokes: [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }}]
}

// Output:
"2px bottom border"
// Colors: #cccccc
```

## Benefits

1. **Accurate Documentation** - Correctly identifies which sides have borders
2. **Automatic Detection** - No manual inspection needed
3. **Color Information** - Extracts and converts border colors automatically
4. **Child Elements** - Detects borders on nested elements (color strips, dividers)
5. **Flexible Display** - Adapts output format based on border complexity

## Testing

To test border detection on your components:

```javascript
import { FigmaClient } from './core/figma-client.js';

const client = new FigmaClient(process.env.FIGMA_TOKEN);
const context = await client.getDesignContext(fileKey, nodeId);
const borders = client.analyzeBorders(context);

console.log('Border info:', borders);
console.log('Description:', client.describeBorders(borders));
```

## Custom Stroke Detection (UPDATED)

### ✅ Figma Custom Stroke UI - FULLY SUPPORTED

**Update (January 14, 2026):** The Figma API **DOES** expose Custom stroke settings via the `individualStrokeWeights` field!

**API Field:** `individualStrokeWeights`

When Figma's "Custom" stroke option is used (selecting specific sides via Top, Bottom, Left, Right):

```javascript
{
  strokeWeight: 8,              // Overall weight
  strokeAlign: 'INSIDE',        // Alignment
  individualStrokeWeights: {    // ← THE KEY FIELD!
    top: 8,
    right: 0,
    bottom: 0,
    left: 0
  }
}
```

**Border Detection now checks:**
1. First: `individualStrokeWeights` object (Custom strokes)
2. Fallback: Individual properties (`strokeTopWeight`, `strokeBottomWeight`, etc.)
3. Fallback: Uniform `strokeWeight`

**Result:** Fully autonomous detection of Custom strokes! ✅

**Example:** Alert component with "Custom > Top" 8px stroke is correctly detected as "8px top border".

## Future Enhancements

Potential improvements:
1. ~~Detect border on specific sides~~ ✅ DONE (via `individualStrokeWeights`)
2. Detect border radius per corner
3. Support for gradient borders
4. Border style detection (solid, dashed, dotted)
5. Shadow/glow detection as "borders"
6. Compound borders (multiple stroke layers)

## Migration Note

Existing documentation will not automatically update. To get the corrected border information:

1. Set your Figma token: `export FIGMA_TOKEN=your_token`
2. Regenerate the component: `node scripts/regenerate-alert.js`
3. Review the updated "Borders" section in the Styling area
4. Update CHANGELOG.md noting the correction

## Related Files

- `core/figma-client.js` - Border extraction logic
- `core/documentation-generator.js` - Integration with extraction
- `core/markdown-transformer.js` - Documentation formatting
- `FIGMA_API_IMPROVEMENTS.md` - Overall API improvements
