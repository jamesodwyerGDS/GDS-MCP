---
name: TextArea
description: TextArea component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/TextArea/index.tsx
stylesFile: null
storiesFile: components/TextArea/__stories__/index.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-textarea--basic'
storyId: components-textarea--basic
tags: []
keywords:
  - text-area
---
# TextArea

## Overview

TextArea component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import TextArea from '@gds/components/TextArea';
// or
import { TextArea } from '@gds/components';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | `{className` | No | - |
| `id` | `string` | `{id` | Yes | - |
| `label` | `React.ReactNode` | `-` | Yes | - |
| `rows` | `number` | `3` | No | - |
| `value` | `string` | `{value` | No | - |
| `disabled` | `boolean` | `false` | No | - |
| `readOnly` | `boolean` | `false` | No | - |
| `required` | `boolean` | `false` | No | - |
| `errorMessage` | `string` | `-` | No | - |
| `onChange` | `React.ChangeEventHandler<HTMLTextAreaElement>` | `{onChange` | No | - |

## Variants


### Available Story Variants

`Basic`, `WithPlaceholder`, `Disabled`, `WithError`, `ReadOnly`, `RTL`

## Code Examples

### Basic Usage

```tsx
<TextArea>Content</TextArea>
```



## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
| - | See styles file | - |

### Typography

| Property | Token/Value |
|----------|-------------|
| - | See styles file |

### Colors

| Property | Token |
|----------|-------|
| - | See styles file |



## States

| State | Description |
|-------|-------------|
| Default | Resting state |
| Hover | Mouse over (`:hover`) |
| Focus | Keyboard focus (`:focus`) with visible outline |
| Active | Pressed state (`:active`) |
| Disabled | Non-interactive (`disabled` prop or `aria-disabled`) |

## Accessibility

- **Keyboard navigation**: Component follows WAI-ARIA patterns where applicable
- **Focus indicators**: Visible focus states with `outline-offset: 4px`
- **Screen readers**: Semantic HTML with ARIA attributes where needed
- **High contrast**: Supports `forced-colors` mode

## Do's and Don'ts

### Do's

- Use consistent variants within the same context
- Follow spacing guidelines from the design system
- Provide accessible labels where needed

### Don'ts

- Don't override the component's built-in accessibility features
- Don't use deprecated props without planning migration
- Don't mix incompatible variant combinations

## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-textarea--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/TextArea/index.tsx` |

| Stories | `components/TextArea/__stories__/index.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
