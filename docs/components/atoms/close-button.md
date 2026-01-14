---
name: Close button
description: _Close button component
category: atoms
status: draft
version: 1.0.0
updated: '2026-01-14'
tags:
  - atoms
  - variants
keywords:
  - close button
  - on image
  - light
dependencies: []
relatedComponents: []
tokens:
  colours:
    - Cosmos
    - Neptune
  spacing: []
  typography: []
  elevation: []
  breakpoints: []
tailwind:
  colors:
    close-button-1: Cosmos
    close-button-2: Neptune
  spacing: {}
cssVariables:
  - name: '--close-button-color-1'
    value: Cosmos
  - name: '--close-button-color-2'
    value: Neptune
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - button
figmaNodeId: '25356:4317'
figmaFileKey: null
---
<!-- Last synced with Figma: 2026-01-14 -->

# Close button

## Overview

_Close button component

### When to use

- Use Close button when...

### When not to use

- Do not use Close button for...

## Variants

| Variant | Properties |
|---------|------------|
| Appearance=On image | Appearance: On image |
| Appearance=Light | Appearance: Light |

## States

| State | Description |
|-------|-------------|


## Properties

| Property | Values | Default |
|----------|--------|---------|
| Appearance | On image, Light | On image |

## Styling

### Colours

| State/Use | Token/Value |
|-----------|-------------|
| - | Cosmos |
| - | Neptune |


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
  --close-button-color-1: Cosmos;
  --close-button-color-2: Neptune;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
          "colors": {
                "close-button-1": "Cosmos",
                "close-button-2": "Neptune"
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
