---
name: SquareButton
description: A square icon button for navigation and actions, optimized for carousels and space-constrained areas requiring directional navigation.
category: atoms
status: stable
version: 1.0.0
updated: "2025-01-06"
tags:
  - button
  - icon-button
  - square
  - navigation
  - carousel
  - slider
keywords:
  - square button
  - icon button
  - navigation button
  - carousel arrow
  - slider control
  - directional button
dependencies: []
relatedComponents:
  - name: CircleButton
    relationship: alternative
  - name: Button
    relationship: parent
  - name: IconButton
    relationship: alternative
tokens:
  colours:
    - name: primary-default
      token: "Neptune"
      hex: "#024DDF"
    - name: primary-hover
      token: "Neptune Dark"
      hex: "#0141B8"
    - name: primary-pressed
      token: "Neptune Darker"
      hex: "#033399"
    - name: secondary-default
      token: "Spotlight"
      hex: "#FFFFFF"
    - name: secondary-border
      token: "Neptune"
      hex: "#024DDF"
    - name: tertiary-border
      token: "Cosmos"
      hex: "#121212"
    - name: disabled-background
      token: "Diatomite"
      hex: "#EBEBEB"
    - name: disabled-icon
      token: "Slate"
      hex: "#949494"
  spacing:
    - name: container-size
      value: "44px"
    - name: icon-size
      value: "24px"
    - name: border-radius
      value: "0px"
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - button
figmaNodeId: "38852:10066"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# SquareButton

A square icon button for navigation and actions, optimized for carousels and space-constrained areas requiring directional navigation.

## Overview

Square buttons are part of the button collection within the Global Design System. They are versatile as they take less space than a standard button, which is very useful in small areas. Square buttons are primarily used on carousels to move content from left to right, controlling sliders that display images or content in a sequence.

### When to use

- Navigation controls for carousels and sliders
- Content navigation within image galleries
- Card-based navigation arrows
- Sequential content browsing
- Compact directional navigation in tight layouts

### When not to use

- Primary page actions (use standard Button instead)
- Actions requiring text labels
- Form submissions
- When circular aesthetic is preferred (use CircleButton instead)
- Non-directional actions without clear navigation purpose

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| Primary | Filled Neptune blue with white icon | Main carousel navigation, prominent directional actions |
| Secondary | White with Neptune border and icon | Supporting navigation on light backgrounds |
| Tertiary | White with Cosmos border and icon | Subtle actions, outline style on light backgrounds |
| Ghost | Transparent with Neptune icon only | Minimal emphasis, overlay actions on content |
| Inverse | White with dark icon | Actions on dark or image backgrounds |

## Anatomy

```
┌──────────────┐
│              │
│    ┌────┐    │
│    │  → │    │  <- Icon (24px)
│    └────┘    │
│              │
└──────────────┘
       ↑
  Container (44px)
```

### Parts

| Part | Description |
|------|-------------|
| Container | 44px square container with background/border |
| Icon | 24px centered arrow icon (default: ArrowRight) |
| Focus Ring | 2px Neptune outline on keyboard focus |

## Properties

| Property | Values | Default |
|----------|--------|---------|
| type | Primary, Secondary, Tertiary, Ghost, Inverse | Primary |
| state | Default, Hover, Pressed, Disabled | Default |
| isLoading | true, false | false |
| icon | Arrow icon element | ArrowRight |
| direction | left, right | right |

## States

Each variant supports interactive states plus a loading state:

| State | Description |
|-------|-------------|
| Default | Resting state |
| Hover | Mouse over, visual feedback with color shift |
| Pressed | Active/clicked state with darker fill |
| Disabled | Non-interactive, grayed out appearance |
| Loading | Displays spinner, replaces icon |

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
| Container size | 44px x 44px |
| Border radius | 0px (square corners) |
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

### Typography (Loading Spinner)

The loading state replaces the icon with a loading spinner component using the same color scheme as the icon.

## On Backgrounds

Square buttons work across various backgrounds. Selection depends on:

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

```html
<button
  type="button"
  aria-label="Next slide"
  aria-disabled="false"
>
  <svg><!-- Arrow icon --></svg>
</button>
```

### Screen Reader Considerations

- Always provide descriptive `aria-label` (e.g., "Next slide", "Previous image")
- Avoid generic labels like "Click here" or just "Button"
- Include context when multiple square buttons exist (e.g., "Go to next carousel item")

### Focus States

- 2px Neptune outline
- 2px offset from button edge
- Visible on keyboard focus only

