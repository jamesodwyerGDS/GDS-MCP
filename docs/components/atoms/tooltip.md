---
name: Tooltip
description: A brief, informative message that appears when a user hovers over or focuses on an element. Tooltips provide contextual information without cluttering the interface.
category: atoms
status: stable
version: 1.0.0
updated: 2025-01-06
tags:
  - tooltip
  - overlay
  - help
  - contextual
  - hover
keywords:
  - tooltip
  - info popup
  - hover help
  - contextual info
  - hint
dependencies: []
relatedComponents:
  - name: Toast
    relationship: alternative
tokens:
  colours:
    background: "Spotlight #FFFFFF"
    text: "Granite #646464"
    border: "Slate #949494"
  spacing:
    paddingX: "Auditorium 16px"
    paddingY: "Theatre 12px"
  typography:
    content: "Etna (Regular, 14px)"
  elevation:
    - level-2: "0px 2px 8px 0px rgba(18,18,18,0.15)"
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - tooltip
figmaNodeId: "10664:34176"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Tooltip

A brief, informative message that appears when a user interacts with an element. Tooltips are usually initiated through a mouse-hover gesture or through a keyboard-hover gesture.

## Overview

A tooltip is a small pop-up box that appears when users hover their cursor over a specific element on a page. It typically contains additional information or context about the element, such as a definition of a term or an explanation of a function. Tooltips are commonly used in interfaces to provide extra information without cluttering the page with excessive text.

### When to use

- Provide additional context or explanation for UI elements
- Clarify the meaning of icons or abbreviated text
- Offer hints about input field requirements
- Explain disabled controls or unavailable features
- Display full text for truncated content

### When not to use

- Do not use for critical information that users must see
- Do not use for complex content requiring user interaction
- Do not use for error messages (use Alert instead)
- Do not use for content that needs to persist (use Popover instead)
- Do not use when the trigger element is not focusable

## Anatomy

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   Tooltip content text goes here...             │
│                                                 │
└────────────────────────┬────────────────────────┘
                         ▽
                       Arrow
                    (points to
                     trigger)
```

### Parts

| Part | Description |
|------|-------------|
| Container | White background with slate border, rounded corners |
| Content | Grey text with contextual information |
| Arrow | Directional indicator pointing to trigger element |

## Variants

### Device Variants

| Variant | Max Width | Description |
|---------|-----------|-------------|
| Desktop | 320px | Larger container for desktop viewports |
| Mobile | 240px | Compact container for mobile viewports |

### Arrow Position Variants

| Position | Description |
|----------|-------------|
| Top Left | Arrow at top-left of container, tooltip below trigger |
| Top Center | Arrow centered at top, tooltip below trigger |
| Top Right | Arrow at top-right of container, tooltip below trigger |
| Bottom Left | Arrow at bottom-left, tooltip above trigger |
| Bottom Center | Arrow centered at bottom, tooltip above trigger |
| Bottom Right | Arrow at bottom-right, tooltip above trigger |

## States

| State | Description |
|-------|-------------|
| Hidden | Tooltip not visible |
| Visible | Tooltip displayed, triggered by hover/focus |
| Positioned | Tooltip positioned relative to trigger element |

## Properties

| Property | Values | Default | Description |
|----------|--------|---------|-------------|
| device | Desktop, Mobile | Desktop | Controls max-width sizing |
| tipPosition | Top Left, Top Center, Top Right, Bottom Left, Bottom Center, Bottom Right | Top Center | Arrow placement |
| background | Light | Light | Background theme |
| tooltipText | string | required | Content displayed in tooltip |

## Styling

### Typography

| Element | Style | Value |
|---------|-------|-------|
| Content (Desktop) | Etna (Regular) | 14px |
| Content (Mobile) | Etna (Regular) | 14px |
| Line Height (Desktop) | - | 20px |
| Line Height (Mobile) | - | 18px |
| Letter Spacing | - | 0.28px (2%) |
| Font Family | Averta | Regular weight |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| Horizontal padding | Auditorium | 16px |
| Vertical padding | Theatre | 12px |
| Arrow to container | - | 0px (connected) |
| Tooltip to trigger | - | 4px |

### Colours

| Element | Token | Hex |
|---------|-------|-----|
| Background | Spotlight | #FFFFFF |
| Text | Granite | #646464 |
| Border | Slate | #949494 |

### Dimensions

| Property | Desktop | Mobile |
|----------|---------|--------|
| Max width | 320px | 240px |
| Border radius | 4px | 4px |
| Border width | 1px | 1px |
| Arrow width | 16px | 16px |
| Arrow height | 9px | 9px |

### Elevation

| Level | Value |
|-------|-------|
| Shadow | 0px 2px 8px 0px rgba(18,18,18,0.15) |

## Positioning

Tooltips are positioned relative to their trigger element with specific rules:

### Gap from Trigger

The tooltip must be positioned exactly **4px** from the associated trigger element. This ensures a clear visual connection between the tooltip and what it describes.

### Arrow Alignment

| Position | Arrow Location | Container Position |
|----------|----------------|-------------------|
| Top Left | Left edge (16px padding) | Below trigger |
| Top Center | Centered horizontally | Below trigger |
| Top Right | Right edge (16px padding) | Below trigger |
| Bottom Left | Left edge (16px padding) | Above trigger |
| Bottom Center | Centered horizontally | Above trigger |
| Bottom Right | Right edge (16px padding) | Above trigger |

## Accessibility

### ARIA Attributes

```html
<button aria-describedby="tooltip-id">
  Help
