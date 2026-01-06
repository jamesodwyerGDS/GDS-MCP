---
name: Toolbox
description: A vertical zoom control component for the Interactive Seat Map (ISM) that allows users to zoom in, zoom out, and reset the view.
category: atoms
status: stable
version: 1.0.0
updated: 2025-01-06
tags:
  - toolbox
  - zoom
  - controls
  - map
  - navigation
  - interactive
keywords:
  - zoom controls
  - seat map
  - map controls
  - zoom in
  - zoom out
  - reset view
  - ISM controls
dependencies: []
relatedComponents:
  - name: CircleButton
    relationship: alternative
  - name: SquareButton
    relationship: variant
tokens:
  colours:
    background:
      default: "Spotlight #FFFFFF"
      disabled: "Diatomite #EBEBEB"
    border:
      default: "Moonrock #BFBFBF"
      hover: "Neptune #024DDF"
      pressed: "Neptune Dark #0541B6"
    icon:
      default: "Granite #646464"
      active: "Neptune #024DDF"
      disabled: "Slate #949494"
  spacing:
    blockSize: "44px"
    iconSize: "24px"
    iconPadding: "10px"
  borderRadius: "4px"
  elevation: "elevation-level-1"
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - button
    - toolbar
figmaNodeId: "38852:5748"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Toolbox

A vertical zoom control component for the Interactive Seat Map (ISM) that allows users to zoom in, zoom out, and reset the view.

## Overview

The ISM Toolbox allows fans to zoom in or out on a particular area of the Interactive Seat Map on the EDP (Event Detail Page). Reset functionality is included alongside zoom controls to make it easy for fans to quickly return to the default view after zooming in or out.

### When to use

- Use on Interactive Seat Map interfaces
- Use when users need precise zoom control over map views
- Use when a reset-to-default view is needed

### When not to use

- Do not use for general navigation
- Do not use for non-map zoom contexts
- Do not use in mobile layouts where space is constrained (consider horizontal alternatives)

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| Two | Add (zoom in) and Subtract (zoom out) buttons | Standard zoom controls |
| Three | Reset, Add, and Subtract buttons | Full zoom controls with reset functionality |

## Anatomy

```
┌───────────┐
│   Reset   │  ← Top block (Three variant only)
├───────────┤
│    Add    │  ← Middle block (zoom in)
├───────────┤
│ Subtract  │  ← Bottom block (zoom out)
└───────────┘
```

### Parts

| Part | Description |
|------|-------------|
| Container | Vertical stack of toolbar blocks with elevation shadow |
| Top Block | Reset button (only in Three variant) |
| Middle Block | Add/zoom in button |
| Bottom Block | Subtract/zoom out button |
| Icon | 24px icon centered within each block |

## Block Types

| Block | Icon | Description |
|-------|------|-------------|
| Top | Reset (circular arrow) | Returns view to default zoom level |
| Middle | Add (plus) | Zooms in on the map |
| Bottom | Subtract (minus) | Zooms out of the map |

## States

Each toolbar block supports four states:

| State | Description | Border | Background | Icon Color |
|-------|-------------|--------|------------|------------|
| Default | Resting state | Moonrock `#BFBFBF` 1px | Spotlight `#FFFFFF` | Granite `#646464` (Reset) / Neptune `#024DDF` (Add/Subtract) |
| Hover | Mouse over | Neptune `#024DDF` 2px | Spotlight `#FFFFFF` | Neptune `#024DDF` |
| Pressed | Active/clicked | Neptune Dark `#0541B6` 2px | Spotlight `#FFFFFF` | Neptune `#024DDF` |
| Disabled | Non-interactive | Moonrock `#BFBFBF` 1px | Diatomite `#EBEBEB` | Slate `#949494` |

## Styling

### Dimensions

| Property | Value |
|----------|-------|
| Block size | 44px x 44px |
| Icon size | 24px x 24px |
| Border radius | 4px (top corners on first block, bottom corners on last block) |

### Border Radius by Block

| Block Position | Border Radius |
|----------------|---------------|
| Top | 4px top-left, 4px top-right, 0 bottom |
| Middle | 0 (no radius) |
| Bottom | 0 top, 4px bottom-left, 4px bottom-right |

### Borders

| State | Border Width | Border Color |
|-------|--------------|--------------|
| Default | 1px | Moonrock `#BFBFBF` |
| Hover | 2px | Neptune `#024DDF` |
| Pressed | 2px | Neptune Dark `#0541B6` |
| Disabled | 1px | Moonrock `#BFBFBF` |

### Colours

| Element | Token | Hex |
|---------|-------|-----|
| Background (default) | Spotlight | `#FFFFFF` |
| Background (disabled) | Diatomite | `#EBEBEB` |
| Border (default) | Moonrock | `#BFBFBF` |
| Border (hover/pressed) | Neptune | `#024DDF` |
| Border (pressed) | Neptune Dark | `#0541B6` |
| Icon (reset default) | Granite | `#646464` |
| Icon (add/subtract) | Neptune | `#024DDF` |
| Icon (hover/pressed) | Neptune | `#024DDF` |
| Icon (disabled) | Slate | `#949494` |

