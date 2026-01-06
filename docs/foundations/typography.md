---
name: Typography
description: The typography system defines the type scale, font families, and text styles used across the Marketplace Global Design System for consistent, readable content.
category: foundations
status: stable
version: 1.0.0
updated: 2025-01-05
tags:
  - typography
  - fonts
  - type-scale
  - text-styles
keywords:
  - typography system
  - font family
  - type scale
  - headings
  - body text
  - Averta
dependencies: []
relatedComponents:
  - color
  - spacing
tokens:
  colours: []
  spacing: []
  typography:
    fontFamily:
      primary: "Averta"
    display:
      - Mauna
      - Everest
      - Kilimanjaro
      - Vinson
      - Blanc
    body:
      - Rainier
      - Boise
      - Fiji
    section:
      - Matterhorn
accessibility:
  wcagLevel: AA
  keyboardNavigable: false
  ariaRoles: []
frameworks:
  - framework: React
    package: "@gds/tokens"
    import: "import { typography } from '@gds/tokens'"
figmaNodeId: "567:36628"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Typography

The typography system defines the type scale, font families, and text styles used across the Marketplace Global Design System for consistent, readable content.

## Font Family

The primary font family is **Averta**, a geometric sans-serif typeface that balances modern aesthetics with excellent readability.

| Weight | Name | CSS Value |
|--------|------|-----------|
| 400 | Regular | `font-weight: 400` |
| 600 | Semibold | `font-weight: 600` |
| 700 | Bold | `font-weight: 700` |

## Type Scale

The type scale uses mountain names to denote size hierarchy, making it intuitive to reference across design and development.

### Display Styles (Desktop)

Display styles are used for headlines and prominent text. All display styles use uppercase text transformation.

| Token | Size | Line Height | Letter Spacing | Weight |
|-------|------|-------------|----------------|--------|
| `Mauna` | 54px | 54px | 2.7px (5%) | Bold 700 |
| `Everest` | 44px | 44px | 2.2px (5%) | Bold 700 |
| `Kilimanjaro` | 32px | 34px | 1.6px (5%) | Bold 700 |
| `Vinson` | 24px | 28px | 0.48px (2%) | Bold 700 |
| `Blanc` | 20px | 24px | 0.4px (2%) | Bold 700 |

### Display Styles (Mobile)

Mobile display styles scale down proportionally while maintaining readability on smaller screens.

| Token | Size | Line Height | Letter Spacing | Weight |
|-------|------|-------------|----------------|--------|
| `Mauna` | 44px | 44px | 2.2px (5%) | Bold 700 |
| `Everest` | 32px | 32px | 1.6px (5%) | Bold 700 |
| `Kilimanjaro` | 24px | 26px | 1.2px (5%) | Bold 700 |
| `Vinson` | 22px | 24px | 0.44px (2%) | Bold 700 |
| `Blanc` | 18px | 22px | 0.36px (2%) | Bold 700 |

### Body Styles

Body styles are used for paragraph text, descriptions, and general content.

| Token | Size | Line Height | Letter Spacing | Weight | Usage |
|-------|------|-------------|----------------|--------|-------|
| `Rainier` | 16px | 24px | 0.32px (2%) | Regular 400 | Body text, paragraphs |
| `Boise` | 16px | 24px | 0.32px (2%) | Semibold 600 | Emphasized body text, labels |
| `Fiji` | 18px | 26px | 0.36px (2%) | Semibold 600 | Subtopics, secondary headings |

### Section Styles

Section styles are used for content section headers and organizing content areas.

| Token | Size | Line Height | Letter Spacing | Weight | Usage |
|-------|------|-------------|----------------|--------|-------|
| `Matterhorn` | 28px | 34px | 0.56px (2%) | Bold 700 | Section headers (title case) |

## Title Accent Component

When titles require additional visual emphasis, a stage-shaped accent bar is positioned above the text. The accent size correlates with the title font size.

### Accent Bar Specifications

| Title Size | Accent Width | Accent Height | Gap |
|------------|--------------|---------------|-----|
| Mauna (Desktop) | 60px | 8px | 16px |
| Everest (Desktop) | 60px | 8px | 16px |
| Kilimanjaro (Desktop) | 40px | 6px | 12px |
| Vinson (Desktop) | 32px | 4px | 8px |
| Blanc (Desktop) | 32px | 4px | 8px |
| Mauna (Mobile) | 48px | 8px | 16px |
| Everest (Mobile) | 44px | 6px | 12px |
| Kilimanjaro (Mobile) | 32px | 4px | 8px |
| Vinson (Mobile) | 32px | 4px | 8px |
| Blanc (Mobile) | 24px | 4px | 8px |

