---
name: Radio Button
description: >-
  Radio buttons allow users to select one option from a group of mutually
  exclusive choices
category: atoms
status: stable
version: 1.0.0
updated: '2026-01-14'
tags:
  - form
  - selection
  - input
keywords:
  - select
  - form
  - box
  - circle
  - choice
  - option
  - mutually exclusive
dependencies: []
relatedComponents:
  - name: Checkbox
    relationship: alternative
  - name: Dropdown
    relationship: alternative
  - name: Input Field
    relationship: parent
tokens:
  colours:
    - default-border
    - default-bg
    - hover-border
    - active-fill
    - active-hover-base
    - active-hover-overlay
    - disabled-bg
    - disabled-border
    - disabled-text
    - error-border
    - label-text
    - inner-dot
    - Default
    - Default-border
    - Active Hover
    - Active
    - Disabled
    - Disabled-border
    - Disabled Selected
    - Disabled Selected-border
    - Error
    - Error-border
    - Hover
    - Hover-border
    - Spotlight
    - Slate
    - Diatomite
    - Moonrock
    - Mars
    - Neptune
  spacing:
    radioSize:
      token: space.radio
      value: 24px
    innerDotActive:
      token: space.inner-dot-active
      value: 12px
    innerDotDefault:
      token: space.inner-dot-default
      value: 6px
    gap:
      token: space.club
      value: 12px
  typography:
    label: font.body.rainier
  elevation: []
  breakpoints: []
tailwind:
  colors:
    radio-border-default: '#949494'
    radio-border-hover: '#024DDF'
    radio-fill-active: '#121212'
    radio-fill-disabled: '#EBEBEB'
    radio-border-disabled: '#BFBFBF'
    radio-border-error: '#EB0000'
    radio-text: '#121212'
    radio-text-disabled: '#646464'
  spacing:
    radio-size: 24px
    radio-dot-active: 12px
    radio-dot-default: 6px
    radio-gap: 12px
cssVariables:
  - name: '--radio-size'
    value: 24px
  - name: '--radio-border-default'
    value: '#949494'
  - name: '--radio-border-hover'
    value: var(--color-neptune)
  - name: '--radio-fill-active'
    value: var(--color-cosmos)
  - name: '--radio-border-disabled'
    value: var(--color-moonrock)
  - name: '--radio-bg-disabled'
    value: var(--color-diatomite)
  - name: '--radio-border-error'
    value: var(--color-mars)
  - name: '--radio-gap'
    value: 12px
  - name: '--radio-dot-size-active'
    value: 12px
  - name: '--radio-dot-size-default'
    value: 6px
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - radio
    - radiogroup
figmaNodeId: '21:28156'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
---
<!-- Last synced with Figma: 2026-01-14 -->


# Radio Button

## Overview

Radio buttons allow the fan to select from a group of mutually exclusive options. Radio buttons are presented as a group of small circles, each of which can be selected by clicking or tapping. Fans can choose only one radio button in a group at a time, and a different radio button automatically deselects when a new one is selected.

### When to use

- Use when users must select exactly one option from a set of mutually exclusive choices
- Ideal for forms where all options need to be visible at once
- Use when there are 2-7 options (for more options, consider a dropdown)
- When you want users to compare options side-by-side

### When not to use

- Do not use when users can select multiple options (use Checkboxes instead)
- Do not use for binary on/off settings (use Toggle/Switch instead)
- Do not use when there are many options (use Dropdown instead)
- Do not use for navigation actions

## Variants

| Variant | Description |
|---------|-------------|
| Without text | Radio button circle only, requires external label |
| With text | Radio button with integrated label text |

## States

