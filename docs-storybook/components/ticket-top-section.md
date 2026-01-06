---
name: TicketTopSection
description: TicketTopSection component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-ticket-top-section--default'
storyId: components-ticket-top-section--default
sourceFile: components/TicketTopSection/TicketTopSection.tsx
---
# TicketTopSection

## Import

```tsx
import { TicketTopSection } from '@gds/components';
```

## Basic Usage

```tsx
<TicketTopSection>Content</TicketTopSection>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `accessibleTitle` | `string` | No | - |
| `headerTitle` | `string` | Yes | - |
| `row` | `SeatLocation` | No | - |
| `seat` | `SeatLocation` | No | - |
| `section` | `SeatLocation` | No | - |
| `ticketInfoButtonData` | `TicketInfoButtonData` | No | - |
| `type` | `TicketType` | Yes | - |
| `wayfindingColors` | `BrandColors` | No | - |
| `voucherDisclaimer` | `string` | No | - |


## Variants

Available variants: `Primary`, `Transfer`, `Resale`, `WithoutCtaButton`, `WithAccessibleTitle`, `WithAccessibleTitleAndNoHeaderTitle`, `Disabled`, `WithWayfindingLight`, `WithWayfindingDark`, `ShouldNotShowWayfinding`, `WithAddedValue`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-ticket-top-section--default)

## Source

`components/TicketTopSection/TicketTopSection.tsx`
