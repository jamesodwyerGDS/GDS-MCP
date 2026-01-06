---
name: DisplayHeading
description: Unified documentation for DisplayHeading component
audiences:
  - design
lastUpdated: '2026-01-06'
category: atoms
status: beta
figmaNodeId: '42691:2822'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
tokens:
  colours:
    text-inverse:
      token: color.secondary.spotlight
      hex: '#FFFFFF'
    text-default:
      token: color.secondary.cosmos
      hex: '#121212'
    stage:
      token: color.primary.neptune
      hex: '#024DDF'
  spacing:
    underline-offset:
      token: typography.underline-offset
      value: 20%
  typography:
    desktop:
      font-family: Averta Black
      font-size:
        token: typography.font-size.desktop-large
        value: 54px
      line-height:
        token: typography.line-height.700
        value: 54px
      letter-spacing: '-1.62px'
    mobile:
      font-family: Averta Black
      font-size:
        token: typography.font-size.mobile-large
        value: 32px
      line-height:
        token: typography.line-height.350
        value: 34px
      letter-spacing: '-0.96px'
  elevation: []
  breakpoints:
    desktop: Desktop variant
    mobile: Mobile variant
---
# DisplayHeading

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | DisplayHeading |
| **Color Variants** | text-inverse, text-default, stage |
| **Figma Node** | 42691:2822 |
| **Docs Available** | Design |


---

## Design Documentation

> Query mode: `@design display-heading`

**A high-impact typographic component for page headers, artist names, and attraction titles with distinctive stage underline styling**

### Design Tokens

**Colors:**
- text-inverse.token: color.secondary.spotlight
- text-inverse.hex: #FFFFFF
- text-default.token: color.secondary.cosmos
- text-default.hex: #121212
- stage.token: color.primary.neptune
- stage.hex: #024DDF

**Spacing:**
- underline-offset: [object Object]

**Typography:**
- desktop: [object Object]
- mobile: [object Object]

### Full Design Specification


# Display Heading

## Overview

Display Heading is a high-impact typographic component designed for page headers, artist names, and attraction titles. It features a distinctive "stage" underline that reinforces the Ticketmaster brand identity.

**Beta Status**: This component is in Beta and subject to changes after the typography update. The custom text style used is not part of the GDS type ramp and should not be used as a standalone text style elsewhere.

### When to use

- Artist names on event detail pages
- Tour names on landing pages
- Page headers that act as the primary headline
- City page titles in discovery flows
- Countdown page titles

### When not to use

- Section headers or subheaders
- Body text or paragraph content
- Cases where standard typography is sufficient
- Any context outside of page-level headlines

## Anatomy

The Display Heading component consists of two main elements:

| Element | Description |
|---------|-------------|
| Text | Averta Black typography (custom text style) |
| Stage | Underline decoration in Neptune blue that scales relative to the typography |

**Important**: The text style is custom and not part of the GDS type ramp. Once typography is redesigned, this style will either be replaced with a standardised text style or removed if no longer needed.

## Variants

| Variant | Description |
|---------|-------------|
| Desktop | Large display size (54px) for desktop viewports |
| Mobile | Compact display size (32px) for mobile viewports |

### Inverse Property

