---
name: Loadingspinner
description: Unified documentation for Loadingspinner component
audiences:
  - engineer
  - vibe
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-loading-spinner--default'
sourceFile: components/LoadingSpinner/index.tsx
---
# Loadingspinner

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Loadingspinner |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer, Vibe |


---

## Design Documentation

> Query mode: `@design loadingspinner`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer loadingspinner`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { LoadingSpinner } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-loading-spinner--default)

### Source

`components/LoadingSpinner/index.tsx`

### Full Engineer Documentation

# LoadingSpinner

## Import

```tsx
import { LoadingSpinner } from '@gds/components';
```

## Basic Usage

```tsx
<LoadingSpinner>Content</LoadingSpinner>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `string` | No | - |
| `size` | `Size` | No | - |
| `colorVariant` | `ColorVariant` | No | - |
| `className` | `string` | No | - |


## Variants

Available variants: `Basic`, `Small`, `Medium`, `Large`, `Secondary`, `Inverse`, `Message`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-loading-spinner--default)

## Source

`components/LoadingSpinner/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe loadingspinner`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- Loading Spinner Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<div class="p-4 rounded-lg">
  Loading Spinner Content
</div>

<!-- States -->
<!-- Hover: Add hover: prefix to classes -->
<!-- Focus: Add focus: prefix to classes -->
<!-- Disabled: Add disabled:opacity-50 disabled:cursor-not-allowed -->

```


---

## Comparison: Design vs Code

| Aspect | Design (@design) | Code (@engineer) |
|--------|------------------|------------------|
| **Status** | - | In Storybook |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `@gds/components` |
| **Figma Node** | - | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

