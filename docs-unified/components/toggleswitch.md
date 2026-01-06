---
name: Toggleswitch
description: Unified documentation for Toggleswitch component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-toggle-switch--default'
sourceFile: components/ToggleSwitch/index.tsx
---
# Toggleswitch

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Toggleswitch |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design toggleswitch`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer toggleswitch`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { ToggleSwitch } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-toggle-switch--default)

### Source

`components/ToggleSwitch/index.tsx`

### Full Engineer Documentation

# ToggleSwitch

## Import

```tsx
import { ToggleSwitch } from '@gds/components';
```

## Basic Usage

```tsx
<ToggleSwitch>Content</ToggleSwitch>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | - |
| `label` | `React.ReactElement | string` | Yes | - |
| `checked` | `boolean` | Yes | - |
| `disabled` | `boolean` | No | - |
| `colorVariant` | `ColorVariant` | No | - |
| `onChange` | `React.ChangeEventHandler<HTMLInputElement>` | No | - |
| `className` | `string` | No | - |
| `name` | `string` | No | - |
| `fullWidth` | `boolean` | No | - |


## Variants

Available variants: `default`, `Basic`, `Resale`, `Disabled`, `FullWidth`, `DisabledChecked`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-toggle-switch--default)

## Source

`components/ToggleSwitch/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe toggleswitch`
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

