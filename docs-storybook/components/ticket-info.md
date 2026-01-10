---
name: TicketInfo
description: TicketInfo component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/TicketInfo/index.tsx
stylesFile: components/TicketInfo/index.styles.ts
storiesFile: components/TicketInfo/__stories__/index.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-ticketinfo--basic'
storyId: components-ticketinfo--basic
tags: []
keywords:
  - ticket-info
---
# TicketInfo

## Overview

TicketInfo component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import TicketInfo from '@gds/components/TicketInfo';
// or
import { TicketInfo } from '@gds/components';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `React.ReactNode` | `-` | Yes | - |
| `quantity` | `React.ReactNode` | `-` | No | - |
| `price` | `string` | `-` | No | - |
| `feeContent` | `React.ReactNode` | `-` | No | - |
| `priceRowCta` | `React.ReactNode` | `-` | No | - |
| `section` | `SeatData` | `{section` | No | - |
| `row` | `SeatData` | `{row` | No | - |
| `seat` | `SeatData` | `{seat` | No | - |
| `level` | `SeatData` | `{level` | No | - |
| `restrictions` | `React.ReactNode` | `-` | No | - |
| `portal` | `React.ReactNode` | `-` | No | - |
| `isDisplaySeatDetailsInline` | `boolean` | `false` | No | - |
| `timedEntryDetails` | `string` | `{timedEntryDetails` | No | - |
| `description` | `string` | `{description` | No | - |
| `splitPrice` | `string` | `-` | No | - |
| `customSeatInfo` | `React.ReactNode` | `-` | No | - |
| `ticketInfoCta` | `React.ReactNode` | `-` | No | - |
| `ticketInfoCtaSlot` | `"left" | "right"` | `'left'` | No | - |
| `seatInfoVariant` | `"default" | "noDivider"` | `'default'` | No | - |

## Variants


### Available Story Variants

`Basic`, `WithTitle`, `WithUpsellTitle`, `WithTicketInfoCta`, `WithTicketInfoCtaSlotRight`, `WithFeeContent`, `WithCustomSeatInfo`, `InTicketCard`

## Code Examples

### Basic Usage

```tsx
<TicketInfo>Content</TicketInfo>
```



## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
| margin-top | `spacing.hall` | 12px |
| margin-inline-start | `spacing.auditorium` | 16px |

### Typography

| Property | Token/Value |
|----------|-------------|
| - | See styles file |

### Colors

| Property | Token |
|----------|-------|
| color | `(props) => props.theme.text.secondary` |



## States

| State | Description |
|-------|-------------|
| Default | Resting state |
| Hover | Mouse over (`:hover`) |
| Focus | Keyboard focus (`:focus`) with visible outline |
| Active | Pressed state (`:active`) |
| Disabled | Non-interactive (`disabled` prop or `aria-disabled`) |

## Accessibility

- **Keyboard navigation**: Component follows WAI-ARIA patterns where applicable
- **Focus indicators**: Visible focus states with `outline-offset: 4px`
- **Screen readers**: Semantic HTML with ARIA attributes where needed
- **High contrast**: Supports `forced-colors` mode

## Do's and Don'ts

### Do's

- Use consistent variants within the same context
- Follow spacing guidelines from the design system
- Provide accessible labels where needed

### Don'ts

- Don't override the component's built-in accessibility features
- Don't use deprecated props without planning migration
- Don't mix incompatible variant combinations

## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-ticketinfo--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/TicketInfo/index.tsx` |
| Styles | `components/TicketInfo/index.styles.ts` |
| Stories | `components/TicketInfo/__stories__/index.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
