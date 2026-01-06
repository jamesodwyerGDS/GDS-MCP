---
name: Ticketinfo
description: Unified documentation for Ticketinfo component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-ticket-info--default'
sourceFile: components/TicketInfo/index.tsx
---
# Ticketinfo

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Ticketinfo |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design ticketinfo`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer ticketinfo`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { TicketInfo } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-ticket-info--default)

### Source

`components/TicketInfo/index.tsx`

### Full Engineer Documentation

# TicketInfo

## Import

```tsx
import { TicketInfo } from '@gds/components';
```

## Basic Usage

```tsx
<TicketInfo>Content</TicketInfo>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `React.ReactNode` | Yes | - |
| `quantity` | `React.ReactNode` | No | - |
| `price` | `string` | No | - |
| `feeContent` | `React.ReactNode` | No | - |
| `priceRowCta` | `React.ReactNode` | No | - |
| `section` | `SeatData` | No | - |
| `row` | `SeatData` | No | - |
| `seat` | `SeatData` | No | - |
| `level` | `SeatData` | No | - |
| `restrictions` | `React.ReactNode` | No | - |
| `portal` | `React.ReactNode` | No | - |
| `isDisplaySeatDetailsInline` | `boolean` | No | - |
| `timedEntryDetails` | `string` | No | - |
| `description` | `string` | No | - |
| `splitPrice` | `string` | No | - |
| `customSeatInfo` | `React.ReactNode` | No | - |
| `ticketInfoCta` | `React.ReactNode` | No | - |
| `ticketInfoCtaSlot` | `"left" | "right"` | No | - |
| `seatInfoVariant` | `"default" | "noDivider"` | No | - |


## Variants

Available variants: `Basic`, `WithTitle`, `WithUpsellTitle`, `WithTicketInfoCta`, `WithTicketInfoCtaSlotRight`, `WithFeeContent`, `WithCustomSeatInfo`, `InTicketCard`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-ticket-info--default)

## Source

`components/TicketInfo/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe ticketinfo`
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

