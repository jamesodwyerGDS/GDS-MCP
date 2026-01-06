---
name: Card
description: Unified documentation for Card component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-card--default'
sourceFile: components/Card/index.ts
---
# Card

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Card |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design card`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer card`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { Card } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-card--default)

### Source

`components/Card/index.ts`

### Full Engineer Documentation

# Card

## Import

```tsx
import { Card } from '@gds/components';
```

## Basic Usage

```tsx
<Card>Content</Card>
```



## Variants

Available variants: `TitleOnly`, `Complex`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-card--default)

## Source

`components/Card/index.ts`

---

## Vibe Documentation

> Query mode: `@vibe card`
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

