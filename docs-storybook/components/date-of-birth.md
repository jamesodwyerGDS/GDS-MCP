---
name: DateOfBirth
description: DateOfBirth component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/DateOfBirth/index.tsx
stylesFile: components/DateOfBirth/index.styles.ts
storiesFile: components/DateOfBirth/__stories__/index.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-dateofbirth--basic'
storyId: components-dateofbirth--basic
tags: []
keywords:
  - date-of-birth
---
# DateOfBirth

## Overview

DateOfBirth component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import DateOfBirth from '@gds/components/DateOfBirth';
// or
import { DateOfBirth } from '@gds/components';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | `{className` | No | - |
| `required` | `boolean` | `{required || someFieldsHaveValue(this.state)` | No | - |
| `initialDate` | `string` | `-` | No | - |
| `label` | `React.ReactNode` | `{dayAriaLabel` | Yes | - |
| `dayAriaLabel` | `string` | `-` | Yes | - |
| `monthAriaLabel` | `string` | `-` | Yes | - |
| `yearAriaLabel` | `string` | `-` | Yes | - |
| `dayProps` | `InputProps` | `-` | No | - |
| `monthProps` | `InputProps` | `-` | No | - |
| `yearProps` | `InputProps` | `-` | No | - |
| `onChange` | `(value: string) => void` | `{this.handleChange(0)` | No | - |
| `errorMessage` | `string` | `{errorMessage` | No | - |

## Variants


### Available Story Variants

`Basic`, `WithError`, `RTL`

## Code Examples

### Basic Usage

```tsx
<DateOfBirth>Content</DateOfBirth>
```



## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
| width | `MS_WIDTH` | MS_WIDTH |
| width */
  border-color | `(props) =>
    props.errorMessage
      ? props.theme.status.danger
      : props.theme.base.borderDark` | (props) =>
    props.errorMessage
      ? props.theme.status.danger
      : props.theme.base.borderDark |
| width | `(props) => (props.errorMessage ? "2px" : "1px")` | (props) => (props.errorMessage ? "2px" : "1px") |
| padding | `spacing.club` | 8px |

### Typography

| Property | Token/Value |
|----------|-------------|
| font-weight | `400` |
| line-height | `1` |

### Colors

| Property | Token |
|----------|-------|
| border-color | `(props) =>
    props.errorMessage
      ? props.theme.status.danger
      : props.theme.base.borderDark` |
| color | `(props) => props.theme.text.secondary` |

### Borders

| Property | Value |
|----------|-------|
| border-style | solid |
| border-width | $ |
| border-radius | 2px |


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

[View in Storybook](http://localhost:6006/?path=/story/components-dateofbirth--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/DateOfBirth/index.tsx` |
| Styles | `components/DateOfBirth/index.styles.ts` |
| Stories | `components/DateOfBirth/__stories__/index.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
