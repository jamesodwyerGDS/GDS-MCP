---
name: Color
description: The color system defines the visual language of the Marketplace Global Design System, establishing consistent color usage across all digital touchpoints.
category: foundations
status: stable
version: 1.0.0
updated: 2025-01-05
tags:
  - color
  - palette
  - brand
  - visual-design
keywords:
  - color system
  - brand colors
  - palette
  - primary colors
  - secondary colors
  - neutral colors
dependencies: []
relatedComponents:
  - color-themes
  - color-accessibility
tokens:
  colours:
    primary:
      - Neptune: "#024DDF"
      - Cosmos: "#121212"
      - Granite: "#646464"
    secondary:
      - Earth: "#01A469"
      - Mars: "#EB0000"
    tertiary:
      - Callisto: "#A733FF"
      - Jupiter: "#FFB932"
      - Ganymede: "#21FFF2"
      - Titan: "#FBFF2C"
    neutral:
      - Slate: "#949494"
      - Moonrock: "#BFBFBF"
      - Ammonite: "#D6D6D6"
      - Diatomite: "#EBEBEB"
      - Lunar: "#F6F6F6"
      - Spotlight: "#FFFFFF"
  spacing: []
  typography: []
accessibility:
  wcagLevel: AA
  keyboardNavigable: false
  ariaRoles: []
frameworks:
  - framework: React
    package: "@gds/tokens"
    import: "import { colors } from '@gds/tokens'"
figmaNodeId: "510:23401"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Color

The color system defines the visual language of the Marketplace Global Design System, establishing consistent color usage across all digital touchpoints.

## Color Principles

### Vibrant
Colors should feel energetic and alive, reflecting the excitement of live events and entertainment.

### Legible
All color combinations must maintain sufficient contrast for readability and accessibility compliance.

### Hierarchy
Use color strategically to establish visual hierarchy and guide user attention to key actions.

## Primary Colors

Primary colors form the foundation of the brand identity and are used for key UI elements.

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-neptune` | Neptune | `#024DDF` | Primary brand blue, CTAs, links, interactive elements |
| `--color-cosmos` | Cosmos | `#121212` | Primary text, dark backgrounds |
| `--color-granite` | Granite | `#646464` | Secondary text, icons, borders |

## Secondary Colors

Secondary colors provide additional visual variety and are used for status indicators and accents.

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-earth` | Earth | `#01A469` | Success states, positive indicators |
| `--color-mars` | Mars | `#EB0000` | Error states, alerts, urgent actions |

## Tertiary Colors

Tertiary colors are accent colors used sparingly for emphasis and visual interest.

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-callisto` | Callisto | `#A733FF` | Accent, promotional highlights |
| `--color-jupiter` | Jupiter | `#FFB932` | Warning states, attention indicators |
| `--color-ganymede` | Ganymede | `#21FFF2` | Accent, special features |
| `--color-titan` | Titan | `#FBFF2C` | Accent, promotional highlights |

## Neutral Colors

Neutral colors create structure and hierarchy through backgrounds, borders, and subtle UI elements.

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-slate` | Slate | `#949494` | Disabled states, subtle borders |
| `--color-moonrock` | Moonrock | `#BFBFBF` | Dividers, inactive elements |
| `--color-ammonite` | Ammonite | `#D6D6D6` | Light borders, separators |
| `--color-diatomite` | Diatomite | `#EBEBEB` | Subtle backgrounds |
| `--color-lunar` | Lunar | `#F6F6F6` | Page backgrounds, cards |
| `--color-spotlight` | Spotlight | `#FFFFFF` | White backgrounds, text on dark |

## Color Hierarchy

Use color to establish clear visual hierarchy:

1. **Neptune** - Primary actions and focus states
2. **Cosmos** - Headings and primary text
3. **Granite** - Body text and secondary content
4. **Neutral tones** - Supporting UI and backgrounds

## Do's and Don'ts

### Do's
- Use Neptune for primary CTAs and interactive elements
- Maintain AA contrast ratios for all text
- Use Earth for success and Mars for error states
- Apply neutral colors for backgrounds and structural elements

### Don'ts
- Don't use tertiary colors for large text areas
- Don't combine colors with insufficient contrast
- Don't use Mars for non-error related content
- Don't override brand colors with custom values

## CSS Custom Properties

```css
:root {
  /* Primary */
  --color-neptune: #024DDF;
  --color-cosmos: #121212;
  --color-granite: #646464;

  /* Secondary */
  --color-earth: #01A469;
  --color-mars: #EB0000;

  /* Tertiary */
  --color-callisto: #A733FF;
  --color-jupiter: #FFB932;
  --color-ganymede: #21FFF2;
  --color-titan: #FBFF2C;

  /* Neutral */
  --color-slate: #949494;
  --color-moonrock: #BFBFBF;
  --color-ammonite: #D6D6D6;
  --color-diatomite: #EBEBEB;
  --color-lunar: #F6F6F6;
  --color-spotlight: #FFFFFF;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        neptune: '#024DDF',
        cosmos: '#121212',
        granite: '#646464',
        earth: '#01A469',
        mars: '#EB0000',
        callisto: '#A733FF',
        jupiter: '#FFB932',
        ganymede: '#21FFF2',
        titan: '#FBFF2C',
        slate: '#949494',
        moonrock: '#BFBFBF',
        ammonite: '#D6D6D6',
        diatomite: '#EBEBEB',
        lunar: '#F6F6F6',
        spotlight: '#FFFFFF',
      }
    }
  }
}
```
