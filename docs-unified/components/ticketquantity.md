---
name: Ticketquantity
description: Unified documentation for Ticketquantity component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-ticket-quantity--default'
sourceFile: components/TicketQuantity/index.tsx
---
# Ticketquantity

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Ticketquantity |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design ticketquantity`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer ticketquantity`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { TicketQuantity } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-ticket-quantity--default)

### Source

`components/TicketQuantity/index.tsx`

### Full Engineer Documentation

# TicketQuantity

## Import

```tsx
import { TicketQuantity } from '@gds/components';
```

## Basic Usage

```tsx
<TicketQuantity>Content</TicketQuantity>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `quantity` | `number` | Yes | - |
| `icon` | `React.ReactNode` | No | - |
| `color` | `string` | No | - |
| `a11yLabel` | `string` | Yes | - |


## Variants

Available variants: `Basic`, `WithCustomIcon`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-ticket-quantity--default)

## Source

`components/TicketQuantity/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe ticketquantity`
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

