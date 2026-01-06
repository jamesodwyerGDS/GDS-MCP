---
name: "ComponentName"
description: "Brief description of the component and its purpose"
category: "atoms"              # atoms | molecules | organisms
status: "draft"                # draft | beta | stable | deprecated
version: "1.0.0"
updated: "2025-01-06"

tags: ["form", "interaction"]
keywords: ["click", "submit", "action"]

dependencies: []
relatedComponents:
  - name: "RelatedComponent"
    relationship: "alternative"  # alternative | variant | parent | child

tokens:
  colours:
    primary: { token: "color.action.primary", hex: "#024DDF" }
    hover: { token: "color.action.primary.hover", hex: "#0141B8" }
  spacing:
    paddingX: { token: "space.auditorium", value: "16px" }
    paddingY: { token: "space.club", value: "8px" }
  typography:
    label: "font.body.medium"
  elevation: []
  breakpoints: []

tailwind:
  colors:
    component-primary: "#024DDF"
    component-hover: "#0141B8"
  spacing:
    component-px: "16px"
    component-py: "8px"

cssVariables:
  - name: "--component-bg"
    value: "var(--color-action-primary)"
  - name: "--component-padding-x"
    value: "var(--space-auditorium)"

accessibility:
  wcagLevel: "AA"
  keyboardNavigable: true
  ariaRoles: ["button"]

figmaNodeId: null
figmaFileKey: null
---

# ComponentName

## Overview

Brief description of the component's purpose and primary use cases. This component is used when users need to...

### When to use

- Use this component when...
- Ideal for scenarios involving...

### When not to use

- Do not use for...
- Consider alternatives when...

## Variants

| Variant | Description |
|---------|-------------|
| Primary | Main action, high emphasis |
| Secondary | Supporting action, medium emphasis |
| Tertiary | Low emphasis action |

## States

| State | Description |
|-------|-------------|
| Default | Resting state |
| Hover | Mouse over, interactive feedback |
| Pressed | Active/clicked state |
| Disabled | Non-interactive, grayed out |
| Focus | Keyboard focus with visible ring |

## Properties

| Property | Values | Default |
|----------|--------|---------|
| variant | primary, secondary, tertiary | primary |
| size | small, medium, large | medium |

## Styling

### Typography

| Property | Value |
|----------|-------|
| Font | Averta Semibold |
| Size | 16px |
| Line Height | 24px |
| Letter Spacing | 0.32px |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| Horizontal padding | Auditorium | 16px |
| Vertical padding | Club | 8px |

### Colours

| State | Token | Hex |
|-------|-------|-----|
| Primary default | Neptune | #024DDF |
| Primary hover | Neptune Dark | #0141B8 |

### Elevation

| Level | Value |
|-------|-------|
| Default | none |
| Hover | shadow-sm |

## Accessibility

- **Keyboard navigation**: Fully accessible via Tab and Enter/Space keys
- **Screen readers**: Includes proper ARIA labels and announcements
- **Focus indicators**: Visible focus ring meeting WCAG requirements
- **Color contrast**: All variants meet 4.5:1 contrast ratio

## Do's and Don'ts

### Do's

- Use primary variant for the main action in a view
- Maintain consistent sizing within a context
- Include clear, action-oriented labels

### Don'ts

- Do not use multiple primary actions in the same view
- Do not use for navigation (use Link instead)
- Do not override the component's built-in accessibility features

## CSS Custom Properties

```css
:root {
  --component-bg: var(--color-action-primary);
  --component-hover: #0141B8;
  --component-padding-x: var(--space-auditorium);
  --component-padding-y: var(--space-club);
  --component-radius: 8px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        component: {
          primary: '#024DDF',
          'primary-hover': '#0141B8',
        }
      },
      spacing: {
        'component-px': '16px',
        'component-py': '8px'
      }
    }
  }
}
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| color.action.primary | COLOR | #024DDF |
| space.auditorium | NUMBER | 16 |

## Related Components

- [Link](./link.md) - For navigation actions
- [IconButton](./icon-button.md) - For icon-only actions

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial release |
