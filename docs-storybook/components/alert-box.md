---
name: AlertBox
description: AlertBox component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-alert-box--default'
storyId: components-alert-box--default
sourceFile: components/AlertBox/index.tsx
---
# AlertBox

## Import

```tsx
import { AlertBox } from '@gds/components';
```

## Basic Usage

```tsx
<AlertBox>Content</AlertBox>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `React.ReactNode` | Yes | - |
| `variant` | `Variant` | No | - |
| `nested` | `boolean` | No | - |
| `children` | `React.ReactNode` | No | - |
| `ariaLabelledById` | `string` | No | - |
| `ariaDescribedById` | `string` | No | - |
| `role` | `AriaRole` | No | - |


## Variants

Available variants: `Basic`, `Nested`, `WithFormattedTitle`, `WithChildren`, `WithCustomChildren`, `Warning`, `Success`, `Danger`, `PageWarning`, `Alert`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-alert-box--default)

## Source

`components/AlertBox/index.tsx`
