---
name: TextAreaLimited
description: TextAreaLimited component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-text-area-limited--default'
storyId: components-text-area-limited--default
sourceFile: components/TextAreaLimited/index.tsx
---
# TextAreaLimited

## Import

```tsx
import { TextAreaLimited } from '@gds/components';
```

## Basic Usage

```tsx
<TextAreaLimited>Content</TextAreaLimited>
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
| `errorMessage` | `string` | No | - |
| `characterLimit` | `number` | Yes | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `renderCharacterLimit` | `(limit: number) => React.ReactNode` | No | - |
| `onChange` | `React.ChangeEventHandler<HTMLTextAreaElement>` | No | - |


## Variants

Available variants: `Basic`, `TranslatedCharacterLimit`, `StyledCharacterLimit`, `NoRenderCharacterLimit`, `Disabled`, `ReadOnly`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-text-area-limited--default)

## Source

`components/TextAreaLimited/index.tsx`
