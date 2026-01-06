---
name: SelectInput
description: SelectInput component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-select-input--default'
storyId: components-select-input--default
sourceFile: components/SelectInput/index.tsx
---
# SelectInput

## Import

```tsx
import { SelectInput } from '@gds/components';
```

## Basic Usage

```tsx
<SelectInput>Content</SelectInput>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | - |
| `id` | `string` | Yes | - |
| `isPillVariant` | `boolean` | No | - |
| `autoComplete` | `string` | No | - |
| `label` | `React.ReactNode` | No | - |
| `onChange` | `React.ChangeEventHandler<HTMLSelectElement>` | No | - |
| `value` | `string | number` | No | - |
| `disabled` | `boolean` | No | - |
| `required` | `boolean` | No | - |
| `startIcon` | `React.ReactNode` | No | - |
| `children` | `React.ReactNode` | Yes | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `errorMessage` | `string` | No | - |


## Variants

Available variants: `Basic`, `WithStartIcon`, `WithError`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-select-input--default)

## Source

`components/SelectInput/index.tsx`
