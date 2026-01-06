---
name: InputField
description: Unified documentation for InputField component
audiences:
  - design
lastUpdated: '2026-01-06'
category: atoms
status: stable
figmaNodeId: '21:27522'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
tokens:
  colours:
    label:
      default: 'Granite #646464'
      disabled: 'Slate #949494'
    input:
      text: 'Cosmos #121212'
      placeholder: 'Granite #646464'
      disabled: 'Slate #949494'
    background:
      default: 'Spotlight #FFFFFF'
      disabled: 'Diatomite #EBEBEB'
      readOnly: 'Diatomite #EBEBEB'
    border:
      default: 'Slate #949494'
      hover: 'Neptune #024DDF'
      active: 'Neptune #024DDF'
      focused: 'Neptune #024DDF'
      disabled: 'Moonrock #BFBFBF'
      error: 'Mars #EB0000'
    validation:
      error: 'Mars #EB0000'
      success: 'Earth #048851'
  spacing:
    paddingLeft: Auditorium 16px
    paddingRight: 12px
    paddingY: 10px
    labelGap: 4px
    iconGap: 10px
  typography:
    label: 'Averta Regular 14px/20px, letter-spacing 0.28px'
    input: 'Averta Regular 16px/24px, letter-spacing 0.32px'
    validation: 'Averta Semibold 12px/16px, letter-spacing 0.24px'
  borderRadius: 2px
---
# InputField

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | InputField |
| **Color Variants** | label, input, background, border, validation |
| **Figma Node** | 21:27522 |
| **Docs Available** | Design |


---

## Design Documentation

> Query mode: `@design input-field`

**A text input component for capturing user data, with support for labels, icons, validation states, and accessibility features.**

### Design Tokens

**Colors:**
- label.default: Granite #646464
- label.disabled: Slate #949494
- input.text: Cosmos #121212
- input.placeholder: Granite #646464
- input.disabled: Slate #949494
- background.default: Spotlight #FFFFFF
- background.disabled: Diatomite #EBEBEB
- background.readOnly: Diatomite #EBEBEB
- border.default: Slate #949494
- border.hover: Neptune #024DDF
- border.active: Neptune #024DDF
- border.focused: Neptune #024DDF
- border.disabled: Moonrock #BFBFBF
- border.error: Mars #EB0000
- validation.error: Mars #EB0000
- validation.success: Earth #048851

**Spacing:**
- paddingLeft: Auditorium 16px
- paddingRight: 12px
- paddingY: 10px
- labelGap: 4px
- iconGap: 10px

**Typography:**
- label: Averta Regular 14px/20px, letter-spacing 0.28px
- input: Averta Regular 16px/24px, letter-spacing 0.32px
- validation: Averta Semibold 12px/16px, letter-spacing 0.24px

### Full Design Specification


# Input Field

A text input component for capturing user data, with support for labels, icons, validation states, and accessibility features.

## Overview

Input fields are fundamental form elements that allow users to enter and edit text. This component includes a label, optional leading and trailing icons, and validation messaging for error and success states. The design supports multiple states to provide clear visual feedback during user interaction.

### When to use

- Use for single-line text entry (names, emails, passwords, search queries)
- When you need to collect short-form user input
- In forms requiring validation feedback
- When contextual icons improve understanding (e.g., CVV icon for card security code)

### When not to use

- Do not use for multi-line text (use Textarea instead)
- Do not use for selection from predefined options (use Dropdown or Select)
- Do not use for date/time input (use Date Picker)
- Do not use for numeric-only input with increment/decrement (use Number Input)

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| Standard | Default input with label | General text entry |
| With Leading Icon | Icon before input text | Contextual hint (e.g., CVV, search) |
| With Trailing Icon | Icon after input text | Actions (e.g., show/hide password) |
| Optional | Shows "(Optional)" after label | Non-required fields |

## Anatomy

```
┌─────────────────────────────────────────────────┐
│  Label (Optional)                               │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │ [Icon]  Input Text                  [Icon]  │ │
│ │  ← 16px                        12px →       │ │
│ └─────────────────────────────────────────────┘ │
│  ⓘ Validation text                              │
└─────────────────────────────────────────────────┘
```

### Parts

| Part | Description |
|------|-------------|
| Label | Field identifier with optional "(Optional)" suffix |
| Container | Input area with border and padding |
| Leading Icon | Optional 24px icon on the left (e.g., CVV) |
| Input Text | Placeholder or user-entered text |
| Trailing Icon | Optional 24px icon on the right (e.g., hide/show) |
| Validation | Error/success message with icon |

## States

