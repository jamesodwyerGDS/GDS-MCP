---
name: Filterbar
description: A segmented toggle control for switching between different view modes or filter options, typically used to alternate between list view, favorites, and calendar views.
category: atoms
status: stable
version: 1.0.0
updated: 2025-01-06
tags:
  - toggle
  - filter
  - segmented-control
  - view-switcher
  - navigation
keywords:
  - filterbar
  - toggle bar
  - segmented control
  - view toggle
  - list view
  - calendar view
  - filter toggle
dependencies: []
relatedComponents:
  - name: Button
    relationship: alternative
  - name: TabBar
    relationship: alternative
tokens:
  colours:
    background:
      unselected: "Spotlight #FFFFFF"
      selected: "Cosmos #121212"
      hover: "Neptune #024DDF"
      pressed: "Neptune #024DDF"
      disabled: "Spotlight #FFFFFF"
    border:
      default: "Cosmos #121212"
      disabled: "Slate #949494"
    icon:
      unselected: "Cosmos #121212"
      selected: "Spotlight #FFFFFF"
      disabled: "Slate #949494"
  spacing:
    paddingX: "Auditorium 16px"
    paddingY: "10px"
    iconGap: "Club 8px"
    blockHeight: "44px"
  typography:
    label: "Averta Semibold 16px/24px, letter-spacing 0.32px"
  borderRadius: "24px"
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - tablist
    - tab
figmaNodeId: "38818:18119"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Filterbar

A segmented toggle control for switching between different view modes or filter options, typically used to alternate between list view, favorites, and calendar views.

## Overview

The Filterbar component provides a visually connected group of toggle buttons that allow users to switch between different view modes or filter states. It's commonly used in listing pages to toggle between list view and calendar view, or to access saved/favorited items.

### When to use

- Use to toggle between 2-3 mutually exclusive view modes
- Ideal for switching between list view, favorites, and calendar view
- Use when filter options are persistent and affect the entire view
- Best for top-level content organization

### When not to use

- Do not use for more than 3 options (consider tabs or dropdown)
- Do not use for actions that don't change the view mode
- Do not use for filters that can be combined (use checkboxes instead)
- Do not use for navigation between different pages

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| Two | Two connected toggle blocks | Simple binary view switching (e.g., List/Calendar) |
| Three | Three connected toggle blocks | Extended options (e.g., List/Favorites/Calendar) |

## Anatomy

```
┌────────────────────────────────────────────────────┐
│  ┌──────────┐┌──────────┐┌──────────┐              │
│  │  [Icon]  ││  [Icon]  ││  [Icon]  │              │
│  │  Left    ││  Middle  ││  Right   │              │
│  └──────────┘└──────────┘└──────────┘              │
│       ↑           ↑            ↑                   │
│    Rounded     Flat on      Rounded                │
│    on left     both ends    on right               │
└────────────────────────────────────────────────────┘
```

### Parts

| Part | Description |
|------|-------------|
| Container | Horizontal flex container grouping all blocks |
| Block (Left) | First segment with left rounded corners |
| Block (Middle) | Middle segment(s) with no rounded corners |
| Block (Right) | Last segment with right rounded corners |
| Icon | 24px icon indicating the view type |

## Block Types

| Type | Border Radius | Use Case |
|------|---------------|----------|
| Left | `rounded-bl-[24px] rounded-tl-[24px]` | First block in group |
| Middle | `rounded-none` | Middle blocks (three-button variant only) |
| Right | `rounded-br-[24px] rounded-tr-[24px]` | Last block in group |

## States

| State | Background | Border | Icon Color | Description |
|-------|------------|--------|------------|-------------|
| Unselected | Transparent | 1px Cosmos `#121212` | Cosmos `#121212` | Default resting state |
| Hover | Neptune `#024DDF` | None | Spotlight `#FFFFFF` | Mouse over |
| Selected | Cosmos `#121212` | None | Spotlight `#FFFFFF` | Currently active option |
| Selected Hover | Neptune `#024DDF` | None | Spotlight `#FFFFFF` | Hover on selected block |
| Pressed | Neptune `#024DDF` | None | Spotlight `#FFFFFF` | Active/clicked state |
| Disabled | Transparent | 1px Slate `#949494` | Slate `#949494` | Non-interactive |

## Properties

| Property | Values | Default | Description |
|----------|--------|---------|-------------|
| buttons | Two, Three | Two | Number of toggle blocks |
| type | Left, Middle, Right | Left | Position in the group |
| state | Unselected, Hover, Selected, Disabled, Pressed, Selected Hover | Unselected | Interactive state |

## Styling

### Typography

Labels for the Filterbar component (when shown in documentation) use:

| Property | Value |
|----------|-------|
| Font | Averta Semibold |
| Size | 16px |
| Line Height | 24px |
| Letter Spacing | 0.32px (2%) |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| Horizontal padding | Auditorium | 16px |
| Vertical padding | — | 10px |
| Icon gap | Club | 8px |
| Block height | — | 44px |

### Colours

