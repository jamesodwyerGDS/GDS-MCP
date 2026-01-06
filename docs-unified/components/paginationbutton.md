---
name: Paginationbutton
description: Unified documentation for Paginationbutton component
audiences:
  - engineer
  - vibe
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-pagination-button--default'
sourceFile: components/PaginationButton/index.tsx
---
# Paginationbutton

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Paginationbutton |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer, Vibe |


---

## Design Documentation

> Query mode: `@design paginationbutton`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer paginationbutton`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { PaginationButton } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-pagination-button--default)

### Source

`components/PaginationButton/index.tsx`

### Full Engineer Documentation

# PaginationButton

## Import

```tsx
import { PaginationButton } from '@gds/components';
```

## Basic Usage

```tsx
<PaginationButton>Content</PaginationButton>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onClick` | `() => void` | Yes | - |
| `total` | `number` | Yes | - |
| `count` | `number` | Yes | - |
| `buttonLabel` | `string` | Yes | - |
| `recapLabel` | `ReactNode` | Yes | - |
| `reverseChevron` | `boolean` | No | - |
| `inverse` | `boolean` | No | - |
| `className` | `string` | No | - |


## Variants

Available variants: `Basic`, `Inverse`, `BadExample`, `ReverseExample`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-pagination-button--default)

## Source

`components/PaginationButton/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe paginationbutton`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- Pagination Button Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<div class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#024DDF] text-white font-semibold rounded-lg hover:bg-[#0141B8] focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:ring-offset-2 transition-colors">
  Pagination Button Content
</div>

<!-- Variants -->
<!-- primary -->
<div class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#024DDF] text-white font-semibold rounded-lg hover:bg-[#0141B8]">
  primary
</div>

<!-- secondary -->
<div class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded-lg border-2 border-[#024DDF] hover:bg-[#024DDF] hover:text-white">
  secondary
</div>

<!-- tertiary -->
<div class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded-lg hover:bg-[#024DDF]/10">
  tertiary
</div>

<!-- ghost -->
<div class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#646464] font-semibold rounded-lg hover:bg-[#D6D6D6]/20">
  ghost
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

