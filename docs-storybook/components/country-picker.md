---
name: CountryPicker
description: CountryPicker component from the Global Design System
package: '@gds/components'
status: stable
version: 1.0.0
updated: '2026-01-10'
sourceFile: components/CountryPicker/index.tsx
stylesFile: components/CountryPicker/index.styles.ts
storiesFile: components/CountryPicker/__stories__/index.stories.tsx
storyUrl: 'http://localhost:6006/?path=/story/components-countrypicker--basic'
storyId: components-countrypicker--basic
tags: []
keywords:
  - country-picker
---
# CountryPicker

## Overview

CountryPicker component from the Global Design System Storybook library.

### When to use

- Use this component for its intended interactive purpose
- Follow the design system guidelines for consistent usage

### When not to use

- Do not use outside of its intended context
- Consider alternatives when a different pattern is more appropriate

## Import

```tsx
import CountryPicker from '@gds/components/CountryPicker';
// or
import { CountryPicker } from '@gds/components';
```

## Props

| - | - | - | - | See source file |

## Variants


### Available Story Variants

`Basic`, `NoAutocomplete`, `StatesOfUSA`, `Prefilled`, `Dialcode`, `WithError`

## Code Examples

### Basic Usage

```tsx
<CountryPicker>Content</CountryPicker>
```



## Styling

### Spacing Tokens

| Property | Token | Value |
|----------|-------|-------|
| width | `(props) => props.width` | (props) => props.width |
| padding-inline-start | `spacing.auditorium` | 16px |
| padding-inline-end | `minTapSize` | 44px |
| margin | `spacing.lounge` | 4px |
| padding | `spacing.club` | 8px |

### Typography

| Property | Token/Value |
|----------|-------------|
| - | See styles file |

### Colors

| Property | Token |
|----------|-------|
| color | `(props) => (props.autocomplete ? "inherit" : "transparent")` |
| background-color | `(props) => props.theme.base.bg` |
| color | `(props) => props.theme.text.inverse` |
| background-color | `(props) => props.theme.base.primary` |
| background-color | `(props) => props.theme.colors.base.borderMidtone` |

### Borders

| Property | Value |
|----------|-------|
| border-radius | 2px |
| border-radius | 0 |


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

[View in Storybook](http://localhost:6006/?path=/story/components-countrypicker--basic)

## Source Files

| File | Path |
|------|------|
| Component | `components/CountryPicker/index.tsx` |
| Styles | `components/CountryPicker/index.styles.ts` |
| Stories | `components/CountryPicker/__stories__/index.stories.tsx` |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-10 | Initial documentation |
