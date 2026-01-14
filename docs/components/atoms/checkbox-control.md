---
name: CheckboxControl
description: _CheckboxControl component
category: components
status: draft
version: 1.0.0
updated: '2026-01-14'
tags:
  - components
  - variants
keywords:
  - checkboxcontrol
  - 'false'
  - 'true'
  - default
  - focused
  - hover
  - pressed
dependencies: []
relatedComponents: []
tokens:
  colours:
    - Diatomite
    - Slate
    - Moonrock
    - Spotlight
    - Mars
    - Neptune
    - Cosmos
  spacing: []
  typography: []
  elevation: []
  breakpoints: []
tailwind:
  colors:
    checkbox-control-1: Diatomite
    checkbox-control-2: Slate
    checkbox-control-3: Moonrock
    checkbox-control-4: Spotlight
    checkbox-control-5: Mars
    checkbox-control-6: Neptune
    checkbox-control-7: Cosmos
  spacing: {}
cssVariables:
  - name: '--checkbox-control-color-1'
    value: Diatomite
  - name: '--checkbox-control-color-2'
    value: Slate
  - name: '--checkbox-control-color-3'
    value: Moonrock
  - name: '--checkbox-control-color-4'
    value: Spotlight
  - name: '--checkbox-control-color-5'
    value: Mars
  - name: '--checkbox-control-color-6'
    value: Neptune
  - name: '--checkbox-control-color-7'
    value: Cosmos
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles: []
figmaNodeId: '41163:1815'
figmaFileKey: null
---
<!-- Last synced with Figma: 2026-01-14 -->

# CheckboxControl

## Overview

_CheckboxControl component

### When to use

- Use CheckboxControl when...

### When not to use

- Do not use CheckboxControl for...

## Variants

| Variant | Properties |
|---------|------------|
| Checked=False, IsIndeterminate=True, State=Default, IsDisabled=True, Error=False | Checked: False, IsIndeterminate: True, State: Default, IsDisabled: True, Error: False |
| Checked=True, IsIndeterminate=False, State=Default, IsDisabled=True, Error=False | Checked: True, IsIndeterminate: False, State: Default, IsDisabled: True, Error: False |
| Checked=False, IsIndeterminate=False, State=Default, IsDisabled=True, Error=False | Checked: False, IsIndeterminate: False, State: Default, IsDisabled: True, Error: False |
| Checked=False, IsIndeterminate=False, State=Focused, IsDisabled=False, Error=True | Checked: False, IsIndeterminate: False, State: Focused, IsDisabled: False, Error: True |
| Checked=False, IsIndeterminate=False, State=Default, IsDisabled=False, Error=True | Checked: False, IsIndeterminate: False, State: Default, IsDisabled: False, Error: True |
| Checked=False, IsIndeterminate=False, State=Hover, IsDisabled=False, Error=False | Checked: False, IsIndeterminate: False, State: Hover, IsDisabled: False, Error: False |
| Checked=False, IsIndeterminate=True, State=Default, IsDisabled=False, Error=False | Checked: False, IsIndeterminate: True, State: Default, IsDisabled: False, Error: False |
| Checked=True, IsIndeterminate=False, State=Focused, IsDisabled=False, Error=False | Checked: True, IsIndeterminate: False, State: Focused, IsDisabled: False, Error: False |
| Checked=True, IsIndeterminate=False, State=Hover, IsDisabled=False, Error=False | Checked: True, IsIndeterminate: False, State: Hover, IsDisabled: False, Error: False |
| Checked=True, IsIndeterminate=False, State=Default, IsDisabled=False, Error=False | Checked: True, IsIndeterminate: False, State: Default, IsDisabled: False, Error: False |
| Checked=False, IsIndeterminate=False, State=Focused, IsDisabled=False, Error=False | Checked: False, IsIndeterminate: False, State: Focused, IsDisabled: False, Error: False |
| Checked=False, IsIndeterminate=False, State=Default, IsDisabled=False, Error=False | Checked: False, IsIndeterminate: False, State: Default, IsDisabled: False, Error: False |
| Checked=False, IsIndeterminate=False, State=Pressed, IsDisabled=False, Error=False | Checked: False, IsIndeterminate: False, State: Pressed, IsDisabled: False, Error: False |

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
| Checked | False, True | False |
| IsIndeterminate | True, False | True |
| State | Default, Focused, Hover, Pressed | Default |
| IsDisabled | True, False | True |
| Error | False, True | False |

## Styling

### Colours

| State/Use | Token/Value |
|-----------|-------------|
| - | Diatomite |
| - | Slate |
| - | Moonrock |
| - | Spotlight |
| - | Mars |
| - | Neptune |
| - | Cosmos |


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
  --checkbox-control-color-1: Diatomite;
  --checkbox-control-color-2: Slate;
  --checkbox-control-color-3: Moonrock;
  --checkbox-control-color-4: Spotlight;
  --checkbox-control-color-5: Mars;
  --checkbox-control-color-6: Neptune;
  --checkbox-control-color-7: Cosmos;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
          "colors": {
                "checkbox-control-1": "Diatomite",
                "checkbox-control-2": "Slate",
                "checkbox-control-3": "Moonrock",
                "checkbox-control-4": "Spotlight",
                "checkbox-control-5": "Mars",
                "checkbox-control-6": "Neptune",
                "checkbox-control-7": "Cosmos"
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
