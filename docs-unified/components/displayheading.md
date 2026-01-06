---
name: Displayheading
description: Unified documentation for Displayheading component
audiences:
  - engineer
  - vibe
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-display-heading--default'
sourceFile: components/DisplayHeading/DisplayHeading.tsx
---
# Displayheading

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Displayheading |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer, Vibe |


---

## Design Documentation

> Query mode: `@design displayheading`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer displayheading`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { DisplayHeading } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-display-heading--default)

### Source

`components/DisplayHeading/DisplayHeading.tsx`

### Full Engineer Documentation

# DisplayHeading

## Import

```tsx
import { DisplayHeading } from '@gds/components';
```

## Basic Usage

```tsx
<DisplayHeading>Content</DisplayHeading>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `as` | `ElementType` | No | - |
| `inverse` | `boolean` | No | - |
| `size` | `Size` | Yes | - |
| `uppercase` | `boolean` | No | - |


## Variants

Available variants: `AsHeadingLevel2`, `LongTitle`, `Inverse`, `Medium`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-display-heading--default)

## Source

`components/DisplayHeading/DisplayHeading.tsx`

---

## Vibe Documentation

> Query mode: `@vibe displayheading`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- Display Heading Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<div class="p-4 rounded-lg">
  Display Heading Content
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

