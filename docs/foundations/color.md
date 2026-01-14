---
name: Color
description: The color system defines the visual language of the Marketplace Global Design System, establishing consistent color usage across all digital touchpoints.
category: foundations
status: stable
version: 1.1.0
updated: 2026-01-14
tags:
  - color
  - palette
  - brand
  - visual-design
  - accessibility
keywords:
  - color system
  - brand colors
  - palette
  - primary colors
  - secondary colors
  - neutral colors
  - dark mode
dependencies: []
relatedComponents:
  - color-themes
  - color-accessibility
tokens:
  colours:
    primary:
      - Neptune: "#024DDF"
    secondary:
      - Cosmos: "#121212"
      - Granite: "#646464"
      - Spotlight: "#FFFFFF"
    tertiary:
      - Earth: "#048851"
      - Mars: "#EB0000"
      - Jupiter: "#FFB932"
      - Callisto: "#A733FF"
      - Ganymede: "#21FFF2"
      - Titan: "#FBFF2C"
    darkMode:
      - Neptune Bright: "#3074FE"
      - Mars Bright: "#FF3838"
      - Callisto Bright: "#BD66FF"
    structural:
      - Slate: "#949494"
      - Moonrock: "#BFBFBF"
      - Ammonite: "#D6D6D6"
      - Diatomite: "#EBEBEB"
      - Lunar: "#F6F6F6"
    overlay:
      - Cosmos 70: "rgba(18, 18, 18, 0.7)"
  spacing: []
  typography: []
accessibility:
  wcagLevel: AA
  keyboardNavigable: false
  ariaRoles: []
  contrastRequirements:
    smallText: "4.5:1"
    largeText: "3:1"
    graphicElements: "3:1"
frameworks:
  - framework: React
    package: "@gds/tokens"
    import: "import { colors } from '@gds/tokens'"
figmaNodeId: "19:963"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Color

Our colors convey our brand personality, values and help our fans navigate our digital interface. The right combination of colors can influence how they feel, think, and interact with our site. Using color at the right time and place is key to this experience.

## Color Principles

### Accessible
Our goal is to make our digital experience accessible to all users. With strong enough contrast, following AA compliance.

### Unique
Our colors are distinctive to us. We use them to bring our digital experience to life. How we use them across our designs is part of our unique personality and identity.

### Consistent
To be consistent, we need clarity on color at all times. Every detail has to be closely examined when it comes to color decisions.

## Primary Color

Neptune blue is our primary color, and it's also our brand colour. We use it for all our main CTA buttons and across our brand assets, from illustrations to brand shapes and patterns. As it's our primary color, we must use it sparingly to keep its impact wherever present.

| Token | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-neptune` | Neptune | `#024DDF` | rgb(2, 77, 223) | CTA buttons, Interactive Elements, Links, Brand shapes, Illustrations & Icons |

## Secondary Colors

In the secondary colors, there are three tones. These three are used the most across the digital experience in many ways, so they must be applied correctly. We use them on all text, from headline titles to body copy and within iconography. 'Cosmos' and 'Spotlight' also comprise most of our backgrounds within the digital product.

| Token | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-cosmos` | Cosmos | `#121212` | rgb(18, 18, 18) | Headline titles, Body copy, Iconography, Backgrounds |
| `--color-granite` | Granite | `#646464` | rgb(100, 100, 100) | Secondary text, icons |
| `--color-spotlight` | Spotlight | `#FFFFFF` | rgb(255, 255, 255) | Backgrounds, text on dark |

## Tertiary Colors

Our Tertiary colors are used a lot less across the digital landscape but, when used, play a vital part in the overall experience. For example, 'Earth' is used on all Transactional Buttons. 'Ganymede' forms part of the filtering experience and 'Mars' is our error color.

| Token | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-earth` | Earth | `#048851` | rgb(4, 136, 81) | Transactional Buttons, Success states |
| `--color-mars` | Mars | `#EB0000` | rgb(235, 0, 0) | Error states |
| `--color-jupiter` | Jupiter | `#FFB932` | rgb(255, 185, 50) | Warning states |
| `--color-callisto` | Callisto | `#A733FF` | rgb(167, 51, 255) | Accents |
| `--color-ganymede` | Ganymede | `#21FFF2` | rgb(33, 255, 242) | Filtering |
| `--color-titan` | Titan | `#FBFF2C` | rgb(251, 255, 44) | Accents |

## Dark Mode Colors

Dark mode colors are inverse tones that allow that color to be used on a dark background and maintain AA level color contrast. They should not be used in other placement or as additional colors.

| Token | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-neptune-bright` | Neptune Bright | `#3074FE` | rgb(48, 116, 254) | CTA buttons and links on dark backgrounds |
| `--color-mars-bright` | Mars Bright | `#FF3838` | rgb(235, 56, 56) | Error states on dark backgrounds |
| `--color-callisto-bright` | Callisto Bright | `#BD66FF` | rgb(189, 102, 255) | Accented components on dark backgrounds |

