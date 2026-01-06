---
name: Button
description: Unified documentation for Button component
audiences:
  - design
  - engineer
  - vibe
lastUpdated: '2026-01-06'
category: atoms
status: stable
figmaNodeId: '34410:13185'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
tokens:
  colours:
    primary:
      default: 'Neptune #024DDF'
      hover: 'Neptune Dark #0141B8'
      pressed: 'Neptune Darker #033399'
    secondary:
      default: 'Spotlight #FFFFFF'
      border: 'Neptune #024DDF'
      text: 'Neptune #024DDF'
    tertiary:
      default: 'Spotlight #FFFFFF'
      border: 'Cosmos #121212'
      text: 'Cosmos #121212'
    ghost:
      default: transparent
      text: 'Cosmos #121212'
    inverse:
      default: 'Cosmos #121212'
      hover: 'Cosmos Light #2A2A2A'
    transactional:
      default: 'Earth #01A469'
      hover: 'Earth Dark #018A57'
    disabled:
      background: 'Ammonite #D6D6D6'
      text: 'Slate #949494'
    content:
      white: 'Spotlight #FFFFFF'
  spacing:
    paddingHorizontal: Auditorium 16px
    paddingVertical: 10px
    paddingVerticalTransactional: 9px
    iconGap: Club 8px
  typography:
    standard: 'Averta Semibold 16px/24px, letter-spacing 0.32px'
    transactional: 'Averta Semibold 18px/26px, letter-spacing 0.36px, capitalize'
  borderRadius: 4px
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-button--default'
sourceFile: components/Button/index.tsx
---
# Button

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Button |
| **Color Variants** | primary, secondary, tertiary, ghost, inverse, transactional, disabled, content |
| **Package** | `@gds/components` |
| **Figma Node** | 34410:13185 |
| **Docs Available** | Design, Engineer, Vibe |


---

## Design Documentation

> Query mode: `@design button`

**A versatile button component for triggering actions, with multiple variants for different contexts and emphasis levels.**

### Design Tokens

**Colors:**
- primary.default: Neptune #024DDF
- primary.hover: Neptune Dark #0141B8
- primary.pressed: Neptune Darker #033399
- secondary.default: Spotlight #FFFFFF
- secondary.border: Neptune #024DDF
- secondary.text: Neptune #024DDF
- tertiary.default: Spotlight #FFFFFF
- tertiary.border: Cosmos #121212
- tertiary.text: Cosmos #121212
- ghost.default: transparent
- ghost.text: Cosmos #121212
- inverse.default: Cosmos #121212
- inverse.hover: Cosmos Light #2A2A2A
- transactional.default: Earth #01A469
- transactional.hover: Earth Dark #018A57
- disabled.background: Ammonite #D6D6D6
- disabled.text: Slate #949494
- content.white: Spotlight #FFFFFF

**Spacing:**
- paddingHorizontal: Auditorium 16px
- paddingVertical: 10px
- paddingVerticalTransactional: 9px
- iconGap: Club 8px

**Typography:**
- standard: Averta Semibold 16px/24px, letter-spacing 0.32px
- transactional: Averta Semibold 18px/26px, letter-spacing 0.36px, capitalize

### Full Design Specification


# Button

A versatile button component for triggering actions, with multiple variants for different contexts and emphasis levels.

## Overview

Buttons are the primary interactive element for user actions. The design system provides six button variants to establish clear visual hierarchy and communicate intent. Each variant is optimized for specific use cases, from high-emphasis primary actions to subtle ghost buttons.

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| Primary | High emphasis, filled Neptune blue | Main call-to-action, form submissions |
| Secondary | Medium emphasis, outlined with Neptune border | Supporting actions alongside primary |
| Tertiary | Low emphasis, outlined with dark border | Alternative actions, less prominent options |
| Ghost | Minimal emphasis, text only | Inline actions, navigation-like behavior |
| Inverse | Dark filled, for light backgrounds | Actions on light/hero sections |
| Transactional | Green filled, larger size | Purchase, checkout, or conversion actions |

## Anatomy

```
┌──────────────────────────────────────┐
│  [Icon]  Button Label  [Icon]        │
│          ← 16px padding →            │
└──────────────────────────────────────┘
     ↑                            ↑
  Left Icon (optional)      Right Icon (optional)
```

### Parts

