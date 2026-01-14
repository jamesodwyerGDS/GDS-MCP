---
name: Toggler BarBlock
description: .Toggler Bar/Block component
category: components
status: draft
version: 1.0.0
updated: '2026-01-14'
tags:
  - components
  - variants
keywords:
  - toggler barblock
  - left
  - unselected
  - disabled
  - middle
  - right
  - hover
  - pressed
  - selected
  - selected hover
dependencies: []
relatedComponents: []
tokens:
  colours:
    - Cosmos
    - Diatomite
    - Moonrock
    - Neptune
  spacing: []
  typography: []
  elevation: []
  breakpoints: []
tailwind:
  colors:
    toggler-bar-block-1: Cosmos
    toggler-bar-block-2: Diatomite
    toggler-bar-block-3: Moonrock
    toggler-bar-block-4: Neptune
  spacing: {}
cssVariables:
  - name: '--toggler-bar-block-color-1'
    value: Cosmos
  - name: '--toggler-bar-block-color-2'
    value: Diatomite
  - name: '--toggler-bar-block-color-3'
    value: Moonrock
  - name: '--toggler-bar-block-color-4'
    value: Neptune
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles: []
figmaNodeId: '30:20751'
figmaFileKey: null
---
<!-- Last synced with Figma: 2026-01-14 -->

# Toggler BarBlock

## Overview

.Toggler Bar/Block component

### When to use

- Use Toggler BarBlock when...

### When not to use

- Do not use Toggler BarBlock for...

## Variants

| Variant | Properties |
|---------|------------|
| Type=Left, State=Unselected | Type: Left, State: Unselected |
| Type=Left, State=Disabled | Type: Left, State: Disabled |
| Type=Middle, State=Unselected | Type: Middle, State: Unselected |
| Type=Right, State=Unselected | Type: Right, State: Unselected |
| Type=Right, State=Hover | Type: Right, State: Hover |
| Type=Right, State=Pressed | Type: Right, State: Pressed |
| Type=Middle, State=Selected | Type: Middle, State: Selected |
| Type=Middle, State=Selected Hover | Type: Middle, State: Selected Hover |
| Type=Right, State=Selected | Type: Right, State: Selected |
| Type=Right, State=Selected Hover | Type: Right, State: Selected Hover |
| Type=Middle, State=Disabled | Type: Middle, State: Disabled |
| Type=Right, State=Disabled | Type: Right, State: Disabled |
| Type=Left, State=Hover | Type: Left, State: Hover |
| Type=Left, State=Pressed | Type: Left, State: Pressed |
| Type=Left, State=Selected | Type: Left, State: Selected |
| Type=Left, State=Selected Hover | Type: Left, State: Selected Hover |
| Type=Middle, State=Hover | Type: Middle, State: Hover |
| Type=Middle, State=Pressed | Type: Middle, State: Pressed |

## States

| State | Description |
|-------|-------------|
| Unselected | Unselected state |
| Disabled | Non-interactive state |
| Hover | Mouse over interaction |
| Pressed | Active/clicked state |
| Selected | Selected state |
| Selected Hover | Selected Hover state |

## Properties

| Property | Values | Default |
|----------|--------|---------|
| Type | Left, Middle, Right | Left |
| State | Unselected, Disabled, Hover, Pressed, Selected, Selected Hover | Unselected |

## Styling

### Colours

| State/Use | Token/Value |
|-----------|-------------|
| - | Cosmos |
| - | Diatomite |
| - | Moonrock |
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
  --toggler-bar-block-color-1: Cosmos;
  --toggler-bar-block-color-2: Diatomite;
  --toggler-bar-block-color-3: Moonrock;
  --toggler-bar-block-color-4: Neptune;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
          "colors": {
                "toggler-bar-block-1": "Cosmos",
                "toggler-bar-block-2": "Diatomite",
                "toggler-bar-block-3": "Moonrock",
                "toggler-bar-block-4": "Neptune"
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
