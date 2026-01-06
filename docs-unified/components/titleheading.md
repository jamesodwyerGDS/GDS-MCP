---
name: Titleheading
description: Unified documentation for Titleheading component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-title-heading--default'
sourceFile: components/TitleHeading/index.tsx
---
# Titleheading

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Titleheading |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design titleheading`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer titleheading`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { TitleHeading } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-title-heading--default)

### Source

`components/TitleHeading/index.tsx`

### Full Engineer Documentation

# TitleHeading

## Import

```tsx
import { TitleHeading } from '@gds/components';
```

## Basic Usage

```tsx
<TitleHeading>Content</TitleHeading>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `as` | `ElementType` | No | - |
| `size` | `Size` | No | - |
| `className` | `string` | No | - |


## Variants

Available variants: `Basic`, `Sizes`, `AsHeadingLevel2`, `LongTitle`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-title-heading--default)

## Source

`components/TitleHeading/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe titleheading`
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