| State | Description | Visual Indicator |
|-------|-------------|------------------|
| Default | Unselected resting state | Grey border (#949494), white fill |
| Hover | Mouse over, interactive feedback | Blue border (#024DDF), small inner dot hint |
| Active | Selected/checked state | Black fill (#121212), white inner dot (12px) |
| Active Hover | Selected with mouse over | Neptune blue (#024DDF) with Cosmos overlay (40% opacity) |
| Disabled | Non-interactive, unselected | Grey background (#EBEBEB), moonrock border (#BFBFBF) |
| Disabled Selected | Non-interactive, selected | Grey background (#EBEBEB), grey inner dot |
| Error | Validation error state | Red border (#EB0000) |

## Properties

| Property | Values | Default |
|----------|--------|---------|
| state | default, hover, active, activeHover, disabled, disabledSelected, error | default |
| withText | true, false | false |
| label | string | "Label" |

## Styling

### Typography

| Property | Value |
|----------|-------|
| Font | Averta Regular |
| Size | 16px |
| Line Height | 24px |
| Letter Spacing | 0.32px |
| Color (default) | #121212 (Cosmos) |
| Color (disabled) | #646464 (Granite) |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| Radio button size | Radio | 24px |
| Inner dot (active) | Inner Dot Active | 12px |
| Inner dot (default/hover) | Inner Dot Default | 6px |
| Label gap | Club | 12px |
| Inner dot offset | Calculated | 6px from edge |

### Colours

| Element | State | Token | Hex |
|---------|-------|-------|-----|
| Border | Default | Slate | #949494 |
| Border | Hover | Neptune | #024DDF |
| Border | Error | Mars | #EB0000 |
| Border | Disabled | Moonrock | #BFBFBF |
| Background | Default | Spotlight | #FFFFFF |
| Background | Active | Cosmos | #121212 |
| Background | Disabled | Diatomite | #EBEBEB |
| Inner dot | Active | Spotlight | #FFFFFF |
| Inner dot | Disabled Selected | Moonrock | #BFBFBF |
| Active Hover base | - | Neptune | #024DDF |
| Active Hover overlay | - | Cosmos (40%) | #121212 |
| Label text | Default | Cosmos | #121212 |
| Label text | Disabled | Granite | #646464 |

### Elevation

| Level | Value |
|-------|-------|
| Default | none |

## Accessibility

- **Keyboard navigation**: Fully accessible via Tab (between groups) and Arrow keys (within group)
- **Screen readers**: Uses `role="radio"` within `role="radiogroup"` with proper `aria-checked` states
- **Focus indicators**: Visible focus ring meeting WCAG 2.1 requirements
- **Color contrast**: All variants meet 4.5:1 contrast ratio (WCAG AA)
- **Labels**: Even without visible text, a component or other label must be associated with each radio button

## Do's and Don'ts

### Do's

- Always provide a clear label for each radio button option
- Group related radio buttons together with a fieldset and legend
- Maintain consistent sizing within a radio group
- Ensure one option is pre-selected when a default choice makes sense
- Associate labels with radio buttons even when using the "without text" variant

### Don'ts

- Don't change the text style from the standard typography
- Don't change the orientation of the text (keep horizontal alignment)
- Don't change any of the defined states or their visual appearance
- Don't change the stroke style or border weight
- Don't add shadow effects on white backgrounds
- Don't modify the radio button colors outside the defined tokens

## CSS Custom Properties

```css
:root {
  /* Size */
  --radio-size: 24px;
  --radio-dot-size-active: 12px;
  --radio-dot-size-default: 6px;

  /* Borders */
  --radio-border-default: var(--color-slate, #949494);
  --radio-border-hover: var(--color-neptune, #024DDF);
  --radio-border-disabled: var(--color-moonrock, #BFBFBF);
  --radio-border-error: var(--color-mars, #EB0000);
  --radio-border-width: 1px;
  --radio-border-width-hover: 2px;

  /* Fills */
  --radio-bg-default: var(--color-spotlight, #FFFFFF);
  --radio-bg-active: var(--color-cosmos, #121212);
  --radio-bg-disabled: var(--color-diatomite, #EBEBEB);

  /* Inner dot */
  --radio-dot-active: var(--color-spotlight, #FFFFFF);
  --radio-dot-disabled: var(--color-moonrock, #BFBFBF);

  /* Active hover overlay */
  --radio-active-hover-base: var(--color-neptune, #024DDF);
  --radio-active-hover-overlay: rgba(18, 18, 18, 0.4);

  /* Text */
  --radio-text-default: var(--color-cosmos, #121212);
  --radio-text-disabled: var(--color-granite, #646464);

  /* Spacing */
  --radio-gap: 12px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        radio: {
          'border-default': '#949494',
          'border-hover': '#024DDF',
          'border-disabled': '#BFBFBF',
          'border-error': '#EB0000',
          'bg-default': '#FFFFFF',
          'bg-active': '#121212',
          'bg-disabled': '#EBEBEB',
          'dot-active': '#FFFFFF',
          'dot-disabled': '#BFBFBF',
          'text-default': '#121212',
          'text-disabled': '#646464',
        }
      },
      spacing: {
        'radio-size': '24px',
        'radio-dot-active': '12px',
        'radio-dot-default': '6px',
        'radio-gap': '12px',
      },
      borderRadius: {
        'radio': '100px',
      }
    }
  }
}
```

### Utility Classes

```html
<!-- Default state (without text) -->
<div class="relative size-[24px]">
  <div class="absolute inset-0 rounded-full bg-white border border-[#949494]"></div>
</div>

<!-- Hover state -->
<div class="relative size-[24px]">
  <div class="absolute inset-0 rounded-full bg-white border-2 border-[#024DDF]"></div>
</div>

<!-- Active state -->
<div class="relative size-[24px]">
  <div class="absolute inset-0 rounded-full bg-[#121212]"></div>
  <div class="absolute left-[6px] top-[6px] size-[12px] rounded-full bg-white"></div>
</div>

<!-- Disabled state -->
<div class="relative size-[24px]">
  <div class="absolute inset-0 rounded-full bg-[#EBEBEB] border border-[#BFBFBF]"></div>
</div>

<!-- Error state -->
<div class="relative size-[24px]">
  <div class="absolute inset-0 rounded-full bg-white border-2 border-[#EB0000]"></div>
</div>

<!-- With text (active) -->
<div class="flex items-start gap-[12px]">
  <div class="relative size-[24px] shrink-0">
    <div class="absolute inset-0 rounded-full bg-[#121212]"></div>
    <div class="absolute left-[6px] top-[6px] size-[12px] rounded-full bg-white"></div>
  </div>
  <span class="font-averta text-[16px] leading-[24px] tracking-[0.32px] text-[#121212]">
    Label
  </span>
</div>
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Primary/Neptune | COLOR | #024DDF |
| Secondary/Cosmos | COLOR | #121212 |
| Secondary/Spotlight | COLOR | #FFFFFF |
| Borders & Fills/Slate | COLOR | #949494 |
| Borders & Fills/Diatomite | COLOR | #EBEBEB |
| Borders & Fills/Moonrock | COLOR | #BFBFBF |
| Secondary/Granite | COLOR | #646464 |
| Tertiary/Mars | COLOR | #EB0000 |
| Desktop/Body - Rainier | TYPOGRAPHY | Averta Regular, 16px, 24px line-height, 0.32px tracking |

## Related Components

- [Checkbox](./checkbox.md) - For multi-select options
- [Dropdown](./dropdown.md) - For larger option sets
- [Input Field](./input-field.md) - Parent form component

## Applied Example

Radio buttons are commonly used in selection flows such as ticket purchasing:

```
+-----------------------------------------+
|           YOUR SELECTION                |
+-----------------------------------------+
| A handling Fee of £2.75 per transaction |
|                                         |
|   SECTION    ROW     SEAT               |
|    402        Q        -                |
|                                         |
| (●) Full Price Ticket                   |
|     £87.15 each                         |
|                                         |
| [Buy Now, Pay Later at Checkout] (i)    |
|                                         |
|         [Get Tickets]                   |
+-----------------------------------------+
```

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial release with full state documentation |
