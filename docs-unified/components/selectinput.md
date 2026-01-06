---
name: Selectinput
description: Unified documentation for Selectinput component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-select-input--default'
sourceFile: components/SelectInput/index.tsx
---
# Selectinput

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Selectinput |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design selectinput`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer selectinput`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { SelectInput } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-select-input--default)

### Source

`components/SelectInput/index.tsx`

### Full Engineer Documentation

# SelectInput

## Import

```tsx
import { SelectInput } from '@gds/components';
```

## Basic Usage

```tsx
<SelectInput>Content</SelectInput>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | - |
| `id` | `string` | Yes | - |
| `isPillVariant` | `boolean` | No | - |
| `autoComplete` | `string` | No | - |
| `label` | `React.ReactNode` | No | - |
| `onChange` | `React.ChangeEventHandler<HTMLSelectElement>` | No | - |
| `value` | `string | number` | No | - |
| `disabled` | `boolean` | No | - |
| `required` | `boolean` | No | - |
| `startIcon` | `React.ReactNode` | No | - |
| `children` | `React.ReactNode` | Yes | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `errorMessage` | `string` | No | - |


## Variants

Available variants: `Basic`, `WithStartIcon`, `WithError`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-select-input--default)

## Source

`components/SelectInput/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe selectinput`
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

