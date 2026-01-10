---
name: CountdownTimer
description: CountdownTimer component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/CountdownTimer/index.tsx
stylesFile: components/CountdownTimer/index.styles.ts
storiesFile: components/CountdownTimer/__stories__/index.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-countdowntimer--basic'
storyId: components-countdowntimer--basic
tags: []
keywords:
  - countdown-timer
---
# CountdownTimer

## Overview

CountdownTimer component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import CountdownTimer from '@gds/components/CountdownTimer';
// or
import { CountdownTimer } from '@gds/components';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `date` | `string | number | Date` | `-` | Yes | - |
| `timeLeftLabel` | `string` | `-` | Yes | - |
| `colourVariant` | `ColorProps["$colourVariant"]` | `'light'` | No | - |
| `sizeVariant` | `SizingProps["$sizeVariant"]` | `'regular'` | No | - |
| `textPosition` | `SizingProps["$textPosition"]` | `'bottom'` | No | - |
| `timeOnly` | `DisplayVariant["$timeOnly"]` | `false` | No | - |
| `onCountdownEnd` | `() => void` | `-` | No | - |
| `countdownEndA11yMessage` | `string` | `-` | No | - |
| `showDays` | `boolean` | `-` | No | - |
| `multiDay` | `boolean` | `-` | No | - |

## Variants


### Available Story Variants

`Basic`, `ShowDays`, `MultiDay`, `Dark`, `RTL`

## Code Examples

### Basic Usage

```tsx
<CountdownTimer>Content</CountdownTimer>
```



## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
| margin-top | `spacing.hall` | 12px |
| widths */
  ${({ $textPosition, $sizeVariant, $timeOnly }) = | `$sizeVariant === "small" ? "57px" : "70px"` | $sizeVariant === "small" ? "57px" : "70px" |

### Typography

| Property | Token/Value |
|----------|-------------|
| - | See styles file |

### Colors

| Property | Token |
|----------|-------|
| color | `({ theme, $colourVariant` |



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

[View in Storybook](http://localhost:6006/?path=/story/components-countdowntimer--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/CountdownTimer/index.tsx` |
| Styles | `components/CountdownTimer/index.styles.ts` |
| Stories | `components/CountdownTimer/__stories__/index.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
