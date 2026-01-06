---
name: Stepper
description: Unified documentation for Stepper component
audiences:
  - design
  - engineer
  - vibe
lastUpdated: '2026-01-06'
category: atoms
status: stable
figmaNodeId: '38852:5126'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
tokens:
  colours:
    primary:
      token: color.primary.neptune
      hex: '#024DDF'
    primaryDisabled:
      token: color.borders.diatomite
      hex: '#EBEBEB'
    secondary:
      token: color.primary.neptune
      hex: '#024DDF'
    secondaryDisabled:
      token: color.borders.moonrock
      hex: '#BFBFBF'
    text:
      token: color.secondary.cosmos
      hex: '#121212'
    textDisabled:
      token: color.borders.moonrock
      hex: '#BFBFBF'
    background:
      token: color.borders.lunar
      hex: '#F6F6F6'
    iconPrimary:
      token: color.secondary.spotlight
      hex: '#FFFFFF'
    iconSecondary:
      token: color.primary.neptune
      hex: '#024DDF'
    iconDisabled:
      token: color.borders.slate
      hex: '#949494'
  spacing:
    buttonPadding:
      token: space.xs
      value: 4px
    iconPadding:
      token: space.sm
      value: 14px
  typography:
    number: font.body.semibold
  elevation:
    - level: elevation-level-1
      value: '0px 1px 4px rgba(18, 18, 18, 0.15)'
  breakpoints: []
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-stepper--default'
sourceFile: components/Stepper/index.tsx
---
# Stepper

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Stepper |
| **Color Variants** | primary, primaryDisabled, secondary, secondaryDisabled, text, textDisabled, background, iconPrimary, iconSecondary, iconDisabled |
| **Package** | `@gds/components` |
| **Figma Node** | 38852:5126 |
| **Docs Available** | Design, Engineer, Vibe |


---

## Design Documentation

> Query mode: `@design stepper`

**A quantity stepper component used to increment or decrement numeric values within a given range. Steppers are easy-to-use tools that allow users to filter/refine their search or preferences by adjusting numerical selections.**

### Design Tokens

**Colors:**
- primary.token: color.primary.neptune
- primary.hex: #024DDF
- primaryDisabled.token: color.borders.diatomite
- primaryDisabled.hex: #EBEBEB
- secondary.token: color.primary.neptune
- secondary.hex: #024DDF
- secondaryDisabled.token: color.borders.moonrock
- secondaryDisabled.hex: #BFBFBF
- text.token: color.secondary.cosmos
- text.hex: #121212
- textDisabled.token: color.borders.moonrock
- textDisabled.hex: #BFBFBF
- background.token: color.borders.lunar
- background.hex: #F6F6F6
- iconPrimary.token: color.secondary.spotlight
- iconPrimary.hex: #FFFFFF
- iconSecondary.token: color.primary.neptune
- iconSecondary.hex: #024DDF
- iconDisabled.token: color.borders.slate
- iconDisabled.hex: #949494

**Spacing:**
- buttonPadding: [object Object]
- iconPadding: [object Object]

**Typography:**
- number: font.body.semibold

### Full Design Specification


# Stepper

## Overview

Steppers are frequently used to let users change a value within a given range. The current value is shown in the stepper's centre and can also be represented numerically. Steppers are easy-to-use tools that allow users to filter/refine their search or preferences by adjusting numerical selections.

### When to use

- Use when users need to select a quantity (e.g., number of tickets, items in cart)
- Ideal for bounded numeric inputs with a small range
- When quick increment/decrement actions are needed
- For selecting quantities where typing might be cumbersome

### When not to use

- Do not use for large numeric ranges (use Input Field instead)
- Do not use for non-sequential values
- Consider alternatives when precise values need to be entered quickly
- Do not use when the value range is unbounded

## Variants

| Variant | Description |
|---------|-------------|
| Primary | Solid filled plus/minus buttons with high visual emphasis. Plus button has filled Neptune background with white icon. |
| Secondary | Ghost-style plus/minus buttons with Neptune blue icons on transparent background. Lower visual weight. |

## States

