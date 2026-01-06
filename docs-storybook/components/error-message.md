---
name: ErrorMessage
description: ErrorMessage component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-error-message--default'
storyId: components-error-message--default
sourceFile: components/ErrorMessage/index.tsx
---
# ErrorMessage

## Import

```tsx
import { ErrorMessage } from '@gds/components';
```

## Basic Usage

```tsx
<ErrorMessage>Content</ErrorMessage>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `className` | `string` | No | - |
| `id` | `string` | No | - |


## Variants

Available variants: `Basic`, `MultipleErrors`, `LiveError`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-error-message--default)

## Source

`components/ErrorMessage/index.tsx`
