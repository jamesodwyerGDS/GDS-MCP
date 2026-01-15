---
name: figma-make-guidelines
description: Generate or update the Figma Make guidelines file with complete Tailwind configuration from the design system foundations. Triggers on "/figma-make-guidelines", "update guidelines", or "generate Figma Make config".
---

# Figma Make Guidelines Generator

Generate a comprehensive `guidelines/Guidelines.md` file that Figma Make can use to produce Tailwind CSS matching your component library with pixel-perfect accuracy.

## Usage

```
/figma-make-guidelines
```

## What This Skill Does

Consolidates all design tokens from your GDS foundations into a single guidelines file containing:
- Complete Tailwind configuration (copy-paste ready)
- Color palette with hex values and Tailwind class mappings
- Spacing scale (8px baseline grid)
- Typography with font sizes, weights, line heights, letter spacing
- Border radius values
- Border colors and widths
- **Full component specifications** (height, width, min-width, padding, gaps)
- Component styling patterns (buttons, inputs, cards, badges, toasts)
- Critical usage rules

## Step-by-Step Workflow

### Step 1: Read Foundation Docs

Read the design system foundation files to extract current tokens:

```
docs/foundations/color.md
docs/foundations/typography.md
docs/foundations/spacing.md
docs/foundations/elevation.md
```

Extract:
- **Colors**: All color tokens with hex values, organized by category (primary, secondary, tertiary, structural, dark mode)
- **Typography**: Font family, weights, font size tokens with line-height and letter-spacing
- **Spacing**: All spacing tokens with pixel values
- **Elevation**: Shadow/elevation tokens if present

### Step 2: Read Component Docs for Full Specifications

Read key component docs to extract complete styling specifications:

```
docs/components/atoms/button.md
docs/components/atoms/input-field.md
docs/components/atoms/badge.md
docs/components/atoms/toast.md
docs/components/atoms/checkbox.md
docs/components/atoms/radio.md
docs/components/molecules/card.md
```

Extract **full component specifications** including:
- **Dimensions**: Fixed height, min-width, max-width
- **Sizing by variant**: Different sizes (small, medium, large) with exact pixel values
- **Padding**: Horizontal and vertical padding values
- **Gaps**: Internal spacing between icon and label
- **Border**: Width, radius, colors per state
- **State colors**: Default, hover, pressed, disabled, focus
- **Typography per variant**: Font size, weight, line-height, letter-spacing
- **Icon sizes**: Dimensions for icons within components

### Step 3: Read Existing Guidelines (if present)

Check if `guidelines/Guidelines.md` exists to preserve any custom rules or patterns that were manually added.

### Step 4: Generate Guidelines File

Create or update `guidelines/Guidelines.md` with this structure:

```markdown
# GDS - Global Design System

[Brief intro paragraph]

---

## Tailwind Configuration

[Complete tailwind.config.js theme.extend block with:]
- colors (all tokens)
- spacing (all tokens)
- fontFamily
- fontWeight
- fontSize (with lineHeight, letterSpacing, fontWeight objects)
- borderRadius
- borderWidth
- maxWidth
- gap
- height (component-specific heights)
- minWidth (component-specific min-widths)

---

## Design Tokens Reference

### Colors
[Table: Token | Hex | Tailwind Class | Usage]

### Typography
[Table: Token | Size | Weight | Line Height | Letter Spacing | Tailwind Class | Usage]

### Spacing (8px Baseline Grid)
[Table: Token | Value | Tailwind Classes | Usage]

### Border Radius
[Table: Context | Value | Tailwind Class]

### Border Colors
[Table: Context | Color | Tailwind Class]

---

## Component Specifications

**CRITICAL: These specs ensure pixel-perfect component rendering. Always include all dimensions.**

### Button Specifications

| Property | Standard | Transactional | Icon-Only |
|----------|----------|---------------|-----------|
| Height | 44px | 44px | 44px |
| Min-Width | 100px | 120px | 44px |
| Padding X | 16px | 16px | 10px |
| Padding Y | 10px | 9px | 10px |
| Border Radius | 4px | 4px | 4px / full |
| Icon Size | 24px | 24px | 24px |
| Icon Gap | 8px | 8px | 0 |
| Font Size | 16px | 18px | — |
| Font Weight | 600 | 600 | — |
| Line Height | 24px | 26px | — |
| Letter Spacing | 0.32px | 0.36px | — |

#### Button Tailwind Classes
```
Standard: h-[44px] min-w-[100px] px-auditorium py-[10px] rounded-sm gap-club text-[16px] leading-[24px] tracking-[0.32px] font-semibold
Transactional: h-[44px] min-w-[120px] px-auditorium py-[9px] rounded-sm gap-club text-[18px] leading-[26px] tracking-[0.36px] font-semibold capitalize
Icon-Only: h-[44px] w-[44px] p-[10px] rounded-sm (or rounded-full for circular)
```

### Input Field Specifications

| Property | Value |
|----------|-------|
| Height | 48px |
| Min-Width | 200px |
| Padding X | 12px |
| Padding Y | 12px |
| Border Width | 1px |
| Border Radius | 4px |
| Font Size | 16px |
| Line Height | 24px |

#### Input Tailwind Classes
```
h-[48px] min-w-[200px] px-hall py-hall border border-ammonite rounded-sm text-[16px] leading-[24px]
Focus: focus:border-neptune focus:ring-2 focus:ring-neptune/20
Error: border-mars
```

### Badge Specifications

| Property | Small | Default |
|----------|-------|---------|
| Height | 20px | 24px |
| Padding X | 8px | 8px |
| Padding Y | 2px | 4px |
| Border Radius | 4px | 4px |
| Font Size | 12px | 14px |
| Font Weight | 600 | 600 |

#### Badge Tailwind Classes
```
Small: h-[20px] px-club py-[2px] rounded-sm text-[12px] font-semibold
Default: h-[24px] px-club py-[4px] rounded-sm text-[14px] font-semibold
```

### Toast Specifications

| Property | Value |
|----------|-------|
| Min-Width | 300px |
| Max-Width | 400px |
| Padding X | 16px |
| Padding Y | 12px |
| Border Radius | 4px |
| Icon Size | 24px |
| Icon Gap | 12px |

#### Toast Tailwind Classes
```
min-w-[300px] max-w-[400px] px-auditorium py-hall rounded-sm gap-hall
```

### Card Specifications

| Property | Value |
|----------|-------|
| Padding | 24px |
| Border Radius | 8px |
| Border Width | 1px (optional) |
| Shadow | sm (optional) |

#### Card Tailwind Classes
```
p-amphitheatre rounded-md
With border: border border-ammonite
With shadow: shadow-sm
```

### Checkbox/Radio Specifications

| Property | Value |
|----------|-------|
| Box Size | 20px × 20px |
| Border Width | 2px |
| Border Radius | 4px (checkbox) / full (radio) |
| Check Icon Size | 14px |
| Label Gap | 8px |

#### Checkbox Tailwind Classes
```
Box: h-[20px] w-[20px] border-2 border-cosmos rounded-sm
Checked: bg-neptune border-neptune
Radio: rounded-full
Label gap: gap-club
```

---

## Component Patterns

### Button Styling
[Base styles and variant table with full state colors]

### Input Field Styling
[Pattern for inputs with all states]

### Card Styling
[Pattern for cards with variations]

---

## Critical Rules

### Colors
[Restrictions on color usage]

### Typography
[Text transform requirements]

### Spacing
[Spacing conventions]

### Borders
[Border conventions]

### Dimensions
- Always use exact heights from Component Specifications
- Never omit min-width on buttons
- Include all padding values for accurate sizing

### Accessibility
[Contrast and focus requirements]

---

## CSS Custom Properties

[CSS variables block as fallback reference]
```

