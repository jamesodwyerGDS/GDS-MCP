---
name: Textarealimited
description: Unified documentation for Textarealimited component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-text-area-limited--default'
sourceFile: components/TextAreaLimited/index.tsx
---
# Textarealimited

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Textarealimited |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design textarealimited`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer textarealimited`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { TextAreaLimited } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-text-area-limited--default)

### Source

`components/TextAreaLimited/index.tsx`

### Full Engineer Documentation

# TextAreaLimited

## Import

```tsx
import { TextAreaLimited } from '@gds/components';
```

## Basic Usage

```tsx
<TextAreaLimited>Content</TextAreaLimited>
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
| `errorMessage` | `string` | No | - |
| `characterLimit` | `number` | Yes | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `renderCharacterLimit` | `(limit: number) => React.ReactNode` | No | - |
| `onChange` | `React.ChangeEventHandler<HTMLTextAreaElement>` | No | - |


## Variants

Available variants: `Basic`, `TranslatedCharacterLimit`, `StyledCharacterLimit`, `NoRenderCharacterLimit`, `Disabled`, `ReadOnly`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-text-area-limited--default)

## Source

`components/TextAreaLimited/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe textarealimited`
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

