---
name: Toggle
description: A switch control for toggling between two mutually exclusive options, such as on/off or enabled/disabled states.
category: atoms
status: stable
version: 1.0.0
updated: 2025-01-06
tags:
  - toggle
  - switch
  - control
  - form
  - settings
keywords:
  - toggle switch
  - on off control
  - switch component
  - binary toggle
  - settings toggle
  - form control
dependencies: []
relatedComponents:
  - name: Checkbox
    relationship: alternative
  - name: Radio Button
    relationship: alternative
tokens:
  colours:
    onDefault:
      standard: "Neptune #024DDF"
      resale: "Nebula #D0006F"
    offDefault:
      background: "Spotlight #FFFFFF"
      border: "Slate #949494"
    hover:
      standard: "Neptune #024DDF with border"
      resale: "Nebula #D0006F with border"
    disabled:
      background: "Diatomite #EBEBEB"
      border: "Moonrock #BFBFBF"
    knob:
      default: "Slate #949494"
      on: "Spotlight #FFFFFF"
      disabled: "Moonrock #BFBFBF"
  spacing:
    width: "40px"
    height: "24px"
    knobSize: "16px"
    knobOffset: "10%"
  borderRadius:
    track: "50px"
    knob: "50%"
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - switch
figmaNodeId: "38852:4937"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Toggle

A switch control for toggling between two mutually exclusive options, such as on/off or enabled/disabled states.

## Overview

Ticketmaster toggles effectively provide the fan with a simple and intuitive way to switch between two options. Toggles are presented as a small circular control that can be clicked or tapped by the fan to switch between the two options. Toggles are used to switch between two mutually exclusive options, such as on and off or true and false. For example, a fan might use a toggle to enable or disable a specific feature in a settings menu.

### When to Use

- Use for binary settings that take immediate effect (e.g., enable/disable notifications)
- Use when the user needs to switch between two mutually exclusive states
- Use in settings panels, preference menus, or configuration screens
- Use when the action happens immediately without requiring a save button

### When Not to Use

