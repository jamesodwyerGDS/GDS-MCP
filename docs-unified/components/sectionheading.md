---
name: Sectionheading
description: Unified documentation for Sectionheading component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-section-heading--default'
sourceFile: components/SectionHeading/index.tsx
---
# Sectionheading

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Sectionheading |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design sectionheading`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer sectionheading`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { SectionHeading } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-section-heading--default)

### Source

`components/SectionHeading/index.tsx`

### Full Engineer Documentation

# SectionHeading

## Import

```tsx
import { SectionHeading } from '@gds/components';
```

## Basic Usage

```tsx
<SectionHeading>Content</SectionHeading>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isCentered` | `boolean` | No | - |


## Variants

Available variants: `Basic`, `Centered`, `Small`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-section-heading--default)

## Source

`components/SectionHeading/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe sectionheading`
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

