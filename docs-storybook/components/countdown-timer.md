---
name: CountdownTimer
description: CountdownTimer component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-countdown-timer--default'
storyId: components-countdown-timer--default
sourceFile: components/CountdownTimer/index.tsx
---
# CountdownTimer

## Import

```tsx
import { CountdownTimer } from '@gds/components';
```

## Basic Usage

```tsx
<CountdownTimer>Content</CountdownTimer>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `date` | `string | number | Date` | Yes | - |
| `timeLeftLabel` | `string` | Yes | - |
| `colourVariant` | `ColorProps["$colourVariant"]` | No | - |
| `sizeVariant` | `SizingProps["$sizeVariant"]` | No | - |
| `textPosition` | `SizingProps["$textPosition"]` | No | - |
| `timeOnly` | `DisplayVariant["$timeOnly"]` | No | - |
| `onCountdownEnd` | `() => void` | No | - |
| `countdownEndA11yMessage` | `string` | No | - |
| `showDays` | `boolean` | No | - |
| `multiDay` | `boolean` | No | - |


## Variants

Available variants: `Basic`, `ShowDays`, `MultiDay`, `Dark`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-countdown-timer--default)

## Source

`components/CountdownTimer/index.tsx`
