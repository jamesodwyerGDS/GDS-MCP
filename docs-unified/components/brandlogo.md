---
name: Brandlogo
description: Unified documentation for Brandlogo component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-brand-logo--default'
sourceFile: components/BrandLogo/BrandLogo.tsx
---
# Brandlogo

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Brandlogo |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design brandlogo`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer brandlogo`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { BrandLogo } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-brand-logo--default)

### Source

`components/BrandLogo/BrandLogo.tsx`

### Full Engineer Documentation

# BrandLogo

## Import

```tsx
import { BrandLogo } from '@gds/components';
```

## Basic Usage

```tsx
<BrandLogo>Content</BrandLogo>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `color` | `string` | No | - |
| `className` | `string` | No | - |


## Variants

Available variants: `Dark`, `Light`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-brand-logo--default)

## Source

`components/BrandLogo/BrandLogo.tsx`

---

## Vibe Documentation

> Query mode: `@vibe brandlogo`
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

