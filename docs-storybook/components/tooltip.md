---
name: Tooltip
description: Tooltip component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-tooltip--default'
storyId: components-tooltip--default
sourceFile: components/Tooltip/index.tsx
---
# Tooltip

## Import

```tsx
import { Tooltip } from '@gds/components';
```

## Basic Usage

```tsx
<Tooltip>Content</Tooltip>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | - |
| `enableClick` | `boolean` | No | - |
| `enableHover` | `boolean` | No | - |
| `headerHeight` | `number` | No | - |
| `id` | `string` | Yes | - |
| `message` | `ReactNode` | Yes | - |
| `positionX` | `PositionX` | No | - |
| `positionY` | `PositionY` | No | - |
| `fixPosition` | `boolean` | No | - |
| `root` | `HTMLElement | null` | No | - |
| `zIndex` | `number` | No | - |
| `desktopBreakpoint` | `number` | No | - |


## Variants

Available variants: `Basic`, `StartBottom`, `CentreBottom`, `EndBottom`, `StartTop`, `CentreTop`, `EndTop`, `WithComponentMessage`, `AllPositions`, `ScrollablePosition`, `Custom`, `CustomWithOffset`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-tooltip--default)

## Source

`components/Tooltip/index.tsx`
