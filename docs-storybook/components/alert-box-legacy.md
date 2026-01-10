---
name: AlertBoxLegacy
description: AlertBoxLegacy component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/AlertBoxLegacy/index.tsx
stylesFile: components/AlertBoxLegacy/index.styles.ts
storiesFile: components/AlertBoxLegacy/__stories__/index.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-alertboxlegacy--basic'
storyId: components-alertboxlegacy--basic
tags: []
keywords:
  - alert-box-legacy
---
# AlertBoxLegacy

## Overview

AlertBoxLegacy component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import AlertBoxLegacy from '@gds/components/AlertBoxLegacy';
// or
import { AlertBoxLegacy } from '@gds/components';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"info" | "success" | "warning" | "danger"` | `'info'` | No | - |
| `size` | `"moderate" | "normal"` | `'normal'` | No | - |
| `title` | `React.ReactNode` | `-` | Yes | - |
| `children` | `React.ReactNode` | `-` | No | - |
| `dismissable` | `{ onDismiss: () => void` | `-` | No | - |
| `dismissLabel` | `string` | `-` | Yes | - |
| `dismissRef` | `React.Ref<HTMLButtonElement>` | `-` | No | - |

## Variants


### Available Story Variants

`Basic`, `WithChildren`, `WithCustomChildren`, `DismissableWarning`, `DismissableDanger`, `Warning`, `Success`, `Danger`, `RTL`

## Code Examples

### Basic Usage

```tsx
<AlertBoxLegacy>Content</AlertBoxLegacy>
```



## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
| padding | `spacing.auditorium` | 16px |
| margin-inline-end | `iconSize.margin` | iconSize.margin |
| padding adjustable with size prop, left padding to align mes | `({ $size` | ({ $size |

### Typography

| Property | Token/Value |
|----------|-------------|
| font-weight | `600` |

### Colors

| Property | Token |
|----------|-------|
| color | `(props) => props.theme.text.inverse` |
| background-color | `(props) => props.theme.status.default` |
| background-color | `(props) => props.theme.status.success` |
| color | `(props) => props.theme.text.primary` |
| background-color | `(props) => props.theme.status.warning` |
| background-color | `(props) => props.theme.status.danger` |
| border-color | `(props) => props.theme.base.border` |
| background-color | `(props) => props.theme.base.bg` |

### Borders

| Property | Value |
|----------|-------|
| border-radius | $ |
| border-radius | $ |
| border-style | solid |
| border-width | 0 1px 1px |
| border-radius | 0 0 $ |


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

[View in Storybook](http://localhost:6006/?path=/story/components-alertboxlegacy--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/AlertBoxLegacy/index.tsx` |
| Styles | `components/AlertBoxLegacy/index.styles.ts` |
| Stories | `components/AlertBoxLegacy/__stories__/index.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
