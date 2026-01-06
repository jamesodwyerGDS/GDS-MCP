---
name: PaginationButton
description: PaginationButton component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-pagination-button--default'
storyId: components-pagination-button--default
sourceFile: components/PaginationButton/index.tsx
---
# PaginationButton

## Import

```tsx
import { PaginationButton } from '@gds/components';
```

## Basic Usage

```tsx
<PaginationButton>Content</PaginationButton>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onClick` | `() => void` | Yes | - |
| `total` | `number` | Yes | - |
| `count` | `number` | Yes | - |
| `buttonLabel` | `string` | Yes | - |
| `recapLabel` | `ReactNode` | Yes | - |
| `reverseChevron` | `boolean` | No | - |
| `inverse` | `boolean` | No | - |
| `className` | `string` | No | - |


## Variants

Available variants: `Basic`, `Inverse`, `BadExample`, `ReverseExample`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-pagination-button--default)

## Source

`components/PaginationButton/index.tsx`
