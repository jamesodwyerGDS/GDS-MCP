---
name: Dropdown
description: >-
  A form control that allows users to select a single option from a collapsible
  list of choices.
category: atoms
status: stable
version: 1.0.0
updated: '2026-01-14'
tags:
  - dropdown
  - select
  - form
  - input
  - menu
keywords:
  - dropdown menu
  - select box
  - dropdown list
  - form field
  - data entry
  - option selector
dependencies:
  - Input Field
  - Icon
relatedComponents:
  - name: Input Field
    relationship: alternative
  - name: Checkbox
    relationship: alternative
  - name: Radio Button
    relationship: alternative
tokens:
  colours:
    - primary
    - text
    - background
    - border
    - Open selected
    - Open selected-border
    - Open
    - Open-border
    - Open Hover
    - Open Hover-border
    - Default
    - Default-border
    - Error
    - Error-border
    - Hover
    - Hover-border
    - Disabled
    - Disabled-border
    - Spotlight
    - Slate
    - Neptune
    - Mars
    - Diatomite
    - Moonrock
  spacing:
    inputHeight: 44px
    paddingLeft: 16px
    paddingY: 11px
    optionPaddingX: 16px
    optionGap: 4px
    dropdownPadding: 8px
  typography:
    label: 'Averta Regular 14px/20px, letter-spacing 0.28px'
    value: 'Averta Regular 16px/24px, letter-spacing 0.32px'
    option: 'Averta Regular 16px/24px, letter-spacing 0.32px'
    validation: 'Averta Semibold 12px/16px, letter-spacing 0.24px'
  borderRadius:
    input: 2px
    option: 2px
  elevation:
    dropdown: 'elevation-level-3 (0 3px 12px rgba(18, 18, 18, 0.18))'
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - listbox
    - option
    - combobox
figmaNodeId: '21:28284'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
---
<!-- Last synced with Figma: 2026-01-14 -->


# Dropdown

A form control that allows users to select a single option from a collapsible list of choices.

## Overview

Dropdown menus, also known as dropdown lists or select boxes, are used in user interfaces to allow the user to select from a list of options. Dropdown menus are typically designed and presented as a small box with a default value or placeholder, which users can expand to reveal a list of options. The user can then select one of the options from the list by clicking or tapping on it. Dropdown menus are an effective way to present a large number of options to the user in a compact and user-friendly format.

### When to use

- Use when selecting from 5 or more predefined options
- Use when space is limited and a full list would clutter the interface
- Use for mutually exclusive choices where only one selection is allowed
- Use for form fields requiring selection from a standard list (country, state, etc.)

### When not to use

- Do not use for fewer than 5 options (consider radio buttons instead)
- Do not use when users need to see all options at once
- Do not use for multi-select requirements (use checkboxes or multi-select component)
- Do not use for free-form text entry (use input field instead)

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| Default | Standard dropdown with label and placeholder | Most form scenarios |
| With Error | Dropdown with validation error state | Form validation feedback |

## Anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Text Label ─────────────────────────────  Label               │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │  Dropdown Box ─── Select a character          ˅ ───────┼── Caret Icon
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │  ┌────────────────────────────────────────────────────┐  │  │
│   │  │  Aaron                                             │  │  │
│   │  ├────────────────────────────────────────────────────┤  │  │
│   │  │  Alexander                    (Hovered/Selected)   │  │  │
│   │  ├────────────────────────────────────────────────────┤  │  │
│   │  │  Angelica                                          │  │  │
│   │  ├────────────────────────────────────────────────────┤  │  │
│   │  │  Eliza                                             │  │  │
│   │  ├────────────────────────────────────────────────────┤  │  │
│   │  │  George                                            │  │  │
│   │  └────────────────────────────────────────────────────┘  │  │
│   └──────────────────────────────────────────────────────────┘  │
│                        Open Dropdown                            │
└─────────────────────────────────────────────────────────────────┘
```

### Parts

| Part | Description |
|------|-------------|
| Label | Text label above the dropdown indicating the field purpose |
| Dropdown Box | The clickable container showing current selection or placeholder |
| Placeholder/Value | Text showing selected value or placeholder text |
| Caret Icon | ChevronDown when closed, ChevronUp when open |
| Dropdown List | Container for options, appears on open |
| Option | Individual selectable item in the dropdown list |
| Validation | Error message and icon shown in error state |

## States

| State | Description | Border | Background | Caret Color |
|-------|-------------|--------|------------|-------------|
| Default | Resting state, ready for interaction | Slate #949494 | Spotlight #FFFFFF | Cosmos #121212 |
| Hover | Mouse over the dropdown | Neptune #024DDF | Spotlight #FFFFFF | Neptune #024DDF |
| Disabled | Non-interactive, grayed out | Moonrock #BFBFBF | Diatomite #EBEBEB | Slate #949494 |
| Error | Validation error present | Mars #EB0000 (2px) | Spotlight #FFFFFF | Cosmos #121212 |
| Open | Dropdown expanded | Neptune #024DDF (2px) | Spotlight #FFFFFF | Neptune #024DDF |
| Open Hover | Dropdown expanded, option hovered | Neptune #024DDF (2px) | Spotlight #FFFFFF | Neptune #024DDF |
| Open Selected | Dropdown expanded, option selected | Slate #949494 | Spotlight #FFFFFF | Cosmos #121212 |

## Option States

| State | Description | Background | Text Color |
|-------|-------------|------------|------------|
| Default | Normal option in list | Transparent | Cosmos #121212 |
| Hover | Mouse over option | Lunar #F6F6F6 | Cosmos #121212 |
| Selected | Currently selected option | Neptune #024DDF | Spotlight #FFFFFF |

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | - | Label text displayed above the dropdown |
| `placeholder` | `string` | `'Select an option'` | Placeholder text when no option selected |
| `value` | `string` | - | Currently selected value |
| `options` | `Option[]` | - | Array of selectable options |
| `disabled` | `boolean` | `false` | Disables the dropdown |
| `error` | `boolean` | `false` | Shows error state |
| `errorMessage` | `string` | - | Validation error text |
| `required` | `boolean` | `false` | Marks field as required |

## Styling

### Typography

| Element | Font | Size | Line Height | Letter Spacing | Color |
|---------|------|------|-------------|----------------|-------|
| Label | Averta Regular | 14px | 20px | 0.28px | Granite #646464 |
| Label (disabled) | Averta Regular | 14px | 20px | 0.28px | Slate #949494 |
| Value/Placeholder | Averta Regular | 16px | 24px | 0.32px | Cosmos #121212 |
| Value (disabled) | Averta Regular | 16px | 24px | 0.32px | Slate #949494 |
| Option Text | Averta Regular | 16px | 24px | 0.32px | Cosmos #121212 |
| Option (selected) | Averta Regular | 16px | 24px | 0.32px | Spotlight #FFFFFF |
| Validation Text | Averta Semibold | 12px | 16px | 0.24px | Cosmos #121212 |

### Spacing

| Area | Value |
|------|-------|
| Dropdown box height | 44px |
| Padding left | 16px |
| Padding vertical | 11px |
| Caret button size | 44 x 44px |
| Caret icon size | 24 x 24px |
| Gap between label and box | 4px |
| Dropdown list padding | 8px |
| Option height | 44px |
| Option padding left | 16px |
| Option gap | 4px |
| Gap between box and dropdown | 2px |

### Colors

| Element | State | Color |
|---------|-------|-------|
| Label | Default | Granite #646464 |
| Label | Disabled | Slate #949494 |
| Border | Default | Slate #949494 |
| Border | Hover | Neptune #024DDF |
| Border | Focus/Open | Neptune #024DDF (2px) |
| Border | Disabled | Moonrock #BFBFBF |
| Border | Error | Mars #EB0000 (2px) |
| Background | Default | Spotlight #FFFFFF |
| Background | Disabled | Diatomite #EBEBEB |
| Option Background | Hover | Lunar #F6F6F6 |
| Option Background | Selected | Neptune #024DDF |
| Caret | Default | Cosmos #121212 |
| Caret | Hover/Open | Neptune #024DDF |
| Caret | Disabled | Slate #949494 |

### Elevation

The dropdown list uses `elevation-level-3`:
```css
box-shadow: 0 3px 12px rgba(18, 18, 18, 0.18);
```

## Accessibility

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move focus to/from dropdown |
| Enter/Space | Open dropdown or select focused option |
| Arrow Down | Open dropdown or move to next option |
| Arrow Up | Move to previous option |
| Escape | Close dropdown without selection |
| Home | Move to first option |
| End | Move to last option |
| Type character | Jump to option starting with that letter |

### ARIA Attributes

```html
<div class="dropdown">
  <label id="dropdown-label">Label</label>
  <button
    role="combobox"
    aria-haspopup="listbox"
    aria-expanded="false"
    aria-labelledby="dropdown-label"
    aria-controls="dropdown-list"
  >
    Select a character
    <span aria-hidden="true">▼</span>
  </button>
  <ul
    id="dropdown-list"
    role="listbox"
    aria-labelledby="dropdown-label"
    hidden
  >
    <li role="option" aria-selected="false">Aaron</li>
    <li role="option" aria-selected="true">Alexander</li>
    <li role="option" aria-selected="false">Angelica</li>
  </ul>
