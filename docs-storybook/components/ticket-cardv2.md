---
name: TicketCardv2
description: TicketCardv2 component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/TicketCardv2/TicketCardv2.tsx
stylesFile: null
storiesFile: components/TicketCardv2/__stories__/TicketCardv2.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-ticketcardv2--basic'
storyId: components-ticketcardv2--basic
tags: []
keywords:
  - ticket-cardv2
---
# TicketCardv2

## Overview

TicketCardv2 component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import TicketCardv2 from '@gds/components/TicketCardv2';
// or
import { TicketCardv2 } from '@gds/components';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `React.ReactNode` | `-` | Yes | - |
| `excludeLogo` | `boolean` | `false` | No | - |
| `status` | `TicketType` | `'primary'` | No | - |
| `wayfindingColors` | `BrandColors` | `{status === 'primary' ? wayfindingColors : undefined` | No | - |

## Variants


### Available Story Variants

`Primary`, `PrimaryWithoutBranding`, `Resale`, `Disabled`, `Transfer`, `Upsell`, `WithWayfindingLight`, `WithWayfindingDark`, `WithTicketTopSection`, `WithTicketTopSectionGenericLight`, `WithTicketTopSectionGenericDark`

## Code Examples

### Basic Usage

```tsx
<TicketCardv2>Content</TicketCardv2>
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
| - | See styles file |



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

[View in Storybook](http://localhost:6006/?path=/story/components-ticketcardv2--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/TicketCardv2/TicketCardv2.tsx` |

| Stories | `components/TicketCardv2/__stories__/TicketCardv2.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
