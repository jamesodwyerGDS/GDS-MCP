---
name: Countdown
description: Countdown component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/Countdown/Countdown.tsx
stylesFile: null
storiesFile: components/Countdown/__stories__/Countdown.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-countdown--basic'
storyId: components-countdown--basic
tags: []
keywords:
  - countdown
---
# Countdown

## Overview

Countdown component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import Countdown from '@gds/components/Countdown';
// or
import { Countdown } from '@gds/components';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `date` | `string | number | Date` | `-` | Yes | - |
| `fillVariant` | `FillVariant` | `'fill'` | No | - |
| `hideDays` | `boolean` | `-` | No | - |
| `hideHours` | `boolean` | `-` | No | - |
| `hideSeconds` | `boolean` | `-` | No | - |
| `inverse` | `boolean` | `false` | No | - |
| `labels` | `Labels` | `-` | Yes | - |
| `size` | `Size` | `{size` | Yes | - |
| `timeLeftLabel` | `string` | `-` | Yes | - |
| `fullWidth` | `boolean` | `false` | No | - |

## Variants


### Available Story Variants

`Responsive`, `Ghost`, `Outline`, `Fill`, `InverseGhost`, `InverseOutline`, `InverseFill`, `HideDays`, `HideDaysAndSeconds`, `HideDaysAndHours`, `HideSeconds`, `FullWidth`, `Small`, `Medium`, `Large`

## Code Examples

### Basic Usage

```tsx
<Countdown>Content</Countdown>
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

[View in Storybook](http://localhost:6006/?path=/story/components-countdown--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/Countdown/Countdown.tsx` |

| Stories | `components/Countdown/__stories__/Countdown.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
