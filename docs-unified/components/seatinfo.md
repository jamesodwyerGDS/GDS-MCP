---
name: Seatinfo
description: Unified documentation for Seatinfo component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-seat-info--default'
sourceFile: components/SeatInfo/index.tsx
---
# Seatinfo

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Seatinfo |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design seatinfo`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer seatinfo`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { SeatInfo } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-seat-info--default)

### Source

`components/SeatInfo/index.tsx`

### Full Engineer Documentation

# SeatInfo

## Import

```tsx
import { SeatInfo } from '@gds/components';
```

## Basic Usage

```tsx
<SeatInfo>Content</SeatInfo>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `timedEntryDetails` | `string` | No | - |
| `level` | `SeatData` | No | - |
| `section` | `SeatData` | No | - |
| `row` | `SeatData` | No | - |
| `seat` | `SeatData` | No | - |
| `isDisplayInline` | `boolean` | No | - |
| `description` | `string` | No | - |
| `className` | `string` | No | - |
| `styleVariant` | `"default" | "noDivider"` | No | - |




## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-seat-info--default)

## Source

`components/SeatInfo/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe seatinfo`
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