| State | Description |
|-------|-------------|
| Default | Standard interactive state with both plus and minus buttons enabled |
| Lowest | Minimum value reached (0). Minus button becomes disabled, plus remains active |
| Maximum | Maximum value reached (e.g., 99). Plus button becomes disabled, minus remains active |
| Disabled | Non-interactive state. Both buttons and number display are grayed out |

### Base Button States

| State | Description |
|-------|-------------|
| Default | Resting state with standard colours |
| Hover | Interactive feedback when mouse hovers over button |
| Pressed | Active/clicked state with visual feedback |
| Disabled | Non-interactive, grayed out appearance |

## Properties

| Property | Values | Default |
|----------|--------|---------|
| type | primary, secondary | primary |
| state | default, lowest, maximum, disabled | default |
| value | number | 0 |
| min | number | 0 |
| max | number | 99 |

## Anatomy

| Part | Description |
|------|-------------|
| Minus Button | Decrements the value by 1 |
| Number Display | Shows the current quantity value |
| Plus Button | Increments the value by 1 |
| Container | Wrapper holding all stepper elements |

## Styling

### Typography

| Property | Value |
|----------|-------|
| Font | Averta Semibold |
| Size | 16px |
| Line Height | 24px |
| Letter Spacing | 0.32px |
| Text Align | Center |

### Spacing

| Area | Value |
|------|-------|
| Button size | 36px x 36px |
| Button padding | 4px 14px |
| Icon size | 20px x 20px |

### Colours

| Element | State | Token | Hex |
|---------|-------|-------|-----|
| Plus button (Primary) | Default | Neptune | #024DDF |
| Plus button (Primary) | Disabled | Diatomite | #EBEBEB |
| Plus icon (Primary) | Default | Spotlight | #FFFFFF |
| Plus icon (Primary) | Disabled | Slate | #949494 |
| Plus/Minus icon (Secondary) | Default | Neptune | #024DDF |
| Plus/Minus icon (Secondary) | Disabled | Moonrock | #BFBFBF |
| Number background | All | Lunar | #F6F6F6 |
| Number text | Default | Cosmos | #121212 |
| Number text | Disabled | Moonrock | #BFBFBF |

### Border Radius

| Element | Value |
|---------|-------|
| Number display | 4px |
| Primary button | 40px (fully rounded) |
| Secondary button | 32px (fully rounded) |

### Elevation

| Level | Value |
|-------|-------|
| Default | none |
| Hover (Primary) | elevation-level-1: 0px 1px 4px rgba(18, 18, 18, 0.15) |

## Accessibility

- **Keyboard navigation**: Use Tab to focus, Arrow Up/Down or +/- keys to adjust value
- **Screen readers**: Announces as spinbutton with current value, min, and max
- **ARIA attributes**: `role="spinbutton"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Focus indicators**: Visible focus ring meeting WCAG requirements
- **Touch targets**: 36px minimum touch target size for plus/minus buttons

## Do's and Don'ts

### Do's

- Always provide visual feedback for boundary states (lowest/maximum)
- Use clear min/max boundaries appropriate to the context
- Position descriptive text to the left of the stepper
- Ensure sufficient spacing between stepper and accompanying text

### Don'ts

- Do not change the "Primary" style to another style
- Do not change the colour of the number/value
- Do not add text into the input field
- Do not change the stepper sizes
- Do not add text to left of the component without proper spacing
- Do not change the orientation of the component

## CSS Custom Properties

```css
:root {
  --stepper-primary-bg: var(--color-primary-neptune);
  --stepper-primary-disabled-bg: var(--color-borders-diatomite);
  --stepper-secondary-icon: var(--color-primary-neptune);
  --stepper-secondary-disabled-icon: var(--color-borders-moonrock);
  --stepper-number-bg: var(--color-borders-lunar);
  --stepper-text-color: var(--color-secondary-cosmos);
  --stepper-text-disabled: var(--color-borders-moonrock);
  --stepper-size: 36px;
  --stepper-icon-size: 20px;
  --stepper-radius-number: 4px;
  --stepper-radius-primary: 40px;
  --stepper-radius-secondary: 32px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        stepper: {
          primary: '#024DDF',
          'primary-disabled': '#EBEBEB',
          'icon-primary': '#FFFFFF',
          'icon-secondary': '#024DDF',
          'icon-disabled': '#949494',
          'icon-secondary-disabled': '#BFBFBF',
          text: '#121212',
          'text-disabled': '#BFBFBF',
          background: '#F6F6F6',
        }
      },
      spacing: {
        'stepper-button': '36px',
        'stepper-icon': '20px',
      },
      borderRadius: {
        'stepper-number': '4px',
        'stepper-primary': '40px',
        'stepper-secondary': '32px',
      }
    }
  }
}
```

## Tailwind Utility Classes

```html
<!-- Primary Stepper -->
<div class="flex items-center gap-0">
  <!-- Minus Button (Primary) -->
  <button class="w-9 h-9 rounded-full flex items-center justify-center">
    <svg class="w-5 h-5 text-[#024DDF]"><!-- minus icon --></svg>
  </button>

  <!-- Number Display -->
  <div class="w-9 h-9 bg-[#F6F6F6] rounded flex items-center justify-center">
    <span class="font-semibold text-base text-[#121212] tracking-wide">1</span>
  </div>

  <!-- Plus Button (Primary) -->
  <button class="w-9 h-9 rounded-full bg-[#024DDF] flex items-center justify-center">
    <svg class="w-5 h-5 text-white"><!-- plus icon --></svg>
  </button>