</div>
```

### Screen Reader Considerations

- Label is associated with the dropdown via `aria-labelledby`
- Expanded/collapsed state announced via `aria-expanded`
- Selected option announced when changed
- Option count can be announced using `aria-setsize` and `aria-posinset`
- Error messages linked via `aria-describedby`

## Do's and Don'ts

### Do's

- Use clear, concise labels that describe the expected selection
- Provide a meaningful placeholder or default value
- Order options logically (alphabetically, by frequency, or contextually)
- Show validation errors clearly with specific guidance
- Ensure the dropdown width accommodates the longest option
- Close the dropdown when an option is selected

### Don'ts

- Don't use for fewer than 5 options (use radio buttons instead)
- Don't nest dropdowns within dropdowns
- Don't use dropdown for boolean yes/no choices (use toggle or checkbox)
- Don't truncate option text - ensure full text is visible
- Don't auto-submit forms when dropdown value changes
- Don't use placeholder as the only label

## CSS Custom Properties

```css
:root {
  /* Dropdown Colors */
  --dropdown-text: var(--color-cosmos);
  --dropdown-text-label: var(--color-granite);
  --dropdown-text-disabled: var(--color-slate);
  --dropdown-bg: var(--color-spotlight);
  --dropdown-bg-disabled: var(--color-diatomite);
  --dropdown-bg-option-hover: var(--color-lunar);
  --dropdown-bg-option-selected: var(--color-neptune);

  --dropdown-border: var(--color-slate);
  --dropdown-border-hover: var(--color-neptune);
  --dropdown-border-focus: var(--color-neptune);
  --dropdown-border-disabled: var(--color-moonrock);
  --dropdown-border-error: var(--color-mars);

  /* Dropdown Spacing */
  --dropdown-height: 44px;
  --dropdown-padding-x: 16px;
  --dropdown-padding-y: 11px;
  --dropdown-option-height: 44px;
  --dropdown-list-padding: 8px;
  --dropdown-option-gap: 4px;

  /* Dropdown Shape */
  --dropdown-radius: 2px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js (dropdown specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        dropdown: {
          text: '#121212',
          'text-label': '#646464',
          'text-disabled': '#949494',
          border: '#949494',
          'border-hover': '#024DDF',
          'border-disabled': '#BFBFBF',
          'border-error': '#EB0000',
          bg: '#FFFFFF',
          'bg-disabled': '#EBEBEB',
          'option-hover': '#F6F6F6',
          'option-selected': '#024DDF',
        }
      },
      spacing: {
        'dropdown-height': '44px',
        'dropdown-px': '16px',
        'dropdown-py': '11px',
      },
      boxShadow: {
        'dropdown': '0 3px 12px rgba(18, 18, 18, 0.18)',
      },
      borderRadius: {
        'dropdown': '2px',
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
| Borders & Fills/Lunar | COLOR | #F6F6F6 |
| Borders & Fills/Diatomite | COLOR | #EBEBEB |
| Tertiary/Mars | COLOR | #EB0000 |
| elevation-level-3 | EFFECT | 0 3px 12px rgba(18, 18, 18, 0.18) |

## Related Components

- [Input Field](../atoms/input-field.md) - For free-form text entry
- [Checkbox](../atoms/checkbox.md) - For multi-select or boolean options
- [Radio Button](../atoms/radio-button.md) - For fewer mutually exclusive options
- [Button](../atoms/button.md) - Uses similar interaction patterns

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-06 | Initial release |
