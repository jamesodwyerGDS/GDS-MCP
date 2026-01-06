---
name: Seatinfov2
description: Unified documentation for Seatinfov2 component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-seat-infov2--default'
sourceFile: components/SeatInfov2/SeatInfov2.tsx
---
# Seatinfov2

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Seatinfov2 |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design seatinfov2`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer seatinfov2`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { SeatInfov2 } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-seat-infov2--default)

### Source

`components/SeatInfov2/SeatInfov2.tsx`

### Full Engineer Documentation

# SeatInfov2

## Import

```tsx
import { SeatInfov2 } from '@gds/components';
```

## Basic Usage

```tsx
<SeatInfov2>Content</SeatInfov2>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `row` | `SeatLocation` | No | - |
| `seat` | `SeatLocation` | No | - |
| `section` | `SeatLocation` | No | - |
| `type` | `TicketType` | Yes | - |
| `wayfindingColors` | `BrandColors` | No | - |


## Variants

Available variants: `Default`, `LongValues`, `Disabled`, `Transfer`, `Resale`, `WithWayfindingLight`, `WithWayfindingDark`, `TransferShouldNotShowWayfinding`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-seat-infov2--default)

## Source

`components/SeatInfov2/SeatInfov2.tsx`

---

## Vibe Documentation

> Query mode: `@vibe seatinfov2`
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

