---
name: Header
description: Unified documentation for Header component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-header--default'
sourceFile: components/Header/index.tsx
---
# Header

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Header |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design header`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer header`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { Header } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-header--default)

### Source

`components/Header/index.tsx`

### Full Engineer Documentation

# Header

## Import

```tsx
import { Header } from '@gds/components';
```

## Basic Usage

```tsx
<Header>Content</Header>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | No | - |


## Variants

Available variants: `Basic`, `WithAccountButton`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-header--default)

## Source

`components/Header/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe header`
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

