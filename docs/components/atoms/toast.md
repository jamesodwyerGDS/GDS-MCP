---
name: Toast
description: A transient notification component that provides short, informative feedback confirming an action was successful. Toasts appear briefly and auto-dismiss without requiring user interaction.
category: atoms
status: stable
version: 1.0.0
updated: 2025-01-06
tags:
  - toast
  - notification
  - feedback
  - confirmation
  - snackbar
keywords:
  - toast notification
  - success message
  - action confirmation
  - transient feedback
  - auto-dismiss notification
dependencies: []
relatedComponents:
  - name: Alert
    relationship: alternative
tokens:
  colours:
    background: "Cosmos #121212"
    text: "Spotlight #FFFFFF"
    icon:
      success: "Earth #048851"
      close: "Spotlight #FFFFFF"
  spacing:
    containerPadding: "Auditorium 16px"
    iconTextGap: "Theatre 12px"
    textCloseGap: "Theatre 12px"
  typography:
    message: "Rainier (Regular, 16px)"
  elevation:
    - level-2: "0px 2px 8px 0px rgba(18,18,18,0.20)"
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - status
    - alert
figmaNodeId: "38852:13559"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Toast

A transient notification component that provides short, informative feedback confirming an action was successful. Toasts appear briefly and auto-dismiss without requiring user interaction.

## Overview

Toasts are lightweight, non-intrusive notifications that confirm positive outcomes of user actions. They appear temporarily at a fixed position on screen and automatically disappear after a brief duration. Unlike alerts, toasts do not require acknowledgment and should not interrupt the user's workflow.

### When to use

- Confirm successful completion of an action (save, update, submit)
- Provide positive reassurance that doesn't require user response
- Show brief status updates that aren't critical to the user's task
- Communicate non-blocking confirmations

### When not to use

- Do not use for error messages (use Alert instead)
- Do not use for warnings or critical information
- Do not use when user action is required
- Do not use for lengthy or complex messages
- Do not use for information that users need to reference later

## Anatomy

```
┌──────────────────────────────────────────────────┐
│  [✓]  Your Personal Information has been Updated  ✕  │
└──────────────────────────────────────────────────┘
   ↑                     ↑                          ↑
  Icon               Message Text              Close Button
(optional)
```

### Parts

| Part | Description |
|------|-------------|
| Container | Dark background (Cosmos) with rounded corners |
| Status Icon | 24px success icon (optional, Earth green) |
| Message Text | Primary notification text (Spotlight white) |
| Close Button | 16px dismiss icon (always visible) |

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| With Icon | Includes success checkmark icon | Primary variant for success confirmations |
| Without Icon | Text-only with close button | When icon is redundant or space is limited |

## States

| State | Description |
|-------|-------------|
| Visible | Toast enters viewport with animation |
| Idle | Toast displays message for set duration |
| Dismissing | Toast exits viewport (auto or user-triggered) |

## Properties

| Property | Values | Default | Description |
|----------|--------|---------|-------------|
| icon | true, false | true | Show/hide success icon |
| message | string | required | Notification text content |
| duration | number (ms) | 5000 | Auto-dismiss timing |
| position | top-right, bottom-center | bottom-center | Screen placement |

## Styling

### Typography

| Element | Style | Value |
|---------|-------|-------|
| Message | Rainier (Regular) | 16px |
| Line Height | - | 24px |
| Letter Spacing | - | 0.32px (2%) |
| Font Family | Averta | Regular weight |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| Container padding | Auditorium | 16px |
| Icon to text gap | Theatre | 12px |
| Text to close gap | Theatre | 12px |
| Icon size | - | 24px |
| Close icon size | - | 16px |

### Colours

| Element | Token | Hex |
|---------|-------|-----|
| Background | Cosmos | #121212 |
| Text | Spotlight | #FFFFFF |
| Success icon | Earth | #048851 |
| Close icon | Spotlight | #FFFFFF |

### Dimensions

| Property | Value |
|----------|-------|
| Min width | 280px |
| Max width | 400px |
| Border radius | 4px |

## Positioning and Placement

Toasts should appear in a consistent location that doesn't obstruct primary content or navigation:

| Position | Use Case |
|----------|----------|
| Bottom center | Default position, mobile-friendly |
| Top right | Desktop applications, dashboard contexts |
| Bottom right | Alternative desktop position |

