---
name: PasswordInput
description: PasswordInput component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/PasswordInput/index.tsx
stylesFile: null
storiesFile: components/PasswordInput/__stories__/index.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-passwordinput--basic'
storyId: components-passwordinput--basic
tags: []
keywords:
  - password-input
---
# PasswordInput

## Overview

PasswordInput component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import PasswordInput from '@gds/components/PasswordInput';
// or
import { PasswordInput } from '@gds/components';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | `{className` | No | - |
| `id` | `string` | `{id` | Yes | - |
| `label` | `React.ReactNode` | `-` | Yes | - |
| `showLabel` | `string` | `-` | Yes | - |
| `hideLabel` | `string` | `-` | Yes | - |
| `value` | `string` | `-` | No | - |
| `disabled` | `boolean` | `false` | No | - |
| `errorMessage` | `string` | `''` | No | - |
| `required` | `boolean` | `false` | No | - |

## Variants


### Available Story Variants

See Storybook

## Code Examples

### Basic Usage

```tsx
<PasswordInput>Content</PasswordInput>
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

[View in Storybook](http://localhost:6006/?path=/story/components-passwordinput--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/PasswordInput/index.tsx` |

| Stories | `components/PasswordInput/__stories__/index.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