- Do not use for selecting from more than two options (use Radio Button or Dropdown)
- Do not use when the change requires confirmation or a save action (use Checkbox)
- Do not use for non-binary choices or ranges (use Slider or Radio Button)
- Do not use when the toggle state is ambiguous or unclear

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| Standard | Neptune blue (#024DDF) when on | Primary marketplace experiences |
| Resale | Nebula magenta (#D0006F) when on | Resale-specific features and settings |

## Anatomy

```
┌─────────────────────────────────────────┐
│  Track (pill-shaped container)          │
│  ┌──────┐                               │
│  │ Knob │ ← Slides left/right           │
│  └──────┘                               │
└─────────────────────────────────────────┘
     Off position          On position
```

### Parts

| Part | Description |
|------|-------------|
| Track | Pill-shaped container (40px × 24px) |
| Knob | Circular control element that slides (16px diameter) |

## States

The toggle has two values (On/Off) and three interaction states:

### Off States

| State | Track Background | Track Border | Knob Color |
|-------|------------------|--------------|------------|
| Default | White #FFFFFF | 1px Slate #949494 | Slate #949494 |
| Hover | White #FFFFFF | 2px Neptune #024DDF | Slate #949494 |
| Disabled | Diatomite #EBEBEB | 1px Moonrock #BFBFBF | Moonrock #BFBFBF |

### On States (Standard)

| State | Track Background | Track Border | Knob Color |
|-------|------------------|--------------|------------|
| Default | Neptune #024DDF | None | White #FFFFFF |
| Hover | Neptune #024DDF | None + 25% dark overlay | White #FFFFFF |
| Disabled | Diatomite #EBEBEB | 1px Moonrock #BFBFBF | White #FFFFFF |

### On States (Resale)

| State | Track Background | Track Border | Knob Color |
|-------|------------------|--------------|------------|
| Default | Nebula #D0006F | None | White #FFFFFF |
| Hover | Nebula #D0006F | None + 25% dark overlay | White #FFFFFF |
| Disabled | Diatomite #EBEBEB | 1px Moonrock #BFBFBF | White #FFFFFF |

## Properties

| Property | Values | Default | Description |
|----------|--------|---------|-------------|
| `on` | `true`, `false` | `false` | Toggle value state |
| `state` | `Default`, `Hover`, `Disabled` | `Default` | Interaction state |
| `resale` | `true`, `false` | `false` | Enables resale color scheme |

## Styling

### Dimensions

| Property | Value |
|----------|-------|
| Track Width | 40px |
| Track Height | 24px |
| Knob Diameter | 16px (66.67% of height) |
| Border Radius (Track) | 50px (pill shape) |

### Knob Positioning

| State | Left Position | Right Position |
|-------|---------------|----------------|
| Off | 10% from left | 50% from right |
| On | 50% from left | 10% from right |

### Colours

| Element | State | Token | Hex |
|---------|-------|-------|-----|
| Track (On - Standard) | Default | Neptune | #024DDF |
| Track (On - Resale) | Default | Nebula | #D0006F |
| Track (Off) | Default | Spotlight | #FFFFFF |
| Track Border (Off) | Default | Slate | #949494 |
| Track Border (Hover Off) | Hover | Neptune/Nebula | #024DDF/#D0006F |
| Track (Disabled) | Disabled | Diatomite | #EBEBEB |
| Track Border (Disabled) | Disabled | Moonrock | #BFBFBF |
| Knob (Off) | Default | Slate | #949494 |
| Knob (On) | Default | Spotlight | #FFFFFF |
| Knob (Disabled) | Disabled | Moonrock | #BFBFBF |
| Hover Overlay | Hover (On) | Cosmos 25% | rgba(18, 18, 18, 0.25) |

## Accessibility

### Keyboard Navigation

- **Tab**: Focus the toggle
- **Space/Enter**: Toggle between on and off states
- Focus ring visible on keyboard focus (Neptune blue outline)

### ARIA Attributes

```html
<button
  role="switch"
  aria-checked="false"
  aria-disabled="false"
  aria-label="Enable notifications"
>
  <!-- Toggle content -->
</button>
```

### Screen Reader Considerations

- Use `role="switch"` to convey toggle semantics
- `aria-checked` reflects the current on/off state
- Provide a clear label describing what the toggle controls
- State changes should be announced to assistive technology

### Focus States

- Visible 2px focus ring in Neptune blue
- 2px offset from toggle edge
- Focus should not trap keyboard navigation

## Do's and Don'ts

### Do's

- Use clear labels that describe what the toggle controls
- Position the toggle to the right of its label
- Provide immediate visual feedback on state change
- Use for settings that take effect immediately
- Ensure sufficient touch target size (minimum 44px × 44px tap area)

### Don'ts

- Don't use for actions that require a save/submit confirmation
- Don't use ambiguous labels like "Toggle setting"
- Don't change established color tokens
- Don't use multiple toggles for related options (use checkbox group instead)
- Don't disable without providing explanation

## CSS Custom Properties

```css
:root {
  /* Toggle Track Colors */
  --toggle-track-on: var(--color-neptune);
  --toggle-track-on-resale: var(--color-nebula);
  --toggle-track-off: var(--color-spotlight);
  --toggle-track-disabled: var(--color-diatomite);

  /* Toggle Border Colors */
  --toggle-border-off: var(--color-slate);
  --toggle-border-hover: var(--color-neptune);
  --toggle-border-hover-resale: var(--color-nebula);
  --toggle-border-disabled: var(--color-moonrock);

  /* Toggle Knob Colors */
  --toggle-knob-off: var(--color-slate);
  --toggle-knob-on: var(--color-spotlight);
  --toggle-knob-disabled: var(--color-moonrock);

  /* Toggle Dimensions */
  --toggle-width: 40px;
  --toggle-height: 24px;
  --toggle-knob-size: 16px;
  --toggle-track-radius: 50px;

  /* Toggle Hover Overlay */
  --toggle-hover-overlay: rgba(18, 18, 18, 0.25);
}
```

## Tailwind Configuration

```js
// tailwind.config.js (toggle-specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        toggle: {
          'track-on': '#024DDF',
          'track-on-resale': '#D0006F',
          'track-off': '#FFFFFF',
          'track-disabled': '#EBEBEB',
          'border-off': '#949494',
          'border-hover': '#024DDF',
          'border-hover-resale': '#D0006F',
          'border-disabled': '#BFBFBF',
          'knob-off': '#949494',
          'knob-on': '#FFFFFF',
          'knob-disabled': '#BFBFBF',
        }
      },
      width: {
        'toggle': '40px',
      },
      height: {
        'toggle': '24px',
        'toggle-knob': '16px',
      },
      borderRadius: {
        'toggle': '50px',
      }
    }
  }
}
```

### Tailwind Utility Classes

```html
<!-- Off State (Default) -->
<button class="relative w-[40px] h-[24px] bg-white border border-[#949494] rounded-[50px]">
  <span class="absolute left-[10%] top-[16.67%] w-[16px] h-[16px] bg-[#949494] rounded-full" />
</button>

<!-- On State (Standard) -->
<button class="relative w-[40px] h-[24px] bg-[#024DDF] rounded-[50px]">
  <span class="absolute right-[10%] top-[16.67%] w-[16px] h-[16px] bg-white rounded-full" />
</button>

<!-- On State (Resale) -->
<button class="relative w-[40px] h-[24px] bg-[#D0006F] rounded-[50px]">
  <span class="absolute right-[10%] top-[16.67%] w-[16px] h-[16px] bg-white rounded-full" />
</button>

<!-- Hover Off State -->
<button class="relative w-[40px] h-[24px] bg-white border-2 border-[#024DDF] rounded-[50px] cursor-pointer">
  <span class="absolute left-[10%] top-[16.67%] w-[16px] h-[16px] bg-[#949494] rounded-full" />
</button>

<!-- Disabled State -->
<button class="relative w-[40px] h-[24px] bg-[#EBEBEB] border border-[#BFBFBF] rounded-[50px]" disabled>
  <span class="absolute left-[10%] top-[16.67%] w-[16px] h-[16px] bg-[#BFBFBF] rounded-full" />
</button>
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Primary/Neptune | COLOR | #024DDF |
| Additional/Nebula (Resale) | COLOR | #D0006F |
| Secondary/Spotlight | COLOR | #FFFFFF |
| Secondary/Cosmos | COLOR | #121212 |
| Borders & Fills/Slate | COLOR | #949494 |
| Borders & Fills/Diatomite | COLOR | #EBEBEB |
| Borders & Fills/Moonrock | COLOR | #BFBFBF |

## Component Reference

| Use Case | Variant | State | Notes |
|----------|---------|-------|-------|
| Settings toggle | Standard | Default | Most common usage |
| Notification preferences | Standard | Default | Immediate effect |
| Resale feature toggle | Resale | Default | Resale-specific branding |
| Unavailable option | Standard/Resale | Disabled | Non-interactive |

## Related Components

- [Checkbox](./checkbox.md) - For multi-select options or form submissions
- [Radio Button](./radio-button.md) - For selecting one from multiple options
- [Dropdown](./dropdown.md) - For selecting from many options

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial release with Standard and Resale variants |
