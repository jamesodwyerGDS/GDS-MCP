---
name: Modal
description: Modal component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-modal--default'
storyId: components-modal--default
sourceFile: components/Modal/Modal.tsx
---
# Modal

## Import

```tsx
import { Modal } from '@gds/components';
```

## Basic Usage

```tsx
<Modal>Content</Modal>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | - |
| `onClose` | `() => void` | Yes | - |
| `isOpen` | `boolean` | No | - |
| `role` | `"dialog" | "alertdialog"` | No | - |
| `ariaLabel` | `string` | Yes | - |
| `variant` | `Variant` | No | - |
| `size` | `Size` | No | - |
| `hasImage` | `boolean` | No | - |
| `mobileMaxViewportWidth` | `string` | Yes | - |


## Variants

Available variants: `Standard`, `Warning`, `Error`, `Loading`, `WithImage`, `NotCloseable`, `Scrollable`, `WithCustomAutoFocus`, `WithNoFooterActions`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-modal--default)

## Source

`components/Modal/Modal.tsx`
