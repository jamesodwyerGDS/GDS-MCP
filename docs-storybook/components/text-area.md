---
name: TextArea
description: TextArea component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-text-area--default'
storyId: components-text-area--default
sourceFile: components/TextArea/index.tsx
---
# TextArea

## Import

```tsx
import { TextArea } from '@gds/components';
```

## Basic Usage

```tsx
<TextArea>Content</TextArea>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | - |
| `id` | `string` | Yes | - |
| `label` | `React.ReactNode` | Yes | - |
| `rows` | `number` | No | - |
| `value` | `string` | No | - |
| `disabled` | `boolean` | No | - |
| `readOnly` | `boolean` | No | - |
| `required` | `boolean` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `errorMessage` | `string` | No | - |
| `onChange` | `React.ChangeEventHandler<HTMLTextAreaElement>` | No | - |


## Variants

Available variants: `Basic`, `WithPlaceholder`, `Disabled`, `WithError`, `ReadOnly`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-text-area--default)

## Source

`components/TextArea/index.tsx`
