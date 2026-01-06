---
name: Spacing
description: The spacing system defines consistent spatial relationships using an 8px baseline grid and named spacing tokens for predictable, harmonious layouts.
category: foundations
status: stable
version: 1.0.0
updated: 2025-01-05
tags:
  - spacing
  - layout
  - grid
  - tokens
keywords:
  - spacing system
  - baseline grid
  - margins
  - gutters
  - columns
  - layout tokens
dependencies: []
relatedComponents:
  - typography
  - color
tokens:
  colours: []
  spacing:
    scale:
      - Lounge: "4px"
      - Club: "8px"
      - Hall: "12px"
      - Auditorium: "16px"
      - Theatre: "20px"
      - Amphitheatre: "24px"
      - Arena: "32px"
      - Stadium: "48px"
      - Dome: "64px"
      - Field: "88px"
    baseline: "8px"
  typography: []
accessibility:
  wcagLevel: AA
  keyboardNavigable: false
  ariaRoles: []
frameworks:
  - framework: React
    package: "@gds/tokens"
    import: "import { spacing } from '@gds/tokens'"
figmaNodeId: "25:15141"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Spacing

The spacing system defines consistent spatial relationships using an 8px baseline grid and named spacing tokens for predictable, harmonious layouts.

## Baseline Grid

All spacing values are built on an **8px baseline grid**. This ensures vertical rhythm and consistent alignment across all components and layouts.

## Spacing Scale

The spacing scale uses descriptive names for easy reference across design and development.

### Spacing Variables

The spacing scale uses venue names, reflecting the entertainment/ticketing domain.

| Token | Value | Usage |
|-------|-------|-------|
| `Lounge` | 4px | Tight inline spacing, icon gaps |
| `Club` | 8px | Small padding, tight component gaps |
| `Hall` | 12px | Compact padding, form elements |
| `Auditorium` | 16px | Standard component padding |
| `Theatre` | 20px | Medium padding, card content |
| `Amphitheatre` | 24px | Default spacing between elements |
| `Arena` | 32px | Section gaps, card padding |
| `Stadium` | 48px | Large section spacing |
| `Dome` | 64px | Major section separation |
| `Field` | 88px | Page section margins, hero spacing |

### Horizontal Spacing

Horizontal spacing follows the same token scale and is used for:
- Component internal padding
- Gaps between inline elements
- Grid gutters

## Structure

### Grid System

The layout grid provides structure for page compositions across breakpoints.

#### Desktop (1440px)

| Property | Value | Description |
|----------|-------|-------------|
| Columns | 12 | Standard column count |
| Gutter width | 24px | Space between columns |
| Margin width | 80px | Outside page margins |
| Content width | 1280px | Max content area |

#### Mobile (375px)

| Property | Value | Description |
|----------|-------|-------------|
| Columns | 4 | Reduced column count |
| Gutter width | 16px | Tighter gutters |
| Margin width | 16px | Minimal margins |
| Content width | 343px | Full-width minus margins |

## Flexibility

The spacing system supports flexible combinations:

- **Fixed spacing**: Use tokens directly for consistent gaps
- **Responsive spacing**: Scale tokens down on mobile (e.g., `Stadium` → `Arena`)
- **Proportional spacing**: Maintain ratios between related elements

### Spacing Combinations

| Context | Recommended Tokens |
|---------|-------------------|
| Button padding | `Club` (8px) vertical, `Auditorium` (16px) horizontal |
| Card padding | `Amphitheatre` (24px) all sides |
| Section gaps | `Stadium` (48px) to `Dome` (64px) |
| Page margins | `Field` (88px) desktop, `Amphitheatre` (24px) mobile |
| Form field gaps | `Auditorium` (16px) |
| Inline icon gap | `Lounge` (4px) to `Club` (8px) |

## Spacing in Use

### Principles

- Use consistent spacing to establish visual rhythm
- Apply tighter spacing for related elements, larger spacing for distinct groups
- Maintain alignment to the 8px baseline grid

### Inside, Outside and Alignment

- **Inside spacing**: Padding within components (buttons, cards, inputs)
- **Outside spacing**: Margins between components and sections
- **Alignment**: Components should align to consistent edges and baselines

### Touch Targets

For interactive elements, ensure adequate touch target sizes:

| Element | Minimum Size | Recommended |
|---------|--------------|-------------|
| Buttons | 44px × 44px | 48px × 48px |
| Links (inline) | 44px height | - |
| Icons (tappable) | 44px × 44px | 48px × 48px |

**Hit areas** can extend beyond visible bounds to meet touch target requirements without affecting visual design.

### Touch Target Marking

When visual size is smaller than the touch target, the hit area extends invisibly around the element to ensure accessibility compliance.

### Grids and Guides

- Use column grids for page layout structure
- Use baseline grids for vertical rhythm
- Guides help maintain consistent spacing between major sections

## Do's and Don'ts

### Do's
- Use spacing tokens instead of arbitrary values
- Maintain the 8px baseline grid alignment
- Scale spacing proportionally across breakpoints
- Use larger spacing to create visual hierarchy

### Don'ts
- Don't use values outside the spacing scale
- Don't mix spacing systems (stick to the token scale)
- Don't use identical spacing for unrelated elements
- Don't compress spacing below `Lounge` (4px)

## CSS Custom Properties

```css
:root {
  /* Spacing Scale */
  --space-lounge: 4px;
  --space-club: 8px;
  --space-hall: 12px;
  --space-auditorium: 16px;
  --space-theatre: 20px;
  --space-amphitheatre: 24px;
  --space-arena: 32px;
  --space-stadium: 48px;
  --space-dome: 64px;
  --space-field: 88px;

  /* Baseline */
  --baseline: 8px;

  /* Grid - Desktop */
  --grid-columns-desktop: 12;
  --grid-gutter-desktop: 24px;
  --grid-margin-desktop: 80px;
  --grid-max-width: 1280px;

  /* Grid - Mobile */
  --grid-columns-mobile: 4;
  --grid-gutter-mobile: 16px;
  --grid-margin-mobile: 16px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        'lounge': '4px',
        'club': '8px',
        'hall': '12px',
        'auditorium': '16px',
        'theatre': '20px',
        'amphitheatre': '24px',
        'arena': '32px',
        'stadium': '48px',
        'dome': '64px',
        'field': '88px',
      },
      maxWidth: {
        'content': '1280px',
      },
      gap: {
        'gutter': '24px',
        'gutter-mobile': '16px',
      }
    }
  }
}
```

## Usage Examples

### React Component

```tsx
// Card with consistent spacing
<div className="p-amphitheatre gap-auditorium flex flex-col">
  <h3 className="mb-club">Card Title</h3>
  <p className="mb-auditorium">Card content goes here.</p>
  <button className="py-club px-auditorium">Action</button>
</div>

// Page section with large spacing
<section className="py-dome px-field max-w-content mx-auto">
  <h2 className="mb-stadium">Section Title</h2>
  <div className="grid grid-cols-12 gap-gutter">
    {/* Grid content */}
  </div>
</section>

// Responsive spacing
<div className="p-amphitheatre md:p-stadium lg:p-dome">
  Responsive padded content
</div>
```
