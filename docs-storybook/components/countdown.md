---
name: Countdown
description: Countdown component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-countdown--default'
storyId: components-countdown--default
sourceFile: components/Countdown/Countdown.tsx
---
# Countdown

## Import

```tsx
import { Countdown } from '@gds/components';
```

## Basic Usage

```tsx
<Countdown>Content</Countdown>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `date` | `string | number | Date` | Yes | - |
| `fillVariant` | `FillVariant` | No | - |
| `hideDays` | `boolean` | No | - |
| `hideHours` | `boolean` | No | - |
| `hideSeconds` | `boolean` | No | - |
| `inverse` | `boolean` | No | - |
| `labels` | `Labels` | Yes | - |
| `size` | `Size` | Yes | - |
| `timeLeftLabel` | `string` | Yes | - |
| `fullWidth` | `boolean` | No | - |


## Variants

Available variants: `Responsive`, `Ghost`, `Outline`, `Fill`, `InverseGhost`, `InverseOutline`, `InverseFill`, `HideDays`, `HideDaysAndSeconds`, `HideDaysAndHours`, `HideSeconds`, `FullWidth`, `Small`, `Medium`, `Large`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-countdown--default)

## Source

`components/Countdown/Countdown.tsx`
