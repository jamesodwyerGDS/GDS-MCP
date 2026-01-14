---
name: Divider
description: Divider component
category: components
status: draft
version: 1.0.0
updated: '2026-01-14'
tags:
  - components
  - variants
keywords:
  - divider
  - horizontal
  - vertical
dependencies: []
relatedComponents: []
tokens:
  colours:
    - Diatomite
  spacing: []
  typography: []
  elevation: []
  breakpoints: []
tailwind:
  colors:
    divider-1: Diatomite
  spacing: {}
cssVariables:
  - name: '--divider-color-1'
    value: Diatomite
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles: []
figmaNodeId: '16457:7846'
figmaFileKey: null
---
<!-- Last synced with Figma: 2026-01-14 -->

# Divider

## Overview

Divider component

### When to use

- Use Divider when...

### When not to use

- Do not use Divider for...

## Variants

| Variant | Properties |
|---------|------------|
| Direction=Horizontal | Direction: Horizontal |
| Direction=Vertical | Direction: Vertical |

## States

| State | Description |
|-------|-------------|


## Properties

| Property | Values | Default |
|----------|--------|---------|
| Direction | Horizontal, Vertical | Horizontal |

## Styling

### Colours

| State/Use | Token/Value |
|-----------|-------------|
| - | Diatomite |


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
  --divider-color-1: Diatomite;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
          "colors": {
                "divider-1": "Diatomite"
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
