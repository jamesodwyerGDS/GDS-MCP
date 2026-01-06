---
name: Elevation
description: The elevation system establishes visual hierarchy through shadows, representing the relative position of elements along the z-axis to help users understand structure and interactivity.
category: foundations
status: stable
version: 2.0.0
updated: 2025-06-20
tags:
  - elevation
  - shadows
  - depth
  - z-index
  - hierarchy
keywords:
  - elevation system
  - box shadow
  - depth levels
  - visual hierarchy
  - z-axis
dependencies: []
relatedComponents:
  - color
  - spacing
tokens:
  colours:
    shadow: "Cosmos #121212"
  spacing: []
  typography: []
  elevation:
    - level-0: "canvas (no shadow)"
    - level-1: "0px 1px 4px 0px rgba(18,18,18,0.15)"
    - level-2: "0px 2px 8px 0px rgba(18,18,18,0.15)"
    - level-3: "0px 3px 12px 0px rgba(18,18,18,0.18)"
    - level-4: "0px 8px 20px 0px rgba(18,18,18,0.35)"
accessibility:
  wcagLevel: AA
  keyboardNavigable: false
  ariaRoles: []
frameworks:
  - framework: React
    package: "@gds/tokens"
    import: "import { elevation } from '@gds/tokens'"
figmaNodeId: "39742:599211"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Elevation

Elevation is a core design principle applied across all surfaces and components to establish a clear and consistent visual hierarchy. It represents the relative position of elements along the z-axis, helping users understand the structure and interactivity of the interface.

## Overview

The elevation system includes three key visual elements:
- **Shadows** (primary method in v2.0)
- **Surface fill colour** (for theme differentiation)
- **Border colour** (optional, for additional definition)

These elements are defined for both light and dark modes to ensure clarity and consistency across themes.

## Anatomy

Elevation is organized into 5 levels (0-4), each serving a specific purpose in the interface hierarchy.

| Level | Name | Usage |
|-------|------|-------|
| Level 0 | Canvas | Default canvas level to build screens on (body background) |
| Level 1 | Content | Hierarchy within content on level 0 (basic cards) |
| Level 2 | Sticky | Sticky elements (headers, footers), extra lift on cards |
| Level 3 | Floating | Multiple sticky elements, floating panels over content |
| Level 4 | Overlay | Always used with overlay background (modals, sidepanels) |

## Variables

Shadow values use Cosmos (`#121212`) as the base color with varying opacity and blur.

| Token | X | Y | Blur | Spread | Color | Opacity |
|-------|---|---|------|--------|-------|---------|
| `elevation-level-1` | 0 | 1px | 4px | 0 | #121212 | 15% |
| `elevation-level-2` | 0 | 2px | 8px | 0 | #121212 | 15% |
| `elevation-level-3` | 0 | 3px | 12px | 0 | #121212 | 18% |
| `elevation-level-4` | 0 | 8px | 20px | 0 | #121212 | 35% |

### Shadow Progression

The shadow system follows a logical progression:
- **Level 1**: Subtle lift for basic content separation
- **Level 2**: Moderate depth for sticky/floating elements
- **Level 3**: Pronounced shadow for layered interfaces
- **Level 4**: Strong shadow for modal/overlay contexts

## Usage Guidelines

### Level 0 - Canvas
- The base layer for all screen content
- No shadow applied
- Typically uses the page background color

### Level 1 - Content Cards
- Basic cards sitting on the canvas
- Provides subtle separation from background
- Use for: product cards, content blocks, list items

### Level 2 - Sticky Elements
- Headers and footers that stay fixed
- Cards requiring extra visual prominence
- Content slides underneath these elements

### Level 3 - Floating Panels
- Multiple sticky elements needing hierarchy
- Dropdown menus, popovers
- Floating action panels

### Level 4 - Overlays
- Always paired with a background overlay/scrim
- Modals and dialogs
- Side panels and drawers
- Full-screen takeovers

## Do's and Don'ts

### Do's
- Use elevation consistently across similar components
- Match elevation level to the component's purpose
- Combine with appropriate z-index values
- Support both light and dark mode shadows

### Don'ts
- Don't change the shadow colours
- Don't change the shadow depth values
- Don't use more than one shadow level at a time
- Don't apply elevation without considering the component hierarchy

## CSS Custom Properties

```css
:root {
  /* Elevation Shadows */
  --elevation-level-0: none;
  --elevation-level-1: 0px 1px 4px 0px rgba(18, 18, 18, 0.15);
  --elevation-level-2: 0px 2px 8px 0px rgba(18, 18, 18, 0.15);
  --elevation-level-3: 0px 3px 12px 0px rgba(18, 18, 18, 0.18);
  --elevation-level-4: 0px 8px 20px 0px rgba(18, 18, 18, 0.35);

  /* Z-Index Scale (recommended pairing) */
  --z-index-base: 0;
  --z-index-content: 10;
  --z-index-sticky: 100;
  --z-index-floating: 200;
  --z-index-overlay: 300;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'elevation-1': '0px 1px 4px 0px rgba(18, 18, 18, 0.15)',
        'elevation-2': '0px 2px 8px 0px rgba(18, 18, 18, 0.15)',
        'elevation-3': '0px 3px 12px 0px rgba(18, 18, 18, 0.18)',
        'elevation-4': '0px 8px 20px 0px rgba(18, 18, 18, 0.35)',
      },
      zIndex: {
        'base': '0',
        'content': '10',
        'sticky': '100',
        'floating': '200',
        'overlay': '300',
      }
    }
  }
}
```

## Usage Examples

### React Component

```tsx
// Basic card with level 1 elevation
<div className="bg-white rounded-md shadow-elevation-1 p-amphitheatre">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

// Sticky header with level 2 elevation
<header className="fixed top-0 w-full bg-white shadow-elevation-2 z-sticky">
  <nav>Navigation content</nav>
</header>

// Dropdown menu with level 3 elevation
<div className="absolute bg-white shadow-elevation-3 rounded-md z-floating">
  <ul>Menu items</ul>
</div>

// Modal with level 4 elevation
<div className="fixed inset-0 bg-black/50 z-overlay flex items-center justify-center">
  <div className="bg-white shadow-elevation-4 rounded-lg p-stadium max-w-md">
    <h2>Modal Title</h2>
    <p>Modal content</p>
  </div>
</div>
```

### Component Elevation Reference

| Component | Recommended Level |
|-----------|------------------|
| Page background | Level 0 |
| Content cards | Level 1 |
| Sticky header/footer | Level 2 |
| Hover card states | Level 2 |
| Dropdown menus | Level 3 |
| Popovers | Level 3 |
| Tooltips | Level 3 |
| Modals | Level 4 |
| Side panels | Level 4 |
| Bottom sheets | Level 4 |
