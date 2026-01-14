---
name: CircleButton
description: >-
  A circular icon button for navigation and actions, optimized for
  space-constrained areas like cards, carousels, and mobile interfaces.
category: atoms
status: stable
version: 1.0.0
updated: '2026-01-14'
tags:
  - button
  - icon-button
  - circle
  - navigation
  - carousel
  - card
keywords:
  - circle button
  - icon button
  - round button
  - navigation button
  - carousel arrow
  - card action
dependencies: []
relatedComponents:
  - name: Button
    relationship: parent
  - name: IconButton
    relationship: alternative
tokens:
  colours:
    - primary
    - secondary
    - tertiary
    - ghost
    - inverse
    - disabled
    - Default
    - Hover
    - Pressed
    - Disabled
    - Default-border
    - Hover-border
    - Disabled-border
    - Neptune
    - Diatomite
    - Cosmos
    - Spotlight
    - Granite
  spacing:
    size: 44px
    iconSize: 24px
  borderRadius: 50% (full circle)
  typography: {}
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - button
frameworks:
  - framework: React
    package: '@gds/components'
    import: 'import { CircleButton } from ''@gds/components'''
figmaNodeId: '21:12289'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
---
<!-- Last synced with Figma: 2026-01-14 -->


# CircleButton

A circular icon button for navigation and actions, optimized for space-constrained areas like cards, carousels, and mobile interfaces.

## Overview

Circle buttons are part of the button collection and are used across the Ticketmaster digital experience. They are versatile as they take less space than standard buttons, making them ideal for small areas like cards, carousels, or within core flows on mobile. The component features a 44px circular container with a centered 24px icon.

### When to use

- Navigation within carousels and sliders
- Pagination controls
- Card actions and overlays
- Mobile navigation arrows
- Compact action triggers in tight layouts
- Media player controls

### When not to use

- Primary page actions (use standard Button instead)
- Actions requiring text labels
- Form submissions
- When accessibility requires visible text labels

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| Primary | Filled Neptune blue with white icon | Main carousel navigation, prominent actions |
| Secondary | White with Neptune border and icon | Supporting navigation on light backgrounds |
| Tertiary | White with Cosmos border and icon | Subtle actions on light backgrounds |
| Ghost | Transparent with Neptune icon only | Minimal emphasis, overlay actions |
| Inverse | White with dark icon | Actions on dark/image backgrounds |

## Anatomy

```
    ┌─────────────┐
   ╱               ╲
  │    ┌─────┐      │
  │    │  >  │      │  ← Icon (24px)
  │    └─────┘      │
   ╲               ╱
    └─────────────┘
         ↑
    Container (44px)
```

### Parts

| Part | Description |
|------|-------------|
| Container | 44px circular container with background/border |
| Icon | 24px centered icon (default: chevron) |
| Focus Ring | 2px Neptune outline on keyboard focus |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'Primary' \| 'Secondary' \| 'Tertiary' \| 'Ghost' \| 'Inverse'` | `'Primary'` | Visual style variant |
| `disabled` | `boolean` | `false` | Disables interaction |
| `icon` | `ReactNode` | Chevron | Custom icon element |
| `direction` | `'left' \| 'right' \| 'up' \| 'down'` | `'right'` | Chevron direction |
| `onClick` | `() => void` | - | Click handler |
| `ariaLabel` | `string` | `'Navigate'` | Accessibility label |
| `className` | `string` | - | Additional CSS classes |

## States

Each variant supports four interactive states:

| State | Description |
|-------|-------------|
| Default | Resting state |
| Hover | Mouse over, visual feedback |
| Pressed | Active/clicked state |
| Disabled | Non-interactive, grayed out |

### State Colors by Variant

| Variant | Default | Hover | Pressed | Disabled |
|---------|---------|-------|---------|----------|
| Primary | Neptune `#024DDF` | `#0141B8` | `#033399` | Diatomite `#EBEBEB` |
| Secondary | White + Neptune border | Neptune fill | `#033399` fill | Gray border |
| Tertiary | White + Cosmos border | Neptune fill | `#033399` fill | Gray border |
| Ghost | Transparent | Neptune fill | `#033399` fill | Transparent + gray icon |
| Inverse | White | Cosmos fill | Neptune fill | White + gray border |

## Styling

### Size Specifications

| Property | Value |
|----------|-------|
| Container size | 44px × 44px |
| Border radius | 50% (full circle) |
| Icon size | 24px |
| Border width | 1px (variants with borders) |

### Icon Colors by Variant (Default State)

| Variant | Icon Color |
|---------|------------|
| Primary | Spotlight `#FFFFFF` |
| Secondary | Neptune `#024DDF` |
| Tertiary | Cosmos `#121212` |
| Ghost | Neptune `#024DDF` |
| Inverse | Cosmos `#121212` |

## On Backgrounds

Circle buttons work across most backgrounds. Selection depends on:

- **Accessibility**: Ensure sufficient contrast ratio (4.5:1 minimum)
- **Content context**: Match the visual hierarchy of surrounding elements

| Background | Recommended Variants |
|------------|---------------------|
| Light (white) | Primary, Secondary, Tertiary |
| Dark (cosmos) | Inverse |
| Image/photo | Inverse, Primary |
| Colored | Primary (if contrasting), Inverse |

## Accessibility

### Keyboard Navigation

- **Tab**: Focus the button
- **Enter/Space**: Activate the button
- Focus ring visible on keyboard focus (2px Neptune outline)

