---
name: Checkbox
description: Checkbox component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-checkbox--default'
storyId: components-checkbox--default
sourceFile: components/Checkbox/index.tsx
---
# Checkbox

## Import

```tsx
import { Checkbox } from '@gds/components';
```

## Basic Usage

```tsx
<Checkbox>Content</Checkbox>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | - |
| `id` | `string` | Yes | - |
| `label` | `ReactNode` | Yes | - |
| `disabled` | `boolean` | No | - |
| `required` | `boolean` | No | - |
| `flipOrder` | `boolean` | No | - |
| `isIndeterminate` | `boolean` | No | - |


## Variants

Available variants: `Basic`, `Disabled`, `WithErrorMessage`, `ErrorWithoutMessage`, `Indeterminate`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-checkbox--default)

## Source

`components/Checkbox/index.tsx`
