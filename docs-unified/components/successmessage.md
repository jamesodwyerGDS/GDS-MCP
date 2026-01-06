---
name: Successmessage
description: Unified documentation for Successmessage component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-success-message--default'
sourceFile: components/SuccessMessage/index.tsx
---
# Successmessage

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Successmessage |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design successmessage`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer successmessage`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { SuccessMessage } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-success-message--default)

### Source

`components/SuccessMessage/index.tsx`

### Full Engineer Documentation

# SuccessMessage

## Import

```tsx
import { SuccessMessage } from '@gds/components';
```

## Basic Usage

```tsx
<SuccessMessage>Content</SuccessMessage>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | No | - |
| `className` | `string` | No | - |
| `id` | `string` | No | - |


## Variants

Available variants: `Basic`, `MultipleMessages`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-success-message--default)

## Source

`components/SuccessMessage/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe successmessage`
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