### Step 5: Save and Report

Save the file to `guidelines/Guidelines.md` and report:
- File path updated
- Number of color tokens included
- Number of spacing tokens included
- Number of typography tokens included
- Any component patterns extracted

### Step 6: Update Changelog

Add an entry to `CHANGELOG.md`:

```markdown
## {Date}

| Change | Type | JIRA | Figma | Storybook |
|--------|------|------|-------|-----------|
| Updated Figma Make guidelines with current design tokens | 🟡 Updated | NA | NA | NA |
```

## Token Extraction Rules

### Colors
- Include ALL colors from the color.md foundations
- Group by: Primary, Secondary, Tertiary, Dark Mode, Structural
- Include semantic button colors (hover, pressed states)
- Format hex values consistently (uppercase, 6 digits)

### Typography
- Font family: Averta with fallback
- Weights: 400 (regular), 600 (semibold), 700 (bold)
- Display styles: Include desktop AND mobile sizes
- Body styles: Include all body text tokens
- Section styles: Include section header tokens
- Always include lineHeight, letterSpacing, fontWeight in fontSize definitions

### Headings (CRITICAL)
- **Font weight**: Always 900 (black) for all headings
- **Text color**: Always cosmos (#121212) on light backgrounds
- **Text alignment**: Always left-aligned - never center or right
- **Transform**: Display headings uppercase, section headers capitalize
- Include complete specs for H1-H5 with desktop AND mobile sizes
- Document spacing below headings (margin-bottom tokens)

### Spacing
- Use the venue-themed names (lounge, club, hall, auditorium, etc.)
- Values must align to 8px baseline grid
- Include usage context for each token

### Border Radius
- Map to component contexts (buttons, badges, cards, pills)
- Use semantic naming in Tailwind (sm, md, pill, full)

### Component Dimensions (CRITICAL)
Extract exact dimensions from Figma to ensure pixel-perfect rendering:

**Buttons:**
- Height: Standard 44px, measure from Figma
- Min-width: Measure smallest button instance
- Padding: Exact px values for horizontal and vertical
- Icon gap: Space between icon and label

**Inputs:**
- Height: Typically 48px, verify in Figma
- Min-width: Default input width
- Padding: Internal padding values

**Badges:**
- Height per size variant (small, default, large)
- Padding per variant

**Cards:**
- Default padding
- Border radius

**Interactive Elements:**
- Checkbox/radio box dimensions
- Toggle switch dimensions
- Icon button sizes

**Note:** When extracting from Figma, use `get_design_context` to read exact frame dimensions. Include these in the Component Specifications section with ready-to-use Tailwind classes.

## Output File

**Single file:** `guidelines/Guidelines.md`

This file is optimized for:
1. Figma Make to parse and generate matching Tailwind CSS
2. Developers to reference design tokens
3. AI tools to understand the design system

## Environment Requirements

- Foundation docs must exist in `docs/foundations/`
- Component docs should exist in `docs/components/` for pattern extraction
- `guidelines/` directory must exist (create if needed)
