---
name: DoubleRangeInput
description: DoubleRangeInput component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-double-range-input--default'
storyId: components-double-range-input--default
sourceFile: components/DoubleRangeInput/index.tsx
---
# DoubleRangeInput

## Import

```tsx
import { DoubleRangeInput } from '@gds/components';
```

## Basic Usage

```tsx
<DoubleRangeInput>Content</DoubleRangeInput>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `disabled` | `boolean` | No | - |
| `errorMax` | `boolean` | No | - |
| `errorMin` | `boolean` | No | - |
| `errorMaxMessage` | `string | JSX.Element` | No | - |
| `errorMinMessage` | `string | JSX.Element` | No | - |
| `formatValue` | `(value: number, type: "min" | "max") => void` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `id` | `string` | Yes | - |
| `inputSize` | `number` | No | - |
| `max` | `number` | No | - |


## Variants

Available variants: `Price`, `Disabled`, `VariableInputValues`, `ErrorOnMinInput`, `ErrorOnMaxInput`, `Controlled`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-double-range-input--default)

## Source

`components/DoubleRangeInput/index.tsx`
