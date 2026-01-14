---
name: Double Range Input
description: >-
  A dual-handle slider component with min/max input fields for selecting a value
  range, commonly used for price filtering.
category: atoms
status: stable
version: 1.0.0
updated: '2026-01-14'
tags:
  - range
  - slider
  - input
  - filter
  - price
keywords:
  - double range input
  - range slider
  - price filter
  - min max selector
  - dual slider
dependencies:
  - Input Field
relatedComponents:
  - name: Input Field
    relationship: child
  - name: Slider
    relationship: child
tokens:
  colours:
    - primary
    - text
    - background
    - border
    - track
    - Unknown
    - Unknown-border
    - Spotlight
    - Slate
    - Diatomite
    - Moonrock
    - Mars
  spacing:
    inputWidth: 74px
    inputMaxWidth: 88px
    inputPaddingX: 16px
    inputHeight: 44px
    handleSize: 24px
    trackHeight: 4px
    gap: 8px
  typography:
    label: 'Averta Semibold 12px/20px, letter-spacing 0.24px, uppercase'
    inputText: 'Averta Regular 16px/24px, letter-spacing 0.32px'
    helperText: 'Averta Regular 14px/18px, letter-spacing 0.28px'
  borderRadius:
    input: 2px
    track: 2px
    handle: 22px
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - slider
    - spinbutton
figmaNodeId: '40968:916'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
---
<!-- Last synced with Figma: 2026-01-14 -->


# Double Range Input

A dual-handle slider component with min/max input fields for selecting a value range, commonly used for price filtering.

## Overview

The Double Range Input allows users to select a range of values using both a visual slider with two handles and direct text input fields. It's commonly used for filtering content by price, quantity, or other numeric ranges. The component provides visual feedback through the active track segment between the two handles.

### When to use

- Use for filtering content by price ranges (e.g., ticket prices)
- Use when users need to set minimum and maximum bounds
- Use when visual representation of the range is helpful
- Ideal for e-commerce filters and search refinement

### When not to use

- Do not use for selecting a single value (use standard slider instead)
- Do not use for non-numeric selections
- Do not use when the range doesn't have clear min/max bounds
- Consider alternatives for very large value ranges where precision is critical

## Variants

| Variant | Description |
|---------|-------------|
| Default | Standard double range input with min/max fields |
| Disabled | Non-interactive state for read-only display |
| Error | Shows validation error on min or max value |

## Anatomy

```
┌──────────────────────────────────────────────────────────────────┐
│                    LABEL (UPPERCASE)                              │
├──────────────────────────────────────────────────────────────────┤
│  ┌────────┐     ○─────────────────────○     ┌────────┐           │
│  │  £60   │     │███████████████████████    │  £300  │           │
│  └────────┘     ○─────────────────────○     └────────┘           │
│   Minimum         Handle   Track   Handle      Maximum           │
│                                                                   │
│  Min Value Input                            Max Value Input       │
└──────────────────────────────────────────────────────────────────┘
```

### Parts

| Part | Description | Required |
|------|-------------|----------|
| Label | Descriptive text above the component | Yes |
| Min Value Input | Text field for minimum value entry | Yes |
| Max Value Input | Text field for maximum value entry | Yes |
| Handle (x2) | Draggable circular controls on track | Yes |
| Track | Visual bar showing range (active and inactive segments) | Yes |
| Helper Label | "Minimum"/"Maximum" labels below inputs | Yes |
| Error Message | Validation error text below input | No |

## States