| Part | Description |
|------|-------------|
| Container | Background with padding and border-radius |
| Label | Button text (Averta Semibold) |
| Icon (optional) | 24px icon, left or right of label |
| Loading Spinner | Animated arc overlay when loading |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'inverse' \| 'transactional'` | `'primary'` | Visual style variant |
| `disabled` | `boolean` | `false` | Disables interaction |
| `isLoading` | `boolean` | `false` | Shows loading spinner |
| `iconPosition` | `'none' \| 'left' \| 'right'` | `'none'` | Icon placement |
| `icon` | `ReactNode` | - | Icon element to display |
| `children` | `ReactNode` | - | Button label text |
| `onClick` | `() => void` | - | Click handler |
| `className` | `string` | - | Additional CSS classes |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |

## States

Each variant supports five states:

| State | Description |
|-------|-------------|
| Default | Resting state |
| Hover | Mouse over, darker background |
| Pressed | Active/clicked, darkest background |
| Disabled | Non-interactive, grayed out |
| Loading | Spinner overlay, label hidden |

### State Colors by Variant

| Variant | Default | Hover | Pressed | Disabled |
|---------|---------|-------|---------|----------|
| Primary | Neptune `#024DDF` | `#0141B8` | `#033399` | Ammonite `#D6D6D6` |
| Secondary | White + Neptune border | Neptune bg | Darker Neptune | Gray border |
| Tertiary | White + Cosmos border | Neptune bg | Darker Neptune | Gray border |
| Ghost | Transparent | Neptune bg | Darker Neptune | — |
| Inverse | Cosmos `#121212` | `#2A2A2A` | `#3A3A3A` | Ammonite |
| Transactional | Earth `#01A469` | `#018A57` | `#016B45` | Ammonite |

## Styling

### Typography

| Variant | Font | Size | Line Height | Letter Spacing | Transform |
|---------|------|------|-------------|----------------|-----------|
| Standard | Averta Semibold | 16px | 24px | 0.32px (2%) | none |
| Transactional | Averta Semibold | 18px | 26px | 0.36px (2%) | capitalize |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| Horizontal padding | Auditorium | 16px |
| Vertical padding (standard) | — | 10px |
| Vertical padding (transactional) | — | 9px |
| Icon to label gap | Club | 8px |

### Border Radius

All buttons use `4px` border radius.

## Button Widths

| Width Type | Description |
|------------|-------------|
| Hug (default) | Button width fits content |
| Fixed | Set explicit width via className |
| Full | `w-full` to span container width |

## Loading State

When `isLoading` is true:
- Label text becomes invisible (`opacity-0`) to maintain button width
- Animated loading spinner appears centered
- Button remains non-interactive

```tsx
<Button variant="primary" isLoading>
  Processing...
</Button>
```

## Accessibility

### Keyboard Navigation

- **Tab**: Focus the button
- **Enter/Space**: Activate the button
- Focus ring visible on keyboard focus

### ARIA Attributes

```tsx
<button
  type="button"
  disabled={disabled}
  aria-disabled={disabled}
  aria-busy={isLoading}
>
  {children}
</button>
```

### Screen Reader Considerations

- Use descriptive labels that indicate the action
- Loading state announced via `aria-busy`
- Disabled state conveyed through `aria-disabled`

### Focus States

All variants display a visible focus ring:
- 2px Neptune outline
- 2px offset from button edge

## Do's and Don'ts

### Do's

- Use Primary for the main action in a view
- Use Secondary alongside Primary for alternative actions
- Use Transactional for purchase/checkout flows
- Keep labels concise and action-oriented (e.g., "Submit", "Add to Cart")
- Use loading state for async operations
- Maintain consistent sizing within a context

### Don'ts

- Don't use multiple Primary buttons in the same view
- Don't use Ghost buttons for important actions
- Don't change the established color tokens
- Don't use buttons for navigation (use Link instead)
- Don't disable buttons without explanation
- Don't mix button sizes inconsistently

## CSS Custom Properties

```css
:root {
  /* Button Colors */
  --button-primary-bg: var(--color-neptune);
  --button-primary-hover: #0141B8;
  --button-primary-pressed: #033399;

  --button-inverse-bg: var(--color-cosmos);
  --button-transactional-bg: var(--color-earth);

  --button-disabled-bg: var(--color-ammonite);
  --button-disabled-text: var(--color-slate);

  --button-content-white: var(--color-spotlight);

  /* Button Spacing */
  --button-padding-x: var(--space-auditorium);
  --button-padding-y: 10px;
  --button-padding-y-transactional: 9px;
  --button-icon-gap: var(--space-club);

  /* Button Shape */
  --button-radius: 4px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js (button-specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        button: {
          primary: '#024DDF',
          'primary-hover': '#0141B8',
          'primary-pressed': '#033399',
          inverse: '#121212',
          'inverse-hover': '#2A2A2A',
          transactional: '#01A469',
          'transactional-hover': '#018A57',
          disabled: '#D6D6D6',
          'disabled-text': '#949494',
        }
      }
    }
  }
}
```

## Usage Examples

### React Component