### Elevation

| State | Shadow |
|-------|--------|
| All states | elevation-level-1: `0px 1px 4px rgba(18, 18, 18, 0.15)` |

## Icon Reference

| Icon | Node ID | Description |
|------|---------|-------------|
| Reset | 3938:72608 | Circular arrow for returning to default view |
| Add | 3938:72609 | Plus sign for zooming in |
| Subtract | 3938:72610 | Minus sign for zooming out |

## Accessibility

### Keyboard Navigation

- **Tab**: Navigate between toolbar blocks
- **Enter/Space**: Activate the focused block
- Focus ring visible on keyboard focus (Neptune outline)

### ARIA Attributes

```html
<div role="toolbar" aria-label="Map zoom controls">
  <button aria-label="Reset zoom">
    <span class="sr-only">Reset map to default view</span>
  </button>
  <button aria-label="Zoom in">
    <span class="sr-only">Zoom in on map</span>
  </button>
  <button aria-label="Zoom out">
    <span class="sr-only">Zoom out of map</span>
  </button>
</div>
```

### Screen Reader Considerations

- Each button should have clear, descriptive labels
- Announce current zoom level changes
- Indicate disabled state when zoom limits are reached

## Do's and Don'ts

### Do's

- Position the toolbox in a consistent location (typically right side of map)
- Use the Three variant when reset functionality is needed
- Disable zoom in/out buttons when min/max zoom is reached
- Provide visual feedback on hover and press states
- Maintain the vertical stacking order (Reset > Add > Subtract)

### Don'ts

- Don't change the icon order or meaning
- Don't use for non-zoom functionality
- Don't hide the toolbox during map interactions
- Don't use multiple toolboxes on the same map
- Don't override the established color tokens

## CSS Custom Properties

```css
:root {
  /* Toolbox Colors */
  --toolbox-bg: var(--color-spotlight);
  --toolbox-bg-disabled: var(--color-diatomite);
  --toolbox-border: var(--color-moonrock);
  --toolbox-border-hover: var(--color-neptune);
  --toolbox-border-pressed: #0541B6;
  --toolbox-icon-default: var(--color-granite);
  --toolbox-icon-active: var(--color-neptune);
  --toolbox-icon-disabled: var(--color-slate);

  /* Toolbox Dimensions */
  --toolbox-block-size: 44px;
  --toolbox-icon-size: 24px;
  --toolbox-radius: 4px;

  /* Toolbox Shadow */
  --toolbox-shadow: 0px 1px 4px rgba(18, 18, 18, 0.15);
}
```

## Tailwind Configuration

```js
// tailwind.config.js (toolbox-specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        toolbox: {
          bg: '#FFFFFF',
          'bg-disabled': '#EBEBEB',
          border: '#BFBFBF',
          'border-hover': '#024DDF',
          'border-pressed': '#0541B6',
          'icon-default': '#646464',
          'icon-active': '#024DDF',
          'icon-disabled': '#949494',
        }
      },
      width: {
        'toolbox-block': '44px',
        'toolbox-icon': '24px',
      },
      height: {
        'toolbox-block': '44px',
        'toolbox-icon': '24px',
      },
      boxShadow: {
        'toolbox': '0px 1px 4px rgba(18, 18, 18, 0.15)',
      }
    }
  }
}
```

## Styling with Tailwind

```css
/* Container */
.toolbox {
  @apply flex flex-col shadow-toolbox;
}

/* Block base styles */
.toolbox-block {
  @apply w-[44px] h-[44px] flex items-center justify-center bg-white border border-moonrock;
}

/* Block positions */
.toolbox-block-top {
  @apply rounded-t;
}

.toolbox-block-middle {
  @apply border-t-0;
}

.toolbox-block-bottom {
  @apply rounded-b border-t-0;
}

/* States */
.toolbox-block:hover:not(:disabled) {
  @apply border-2 border-neptune;
}

.toolbox-block:active:not(:disabled) {
  @apply border-2 border-[#0541B6];
}

.toolbox-block:disabled {
  @apply bg-diatomite cursor-not-allowed;
}

/* Icons */
.toolbox-icon {
  @apply w-6 h-6;
}

.toolbox-icon-reset {
  @apply text-granite;
}

.toolbox-icon-add,
.toolbox-icon-subtract {
  @apply text-neptune;
}

.toolbox-block:disabled .toolbox-icon {
  @apply text-slate;
}
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Secondary/Spotlight | COLOR | #FFFFFF |
| Borders & Fills/Moonrock | COLOR | #BFBFBF |
| Borders & Fills/Diatomite | COLOR | #EBEBEB |
| Primary/Neptune | COLOR | #024DDF |
| Secondary/Granite | COLOR | #646464 |
| Borders & Fills/Slate | COLOR | #949494 |
| elevation-level-1 | EFFECT | 0px 1px 4px rgba(18, 18, 18, 0.15) |

## Related Components

- [CircleButton](./circle-button.md) - Alternative circular action buttons
- [SquareButton](./square-button.md) - Individual action buttons

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial release |
