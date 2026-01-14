---
name: DeprecatedDouble range input
description: ❌ .Deprecated_Double range input component
category: atoms
status: draft
version: 1.0.0
updated: '2026-01-14'
tags:
  - atoms
  - variants
keywords:
  - deprecateddouble range input
  - default
  - handles moved
  - disabled
dependencies: []
relatedComponents: []
tokens:
  colours:
    - Spotlight
    - Slate
    - Diatomite
    - Moonrock
  spacing: []
  typography: []
  elevation: []
  breakpoints: []
tailwind:
  colors:
    deprecated-double-range-input-1: Spotlight
    deprecated-double-range-input-2: Slate
    deprecated-double-range-input-3: Diatomite
    deprecated-double-range-input-4: Moonrock
  spacing: {}
cssVariables:
  - name: '--deprecated-double-range-input-color-1'
    value: Spotlight
  - name: '--deprecated-double-range-input-color-2'
    value: Slate
  - name: '--deprecated-double-range-input-color-3'
    value: Diatomite
  - name: '--deprecated-double-range-input-color-4'
    value: Moonrock
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - textbox
figmaNodeId: '25:17137'
figmaFileKey: null
---
<!-- Last synced with Figma: 2026-01-14 -->

# DeprecatedDouble range input

## Overview

❌ .Deprecated_Double range input component

### When to use

- Use DeprecatedDouble range input when...

### When not to use

- Do not use DeprecatedDouble range input for...

## Variants

| Variant | Properties |
|---------|------------|
| State=Default | State: Default |
| State=Handles Moved | State: Handles Moved |
| State=Disabled | State: Disabled |

## States

| State | Description |
|-------|-------------|
| Default | Resting state |
| Handles Moved | Handles Moved state |
| Disabled | Non-interactive state |

## Properties

| Property | Values | Default |
|----------|--------|---------|
| State | Default, Handles Moved, Disabled | Default |

## Styling

### Colours

| State/Use | Token/Value |
|-----------|-------------|
| - | Spotlight |
| - | Slate |
| - | Diatomite |
| - | Moonrock |


## Accessibility

- **Keyboard navigation**: Fully keyboard accessible
- **Screen readers**: Proper ARIA labels and roles
- **Focus management**: Visible focus indicators
- **Color contrast**: Meets WCAG 2.1 AA requirements

## Do's and Don'ts

### Do's



### Don'ts



## CSS Custom Properties

```css
:root {
  --deprecated-double-range-input-color-1: Spotlight;
  --deprecated-double-range-input-color-2: Slate;
  --deprecated-double-range-input-color-3: Diatomite;
  --deprecated-double-range-input-color-4: Moonrock;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
          "colors": {
                "deprecated-double-range-input-1": "Spotlight",
                "deprecated-double-range-input-2": "Slate",
                "deprecated-double-range-input-3": "Diatomite",
                "deprecated-double-range-input-4": "Moonrock"
          },
          "spacing": {}
    }
  }
}
```

## Figma Variables

_Variables extracted from Figma file. Run generation with `--sync-variables` to update._

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-14 | Initial release |
