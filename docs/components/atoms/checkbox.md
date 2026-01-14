---
name: Checkbox
description: Checkbox component
category: components
status: draft
version: 1.0.0
updated: '2026-01-14'
tags:
  - components
  - variants
keywords:
  - checkbox
  - 'false'
  - default
  - 'true'
  - focused
  - hover
  - pressed
dependencies: []
relatedComponents: []
tokens:
  colours:
    - Spotlight
    - Mars
    - Diatomite
    - Moonrock
    - Slate
    - Cosmos
    - Neptune
  spacing: []
  typography: []
  elevation: []
  breakpoints: []
tailwind:
  colors:
    checkbox-1: Spotlight
    checkbox-2: Mars
    checkbox-3: Diatomite
    checkbox-4: Moonrock
    checkbox-5: Slate
    checkbox-6: Cosmos
    checkbox-7: Neptune
  spacing: {}
cssVariables:
  - name: '--checkbox-color-1'
    value: Spotlight
  - name: '--checkbox-color-2'
    value: Mars
  - name: '--checkbox-color-3'
    value: Diatomite
  - name: '--checkbox-color-4'
    value: Moonrock
  - name: '--checkbox-color-5'
    value: Slate
  - name: '--checkbox-color-6'
    value: Cosmos
  - name: '--checkbox-color-7'
    value: Neptune
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles: []
figmaNodeId: '21:28068'
figmaFileKey: null
---
<!-- Last synced with Figma: 2026-01-14 -->

# Checkbox

## Overview

Checkbox component

### When to use

- Use Checkbox when...

### When not to use

- Do not use Checkbox for...

## Variants

| Variant | Properties |
|---------|------------|
| isChecked=False, isIndeterminate=False, state=Default, isDisabled=False, Error=True | isChecked: False, isIndeterminate: False, state: Default, isDisabled: False, Error: True |
| isChecked=False, isIndeterminate=False, state=Focused, isDisabled=False, Error=True | isChecked: False, isIndeterminate: False, state: Focused, isDisabled: False, Error: True |
| isChecked=True, isIndeterminate=False, state=Default, isDisabled=True, Error=False | isChecked: True, isIndeterminate: False, state: Default, isDisabled: True, Error: False |
| isChecked=True, isIndeterminate=True, state=Default, isDisabled=True, Error=False | isChecked: True, isIndeterminate: True, state: Default, isDisabled: True, Error: False |
| isChecked=False, isIndeterminate=False, state=Default, isDisabled=True, Error=False | isChecked: False, isIndeterminate: False, state: Default, isDisabled: True, Error: False |
| isChecked=True, isIndeterminate=False, state=Hover, isDisabled=False, Error=False | isChecked: True, isIndeterminate: False, state: Hover, isDisabled: False, Error: False |
| isChecked=True, isIndeterminate=False, state=Focused, isDisabled=False, Error=False | isChecked: True, isIndeterminate: False, state: Focused, isDisabled: False, Error: False |
| isChecked=True, isIndeterminate=False, state=Default, isDisabled=False, Error=False | isChecked: True, isIndeterminate: False, state: Default, isDisabled: False, Error: False |
| isChecked=True, isIndeterminate=True, state=Default, isDisabled=False, Error=False | isChecked: True, isIndeterminate: True, state: Default, isDisabled: False, Error: False |
| isChecked=False, isIndeterminate=False, state=Hover, isDisabled=False, Error=False | isChecked: False, isIndeterminate: False, state: Hover, isDisabled: False, Error: False |
| isChecked=False, isIndeterminate=False, state=Focused, isDisabled=False, Error=False | isChecked: False, isIndeterminate: False, state: Focused, isDisabled: False, Error: False |
| isChecked=False, isIndeterminate=False, state=Pressed, isDisabled=False, Error=False | isChecked: False, isIndeterminate: False, state: Pressed, isDisabled: False, Error: False |
| isChecked=False, isIndeterminate=False, state=Default, isDisabled=False, Error=False | isChecked: False, isIndeterminate: False, state: Default, isDisabled: False, Error: False |

## States

| State | Description |
|-------|-------------|
| Default | Resting state |
| Focused | Focused state |
| Hover | Mouse over interaction |
| Pressed | Active/clicked state |

## Properties

| Property | Values | Default |
|----------|--------|---------|
| isChecked | False, True | False |
| isIndeterminate | False, True | False |
| state | Default, Focused, Hover, Pressed | Default |
| isDisabled | False, True | False |
| Error | True, False | True |

## Styling

### Colours

| State/Use | Token/Value |
|-----------|-------------|
| - | Spotlight |
| - | Mars |
| - | Diatomite |
| - | Moonrock |
| - | Slate |
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
  --checkbox-color-1: Spotlight;
  --checkbox-color-2: Mars;
  --checkbox-color-3: Diatomite;
  --checkbox-color-4: Moonrock;
  --checkbox-color-5: Slate;
  --checkbox-color-6: Cosmos;
  --checkbox-color-7: Neptune;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
          "colors": {
                "checkbox-1": "Spotlight",
                "checkbox-2": "Mars",
                "checkbox-3": "Diatomite",
                "checkbox-4": "Moonrock",
                "checkbox-5": "Slate",
                "checkbox-6": "Cosmos",
                "checkbox-7": "Neptune"
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
