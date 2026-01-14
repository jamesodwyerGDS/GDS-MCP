---
name: Base Loading spinner
description: _Base Loading spinner component
category: components
status: draft
version: 1.0.0
updated: '2026-01-14'
tags:
  - components
  - variants
keywords:
  - base loading spinner
  - variant 1
  - variant2
  - variant3
  - variant4
dependencies: []
relatedComponents: []
tokens:
  colours:
    - Neptune
  spacing: []
  typography: []
  elevation: []
  breakpoints: []
tailwind:
  colors:
    base-loading-spinner-1: Neptune
  spacing: {}
cssVariables:
  - name: '--base-loading-spinner-color-1'
    value: Neptune
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles: []
figmaNodeId: '33145:3725'
figmaFileKey: null
---
<!-- Last synced with Figma: 2026-01-14 -->

# Base Loading spinner

## Overview

_Base Loading spinner component

### When to use

- Use Base Loading spinner when...

### When not to use

- Do not use Base Loading spinner for...

## Variants

| Variant | Properties |
|---------|------------|
| Property 1=Variant 1 | Property 1: Variant 1 |
| Property 1=Variant2 | Property 1: Variant2 |
| Property 1=Variant3 | Property 1: Variant3 |
| Property 1=Variant4 | Property 1: Variant4 |

## States

| State | Description |
|-------|-------------|


## Properties

| Property | Values | Default |
|----------|--------|---------|
| Property 1 | Variant 1, Variant2, Variant3, Variant4 | Variant 1 |

## Styling

### Colours

| State/Use | Token/Value |
|-----------|-------------|
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
  --base-loading-spinner-color-1: Neptune;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
          "colors": {
                "base-loading-spinner-1": "Neptune"
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
