---
name: InputField
description: InputField component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/InputField/index.tsx
stylesFile: components/InputField/index.styles.ts
storiesFile: components/InputField/__stories__/index.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-inputfield--basic'
storyId: components-inputfield--basic
tags: []
keywords:
  - input-field
---
# InputField

## Overview

InputField component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import InputField from '@gds/components/InputField';
// or
import { InputField } from '@gds/components';
```

## Props

| - | - | - | - | See source file |

## Variants


### Available Story Variants

`Basic`, `WithStartIcon`, `WithEndIcon`, `WithValidation`, `WithErrorMessages`, `TextArea`, `Select`, `PillSelect`, `WithDescribedBy`

## Code Examples

### Basic Usage

```tsx
<InputField>Content</InputField>
```



## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
| margin-top | `(props) => (props.marginTop ? spacing[props.marginTop] : 0)` | (props) => (props.marginTop ? spacing[props.marginTop] : 0) |
| margin-inline-start | `spacing.auditorium` | 16px |
| height | `minTapSize` | 44px |
| padding-inline-end | `(props) =>
    props.$hasExtraPadding ? minTapSize : spacing.auditorium` | (props) =>
    props.$hasExtraPadding ? minTapSize : spacing.auditorium |
| padding when there's a StartIcon */
  ${StartIcon} ~ & {
    | `spacing.stadium` | 48px |

### Typography

| Property | Token/Value |
|----------|-------------|
| - | See styles file |

### Colors

| Property | Token |
|----------|-------|
| color | `(props) => props.theme.base.borderDark` |
| color | `(props) => props.theme.text.secondary` |
| border-color | `(props) => props.theme.base.border` |
| background-color | `(props) => props.theme.base.borderLight` |
| border-color | `props.theme.status.danger` |
| background-color | `(props) => props.theme.base.bg` |
| border-color | `(props) => props.theme.base.primary` |
| color | `(props) => props.theme.text.inverse` |

### Borders

| Property | Value |
|----------|-------|
| border-width | 2px |
| border-style | solid |
| border-width | 1px |
| border-radius | 2px |
| border-width | 2px |
| border-width | 2px |
| border-radius | 50% |
| border-width | 6px |
| border-width | 2px |
| border-width | 1px |
| border-radius | $ |


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

[View in Storybook](http://localhost:6006/?path=/story/components-inputfield--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/InputField/index.tsx` |
| Styles | `components/InputField/index.styles.ts` |
| Stories | `components/InputField/__stories__/index.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
