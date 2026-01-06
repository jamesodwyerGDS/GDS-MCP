---
name: Toast
description: Toast component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-toast--default'
storyId: components-toast--default
sourceFile: components/Toast/index.tsx
---
# Toast

## Import

```tsx
import { Toast } from '@gds/components';
```

## Basic Usage

```tsx
<Toast>Content</Toast>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `string` | Yes | - |
| `variant` | `Variant` | No | - |
| `role` | `AriaRole` | Yes | - |
| `dismissable` | `{` | Yes | - |
| `onDismiss` | `() => void` | Yes | - |
| `dismissLabel` | `string` | Yes | - |
| `dismissRef` | `React.Ref<HTMLButtonElement>` | No | - |


## Variants

Available variants: `Basic`, `Info`, `Success`, `Warning`, `Error`, `Log`, `ShortMessage`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-toast--default)

## Source

`components/Toast/index.tsx`
