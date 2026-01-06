---
name: AlertBoxLegacy
description: AlertBoxLegacy component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-alert-box-legacy--default'
storyId: components-alert-box-legacy--default
sourceFile: components/AlertBoxLegacy/index.tsx
---
# AlertBoxLegacy

## Import

```tsx
import { AlertBoxLegacy } from '@gds/components';
```

## Basic Usage

```tsx
<AlertBoxLegacy>Content</AlertBoxLegacy>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `"info" | "success" | "warning" | "danger"` | No | - |
| `size` | `"moderate" | "normal"` | No | - |
| `title` | `React.ReactNode` | Yes | - |
| `children` | `React.ReactNode` | No | - |
| `dismissable` | `{` | No | - |
| `onDismiss` | `() => void` | Yes | - |
| `dismissLabel` | `string` | Yes | - |
| `dismissRef` | `React.Ref<HTMLButtonElement>` | No | - |


## Variants

Available variants: `Basic`, `WithChildren`, `WithCustomChildren`, `DismissableWarning`, `DismissableDanger`, `Warning`, `Success`, `Danger`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-alert-box-legacy--default)

## Source

`components/AlertBoxLegacy/index.tsx`
