---
name: Checkbox
description: Unified documentation for Checkbox component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-checkbox--default'
sourceFile: components/Checkbox/index.tsx
---
# Checkbox

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Checkbox |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design checkbox`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer checkbox`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { Checkbox } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-checkbox--default)

### Source

`components/Checkbox/index.tsx`

### Full Engineer Documentation

# Checkbox

## Import

```tsx
import { Checkbox } from '@gds/components';
```

## Basic Usage

```tsx
<Checkbox>Content</Checkbox>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | - |
| `id` | `string` | Yes | - |
| `label` | `ReactNode` | Yes | - |
| `disabled` | `boolean` | No | - |
| `required` | `boolean` | No | - |
| `flipOrder` | `boolean` | No | - |
| `isIndeterminate` | `boolean` | No | - |


## Variants

Available variants: `Basic`, `Disabled`, `WithErrorMessage`, `ErrorWithoutMessage`, `Indeterminate`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-checkbox--default)

## Source

`components/Checkbox/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe checkbox`
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