### Stacking Behavior

When multiple toasts appear:
- Stack vertically with 8px gap
- Newest toast appears at bottom of stack
- Maximum 3 toasts visible simultaneously
- Oldest toast auto-dismisses when limit exceeded

## Motion

### Entry Animation

- **Direction**: Slide up from bottom (or slide in from right for top-right position)
- **Duration**: 300ms
- **Easing**: ease-out

### Exit Animation

- **Direction**: Fade out and slide down
- **Duration**: 200ms
- **Easing**: ease-in

### Timing

| Event | Duration |
|-------|----------|
| Display duration | 5000ms (default) |
| Entry animation | 300ms |
| Exit animation | 200ms |

## Accessibility

### ARIA Attributes

```html
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  Your Personal Information has been Updated
</div>
```

### Keyboard Navigation

- Close button accessible via Tab key
- Escape key dismisses toast (optional enhancement)
- Focus should not automatically move to toast

### Screen Reader Considerations

- Uses `role="status"` for non-urgent notifications
- `aria-live="polite"` ensures message is announced without interrupting
- Close button should have accessible label: "Dismiss notification"

## Do's and Don'ts

### Do's

- Keep messages short (under 50 characters ideal)
- Use for positive, successful outcomes only
- Position consistently across the application
- Allow manual dismissal via close button
- Ensure sufficient display time for reading

### Don'ts

- Don't use for error or warning messages
- Don't stack more than 3 toasts at once
- Don't use for messages requiring user action
- Don't position over important UI elements
- Don't make duration too short to read (<3 seconds)
- Don't change the dark background color
- Don't modify text sizes or colors

## CSS Custom Properties

```css
:root {
  /* Toast Colors */
  --toast-bg: var(--color-cosmos);
  --toast-text: var(--color-spotlight);
  --toast-icon-success: var(--color-earth);
  --toast-icon-close: var(--color-spotlight);

  /* Toast Spacing */
  --toast-padding: var(--space-auditorium);
  --toast-gap: var(--space-theatre);

  /* Toast Dimensions */
  --toast-min-width: 280px;
  --toast-max-width: 400px;
  --toast-border-radius: 4px;

  /* Toast Animation */
  --toast-duration-enter: 300ms;
  --toast-duration-exit: 200ms;
  --toast-display-duration: 5000ms;
}
```

## Tailwind Configuration

```js
// tailwind.config.js (toast-specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        toast: {
          bg: '#121212',
          text: '#FFFFFF',
          success: '#048851',
        }
      },
      minWidth: {
        'toast': '280px',
      },
      maxWidth: {
        'toast': '400px',
      },
      keyframes: {
        'toast-enter': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'toast-exit': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
      animation: {
        'toast-enter': 'toast-enter 300ms ease-out',
        'toast-exit': 'toast-exit 200ms ease-in',
      },
    }
  }
}
```

### Styling with Tailwind

```html
<!-- Toast container -->
<div
  role="status"
  aria-live="polite"
  class="
    bg-cosmos text-spotlight
    flex items-center gap-theatre
    px-auditorium py-auditorium
    min-w-toast max-w-toast
    rounded
    shadow-elevation-2
    animate-toast-enter
  "
>
  <!-- Success Icon (optional) -->
  <svg class="size-6 shrink-0 text-earth" aria-hidden="true">
    <!-- SuccessFilled icon -->
  </svg>

  <!-- Message -->
  <p class="text-rainier flex-1">
    Your Personal Information has been Updated
  </p>

  <!-- Close Button -->
  <button
    type="button"
    class="size-4 shrink-0 text-spotlight"
    aria-label="Dismiss notification"
  >
    <!-- Close icon -->
  </button>
</div>
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Secondary/Cosmos | COLOR | #121212 |
| Secondary/Spotlight | COLOR | #FFFFFF |
| Tertiary/Earth | COLOR | #048851 |
| Desktop/Body - Rainier | TYPOGRAPHY | 16px/24px Regular |

## Related Components

- [Alert](./alert.md) - For persistent, actionable notifications
- [Modal](./modal.md) - For blocking interactions requiring user response
- [Badge](./badge.md) - For static status indicators

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial release |
