---
name: Textinput
description: Unified documentation for Textinput component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-text-input--default'
sourceFile: components/TextInput/index.tsx
---
# Textinput

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Textinput |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design textinput`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer textinput`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { TextInput } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-text-input--default)

### Source

`components/TextInput/index.tsx`

### Full Engineer Documentation

# TextInput

## Import

```tsx
import { TextInput } from '@gds/components';
```

## Basic Usage

```tsx
<TextInput>Content</TextInput>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | - |
| `id` | `string` | Yes | - |
| `label` | `ReactNode` | Yes | - |
| `disabled` | `boolean` | No | - |
| `readOnly` | `boolean` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `errorMessage` | `ReactNode` | No | - |
| `successMessage` | `ReactNode` | No | - |
| `required` | `boolean` | No | - |
| `startIcon` | `ReactNode` | No | - |
| `endIcon` | `ReactNode` | No | - |
| `onClearButtonClick` | `() => void` | No | - |
| `clearButtonLabel` | `string` | No | - |


## Variants

Available variants: `Disabled`, `ReadOnly`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-text-input--default)

## Source

`components/TextInput/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe textinput`
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

