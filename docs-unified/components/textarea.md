---
name: Textarea
description: Unified documentation for Textarea component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-text-area--default'
sourceFile: components/TextArea/index.tsx
---
# Textarea

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Textarea |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design textarea`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer textarea`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { TextArea } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-text-area--default)

### Source

`components/TextArea/index.tsx`

### Full Engineer Documentation

# TextArea

## Import

```tsx
import { TextArea } from '@gds/components';
```

## Basic Usage

```tsx
<TextArea>Content</TextArea>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | - |
| `id` | `string` | Yes | - |
| `label` | `React.ReactNode` | Yes | - |
| `rows` | `number` | No | - |
| `value` | `string` | No | - |
| `disabled` | `boolean` | No | - |
| `readOnly` | `boolean` | No | - |
| `required` | `boolean` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `errorMessage` | `string` | No | - |
| `onChange` | `React.ChangeEventHandler<HTMLTextAreaElement>` | No | - |


## Variants

Available variants: `Basic`, `WithPlaceholder`, `Disabled`, `WithError`, `ReadOnly`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-text-area--default)

## Source

`components/TextArea/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe textarea`
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

