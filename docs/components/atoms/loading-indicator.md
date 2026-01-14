---
name: Loading Indicator
description: Loading Indicator component
category: components
status: draft
version: 1.0.0
updated: '2026-01-14'
tags:
  - components
  - variants
keywords:
  - loading indicator
  - large color
  - 'yes'
  - medium color
  - 'no'
  - medium dark
  - medium white
  - tiny (in button)
dependencies: []
relatedComponents: []
tokens:
  colours: []
  spacing: []
  typography: []
  elevation: []
  breakpoints: []
tailwind:
  colors: {}
  spacing: {}
cssVariables: []
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles: []
figmaNodeId: '13747:13537'
figmaFileKey: null
---
<!-- Last synced with Figma: 2026-01-14 -->

# Loading Indicator

## Overview

Loading Indicator component

### When to use

- Use Loading Indicator when...

### When not to use

- Do not use Loading Indicator for...

## Variants

| Variant | Properties |
|---------|------------|
| Size=Large Color, Label=Yes | Size: Large Color, Label: Yes |
| Size=Medium Color, Label=Yes | Size: Medium Color, Label: Yes |
| Size=Medium Color, Label=No | Size: Medium Color, Label: No |
| Size=Medium Dark, Label=Yes | Size: Medium Dark, Label: Yes |
| Size=Medium Dark, Label=No | Size: Medium Dark, Label: No |
| Size=Medium White, Label=Yes | Size: Medium White, Label: Yes |
| Size=Medium White, Label=No | Size: Medium White, Label: No |
| Size=Large Color, Label=No | Size: Large Color, Label: No |
| Size=Tiny (In Button), Label=No | Size: Tiny (In Button), Label: No |

## States

| State | Description |
|-------|-------------|


## Properties

| Property | Values | Default |
|----------|--------|---------|
| Size | Large Color, Medium Color, Medium Dark, Medium White, Tiny (In Button) | Large Color |
| Label | Yes, No | Yes |

## Styling


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
  /* No custom properties defined */
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
          "colors": {},
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