```tsx
import { Button } from '@gds/components';

// Primary button
<Button variant="primary" onClick={handleSubmit}>
  Submit
</Button>

// Secondary button
<Button variant="secondary" onClick={handleCancel}>
  Cancel
</Button>

// With icon (left)
<Button variant="primary" icon={<PlusIcon />} iconPosition="left">
  Add Item
</Button>

// With icon (right)
<Button variant="primary" icon={<ArrowIcon />} iconPosition="right">
  Continue
</Button>

// Loading state
<Button variant="primary" isLoading>
  Processing...
</Button>

// Disabled
<Button variant="primary" disabled>
  Unavailable
</Button>

// Transactional (checkout)
<Button variant="transactional" onClick={handleCheckout}>
  Complete Purchase
</Button>

// Full width
<Button variant="primary" className="w-full">
  Sign In
</Button>
```

### Styling with Tailwind

```tsx
// Base button styles
const baseStyles = "inline-flex items-center justify-center gap-club px-auditorium rounded font-averta-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neptune focus:ring-offset-2";

// Variant styles
const variantStyles = {
  primary: "bg-neptune text-white hover:bg-[#0141B8] active:bg-[#033399] py-[10px] text-[16px] leading-[24px] tracking-[0.32px]",
  secondary: "bg-white border border-neptune text-neptune hover:bg-neptune hover:text-white py-[10px] text-[16px] leading-[24px] tracking-[0.32px]",
  tertiary: "bg-white border border-cosmos text-cosmos hover:bg-neptune hover:text-white hover:border-neptune py-[10px] text-[16px] leading-[24px] tracking-[0.32px]",
  ghost: "bg-transparent text-cosmos hover:bg-neptune hover:text-white py-[10px] text-[16px] leading-[24px] tracking-[0.32px]",
  inverse: "bg-cosmos text-white hover:bg-[#2A2A2A] active:bg-[#3A3A3A] py-[10px] text-[16px] leading-[24px] tracking-[0.32px]",
  transactional: "bg-earth text-white hover:bg-[#018A57] active:bg-[#016B45] py-[9px] text-[18px] leading-[26px] tracking-[0.36px] capitalize",
};

// Disabled styles
const disabledStyles = "bg-ammonite text-slate cursor-not-allowed";

// Complete component
<button
  className={cn(
    baseStyles,
    disabled ? disabledStyles : variantStyles[variant]
  )}
  disabled={disabled}
  aria-disabled={disabled}
  aria-busy={isLoading}
>
  {isLoading && (
    <span className="absolute inset-0 flex items-center justify-center">
      <LoadingSpinner />
    </span>
  )}
  <span className={cn(isLoading && "opacity-0")}>
    {iconPosition === 'left' && icon}
    {children}
    {iconPosition === 'right' && icon}
  </span>
</button>
```

## Component Reference

| Use Case | Variant | Icon | Notes |
|----------|---------|------|-------|
| Form submit | Primary | Optional | Main action |
| Cancel/dismiss | Secondary or Tertiary | None | Paired with primary |
| Add to cart | Transactional | Cart icon (left) | Prominent CTA |
| Load more | Ghost | None | Subtle action |
| Continue/Next | Primary | Arrow (right) | Navigation flow |
| Dark section CTA | Inverse | Optional | High contrast |
| Sign in | Primary | None | Full width on mobile |

## Related Components

- [Link](./link.md) - For navigation actions
- [IconButton](./icon-button.md) - For icon-only actions
- [Alert](./alert.md) - Contains action buttons

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-05 | Initial release |

---

## Engineer Documentation

> Query mode: `@engineer button`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { Button } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-button--default)

### Source

`components/Button/index.tsx`

### Full Engineer Documentation

# Button

## Import

```tsx
import { Button } from '@gds/components';
```

## Basic Usage

```tsx
<Button>Content</Button>
```



## Variants

Available variants: `Basic`, `Secondary`, `Tertiary`, `Transaction`, `Disabled`, `Inverse`, `InverseDisabled`, `FullWidth`, `Outline`, `Ghost`, `Loading`, `WithStartIcon`, `WithEndIcon`, `WithBigIcon`, `WithRotatedIcon`, `WithSmallIcon`, `Submit`, `Link`, `DisabledLink`, `WithChevron`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-button--default)

## Source

`components/Button/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe button`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- Button Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#024DDF] text-white font-semibold rounded hover:bg-[#0141B8] focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:ring-offset-2 transition-colors">
  Button Content
</button>

<!-- Variants -->
<!-- primary -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#024DDF] text-white font-semibold rounded hover:bg-[#0141B8]">
  primary
</button>

<!-- secondary -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded border-2 border-[#024DDF] hover:bg-[#024DDF] hover:text-white">
  secondary
</button>

<!-- tertiary -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded hover:bg-[#024DDF]/10">
  tertiary
</button>

<!-- ghost -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#646464] font-semibold rounded hover:bg-[#D6D6D6]/20">
  ghost
</button>

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
| **Figma Node** | 34410:13185 | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

