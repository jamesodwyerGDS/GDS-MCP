---
name: Sharecard
description: Unified documentation for Sharecard component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-share-card--default'
sourceFile: components/ShareCard/index.tsx
---
# Sharecard

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Sharecard |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design sharecard`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer sharecard`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { ShareCard } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-share-card--default)

### Source

`components/ShareCard/index.tsx`

### Full Engineer Documentation

# ShareCard

## Import

```tsx
import { ShareCard } from '@gds/components';
```

## Basic Usage

```tsx
<ShareCard>Content</ShareCard>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `imageUrl` | `string` | Yes | - |
| `cardTitle` | `string` | Yes | - |
| `pretext` | `string` | Yes | - |
| `text` | `string` | Yes | - |
| `subtext` | `string` | Yes | - |
| `headingLevel` | `"h1" | "h2" | "h3" | "h4" | "h5" | "h6"` | Yes | - |
| `onError` | `(e: React.SyntheticEvent<HTMLImageElement, Event>) => void` | No | - |


## Variants

Available variants: `Basic`, `Clamped`, `WithDownload`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-share-card--default)

## Source

`components/ShareCard/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe sharecard`
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

