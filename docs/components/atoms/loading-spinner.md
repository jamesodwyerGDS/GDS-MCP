---
name: Loading Spinner
description: >-
  A component with a looping animation that communicates a process or action is
  ongoing
category: atoms
status: stable
version: 1.0.0
updated: '2026-01-14'
tags:
  - loading
  - spinner
  - progress
  - feedback
keywords:
  - loading
  - spinner
  - progress
  - wait
  - processing
  - animation
dependencies: []
relatedComponents:
  - name: Skeleton
    relationship: alternative
  - name: Button
    relationship: parent
  - name: Input Field
    relationship: parent
tokens:
  colours:
    - primary
    - secondary
    - inverse
    - labelPrimary
    - labelInverse
    - Unknown
    - Neptune
    - Cosmos
    - Spotlight
  spacing:
    gap:
      token: space.auditorium
      value: 16px
  typography:
    label:
      font: Averta
      weight: Semibold
      size: 16px
      lineHeight: 24px
      letterSpacing: 0.32px
  elevation: []
  breakpoints: []
tailwind:
  colors:
    spinner-primary: '#024DDF'
    spinner-secondary: '#646464'
    spinner-inverse: '#FFFFFF'
    spinner-label: '#121212'
    spinner-label-inverse: '#FFFFFF'
  spacing:
    spinner-gap: 16px
  sizing:
    spinner-lg: 72px
    spinner-md: 32px
    spinner-sm: 24px
cssVariables:
  - name: '--spinner-color-primary'
    value: var(--color-neptune)
  - name: '--spinner-color-secondary'
    value: var(--color-granite)
  - name: '--spinner-color-inverse'
    value: var(--color-spotlight)
  - name: '--spinner-size-lg'
    value: 72px
  - name: '--spinner-size-md'
    value: 32px
  - name: '--spinner-size-sm'
    value: 24px
  - name: '--spinner-label-gap'
    value: 16px
accessibility:
  wcagLevel: AA
  keyboardNavigable: false
  ariaRoles:
    - status
    - progressbar
figmaNodeId: '33145:3778'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
---
<!-- Last synced with Figma: 2026-01-14 -->


# Loading Spinner

## Overview

Loading Spinner is a component with a looping animation that communicates a process or action is ongoing. It provides visual feedback to users during asynchronous operations, preventing confusion about system state.

### When to use

- Use when the duration of the loading state is short and predictable
- When the structure of content being loaded is unknown
- For full-page or section loading states
- Within interactive elements (buttons, inputs) during submission
- Example: Authenticating your login

### When not to use

- If content takes less than 1 second to load, spinners aren't necessary
- For longer loading states where content structure is known (use Skeleton instead)
- When a progress indicator with percentage would be more informative

## Anatomy

```
┌─────────────────────────────┐
│                             │
│      ┌───────────┐          │
│      │  Spinner  │ ← Required
│      │    ◠      │          │
│      └───────────┘          │
│                             │
│         Label      ← Recommended
│                             │
└─────────────────────────────┘
```

| Part | Required | Description |
|------|----------|-------------|
| Spinner | Yes | Animated circular indicator |
| Label | Recommended | Descriptive text explaining the loading state |

## Variants

### Size

| Variant | Size | Use case |
|---------|------|----------|
| Large | 72px | Default size. Use for large areas (pages, side panels, cards) |
| Medium | 32px | Use when there are space constraints (modals) |
| Small | 24px | Used within elements where space is limited (buttons, input fields) |

### Colour

| Variant | Hex | Use case |
|---------|-----|----------|
| Primary | #024DDF | Default. Use on lighter backgrounds |
| Secondary | #646464 | Use within tertiary outline buttons and form fields |
| Inverse | #FFFFFF | Use on dark backgrounds |

## States

| State | Description |
|-------|-------------|
| Animating | Default state with continuous rotation animation |
| With label | Includes descriptive text below the spinner |
| Without label | Spinner only, for space-constrained contexts |

## Properties

| Property | Type | Values | Default | Description |
|----------|------|--------|---------|-------------|
| size* | variant | Large, Medium, Small | Large | Controls the size of the loading spinner |
| colour | variant | Primary, Secondary, Inverse | Primary | Controls the colour of the loading spinner |
| showLabel | boolean | true, false | false | Show descriptive text explaining the loading state |
| label | string | - | "Label" | The text content of the label |

