---
name: Card
description: Card component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/Card/index.ts
stylesFile: components/Card/index.styles.ts
storiesFile: components/Card/__stories__/index.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-card--basic'
storyId: components-card--basic
tags: []
keywords:
  - card
---
# Card

## Overview

Card component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import Card from '@gds/components/Card';
// or
import { Card } from '@gds/components';
```

## Props

| - | - | - | - | See source file |

## Variants


### Available Story Variants

`TitleOnly`, `Complex`

## Code Examples

### Basic Usage

```tsx
<Card>Content</Card>
```



## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
| padding | `spacing.amphitheatre` | 24px |
| margin-top | `spacing.arena` | 32px |

### Typography

| Property | Token/Value |
|----------|-------------|
| line-height | `1` |

### Colors

| Property | Token |
|----------|-------|
| background-color | `(props) => props.theme.base.bg` |

### Borders

| Property | Value |
|----------|-------|
| border-radius | 4px |


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

[View in Storybook](http://localhost:6006/?path=/story/components-card--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/Card/index.ts` |
| Styles | `components/Card/index.styles.ts` |
| Stories | `components/Card/__stories__/index.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
