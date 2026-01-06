---
name: Ticketcardv2
description: Unified documentation for Ticketcardv2 component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-ticket-cardv2--default'
sourceFile: components/TicketCardv2/TicketCardv2.tsx
---
# Ticketcardv2

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Ticketcardv2 |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design ticketcardv2`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer ticketcardv2`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { TicketCardv2 } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-ticket-cardv2--default)

### Source

`components/TicketCardv2/TicketCardv2.tsx`

### Full Engineer Documentation

# TicketCardv2

## Import

```tsx
import { TicketCardv2 } from '@gds/components';
```

## Basic Usage

```tsx
<TicketCardv2>Content</TicketCardv2>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | - |
| `excludeLogo` | `boolean` | No | - |
| `status` | `TicketType` | No | - |
| `wayfindingColors` | `BrandColors` | No | - |


## Variants

Available variants: `Primary`, `PrimaryWithoutBranding`, `Resale`, `Disabled`, `Transfer`, `Upsell`, `WithWayfindingLight`, `WithWayfindingDark`, `WithTicketTopSection`, `WithTicketTopSectionGenericLight`, `WithTicketTopSectionGenericDark`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-ticket-cardv2--default)

## Source

`components/TicketCardv2/TicketCardv2.tsx`

---

## Vibe Documentation

> Query mode: `@vibe ticketcardv2`
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