</button>
<div
  id="tooltip-id"
  role="tooltip"
  aria-hidden="true"
>
  Tooltip content here
</div>
```

### Keyboard Navigation

- Tooltip appears when trigger element receives focus
- Tooltip dismisses when focus moves away
- Escape key should dismiss tooltip (optional enhancement)
- Tab navigates to next focusable element, dismissing tooltip

### Screen Reader Considerations

- Uses `role="tooltip"` for proper semantics
- Connected via `aria-describedby` on trigger element
- Content read after trigger element label
- Should not contain interactive elements

## Do's and Don'ts

### Do's

- Keep tooltip text concise and helpful
- Position tooltips so they don't cover related content
- Ensure arrow points directly to the trigger element
- Use consistent positioning across similar elements
- Maintain the 4px gap from trigger elements

### Don'ts

- Do not change the colour of text, background, or border
- Do not change the text styling
- Do not add buttons or interactive elements to tooltips
- Do not place tooltips further than 4px from the trigger
- Do not hide the tooltip arrow
- Do not use tooltips for critical information

## CSS Custom Properties

```css
:root {
  /* Tooltip Colors */
  --tooltip-bg: var(--color-spotlight);
  --tooltip-text: var(--color-granite);
  --tooltip-border: var(--color-slate);

  /* Tooltip Spacing */
  --tooltip-padding-x: var(--space-auditorium);
  --tooltip-padding-y: var(--space-theatre);
  --tooltip-gap: 4px;

  /* Tooltip Dimensions */
  --tooltip-max-width-desktop: 320px;
  --tooltip-max-width-mobile: 240px;
  --tooltip-border-radius: 4px;
  --tooltip-arrow-width: 16px;
  --tooltip-arrow-height: 9px;

  /* Tooltip Shadow */
  --tooltip-shadow: 0px 2px 8px 0px rgba(18,18,18,0.15);
}
```

## Tailwind Configuration

```js
// tailwind.config.js (tooltip-specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        tooltip: {
          bg: '#FFFFFF',
          text: '#646464',
          border: '#949494',
        }
      },
      maxWidth: {
        'tooltip-desktop': '320px',
        'tooltip-mobile': '240px',
      },
      spacing: {
        'tooltip-gap': '4px',
      },
      boxShadow: {
        'tooltip': '0px 2px 8px 0px rgba(18,18,18,0.15)',
      },
    }
  }
}
```

### Styling with Tailwind

```html
<!-- Tooltip container (Bottom Center position) -->
<div
  role="tooltip"
  class="
    bg-white text-granite
    border border-slate
    px-4 py-3
    max-w-[320px]
    rounded
    shadow-tooltip
  "
>
  <p class="text-sm leading-5 tracking-wide">
    Tooltip content text goes here...
  </p>

  <!-- Arrow (centered, pointing down) -->
  <div class="flex justify-center px-4">
    <div class="w-4 h-[9px] border-l border-r border-b border-slate bg-white"
         style="clip-path: polygon(50% 100%, 0% 0%, 100% 0%);">
    </div>
  </div>
</div>
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Secondary/Spotlight | COLOR | #FFFFFF |
| Secondary/Granite | COLOR | #646464 |
| Borders & Fills/Slate | COLOR | #949494 |
| Desktop/Small Body - Etna | TYPOGRAPHY | 14px/20px Regular |
| Mobile/Small Body - Etna | TYPOGRAPHY | 14px/18px Regular |
| Elevation/elevation-level-2 | EFFECT | shadow(0,2,8,0.15) |

## Related Components

- [Toast](./toast.md) - For transient success notifications
- [Alert](./alert.md) - For persistent messages requiring attention
- [Modal](./modal.md) - For blocking interactions

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial release |