</div>

<!-- Secondary Stepper -->
<div class="flex items-center gap-0">
  <button class="w-9 h-9 rounded-full flex items-center justify-center">
    <svg class="w-5 h-5 text-[#024DDF]"><!-- minus icon --></svg>
  </button>

  <div class="w-9 h-9 bg-[#F6F6F6] rounded flex items-center justify-center">
    <span class="font-semibold text-base text-[#121212] tracking-wide">1</span>
  </div>

  <button class="w-9 h-9 rounded-full flex items-center justify-center">
    <svg class="w-5 h-5 text-[#024DDF]"><!-- plus icon --></svg>
  </button>
</div>
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Primary/Neptune | COLOR | #024DDF |
| Secondary/Cosmos | COLOR | #121212 |
| Secondary/Spotlight | COLOR | #FFFFFF |
| Borders & Fills/Lunar | COLOR | #F6F6F6 |
| Borders & Fills/Moonrock | COLOR | #BFBFBF |
| Borders & Fills/Slate | COLOR | #949494 |
| Borders & Fills/Diatomite | COLOR | #EBEBEB |
| elevation-level-1 | EFFECT | 0px 1px 4px rgba(18, 18, 18, 0.15) |

## Related Components

- [Input Field](./input-field.md) - For direct numeric input
- [Button](./button.md) - Base button component
- [Circle Button](./circle-button.md) - Similar circular button style

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-06 | Initial release |

---

## Engineer Documentation

> Query mode: `@engineer stepper`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { Stepper } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-stepper--default)

### Source

`components/Stepper/index.tsx`

### Full Engineer Documentation

# Stepper

## Import

```tsx
import { Stepper } from '@gds/components';
```

## Basic Usage

```tsx
<Stepper>Content</Stepper>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `ariaLabel` | `string` | Yes | - |


## Variants

Available variants: `Basic`, `Secondary`, `DisabledPrimary`, `DisabledSecondary`, `Controlled`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-stepper--default)

## Source

`components/Stepper/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe stepper`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- Stepper Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<div class="p-4 rounded-lg">
  Stepper Content
</div>

<!-- States -->
<!-- Hover: Add hover: prefix to classes -->
<!-- Focus: Add focus: prefix to classes -->
<!-- Disabled: Add disabled:opacity-50 disabled:cursor-not-allowed -->

```


---

## Comparison: Design vs Code

| Aspect | Design (@design) | Code (@engineer) |
|--------|------------------|------------------|
| **Status** | stable | In Storybook |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `@gds/components` |
| **Figma Node** | 38852:5126 | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

