---
name: SeatInfov2
description: SeatInfov2 component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-seat-infov2--default'
storyId: components-seat-infov2--default
sourceFile: components/SeatInfov2/SeatInfov2.tsx
---
# SeatInfov2

## Import

```tsx
import { SeatInfov2 } from '@gds/components';
```

## Basic Usage

```tsx
<SeatInfov2>Content</SeatInfov2>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `row` | `SeatLocation` | No | - |
| `seat` | `SeatLocation` | No | - |
| `section` | `SeatLocation` | No | - |
| `type` | `TicketType` | Yes | - |
| `wayfindingColors` | `BrandColors` | No | - |


## Variants

Available variants: `Default`, `LongValues`, `Disabled`, `Transfer`, `Resale`, `WithWayfindingLight`, `WithWayfindingDark`, `TransferShouldNotShowWayfinding`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-seat-infov2--default)

## Source

`components/SeatInfov2/SeatInfov2.tsx`
