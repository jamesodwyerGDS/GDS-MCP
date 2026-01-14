---
name: Base Field
description: _Base Field component
category: components
status: draft
version: 1.0.0
updated: '2026-01-14'
tags:
  - components
  - variants
keywords:
  - base field
  - default
  - hover
  - active
  - disabled
  - error
dependencies: []
relatedComponents: []
tokens:
  colours:
    - Spotlight
    - Slate
    - Neptune
    - Diatomite
    - Moonrock
    - Mars
  spacing: []
  typography: []
  elevation: []
  breakpoints: []
tailwind:
  colors:
    base-field-1: Spotlight
    base-field-2: Slate
    base-field-3: Neptune
    base-field-4: Diatomite
    base-field-5: Moonrock
    base-field-6: Mars
  spacing: {}
cssVariables:
  - name: '--base-field-color-1'
    value: Spotlight
  - name: '--base-field-color-2'
    value: Slate
  - name: '--base-field-color-3'
    value: Neptune
  - name: '--base-field-color-4'
    value: Diatomite
  - name: '--base-field-color-5'
    value: Moonrock
  - name: '--base-field-color-6'
    value: Mars
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles: []
figmaNodeId: '7036:59208'
figmaFileKey: null
---
<!-- Last synced with Figma: 2026-01-14 -->

# Base Field

## Overview

_Base Field component

### When to use

- Use Base Field when...

### When not to use

- Do not use Base Field for...

## Variants

| Variant | Properties |
|---------|------------|
| State=Default | State: Default |
| State=Hover | State: Hover |
| State=Active | State: Active |
| State=Disabled | State: Disabled |
| State=Error | State: Error |

## States

| State | Description |
|-------|-------------|
| Default | Resting state |
| Hover | Mouse over interaction |
| Active | Currently active/selected |
| Disabled | Non-interactive state |
| Error | Error or invalid state |

## Properties

| Property | Values | Default |
|----------|--------|---------|
| State | Default, Hover, Active, Disabled, Error | Default |

## Styling

### Colours

| State/Use | Token/Value |
|-----------|-------------|
| - | Spotlight |
| - | Slate |
| - | Neptune |
| - | Diatomite |
| - | Moonrock |
| - | Mars |


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
  --base-field-color-1: Spotlight;
  --base-field-color-2: Slate;
  --base-field-color-3: Neptune;
  --base-field-color-4: Diatomite;
  --base-field-color-5: Moonrock;
  --base-field-color-6: Mars;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
          "colors": {
                "base-field-1": "Spotlight",
                "base-field-2": "Slate",
                "base-field-3": "Neptune",
                "base-field-4": "Diatomite",
                "base-field-5": "Moonrock",
                "base-field-6": "Mars"
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