### ARIA Attributes

```tsx
<button
  type="button"
  aria-label="Next slide"
  aria-disabled={disabled}
>
  <ChevronIcon />
</button>
```

### Screen Reader Considerations

- Always provide descriptive `ariaLabel` (e.g., "Next slide", "Previous image")
- Avoid generic labels like "Click here" or just "Button"
- Include context when multiple circle buttons exist (e.g., "Go to slide 3")

### Focus States

- 2px Neptune outline
- 2px offset from button edge
- Visible on keyboard focus only

## Do's and Don'ts

### Do's

- Use Primary variant for main carousel/slider navigation
- Use Inverse on dark or image backgrounds
- Provide clear, descriptive aria-labels
- Maintain consistent sizing within a component
- Use for directional navigation (prev/next)

### Don'ts

- Don't use for primary page actions
- Don't use without an aria-label
- Don't mix circle button sizes inconsistently
- Don't place on backgrounds with insufficient contrast
- Don't use for actions that require text labels

## CSS Custom Properties

```css
:root {
  /* Circle Button Colors */
  --circle-button-primary-bg: var(--color-neptune);
  --circle-button-primary-hover: #0141B8;
  --circle-button-primary-pressed: #033399;

  --circle-button-secondary-border: var(--color-neptune);
  --circle-button-tertiary-border: var(--color-cosmos);

  --circle-button-disabled-bg: var(--color-diatomite);
  --circle-button-disabled-icon: var(--color-slate);

  /* Circle Button Size */
  --circle-button-size: 44px;
  --circle-button-icon-size: 24px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js (circle-button-specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        'circle-button': {
          primary: '#024DDF',
          'primary-hover': '#0141B8',
          'primary-pressed': '#033399',
          inverse: '#121212',
          disabled: '#EBEBEB',
          'disabled-icon': '#949494',
        }
      },
      width: {
        'circle-button': '44px',
      },
      height: {
        'circle-button': '44px',
      }
    }
  }
}
```

## Usage Examples

### React Component

```tsx
import { CircleButton } from '@gds/components';

// Primary (default)
<CircleButton
  type="Primary"
  direction="right"
  ariaLabel="Next slide"
  onClick={handleNext}
/>

// Secondary
<CircleButton
  type="Secondary"
  direction="left"
  ariaLabel="Previous slide"
  onClick={handlePrev}
/>

// Ghost (for overlays)
<CircleButton
  type="Ghost"
  ariaLabel="Close"
  icon={<CloseIcon />}
  onClick={handleClose}
/>

// Inverse (on dark backgrounds)
<CircleButton
  type="Inverse"
  direction="right"
  ariaLabel="View more"
  onClick={handleViewMore}
/>

// Disabled
<CircleButton
  type="Primary"
  disabled
  ariaLabel="Next (unavailable)"
/>
```

### Carousel Navigation Example

```tsx
<div className="relative">
  <CarouselContent />

  {/* Left arrow */}
  <CircleButton
    type="Inverse"
    direction="left"
    ariaLabel="Previous slide"
    onClick={goToPrev}
    className="absolute left-4 top-1/2 -translate-y-1/2"
  />

  {/* Right arrow */}
  <CircleButton
    type="Inverse"
    direction="right"
    ariaLabel="Next slide"
    onClick={goToNext}
    className="absolute right-4 top-1/2 -translate-y-1/2"
  />
</div>
```

### Styling with Tailwind

```tsx
// Base styles
const baseStyles = "w-11 h-11 rounded-full inline-flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:ring-offset-2";

// Variant styles
const variantStyles = {
  Primary: "bg-[#024DDF] text-white hover:bg-[#0141B8] active:bg-[#033399]",
  Secondary: "bg-white border border-[#024DDF] text-[#024DDF] hover:bg-[#024DDF] hover:text-white active:bg-[#033399]",
  Tertiary: "bg-white border border-[#121212] text-[#121212] hover:bg-[#024DDF] hover:text-white hover:border-[#024DDF] active:bg-[#033399]",
  Ghost: "bg-transparent text-[#024DDF] hover:bg-[#024DDF] hover:text-white active:bg-[#033399]",
  Inverse: "bg-white text-[#121212] hover:bg-[#121212] hover:text-white active:bg-[#024DDF]",
};

// Disabled styles
const disabledStyles = "bg-[#EBEBEB] text-[#949494] cursor-not-allowed";

// Complete component
<button
  className={cn(
    baseStyles,
    disabled ? disabledStyles : variantStyles[type]
  )}
  disabled={disabled}
  aria-label={ariaLabel}
  aria-disabled={disabled}
>
  <ChevronIcon className="w-6 h-6" />
</button>
```

## Component Use Cases

| Use Case | Variant | Direction | Notes |
|----------|---------|-----------|-------|
| Carousel prev/next | Primary or Inverse | left/right | Position at sides |
| Card overlay action | Ghost or Inverse | right | Positioned over images |
| Pagination arrow | Secondary | left/right | Paired with dots |
| Modal close | Ghost | — | Custom X icon |
| Media player | Primary | — | Play/pause icons |
| Booking tip slider | Primary | right | With dot indicators |

## Related Components

- [Button](./button.md) - Standard button with text labels
- [IconButton](./icon-button.md) - Square icon-only button variant
- [Link](./link.md) - For navigation actions

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-05 | Initial release |
