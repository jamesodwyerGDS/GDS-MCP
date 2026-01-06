---
name: TicketInfo
description: TicketInfo component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-ticket-info--default'
storyId: components-ticket-info--default
sourceFile: components/TicketInfo/index.tsx
---
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
