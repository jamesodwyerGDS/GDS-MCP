---
name: Countdown
description: Unified documentation for Countdown component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-countdown--default'
sourceFile: components/Countdown/Countdown.tsx
---
# Countdown

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Countdown |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design countdown`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer countdown`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { Countdown } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-countdown--default)

### Source

`components/Countdown/Countdown.tsx`

### Full Engineer Documentation

# Countdown

## Import

```tsx
import { Countdown } from '@gds/components';
```

## Basic Usage

```tsx
<Countdown>Content</Countdown>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `date` | `string | number | Date` | Yes | - |
| `fillVariant` | `FillVariant` | No | - |
| `hideDays` | `boolean` | No | - |
| `hideHours` | `boolean` | No | - |
| `hideSeconds` | `boolean` | No | - |
| `inverse` | `boolean` | No | - |
| `labels` | `Labels` | Yes | - |
| `size` | `Size` | Yes | - |
| `timeLeftLabel` | `string` | Yes | - |
| `fullWidth` | `boolean` | No | - |


## Variants

Available variants: `Responsive`, `Ghost`, `Outline`, `Fill`, `InverseGhost`, `InverseOutline`, `InverseFill`, `HideDays`, `HideDaysAndSeconds`, `HideDaysAndHours`, `HideSeconds`, `FullWidth`, `Small`, `Medium`, `Large`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-countdown--default)

## Source

`components/Countdown/Countdown.tsx`

---

## Vibe Documentation

> Query mode: `@vibe countdown`
> Styling: **Tailwind CSS** (utility classes)

*No vibe documentation available for this component.*


---

## Comparison: Design vs Code

| Aspect | Design (@design) | Code (@engineer) |
|--------|------------------|------------------|
| **Status** | - | In Storybook |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `@gds/components` |
| **Figma Node** | - | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