| State | Description | Visual |
|-------|-------------|--------|
| Default | Resting state, interactive | Black handles with white fill, gray inactive track |
| Disabled | Non-interactive state | Gray handles (#BFBFBF), grayed inputs |
| Active - Min | Min handle or input is focused | Blue focus ring on min input |
| Active - Max | Max handle or input is focused | Blue focus ring on max input |
| Error - Min | Validation error on minimum value | Red border on min input, error message below |
| Error - Max | Validation error on maximum value | Red border on max input, error message below |

## Properties

### Double Range Input

| Property | Description | Type | Values | Default |
|----------|-------------|------|--------|---------|
| `isDisabled` | Disables the entire component | `boolean` | `true`, `false` | `false` |
| `showMinError` | Shows error state on min value | `boolean` | `true`, `false` | `false` |
| `showMaxError` | Shows error state on max value | `boolean` | `true`, `false` | `false` |
| `errorLabel` | Error message text | `string` | - | - |

### Input Min/Max Value

| Property | Description | Type | Values | Default |
|----------|-------------|------|--------|---------|
| `state` | Current state of input | `variant` | `Default`, `Hover`, `Focused/Active` | `Default` |
| `isDisabled` | Disables the input field | `boolean` | `true`, `false` | `false` |
| `error` | Shows error styling | `boolean` | `true`, `false` | `false` |
| `price` | Value displayed in input | `string` | - | - |

## Styling

### Typography

| Element | Font | Size | Line Height | Letter Spacing | Weight | Transform |
|---------|------|------|-------------|----------------|--------|-----------|
| Label | Averta | 12px | 20px | 0.24px | Semibold (600) | Uppercase |
| Input Value | Averta | 16px | 24px | 0.32px | Regular (400) | None |
| Helper Label | Averta | 14px | 18px | 0.28px | Regular (400) | None |
| Error Message | Averta | 14px | 18px | 0.28px | Regular (400) | None |

### Spacing

| Area | Value |
|------|-------|
| Input field width | 74px (max: 88px) |
| Input field height | 44px |
| Input horizontal padding | 16px |
| Handle size | 24 x 24px |
| Track height | 4px |
| Gap between inputs and slider | 8px |
| Gap between input and helper label | 4px |

### Colors

| Element | State | Color | Hex |
|---------|-------|-------|-----|
| Label text | Default | Granite | #646464 |
| Input text | Default | Cosmos | #121212 |
| Input border | Default | Slate | #949494 |
| Input border | Error | Error Red | #D92D20 |
| Input background | Default | Spotlight | #FFFFFF |
| Input background | Disabled | - | #EBEBEB |
| Handle fill | Default | Spotlight | #FFFFFF |
| Handle border | Default | Cosmos | #121212 |
| Handle fill | Disabled | - | #EBEBEB |
| Handle border | Disabled | Moonrock | #BFBFBF |
| Track - inactive | Default | Slate | #949494 |
| Track - active | Default | Cosmos | #121212 |
| Helper text | Default | Granite | #646464 |
| Error text | Error | Error Red | #D92D20 |

## Accessibility

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move focus between inputs and handles |
| Arrow Left/Down | Decrease value (when handle focused) |
| Arrow Right/Up | Increase value (when handle focused) |
| Home | Set to minimum allowed value |
| End | Set to maximum allowed value |
| Enter | Confirm value in input field |

### ARIA Attributes

```html
<div role="group" aria-labelledby="range-label">
  <label id="range-label">PRICE (PER TICKET)</label>
  <input type="text" role="spinbutton" aria-label="Minimum price" aria-valuemin="0" aria-valuemax="1000" />
  <div role="slider" aria-valuemin="0" aria-valuemax="1000" aria-valuenow="60" aria-label="Minimum price handle"></div>
  <div role="slider" aria-valuemin="0" aria-valuemax="1000" aria-valuenow="300" aria-label="Maximum price handle"></div>
  <input type="text" role="spinbutton" aria-label="Maximum price" aria-valuemin="0" aria-valuemax="1000" />
</div>
```

### Screen Reader Considerations

- Announce label and current values when focused
- Announce value changes during interaction
- Announce error states with `aria-invalid` and `aria-describedby`
- Ensure min/max relationship is communicated

## Do's and Don'ts

### Do's

- Use clear, descriptive labels (e.g., "PRICE (PER TICKET)")
- Validate that min value doesn't exceed max value
- Provide helpful error messages when validation fails
- Show currency or unit symbols in input values
- Update slider position when input values change
- Update input values when slider handles are dragged

### Don'ts

- Don't allow min value to exceed max value
- Don't use for very small ranges where a dropdown would be clearer
- Don't hide the helper labels ("Minimum"/"Maximum")
- Don't use vague error messages
- Don't disable without providing alternative information

## CSS Custom Properties

```css
:root {
  /* Double Range Input Colors */
  --range-input-text: var(--color-cosmos);
  --range-input-text-secondary: var(--color-granite);
  --range-input-text-disabled: var(--color-slate);
  --range-input-bg: var(--color-spotlight);
  --range-input-border: var(--color-slate);
  --range-input-border-error: #D92D20;

  --range-handle-bg: var(--color-spotlight);
  --range-handle-border: var(--color-cosmos);
  --range-track-inactive: var(--color-slate);
  --range-track-active: var(--color-cosmos);

  /* Double Range Input Spacing */
  --range-input-width: 74px;
  --range-input-height: 44px;
  --range-input-padding-x: 16px;
  --range-handle-size: 24px;
  --range-track-height: 4px;

  /* Double Range Input Shape */
  --range-input-radius: 2px;
  --range-track-radius: 2px;
  --range-handle-radius: 22px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js (double range input specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        'range-input': {
          text: '#121212',
          'text-secondary': '#646464',
          'text-disabled': '#949494',
          border: '#949494',
          'border-error': '#D92D20',
        },
        'range-track': {
          inactive: '#949494',
          active: '#121212',
        },
        'range-handle': {
          bg: '#FFFFFF',
          border: '#121212',
        }
      },
      spacing: {
        'range-input-w': '74px',
        'range-input-h': '44px',
        'range-handle': '24px',
        'range-track-h': '4px',
      },
      borderRadius: {
        'range-input': '2px',
        'range-track': '2px',
        'range-handle': '22px',
      }
    }
  }
}
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Primary/Neptune | COLOR | #024DDF |
| Secondary/Cosmos | COLOR | #121212 |
| Secondary/Granite | COLOR | #646464 |
| Secondary/Spotlight | COLOR | #FFFFFF |
| Borders & Fills/Slate | COLOR | #949494 |
| Borders & Fills/Moonrock | COLOR | #BFBFBF |
| Borders & Fills/Ammonite | COLOR | #D6D6D6 |

## Related Components

- [Input Field](../atoms/input-field.md) - Used for min/max value entry
- [Slider](../atoms/slider.md) - Single value slider component
- [Button](../atoms/button.md) - Used in filter panels alongside range inputs

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-06 | Initial release |
