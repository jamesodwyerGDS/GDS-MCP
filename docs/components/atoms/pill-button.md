---
name: Pill Button
description: A rounded pill-shaped button used for search and filter functions, with optional chevron icons for navigation context.
category: atoms
status: stable
version: 1.0.0
updated: 2025-01-06
tags:
  - button
  - pill
  - filter
  - search
  - navigation
keywords:
  - pill button
  - filter button
  - search button
  - rounded button
  - pill shape
dependencies: []
relatedComponents:
  - name: Button
    relationship: alternative
  - name: Circle Button
    relationship: variant
tokens:
  colours:
    light:
      default: "Neptune border #024DDF"
      hover: "Neptune fill #024DDF"
      selected: "Neptune fill #024DDF"
      pressed: "Neptune Darker #024DDF + 20% overlay"
      disabled: "Ammonite border #D6D6D6"
    inverse:
      default: "Spotlight border #FFFFFF"
      hover: "Spotlight fill #FFFFFF"
      selected: "Spotlight fill #FFFFFF"
      pressed: "Neptune #024DDF + 20% Cosmos overlay"
      disabled: "Slate border #646464"
    text:
      light: "Cosmos #121212"
      lightHover: "Spotlight #FFFFFF"
      inverse: "Spotlight #FFFFFF"
      inverseHover: "Cosmos #121212"
      disabled: "Slate #646464"
  spacing:
    paddingHorizontal: "Auditorium 16px"
    paddingVertical: "10px"
    iconGap: "Club 8px"
  typography:
    label: "Averta Semibold 16px/24px, letter-spacing 0.32px"
  borderRadius: "24px (pill shape)"
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - button
figmaNodeId: "38852:2652"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Pill Button

A rounded pill-shaped button used for search and filter functions, with optional chevron icons for navigation context.

## Overview

The Pill Button component is a button with a distinctive rounded pill shape used specifically for search and filter functions in page designs. Its appearance closely resembles search components, enhancing their interrelationship and facilitating design decisions for when and where to use them.

### When to use

- Use for filter controls and search refinement options
- Use for navigation within search results or filtered content
- Use in filter bars and search interfaces
- Use when showing selectable categories or tags

### When not to use

- Do not use as a primary call-to-action button (use Button instead)
- Do not use for transactional actions like checkout or purchase
- Do not use for form submissions
- Consider Circle Button for icon-only actions

## Anatomy

```
┌────────────────────────────────────────┐
│  [←]  Pill button text  [→]            │
│       ← 16px padding →                 │
└────────────────────────────────────────┘
   ↑                           ↑
 Left Icon               Right Icon
 (optional)              (optional)
```

### Parts

| Part | Description |
|------|-------------|
| Container | Pill-shaped background with 24px border radius |
| Label | Button text (Averta Semibold, centered) |
| Left Icon | Optional 24px ChevronLeft icon |
| Right Icon | Optional 24px ChevronRight icon |

## Properties

| Property | Values | Default | Description |
|----------|--------|---------|-------------|
| size | `small`, `medium` | `medium` | Button size variant |
| state | `default`, `hover`, `pressed`, `selected`, `disabled` | `default` | Interaction state |
| colour | `light`, `inverse` | `light` | Color scheme for background context |
| icon | `off`, `left`, `right` | `off` | Chevron icon position |

## Variants

### Size Variants

| Size | Height | Use Case |
|------|--------|----------|
| Medium | 44px | Default size, most commonly used |
| Small | 32px | Use in condensed spaces or dense interfaces |

### Colour Variants

| Colour | Background | Use Case |
|--------|------------|----------|
| Light | Light backgrounds | Standard usage on white/light surfaces |
| Inverse | Dark backgrounds | Hero sections, dark-themed areas |

### Icon Variants

| Icon | Description |
|------|-------------|
| Off | Text-only pill button |
| Left | ChevronLeft icon before label (previous/back) |
| Right | ChevronRight icon after label (next/forward) |

## States

| State | Light Mode | Inverse Mode |
|-------|------------|--------------|
| Default | Neptune outline, Cosmos text | White outline, white text |
| Hover | Neptune fill, white text | White fill, Cosmos text |
| Pressed | Neptune with 20% overlay, white text | Neptune with 20% Cosmos overlay, white text |
| Selected | Neptune fill, white text | White fill, Cosmos text |
| Disabled | Ammonite outline, Slate text | Slate outline, Slate text |

## Styling

### Typography

| Property | Value |
|----------|-------|
| Font Family | Averta Semibold |
| Font Size | 16px |
| Line Height | 24px |
| Letter Spacing | 0.32px (2%) |
| Text Align | Center |
| White Space | No wrap |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| Horizontal padding | Auditorium | 16px |
| Vertical padding | — | 10px |
| Icon to label gap | Club | 8px |

### Border Radius

All pill buttons use `24px` border radius for the distinctive pill shape.

### Icon Sizing

| Property | Value |
|----------|-------|
| Icon Container | 24px x 24px |
| Chevron Width | 17.06px |
| Chevron Height | 9.59px |

### Colours

#### Light Theme

| State | Border | Background | Text | Icon |
|-------|--------|------------|------|------|
| Default | Neptune `#024DDF` | Transparent | Cosmos `#121212` | Cosmos `#121212` |
| Hover | — | Neptune `#024DDF` | White `#FFFFFF` | White `#FFFFFF` |
| Pressed | — | Neptune + 20% overlay | White `#FFFFFF` | White `#FFFFFF` |
| Selected | — | Neptune `#024DDF` | White `#FFFFFF` | White `#FFFFFF` |
| Disabled | Ammonite `#D6D6D6` | Transparent | Slate `#949494` | Slate `#949494` |

