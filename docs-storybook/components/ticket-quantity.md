---
name: TicketQuantity
description: TicketQuantity component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/TicketQuantity/index.tsx
stylesFile: components/TicketQuantity/index.styles.ts
storiesFile: components/TicketQuantity/__stories__/index.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-ticketquantity--basic'
storyId: components-ticketquantity--basic
tags: []
keywords:
  - ticket-quantity
---
# TicketQuantity

## Overview

TicketQuantity component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import TicketQuantity from '@gds/components/TicketQuantity';
// or
import { TicketQuantity } from '@gds/components';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `quantity` | `number` | `-` | Yes | - |
| `icon` | `React.ReactNode` | `-` | No | - |
| `color` | `string` | `{color` | No | - |
| `a11yLabel` | `string` | `-` | Yes | - |

## Variants


### Available Story Variants

`Basic`, `WithCustomIcon`

## Code Examples

### Basic Usage

```tsx
<TicketQuantity>Content</TicketQuantity>
```



## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
| - | See styles file | - |

### Typography

| Property | Token/Value |
|----------|-------------|
| - | See styles file |

### Colors

| Property | Token |
|----------|-------|
| color | `(props) =>
    props.theme.text[props.color as keyof typeof props.theme.text] ||
    props.color ||
    props.theme.text.secondary` |



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

[View in Storybook](http://localhost:6006/?path=/story/components-ticketquantity--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/TicketQuantity/index.tsx` |
| Styles | `components/TicketQuantity/index.styles.ts` |
| Stories | `components/TicketQuantity/__stories__/index.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
