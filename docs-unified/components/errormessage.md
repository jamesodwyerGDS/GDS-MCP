---
name: Errormessage
description: Unified documentation for Errormessage component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-error-message--default'
sourceFile: components/ErrorMessage/index.tsx
---
# Errormessage

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Errormessage |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design errormessage`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer errormessage`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { ErrorMessage } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-error-message--default)

### Source

`components/ErrorMessage/index.tsx`

### Full Engineer Documentation

# ErrorMessage

## Import

```tsx
import { ErrorMessage } from '@gds/components';
```

## Basic Usage

```tsx
<ErrorMessage>Content</ErrorMessage>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `className` | `string` | No | - |
| `id` | `string` | No | - |


## Variants

Available variants: `Basic`, `MultipleErrors`, `LiveError`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-error-message--default)

## Source

`components/ErrorMessage/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe errormessage`
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

