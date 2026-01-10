---
name: Button
description: Button component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/Button/index.tsx
stylesFile: components/Button/index.styles.ts
storiesFile: components/Button/__stories__/index.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-button--basic'
storyId: components-button--basic
tags: []
keywords:
  - button
---
# Button

## Overview

Button component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import Button from '@gds/components/Button';
// or
import { Button } from '@gds/components';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `colorVariant` | `ColorVariant` | `'primary'` | No | - |
| `fillVariant` | `FillVariant` | `'fill'` | No | - |
| `fullWidth` | `boolean` | `false` | No | - |
| `hasChevron` | `boolean` | `false` | No | - |
| `startIcon` | `React.ReactNode` | `-` | No | - |
| `endIcon` | `React.ReactNode` | `-` | No | - |
| `children` | `React.ReactNode` | `-` | No | - |
| `loading` | `{ isLoading: boolean` | `null` | No | - |
| `hiddenLoadingMessage` | `string` | `-` | Yes | - |

## Variants

### Color Variants

Available: `primary`, `secondary`, `transaction`, `tertiary`, `inverse`

### Fill Variants

Available: `fill`, `outline`, `ghost`


### Available Story Variants

`Basic`, `Secondary`, `Tertiary`, `Transaction`, `Disabled`, `Inverse`, `InverseDisabled`, `FullWidth`, `Outline`, `Ghost`, `Loading`, `WithStartIcon`, `WithEndIcon`, `WithBigIcon`, `WithRotatedIcon`, `WithSmallIcon`, `Submit`, `Link`, `DisabledLink`, `WithChevron`, `RTL`

## Code Examples

### Basic Usage

```tsx
<Button>Content</Button>
```



## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
| padding for high-contrast mode because the 
        transpar | `spacing.amphitheatre` | 24px |
| width | `(props) => (props.$fullWidth === true ? "100%" : "auto")` | (props) => (props.$fullWidth === true ? "100%" : "auto") |
| min-height | `minTapSize` | 44px |
| padding | `spacing.auditorium` | 16px |
| height | `lineHeight.default` | lineHeight.default |
| gap | `spacing.club` | 8px |
| width of the button */
  visibility | `(props) => (props.$isLoading ? "hidden" : "visible")` | (props) => (props.$isLoading ? "hidden" : "visible") |

### Typography

| Property | Token/Value |
|----------|-------------|
| font-size | `props.theme.fontSizes[2]` |
| font-weight | `600` |
| line-height | `lineHeight.default` |

### Colors

| Property | Token |
|----------|-------|
| border-color | `bg` |
| border-color | `$colorVariant === "tertiary" ? muted(bg) : bg` |
| colors | `spacing.amphitheatre` |
| color | `fg` |
| border-color | `darkBg` |
| background-color | `weakest(light(bg))` |
| border-color | `darker(activeColor)` |
| color | `getColor()` |

### Borders

| Property | Value |
|----------|-------|
| border-style | solid |
| border-width | 1px |
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

[View in Storybook](http://localhost:6006/?path=/story/components-button--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/Button/index.tsx` |
| Styles | `components/Button/index.styles.ts` |
| Stories | `components/Button/__stories__/index.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
