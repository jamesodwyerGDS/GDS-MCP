---
name: InputField
description: InputField component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-input-field--default'
storyId: components-input-field--default
sourceFile: components/InputField/index.tsx
---
# InputField

## Import

```tsx
import { InputField } from '@gds/components';
```

## Basic Usage

```tsx
<InputField>Content</InputField>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | No | - |
| `children` | `React.ReactNode` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `type` | `"error" | "success"` | No | - |


## Variants

Available variants: `Basic`, `WithStartIcon`, `WithEndIcon`, `WithValidation`, `WithErrorMessages`, `TextArea`, `Select`, `PillSelect`, `WithDescribedBy`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-input-field--default)

## Source

`components/InputField/index.tsx`