| Element | State | Token | Hex |
|---------|-------|-------|-----|
| Background | Selected | Cosmos | `#121212` |
| Background | Hover/Pressed | Neptune | `#024DDF` |
| Background | Unselected | Spotlight | `#FFFFFF` |
| Border | Default | Cosmos | `#121212` |
| Border | Disabled | Slate | `#949494` |
| Icon | Unselected | Cosmos | `#121212` |
| Icon | Selected/Hover | Spotlight | `#FFFFFF` |
| Icon | Disabled | Slate | `#949494` |

### Border Radius

All blocks use pill-shaped corners (`24px`) on their outer edges:

| Block Type | Border Radius |
|------------|---------------|
| Left | `border-radius: 24px 0 0 24px` |
| Middle | `border-radius: 0` |
| Right | `border-radius: 0 24px 24px 0` |

## Icons

The Filterbar typically uses these icons:

| Icon | Description | Node ID |
|------|-------------|---------|
| ListView | Grid/list view toggle | 4038:71892 |
| Heart | Favorites/saved items | — |
| Calendar | Date/calendar view | 4038:71773 |

## Accessibility

### Keyboard Navigation

- **Tab**: Move focus between blocks
- **Enter/Space**: Select the focused block
- **Arrow Left/Right**: Navigate between blocks

### ARIA Attributes

```html
<div role="tablist" aria-label="View options">
  <button role="tab" aria-selected="true" aria-controls="list-panel">
    <span class="sr-only">List view</span>
    <ListViewIcon />
  </button>
  <button role="tab" aria-selected="false" aria-controls="calendar-panel">
    <span class="sr-only">Calendar view</span>
    <CalendarIcon />
  </button>
</div>
```

### Screen Reader Considerations

- Each block should have an accessible label describing its function
- Selected state should be announced via `aria-selected`
- Use `role="tablist"` and `role="tab"` for proper semantics

### Focus States

- Visible focus ring using Neptune outline
- 2px offset from block edge

## Do's and Don'ts

### Do's

- Use consistent icons that clearly represent each view mode
- Ensure only one option is selected at a time
- Position near the content it controls
- Provide accessible labels for screen readers
- Use the three-button variant sparingly

### Don'ts

- Don't use more than 3 options in a single filterbar
- Don't use text labels inside blocks (icons only)
- Don't mix filterbar with other toggle styles
- Don't use for filters that can be combined
- Don't separate blocks visually (they should appear connected)

## CSS Custom Properties

```css
:root {
  /* Filterbar Colors */
  --filterbar-bg-unselected: var(--color-spotlight);
  --filterbar-bg-selected: var(--color-cosmos);
  --filterbar-bg-hover: var(--color-neptune);

  --filterbar-border: var(--color-cosmos);
  --filterbar-border-disabled: var(--color-slate);

  --filterbar-icon-default: var(--color-cosmos);
  --filterbar-icon-selected: var(--color-spotlight);
  --filterbar-icon-disabled: var(--color-slate);

  /* Filterbar Spacing */
  --filterbar-padding-x: var(--space-auditorium);
  --filterbar-padding-y: 10px;
  --filterbar-icon-gap: var(--space-club);
  --filterbar-height: 44px;

  /* Filterbar Shape */
  --filterbar-radius: 24px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        filterbar: {
          'bg-selected': '#121212',
          'bg-hover': '#024DDF',
          'border': '#121212',
          'border-disabled': '#949494',
          'icon-default': '#121212',
          'icon-selected': '#FFFFFF',
          'icon-disabled': '#949494',
        }
      },
      borderRadius: {
        'filterbar': '24px',
      },
      height: {
        'filterbar': '44px',
      }
    }
  }
}
```

## Styling with Tailwind

```css
/* Block base styles */
.filterbar-block {
  @apply flex items-center justify-center px-[16px] py-[10px] h-[44px] gap-[8px];
}

/* Left block */
.filterbar-block-left {
  @apply rounded-l-[24px] rounded-r-none;
}

/* Middle block */
.filterbar-block-middle {
  @apply rounded-none border-l-0 border-r-0;
}

/* Right block */
.filterbar-block-right {
  @apply rounded-r-[24px] rounded-l-none;
}

/* Unselected state */
.filterbar-block-unselected {
  @apply bg-white border border-cosmos text-cosmos;
}

/* Selected state */
.filterbar-block-selected {
  @apply bg-cosmos text-white border-none;
}

/* Hover state */
.filterbar-block:hover {
  @apply bg-neptune text-white border-none;
}

/* Disabled state */
.filterbar-block-disabled {
  @apply bg-white border border-slate text-slate cursor-not-allowed;
}
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Primary/Neptune | COLOR | `#024DDF` |
| Secondary/Cosmos | COLOR | `#121212` |
| Secondary/Spotlight | COLOR | `#FFFFFF` |
| Borders & Fills/Slate | COLOR | `#949494` |

## Related Components

- [Button](./button.md) - For standalone actions
- [TabBar](./tab-bar.md) - For content navigation with labels

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial release |
