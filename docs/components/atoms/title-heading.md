---
name: Title Heading
description: "Title Heading \U0001F7E2 component"
category: components
status: draft
version: 1.0.0
updated: '2026-01-14'
tags:
  - components
  - variants
keywords:
  - title heading
  - desktop
  - xlarge
  - mobile
  - large
  - medium
  - small
  - xsmall
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
    title-heading-1: Neptune
  spacing: {}
cssVariables:
  - name: '--title-heading-color-1'
    value: Neptune
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles: []
figmaNodeId: '7999:16977'
figmaFileKey: null
---
<!-- Last synced with Figma: 2026-01-14 -->

# Title Heading

## Overview

Title Heading 🟢 component

### When to use

- Use Title Heading when...

### When not to use

- Do not use Title Heading for...

## Variants

| Variant | Properties |
|---------|------------|
| Device=Desktop, Size=xLarge | Device: Desktop, Size: xLarge |
| Device=Mobile, Size=xLarge | Device: Mobile, Size: xLarge |
| Device=Desktop, Size=Large | Device: Desktop, Size: Large |
| Device=Mobile, Size=Large | Device: Mobile, Size: Large |
| Device=Desktop, Size=Medium | Device: Desktop, Size: Medium |
| Device=Mobile, Size=Medium | Device: Mobile, Size: Medium |
| Device=Desktop, Size=Small | Device: Desktop, Size: Small |
| Device=Mobile, Size=Small | Device: Mobile, Size: Small |
| Device=Desktop, Size=xSmall | Device: Desktop, Size: xSmall |
| Device=Mobile, Size=xSmall | Device: Mobile, Size: xSmall |

## States

| State | Description |
|-------|-------------|


## Properties

| Property | Values | Default |
|----------|--------|---------|
| Device | Desktop, Mobile | Desktop |
| Size | xLarge, Large, Medium, Small, xSmall | xLarge |

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
  --title-heading-color-1: Neptune;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
          "colors": {
                "title-heading-1": "Neptune"
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