*Required property

## Styling

### Typography

| Property | Value |
|----------|-------|
| Font | Averta Semibold |
| Size | 16px |
| Line Height | 24px |
| Letter Spacing | 0.32px |

### Spacing

| Area | Value |
|------|-------|
| Gap between spinner and label | 16px |

### Colours

| Element | Variant | Token | Hex |
|---------|---------|-------|-----|
| Spinner | Primary | Neptune | #024DDF |
| Spinner | Secondary | Granite | #646464 |
| Spinner | Inverse | Spotlight | #FFFFFF |
| Label | Primary/Secondary | Cosmos | #121212 |
| Label | Inverse | Spotlight | #FFFFFF |

### Sizing

| Size | Dimensions |
|------|------------|
| Large | 72px x 72px |
| Medium | 32px x 32px |
| Small | 24px x 24px |

## Accessibility

- **ARIA role**: Use `role="status"` or `role="progressbar"` for the spinner container
- **Aria-live**: Include `aria-live="polite"` to announce loading state to screen readers
- **Screen readers**: Label text should describe what is loading (e.g., "Processing payment...")
- **Animation**: Respects `prefers-reduced-motion` media query
- **Focus**: Spinner is not focusable as it's a status indicator, not interactive

## Do's and Don'ts

### Do's

- Use a concise descriptive label when there are no space constraints
- Explain why the user is waiting (e.g., "Payment processing..." instead of "Loading...")
- Use the appropriate size variant for the context
- Use Inverse colour on dark backgrounds
- Use Primary colour on light backgrounds

### Don'ts

- Don't change the font of the label
- Don't change the colour of the label (use component defaults)
- Don't use multiple spinners in the same view simultaneously
- Don't use spinners for loading states longer than a few seconds (use Skeleton instead)
- Don't add spinners for operations that take less than 1 second

### Label content guidelines

- **Explain why**: It's more helpful to specify the reason for the wait rather than a vague "Loading..." message
- **Be specific**: "Payment processing..." provides clearer context than "Please wait..."
- **Keep it brief**: Labels should be concise and scannable

## CSS Custom Properties

```css
:root {
  /* Colours */
  --spinner-color-primary: #024DDF;
  --spinner-color-secondary: #646464;
  --spinner-color-inverse: #FFFFFF;
  --spinner-label-color: #121212;
  --spinner-label-color-inverse: #FFFFFF;

  /* Sizes */
  --spinner-size-lg: 72px;
  --spinner-size-md: 32px;
  --spinner-size-sm: 24px;

  /* Spacing */
  --spinner-label-gap: 16px;

  /* Animation */
  --spinner-animation-duration: 1s;
}

.loading-spinner {
  width: var(--spinner-size-lg);
  height: var(--spinner-size-lg);
  animation: spin var(--spinner-animation-duration) linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        spinner: {
          primary: '#024DDF',
          secondary: '#646464',
          inverse: '#FFFFFF',
        }
      },
      spacing: {
        'spinner-gap': '16px',
      },
      width: {
        'spinner-lg': '72px',
        'spinner-md': '32px',
        'spinner-sm': '24px',
      },
      height: {
        'spinner-lg': '72px',
        'spinner-md': '32px',
        'spinner-sm': '24px',
      },
      animation: {
        spin: 'spin 1s linear infinite',
      }
    }
  }
}
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Primary/Neptune | COLOR | #024DDF |
| Secondary/Granite | COLOR | #646464 |
| Secondary/Spotlight | COLOR | #FFFFFF |
| Secondary/Cosmos | COLOR | #121212 |
| Borders & Fills/Ammonite | COLOR | #D6D6D6 |

## Loading Spinner vs Skeleton

| Criteria | Loading Spinner | Skeleton |
|----------|-----------------|----------|
| Duration | Short and predictable | Longer loading states |
| Content structure | Unknown | Known |
| Use case | Authentication, form submission | Lists, cards, page layouts |

## Related Components

- [Skeleton](./skeleton.md) - For longer loading states where content structure is known
- [Button](./button.md) - Small spinner can be used within buttons during submission
- [Input Field](./input-field.md) - Small spinner can be used within input fields

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial release |