## Structural Colors

Our System UI colors bring structure from the form and input field components, border lines, base colours and fills. 'Lunar' can be a background base colour in conjunction with 'Cosmos' and 'Spotlight' from the secondary color palette.

| Token | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-slate` | Slate | `#949494` | rgb(148, 148, 148) | Disabled states, subtle borders |
| `--color-moonrock` | Moonrock | `#BFBFBF` | rgb(191, 191, 191) | Dividers, inactive elements |
| `--color-ammonite` | Ammonite | `#D6D6D6` | rgb(214, 214, 214) | Light borders, separators |
| `--color-diatomite` | Diatomite | `#EBEBEB` | rgb(235, 235, 235) | Subtle backgrounds |
| `--color-lunar` | Lunar | `#F6F6F6` | rgb(246, 246, 246) | Page backgrounds, cards |

## Overlays

Overlays help provide focus to a component or add contrast over a busy background. They should be used as color values themselves.

| Token | Name | Value | Usage |
|-------|------|-------|-------|
| `--color-overlay` | Cosmos 70 | `rgba(18, 18, 18, 0.7)` | Modal Backgrounds, Image Overlays |

## Color Accessibility

Accessibility is crucial to our digital experience. Using the Web Content Accessibility Guidelines (WCAG), the use of our digital colors aim to be **AA compliant** on contrast at all times.

### Contrast Requirements

| Element Type | Minimum Ratio |
|--------------|---------------|
| Small text (smaller than 18pt or 14pt bold) | 4.5:1 |
| Large text (18pt+ or 14pt bold+) | 3:1 |
| Graphic elements (UI components, meaningful graphics) | 3:1 |
| Decorative graphics | No requirement |

> If you have any doubt regarding the use of the color, whether it be in typography, backgrounds or new components, please speak to the Global Design System team.

## Color Hierarchy

We use color hierarchy to help our fans process content within our digital designs. Having a good color hierarchy in place makes for an overall better experience and allows us to help guide our users through essential elements of content.

1. **Neptune** - Primary actions and focus states
2. **Cosmos** - Headings and primary text
3. **Granite** - Body text and secondary content
4. **Structural colors** - Supporting UI and backgrounds

## Do's and Don'ts

When using color, you must follow the guidelines in place. Breaking the guidance will only lead to an inconsistent user experience.

### Do's
- Use Neptune for primary CTAs and interactive elements
- Use Earth for transactional/purchase buttons
- Use Mars only for error states
- Use Jupiter for warning states
- Maintain AA contrast ratios for all text

### Don'ts
- **Don't make tints of any the colors** - Use only the defined color tokens
- **Don't use the colors to create gradients** - Colors should be used as solid fills
- **Don't introduce any new colors or styles** - All colors must come from this palette

## CSS Custom Properties

```css
:root {
  /* Primary */
  --color-neptune: #024DDF;

  /* Secondary */
  --color-cosmos: #121212;
  --color-granite: #646464;
  --color-spotlight: #FFFFFF;

  /* Tertiary */
  --color-earth: #048851;
  --color-mars: #EB0000;
  --color-jupiter: #FFB932;
  --color-callisto: #A733FF;
  --color-ganymede: #21FFF2;
  --color-titan: #FBFF2C;

  /* Dark Mode */
  --color-neptune-bright: #3074FE;
  --color-mars-bright: #FF3838;
  --color-callisto-bright: #BD66FF;

  /* Structural */
  --color-slate: #949494;
  --color-moonrock: #BFBFBF;
  --color-ammonite: #D6D6D6;
  --color-diatomite: #EBEBEB;
  --color-lunar: #F6F6F6;

  /* Overlay */
  --color-overlay: rgba(18, 18, 18, 0.7);
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary
        neptune: '#024DDF',

        // Secondary
        cosmos: '#121212',
        granite: '#646464',
        spotlight: '#FFFFFF',

        // Tertiary
        earth: '#048851',
        mars: '#EB0000',
        jupiter: '#FFB932',
        callisto: '#A733FF',
        ganymede: '#21FFF2',
        titan: '#FBFF2C',

        // Dark Mode
        'neptune-bright': '#3074FE',
        'mars-bright': '#FF3838',
        'callisto-bright': '#BD66FF',

        // Structural
        slate: '#949494',
        moonrock: '#BFBFBF',
        ammonite: '#D6D6D6',
        diatomite: '#EBEBEB',
        lunar: '#F6F6F6',
      }
    }
  }
}
```

## Related

- [Color Themes](/docs/foundations/color-themes.md)
- [Color Accessibility](/docs/foundations/color-accessibility.md)
- [Typography](/docs/foundations/typography.md)