#### Inverse Theme

| State | Border | Background | Text | Icon |
|-------|--------|------------|------|------|
| Default | White `#FFFFFF` | Transparent | White `#FFFFFF` | White `#FFFFFF` |
| Hover | — | White `#FFFFFF` | Cosmos `#121212` | Cosmos `#121212` |
| Pressed | — | Neptune + 20% Cosmos | White `#FFFFFF` | White `#FFFFFF` |
| Selected | — | White `#FFFFFF` | Cosmos `#121212` | Cosmos `#121212` |
| Disabled | Slate `#646464` | Transparent | Slate `#646464` | Slate `#646464` |

## Accessibility

### Keyboard Navigation

- **Tab**: Focus the button
- **Enter/Space**: Activate the button
- Focus ring visible on keyboard focus

### ARIA Attributes

```html
<button
  type="button"
  role="button"
  aria-pressed="false"
  aria-disabled="false"
>
  Pill button
</button>
```

### Focus States

All variants display a visible focus ring:
- 2px Neptune outline
- 2px offset from button edge

### Color Contrast

- Light mode: Neptune on white meets 4.5:1 contrast ratio
- Inverse mode: White on dark backgrounds meets 4.5:1 contrast ratio
- Disabled states intentionally have lower contrast to indicate non-interactive state

## Do's and Don'ts

### Do's

- Use for search and filter functionality
- Maintain consistent sizing within filter groups
- Use icons to indicate directional navigation
- Group related pill buttons together
- Use the light variant on light backgrounds
- Use the inverse variant on dark backgrounds or hero images

### Don'ts

- Never have text over two lines
- Don't change the colour of the buttons from the design tokens
- Don't add any gradients (except the built-in pressed state)
- Don't use the pill as a transactional button (use Button instead)
- Don't change the shape of the corner radius
- Don't use for primary call-to-action buttons

## CSS Custom Properties

```css
:root {
  /* Pill Button Colors - Light */
  --pill-button-light-border: var(--color-neptune);
  --pill-button-light-text: var(--color-cosmos);
  --pill-button-light-hover-bg: var(--color-neptune);
  --pill-button-light-hover-text: var(--color-spotlight);

  /* Pill Button Colors - Inverse */
  --pill-button-inverse-border: var(--color-spotlight);
  --pill-button-inverse-text: var(--color-spotlight);
  --pill-button-inverse-hover-bg: var(--color-spotlight);
  --pill-button-inverse-hover-text: var(--color-cosmos);

  /* Pill Button Disabled */
  --pill-button-disabled-border: var(--color-ammonite);
  --pill-button-disabled-text: var(--color-slate);

  /* Pill Button Spacing */
  --pill-button-padding-x: var(--space-auditorium);
  --pill-button-padding-y: 10px;
  --pill-button-icon-gap: var(--space-club);

  /* Pill Button Shape */
  --pill-button-radius: 24px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js (pill-button-specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        'pill-button': {
          'light-border': '#024DDF',
          'light-text': '#121212',
          'light-hover-bg': '#024DDF',
          'inverse-border': '#FFFFFF',
          'inverse-text': '#FFFFFF',
          'inverse-hover-bg': '#FFFFFF',
          'inverse-hover-text': '#121212',
          'disabled-border': '#D6D6D6',
          'disabled-text': '#949494',
        }
      },
      borderRadius: {
        'pill': '24px',
      }
    }
  }
}
```

### Tailwind Class Examples

```html
<!-- Light - Default -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-neptune rounded-pill font-averta-semibold text-base text-cosmos tracking-wide whitespace-nowrap transition-colors hover:bg-neptune hover:text-white">
  Pill button
</button>

<!-- Inverse - Default -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-white rounded-pill font-averta-semibold text-base text-white tracking-wide whitespace-nowrap transition-colors hover:bg-white hover:text-cosmos">
  Pill button
</button>

<!-- With Right Icon -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-neptune rounded-pill font-averta-semibold text-base text-cosmos tracking-wide whitespace-nowrap">
  Pill button
  <svg class="w-6 h-6" viewBox="0 0 24 24"><!-- ChevronRight --></svg>
</button>

<!-- Disabled -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-ammonite rounded-pill font-averta-semibold text-base text-slate tracking-wide whitespace-nowrap cursor-not-allowed" disabled>
  Pill button
</button>
```

## Applied Placements

The Pill Button is commonly used in these contexts:

| Context | Example Use |
|---------|-------------|
| Search Header | Location, date, and keyword filters in the main search bar |
| Filter Bar | Category and filter pills in search results |
| Event Listings | Quick filter options above event cards |
| Mobile Navigation | Horizontal scrolling filter options |

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| color.action.primary (Neptune) | COLOR | #024DDF |
| color.content.primary (Cosmos) | COLOR | #121212 |
| color.content.inverse (Spotlight) | COLOR | #FFFFFF |
| color.content.disabled (Slate) | COLOR | #949494 |
| color.border.disabled (Ammonite) | COLOR | #D6D6D6 |
| space.auditorium | NUMBER | 16 |
| space.club | NUMBER | 8 |

## Related Components

- [Button](./button.md) - For primary and transactional actions
- [Circle Button](./circle-button.md) - For icon-only circular actions
- [Filterbar](./filterbar.md) - Contains pill buttons for filtering

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial release |
