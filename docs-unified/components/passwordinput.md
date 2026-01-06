---
name: Passwordinput
description: Unified documentation for Passwordinput component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-password-input--default'
sourceFile: components/PasswordInput/index.tsx
---
# Passwordinput

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Passwordinput |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design passwordinput`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer passwordinput`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { PasswordInput } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-password-input--default)

### Source

`components/PasswordInput/index.tsx`

### Full Engineer Documentation

# PasswordInput

## Import

```tsx
import { PasswordInput } from '@gds/components';
```

## Basic Usage

```tsx
<PasswordInput>Content</PasswordInput>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | - |
| `id` | `string` | Yes | - |
| `label` | `React.ReactNode` | Yes | - |
| `showLabel` | `string` | Yes | - |
| `hideLabel` | `string` | Yes | - |
| `value` | `string` | No | - |
| `disabled` | `boolean` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `errorMessage` | `string` | No | - |
| `required` | `boolean` | No | - |




## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-password-input--default)

## Source

`components/PasswordInput/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe passwordinput`
> Styling: **Tailwind CSS** (utility classes)

*No vibe documentation available for this component.*


---

## Comparison: Design vs Code

| Aspect | Design (@design) | Code (@engineer) |
|--------|------------------|------------------|
| **Status** | - | In Storybook |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `@gds/components` |
| **Figma Node** | - | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