### Spacing Below Titles

Recommended spacing between title accent components and following content:

| Title Size | Spacing Below |
|------------|---------------|
| Kilimanjaro | 24px |
| Vinson | 20px |
| Blanc | 16px |

## Do's and Don'ts

### Do's
- Always use uppercase for display titles with accents
- Maintain the prescribed accent bar dimensions for each size
- Keep the accent bar in Cosmos (`#121212`) color
- Position the accent bar above the title text

### Don'ts
- Don't place the accent bar below the title text
- Don't change the thickness of the accent bar
- Don't change the color of the accent bar
- Don't add additional shapes or decorations to the accent
- Don't indent the title text from the accent bar
- Don't use sentence case or title case with accented titles (always uppercase)

## CSS Custom Properties

```css
:root {
  /* Font Family */
  --font-family-primary: 'Averta', sans-serif;

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Desktop Display Sizes */
  --text-mauna-desktop: 54px;
  --text-everest-desktop: 44px;
  --text-kilimanjaro-desktop: 32px;
  --text-vinson-desktop: 24px;
  --text-blanc-desktop: 20px;

  /* Mobile Display Sizes */
  --text-mauna-mobile: 44px;
  --text-everest-mobile: 32px;
  --text-kilimanjaro-mobile: 24px;
  --text-vinson-mobile: 22px;
  --text-blanc-mobile: 18px;

  /* Body Sizes */
  --text-rainier: 16px;
  --text-boise: 16px;
  --text-fiji: 18px;

  /* Section Sizes */
  --text-matterhorn: 28px;

  /* Line Heights */
  --leading-tight: 1;
  --leading-snug: 1.0625;
  --leading-normal: 1.5;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        primary: ['Averta', 'sans-serif'],
      },
      fontSize: {
        // Desktop Display
        'mauna': ['54px', { lineHeight: '54px', letterSpacing: '2.7px', fontWeight: '700' }],
        'everest': ['44px', { lineHeight: '44px', letterSpacing: '2.2px', fontWeight: '700' }],
        'kilimanjaro': ['32px', { lineHeight: '34px', letterSpacing: '1.6px', fontWeight: '700' }],
        'vinson': ['24px', { lineHeight: '28px', letterSpacing: '0.48px', fontWeight: '700' }],
        'blanc': ['20px', { lineHeight: '24px', letterSpacing: '0.4px', fontWeight: '700' }],

        // Mobile Display
        'mauna-mobile': ['44px', { lineHeight: '44px', letterSpacing: '2.2px', fontWeight: '700' }],
        'everest-mobile': ['32px', { lineHeight: '32px', letterSpacing: '1.6px', fontWeight: '700' }],
        'kilimanjaro-mobile': ['24px', { lineHeight: '26px', letterSpacing: '1.2px', fontWeight: '700' }],
        'vinson-mobile': ['22px', { lineHeight: '24px', letterSpacing: '0.44px', fontWeight: '700' }],
        'blanc-mobile': ['18px', { lineHeight: '22px', letterSpacing: '0.36px', fontWeight: '700' }],

        // Body
        'rainier': ['16px', { lineHeight: '24px', letterSpacing: '0.32px', fontWeight: '400' }],
        'boise': ['16px', { lineHeight: '24px', letterSpacing: '0.32px', fontWeight: '600' }],
        'fiji': ['18px', { lineHeight: '26px', letterSpacing: '0.36px', fontWeight: '600' }],

        // Section
        'matterhorn': ['28px', { lineHeight: '34px', letterSpacing: '0.56px', fontWeight: '700' }],
      }
    }
  }
}
```

## Usage Examples

### React Component

```tsx
// Display heading with accent
<div className="flex flex-col gap-4">
  <div className="bg-cosmos w-[60px] h-[8px]" />
  <h1 className="font-primary text-mauna uppercase text-cosmos tracking-[2.7px]">
    Page Title
  </h1>
</div>

// Body text
<p className="font-primary text-rainier text-granite">
  Body content goes here with comfortable reading line height.
</p>

// Section header
<h2 className="font-primary text-matterhorn text-cosmos capitalize">
  Section Header
</h2>
```
