---
name: Header
description: Header component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/Header/index.tsx
stylesFile: components/Header/index.styles.ts
storiesFile: components/Header/__stories__/index.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-header--basic'
storyId: components-header--basic
tags: []
keywords:
  - header
---
# Header

## Overview

Header component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import Header from '@gds/components/Header';
// or
import { Header } from '@gds/components';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `React.ReactNode` | `-` | No | - |

## Variants


### Available Story Variants

`Basic`, `WithAccountButton`

## Code Examples

### Basic Usage

```tsx
<Header>Content</Header>
```



## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
| padding | `spacing.auditorium` | 16px |

### Typography

| Property | Token/Value |
|----------|-------------|
| - | See styles file |

### Colors

| Property | Token |
|----------|-------|
| color | `(props) => props.theme.text.inverse` |



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

[View in Storybook](http://localhost:6006/?path=/story/components-header--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/Header/index.tsx` |
| Styles | `components/Header/index.styles.ts` |
| Stories | `components/Header/__stories__/index.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