| Property | Background | Text Colour |
|----------|------------|-------------|
| Inverse=True (default) | Cosmos (#121212) or images | White (#FFFFFF) |
| Inverse=False | Spotlight (#FFFFFF) or Lunar (#F6F6F6) | Cosmos (#121212) |

## Properties

| Property | Values | Default |
|----------|--------|---------|
| variant | Desktop, Mobile | Desktop |
| inverse | True, False | True |

## Stage Rules

The stage (underline) has two main variations:

### Single Line
The stage underlines the entirety of the title when text fits on one line.

### Multiple Lines
When text wraps to multiple lines, the stage underlines only the last line of the title.

**Customising stage for multi-line text:**
1. Select the first line(s) of the text
2. Remove the underline with `Cmd+U` (Mac) or `Ctrl+U` (Windows)
3. Alternatively, open Type settings in Figma and set Text decoration to None

## Styling

### Typography

| Viewport | Font | Size | Line Height | Letter Spacing |
|----------|------|------|-------------|----------------|
| Desktop | Averta Black | 54px | 54px | -1.62px |
| Mobile | Averta Black | 32px | 34px | -0.96px |

### Colours

| Element | Context | Token | Hex |
|---------|---------|-------|-----|
| Text | Dark background (inverse=true) | Spotlight | #FFFFFF |
| Text | Light background (inverse=false) | Cosmos | #121212 |
| Stage underline | All contexts | Neptune | #024DDF |

### Stage Styling

| Property | Value |
|----------|-------|
| Decoration | Underline |
| Underline colour | #024DDF (Neptune) |
| Underline offset | 20% |
| Skip ink | None |

## Text Casing Guidance

This logic is not yet enforced in the component as it's still being defined. Follow this rule of thumb:

1. **Use uppercase by default** for page headers
2. **Use Titlecase or lowercase only if:**
   - The artist or attraction's official branding requires it
   - Tooling constraints mean you must display names exactly as entered based on the data given

## Character Limits

To keep page headers readable:

1. Aim for **40-70 characters** in a single line
2. Avoid wrapping beyond **two lines** wherever possible

## Accessibility

- **Semantic HTML**: Use appropriate heading level (h1, h2, etc.) based on page structure
- **Colour contrast**: White text on Cosmos background meets WCAG AA (4.5:1 ratio)
- **Screen readers**: Ensure heading hierarchy is logical and meaningful

## Do's and Don'ts

### Do's

- Use only for page headers and attraction names
- Use uppercase by default for page headers
- Follow the 40-70 character guideline for readability
- Use Inverse=True on dark backgrounds or images
- Use Inverse=False on light backgrounds (Spotlight, Lunar)

### Don'ts

- Do not use for section headers, subheaders, or body text
- Do not use the custom text style outside of this component
- Do not change the text style included in the component
- Do not modify the stage style (underline weight or colour)
- Do not change the typography colour from the defined tokens
- Do not use desktop variant for mobile layouts
- Do not use on Neptune (#024DDF) background as it conflicts with the stage style

## CSS Custom Properties

```css
:root {
  /* Text colours */
  --display-heading-text-inverse: var(--color-secondary-spotlight); /* #FFFFFF */
  --display-heading-text-default: var(--color-secondary-cosmos); /* #121212 */

  /* Stage styling */
  --display-heading-stage: var(--color-primary-neptune); /* #024DDF */
  --display-heading-underline-offset: 20%;

  /* Desktop typography */
  --display-heading-desktop-size: var(--typography-font-size-desktop-large); /* 54px */
  --display-heading-desktop-line-height: var(--typography-line-height-700); /* 54px */
  --display-heading-desktop-letter-spacing: -1.62px;

  /* Mobile typography */
  --display-heading-mobile-size: var(--typography-font-size-mobile-large); /* 32px */
  --display-heading-mobile-line-height: var(--typography-line-height-350); /* 34px */
  --display-heading-mobile-letter-spacing: -0.96px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'display-heading': {
          'text-inverse': '#FFFFFF',
          'text-default': '#121212',
          'stage': '#024DDF',
        }
      },
      fontSize: {
        'display-desktop': ['54px', { lineHeight: '54px', letterSpacing: '-1.62px' }],
        'display-mobile': ['32px', { lineHeight: '34px', letterSpacing: '-0.96px' }],
      },
      fontFamily: {
        'averta-black': ['Averta Black', 'sans-serif'],
      },
      textUnderlineOffset: {
        'stage': '20%',
      }
    }
  }
}
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| color.secondary.spotlight | COLOR | #FFFFFF |
| color.secondary.cosmos | COLOR | #121212 |
| color.primary.neptune | COLOR | #024DDF |
| typography.font-size.desktop-large | NUMBER | 54 |
| typography.font-size.mobile-large | NUMBER | 32 |
| typography.line-height.700 | NUMBER | 54 |
| typography.line-height.350 | NUMBER | 34 |

## Related Components

This component has no direct alternatives in the current design system. It serves a unique purpose for high-impact page headers.

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-04 | Initial beta release |

---

## Engineer Documentation

> Query mode: `@engineer display-heading`
> Styling: **styled-components** (CSS-in-JS)

*No engineer documentation available for this component.*


---

## Vibe Documentation

> Query mode: `@vibe display-heading`
> Styling: **Tailwind CSS** (utility classes)

*No vibe documentation available for this component.*


---

## Comparison: Design vs Code

| Aspect | Design (@design) | Code (@engineer) |
|--------|------------------|------------------|
| **Status** | beta | - |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `-` |
| **Figma Node** | 42691:2822 | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

