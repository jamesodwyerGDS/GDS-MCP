---
name: TextInput
description: TextInput component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-text-input--default'
storyId: components-text-input--default
sourceFile: components/TextInput/index.tsx
---
# TextInput

## Import

```tsx
import { TextInput } from '@gds/components';
```

## Basic Usage

```tsx
<TextInput>Content</TextInput>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | - |
| `id` | `string` | Yes | - |
| `label` | `ReactNode` | Yes | - |
| `disabled` | `boolean` | No | - |
| `readOnly` | `boolean` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `errorMessage` | `ReactNode` | No | - |
| `successMessage` | `ReactNode` | No | - |
| `required` | `boolean` | No | - |
| `startIcon` | `ReactNode` | No | - |
| `endIcon` | `ReactNode` | No | - |
| `onClearButtonClick` | `() => void` | No | - |
| `clearButtonLabel` | `string` | No | - |


## Variants

Available variants: `Disabled`, `ReadOnly`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-text-input--default)

## Source

`components/TextInput/index.tsx`
