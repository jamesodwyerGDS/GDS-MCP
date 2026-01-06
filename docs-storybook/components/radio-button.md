---
name: RadioButton
description: RadioButton component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-radio-button--default'
storyId: components-radio-button--default
sourceFile: components/RadioButton/index.tsx
---
# RadioButton

## Import

```tsx
import { RadioButton } from '@gds/components';
```

## Basic Usage

```tsx
<RadioButton>Content</RadioButton>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | - |
| `id` | `string` | Yes | - |
| `label` | `ReactNode` | Yes | - |
| `disabled` | `boolean` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `errorMessage` | `ReactNode` | No | - |
| `required` | `boolean` | No | - |
| `flipOrder` | `boolean` | No | - |


## Variants

Available variants: `Basic`, `RadioGroup`, `WithError`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-radio-button--default)

## Source

`components/RadioButton/index.tsx`