| State | Description | Border | Background |
|-------|-------------|--------|------------|
| Default | Resting state with placeholder | 1px Slate `#949494` | White |
| Filled | Contains user input | 1px Slate `#949494` | White |
| Hover | Mouse over input | 1px Neptune `#024DDF` | White |
| Active | User is typing | 2px Neptune `#024DDF` | White |
| Focused | Keyboard focus | 2px Neptune `#024DDF` | White |
| Disabled | Non-interactive | 1px Moonrock `#BFBFBF` | Diatomite `#EBEBEB` |
| Read Only | View only, not editable | 1px Slate `#949494` | Diatomite `#EBEBEB` |
| Error | Validation failed | 2px Mars `#EB0000` | White |
| Success | Validation passed | 1px Slate `#949494` | White |

### State Colors

| State | Label Color | Input Text | Icon Color |
|-------|-------------|------------|------------|
| Default | Granite `#646464` | Granite `#646464` | Granite `#646464` |
| Filled | Granite `#646464` | Cosmos `#121212` | Granite `#646464` |
| Hover | Granite `#646464` | Cosmos `#121212` | Granite `#646464` |
| Active | Granite `#646464` | Cosmos `#121212` | Granite `#646464` |
| Focused | Granite `#646464` | Cosmos `#121212` | Granite `#646464` |
| Disabled | Slate `#949494` | Slate `#949494` | Slate `#949494` |
| Read Only | Granite `#646464` | Cosmos `#121212` | Cosmos `#121212` |
| Error | Granite `#646464` | Cosmos `#121212` | Slate `#949494` |
| Success | Granite `#646464` | Cosmos `#121212` | Granite `#646464` |

## Properties

| Property | Values | Default | Description |
|----------|--------|---------|-------------|
| label | string | "Label" | Field label text |
| optional | boolean | false | Shows "(Optional)" suffix |
| inputText | string | "Input Text" | Placeholder or value |
| leadingIcon | boolean | true | Show leading icon slot |
| trailingIcon | boolean | true | Show trailing icon slot |
| validationText | string | "Validation text" | Error/success message |
| state | see States | "Default" | Current input state |

## Styling

### Typography

| Element | Font | Size | Line Height | Letter Spacing |
|---------|------|------|-------------|----------------|
| Label | Averta Regular | 14px | 20px | 0.28px (2%) |
| Input Text | Averta Regular | 16px | 24px | 0.32px (2%) |
| Validation Text | Averta Semibold | 12px | 16px | 0.24px (2%) |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| Left padding | Auditorium | 16px |
| Right padding | — | 12px |
| Vertical padding | — | 10px |
| Label to input gap | — | 4px |
| Icon gap | — | 10px |
| Input to validation gap | — | 4px |

### Colours

| Element | State | Token | Hex |
|---------|-------|-------|-----|
| Background | Default | Spotlight | #FFFFFF |
| Background | Disabled/Read Only | Diatomite | #EBEBEB |
| Border | Default/Filled | Slate | #949494 |
| Border | Hover/Active/Focused | Neptune | #024DDF |
| Border | Disabled | Moonrock | #BFBFBF |
| Border | Error | Mars | #EB0000 |
| Label text | Default | Granite | #646464 |
| Label text | Disabled | Slate | #949494 |
| Input text | Placeholder | Granite | #646464 |
| Input text | Filled | Cosmos | #121212 |
| Input text | Disabled | Slate | #949494 |

### Border

| State | Width | Radius |
|-------|-------|--------|
| Default/Filled/Hover | 1px | 2px |
| Active/Focused/Error | 2px | 2px |
| Disabled | 1px | 2px |

## Sizing Widths

| Type | Value | Description |
|------|-------|-------------|
| Min Width | 240px | Recommended minimum with labels |
| Max Width | 640px | Recommended maximum (wide fields) |
| Full Width | 100% | Spans container width |

## Stacking & Height Space

- Vertical gap between stacked input fields: **24px**
- Input height: **46px** (including border)
- Total height with label: **70px**
- Total height with label and validation: **90px**

## Accessibility

### Keyboard Navigation

- **Tab**: Focus the input field
- **Shift+Tab**: Focus previous element
- **Enter**: Submit form (when in form context)
- Focus ring visible on keyboard focus (2px Neptune border)

### ARIA Attributes

- Use `aria-label` or visible label with `for` attribute
- Use `aria-invalid="true"` for error state
- Use `aria-describedby` to link validation message
- Use `aria-required` for mandatory fields

### Screen Reader Considerations

- Label should clearly describe expected input
- Validation messages announced when state changes
- "(Optional)" suffix read for non-required fields
- Icons should have appropriate `aria-label` when interactive

### Focus States

- Active/Focused state: 2px Neptune `#024DDF` border
- High contrast visible indicator
- No outline offset (border serves as focus indicator)

## Do's and Don'ts

### Do's

- Always include a visible label above the input
- Use placeholder text to show example input format
- Provide immediate validation feedback
- Use leading icons to provide context (e.g., CVV icon for card code)
- Use trailing icons for actions (e.g., password visibility toggle)
- Mark optional fields with "(Optional)" suffix
- Group related fields logically
- Set appropriate input type for mobile keyboards