## Do's and Don'ts

### Do's

- Use Primary variant for main carousel/slider navigation
- Use Inverse on dark or image backgrounds
- Provide clear, descriptive aria-labels for screen readers
- Use high contrast colors between button and background
- Ensure button is keyboard accessible via Tab key
- Make button responsive across different device sizes
- Position at sides of carousels for intuitive navigation

### Don'ts

- Don't use for primary page actions (use standard Button)
- Don't use without an aria-label
- Don't place on backgrounds with insufficient contrast
- Don't use for actions that require text labels
- Don't mix with CircleButton inconsistently in the same interface
- Don't skip hover states implementation

## CSS Custom Properties

```css
:root {
  /* Square Button Colors */
  --square-button-primary-bg: var(--color-neptune);
  --square-button-primary-hover: #0141B8;
  --square-button-primary-pressed: #033399;

  --square-button-secondary-border: var(--color-neptune);
  --square-button-tertiary-border: var(--color-cosmos);

  --square-button-disabled-bg: var(--color-diatomite);
  --square-button-disabled-icon: var(--color-slate);

  /* Square Button Size */
  --square-button-size: 44px;
  --square-button-icon-size: 24px;
  --square-button-radius: 0px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js (square-button-specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        'square-button': {
          primary: '#024DDF',
          'primary-hover': '#0141B8',
          'primary-pressed': '#033399',
          secondary: '#FFFFFF',
          tertiary: '#FFFFFF',
          inverse: '#FFFFFF',
          disabled: '#EBEBEB',
          'disabled-icon': '#949494',
        }
      },
      width: {
        'square-button': '44px',
      },
      height: {
        'square-button': '44px',
      },
      borderRadius: {
        'square-button': '0px',
      }
    }
  }
}
```

## Styling with Tailwind

```html
<!-- Base styles -->
<button class="w-11 h-11 inline-flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:ring-offset-2">
  <!-- Icon -->
</button>

<!-- Variant styles -->
<!-- Primary -->
<button class="bg-[#024DDF] text-white hover:bg-[#0141B8] active:bg-[#033399]">

<!-- Secondary -->
<button class="bg-white border border-[#024DDF] text-[#024DDF] hover:bg-[#024DDF] hover:text-white active:bg-[#033399]">

<!-- Tertiary -->
<button class="bg-white border border-[#121212] text-[#121212] hover:bg-[#024DDF] hover:text-white hover:border-[#024DDF] active:bg-[#033399]">

<!-- Ghost -->
<button class="bg-transparent text-[#024DDF] hover:bg-[#024DDF] hover:text-white active:bg-[#033399]">

<!-- Inverse -->
<button class="bg-white text-[#121212] hover:bg-[#121212] hover:text-white active:bg-[#024DDF]">

<!-- Disabled -->
<button class="bg-[#EBEBEB] text-[#949494] cursor-not-allowed" disabled>
```

## Component Use Cases

| Use Case | Variant | Direction | Notes |
|----------|---------|-----------|-------|
| Carousel prev/next | Primary or Inverse | left/right | Position at sides of carousel |
| Image gallery | Inverse | left/right | Overlaid on images |
| Content slider | Secondary | left/right | On light backgrounds |
| Card navigation | Ghost | right | Minimal visual weight |
| Event listing carousel | Primary | left/right | High visibility navigation |
| Mobile tickets slider | Inverse | left/right | Over ticket imagery |

## Carousel Navigation Example

```html
<div class="relative">
  <!-- Carousel content -->
  <div class="carousel-content">...</div>

  <!-- Left arrow -->
  <button
    class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white text-[#121212] hover:bg-[#121212] hover:text-white"
    aria-label="Previous slide"
  >
    <svg><!-- Left arrow --></svg>
  </button>

  <!-- Right arrow -->
  <button
    class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white text-[#121212] hover:bg-[#121212] hover:text-white"
    aria-label="Next slide"
  >
    <svg><!-- Right arrow --></svg>
  </button>
</div>
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Primary/Neptune | COLOR | #024DDF |
| Secondary/Cosmos | COLOR | #121212 |
| Secondary/Spotlight | COLOR | #FFFFFF |
| Borders & Fills/Slate | COLOR | #949494 |
| Borders & Fills/Diatomite | COLOR | #EBEBEB |

## Related Components

- [CircleButton](./circle-button.md) - Circular variant for rounded aesthetic
- [Button](./button.md) - Standard button with text labels
- [IconButton](./icon-button.md) - General icon-only button variants

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial release |
