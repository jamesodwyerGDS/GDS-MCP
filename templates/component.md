---
name: "ComponentName"
description: "Brief description of the component and its purpose"
category: "atoms"              # atoms | molecules | organisms
status: "draft"                # draft | beta | stable | deprecated
version: "1.0.0"
updated: "YYYY-MM-DD"

tags: []
keywords: []

dependencies: []
relatedComponents: []

tokens:
  colours: []
  spacing: []
  typography: []
  elevation: []
  breakpoints: []

tailwind: {}

cssVariables: []

accessibility:
  wcagLevel: "AA"
  keyboardNavigable: true
  ariaRoles: []

figmaNodeId: null
figmaFileKey: null
---

# ComponentName

## Overview

{Component description from Figma}

### When to use

- {Use case 1}
- {Use case 2}

### When not to use

- {Anti-pattern 1}
- {Anti-pattern 2}

## Variants

| Variant | Description |
|---------|-------------|
| {Variant name} | {Variant description} |

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
| {Property name} | {Possible values} | {Default value} |

## Styling

### Typography

| Property | Value |
|----------|-------|
| Font | {Font family from Figma} |
| Size | {Font size from Figma} |
| Line Height | {Line height from Figma} |
| Letter Spacing | {Letter spacing from Figma} |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| {Spacing area} | {Token name} | {Value from Figma} |

### Colours

| State | Token | Hex |
|-------|-------|-----|
| {State name} | {Token name} | {Hex from Figma} |

### Border Radius

{Border radius value from Figma, if applicable}

### Elevation

| Level | Value |
|-------|-------|
| {Level name} | {Shadow value from Figma} |

## Accessibility

- **Keyboard navigation**: {Keyboard interaction details}
- **Screen readers**: {ARIA and screen reader considerations}
- **Focus indicators**: {Focus state details}
- **Color contrast**: {Contrast ratio compliance}

## Do's and Don'ts

### Do's

- {Best practice 1}
- {Best practice 2}

### Don'ts

- {Anti-pattern 1}
- {Anti-pattern 2}

## CSS Custom Properties

```css
:root {
  /* Generated from Figma tokens */
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      /* Generated from Figma tokens */
    }
  }
}
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| {Variable name} | {Type} | {Value from Figma} |

## Related Components

- {Related component links}

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | YYYY-MM-DD | Initial release |
