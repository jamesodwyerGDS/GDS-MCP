---
name: ToggleSwitch
description: ToggleSwitch component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-toggle-switch--default'
storyId: components-toggle-switch--default
sourceFile: components/ToggleSwitch/index.tsx
---
# ToggleSwitch

## Import

```tsx
import { ToggleSwitch } from '@gds/components';
```

## Basic Usage

```tsx
<ToggleSwitch>Content</ToggleSwitch>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | - |
| `label` | `React.ReactElement | string` | Yes | - |
| `checked` | `boolean` | Yes | - |
| `disabled` | `boolean` | No | - |
| `colorVariant` | `ColorVariant` | No | - |
| `onChange` | `React.ChangeEventHandler<HTMLInputElement>` | No | - |
| `className` | `string` | No | - |
| `name` | `string` | No | - |
| `fullWidth` | `boolean` | No | - |


## Variants

Available variants: `default`, `Basic`, `Resale`, `Disabled`, `FullWidth`, `DisabledChecked`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-toggle-switch--default)

## Source

`components/ToggleSwitch/index.tsx`