### Don'ts

- Don't use placeholder text as the only label
- Don't show error state before user interaction
- Don't use red for non-error purposes
- Don't disable inputs without clear explanation
- Don't use identical styling for required and optional fields
- Don't place labels to the left of inputs (always above)
- Don't truncate validation messages
- Don't mix different input field heights in the same form

## CSS Custom Properties

```css
:root {
  /* Input Field Colors */
  --input-bg-default: var(--color-spotlight);
  --input-bg-disabled: var(--color-diatomite);

  --input-border-default: var(--color-slate);
  --input-border-hover: var(--color-neptune);
  --input-border-active: var(--color-neptune);
  --input-border-disabled: var(--color-moonrock);
  --input-border-error: var(--color-mars);

  --input-text-default: var(--color-granite);
  --input-text-filled: var(--color-cosmos);
  --input-text-disabled: var(--color-slate);

  --input-label-default: var(--color-granite);
  --input-label-disabled: var(--color-slate);

  /* Input Field Spacing */
  --input-padding-left: var(--space-auditorium);
  --input-padding-right: 12px;
  --input-padding-y: 10px;
  --input-icon-gap: 10px;
  --input-label-gap: 4px;

  /* Input Field Shape */
  --input-radius: 2px;
  --input-border-width: 1px;
  --input-border-width-active: 2px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js (input-field-specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        input: {
          'bg-default': '#FFFFFF',
          'bg-disabled': '#EBEBEB',
          'border-default': '#949494',
          'border-hover': '#024DDF',
          'border-active': '#024DDF',
          'border-disabled': '#BFBFBF',
          'border-error': '#EB0000',
          'text-default': '#646464',
          'text-filled': '#121212',
          'text-disabled': '#949494',
          'label-default': '#646464',
          'label-disabled': '#949494',
        }
      },
      borderRadius: {
        'input': '2px',
      },
      spacing: {
        'input-px-left': '16px',
        'input-px-right': '12px',
        'input-py': '10px',
      }
    }
  }
}
```

## Styling with Tailwind

```css
/* Base input container */
.input-field {
  @apply flex flex-col gap-1;
}

/* Label */
.input-label {
  @apply font-averta text-sm leading-5 tracking-[0.28px] text-granite;
}

/* Input container */
.input-container {
  @apply flex items-center gap-[10px] rounded-[2px] border bg-white
         pl-4 pr-3 py-[10px] transition-colors;
}

/* State variants */
.input-container--default {
  @apply border-slate;
}

.input-container--hover {
  @apply border-neptune;
}

.input-container--active,
.input-container--focused {
  @apply border-2 border-neptune;
}

.input-container--disabled {
  @apply bg-diatomite border-moonrock;
}

.input-container--error {
  @apply border-2 border-mars;
}

/* Input text */
.input-text {
  @apply font-averta text-base leading-6 tracking-[0.32px] flex-1;
}

.input-text--placeholder {
  @apply text-granite;
}

.input-text--filled {
  @apply text-cosmos;
}

/* Validation */
.input-validation {
  @apply flex items-center gap-1 font-averta-semibold text-xs leading-4 tracking-[0.24px];
}
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Secondary/Granite | COLOR | #646464 |
| Secondary/Cosmos | COLOR | #121212 |
| Secondary/Spotlight | COLOR | #FFFFFF |
| Borders & Fills/Slate | COLOR | #949494 |
| Borders & Fills/Moonrock | COLOR | #BFBFBF |
| Borders & Fills/Diatomite | COLOR | #EBEBEB |
| Primary/Neptune | COLOR | #024DDF |
| Tertiary/Mars | COLOR | #EB0000 |
| Tertiary/Earth | COLOR | #048851 |
| Desktop/Small Body - Etna | TYPOGRAPHY | Averta Regular 14px/20px |
| Desktop/Body - Rainier | TYPOGRAPHY | Averta Regular 16px/24px |

## Related Components

- [Dropdown](./dropdown.md) - For selection from predefined options
- [Button](./button.md) - Often paired in forms
- [Date Picker](../molecules/date-picker.md) - For date input

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial release |

---

## Engineer Documentation

> Query mode: `@engineer input-field`
> Styling: **styled-components** (CSS-in-JS)

*No engineer documentation available for this component.*


---

## Vibe Documentation

> Query mode: `@vibe input-field`
> Styling: **Tailwind CSS** (utility classes)

*No vibe documentation available for this component.*


---

## Comparison: Design vs Code

| Aspect | Design (@design) | Code (@engineer) |
|--------|------------------|------------------|
| **Status** | stable | - |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `-` |
| **Figma Node** | 21:27522 | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

