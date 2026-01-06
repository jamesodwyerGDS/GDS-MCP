---
name: Skeleton
description: Unified documentation for Skeleton component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-skeleton--default'
sourceFile: components/Skeleton/Skeleton.tsx
---
# Skeleton

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Skeleton |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design skeleton`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer skeleton`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { Skeleton } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-skeleton--default)

### Source

`components/Skeleton/Skeleton.tsx`

### Full Engineer Documentation

# Skeleton

## Import

```tsx
import { Skeleton } from '@gds/components';
```

## Basic Usage

```tsx
<Skeleton>Content</Skeleton>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `width` | `string` | No | - |
| `height` | `string` | No | - |
| `className` | `string` | No | - |


## Variants

Available variants: `Basic`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-skeleton--default)

## Source

`components/Skeleton/Skeleton.tsx`

---

## Vibe Documentation

> Query mode: `@vibe skeleton`
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

