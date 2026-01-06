---
name: Alertbox
description: Unified documentation for Alertbox component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-alert-box--default'
sourceFile: components/AlertBox/index.tsx
---
# Alertbox

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Alertbox |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design alertbox`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer alertbox`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { AlertBox } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-alert-box--default)

### Source

`components/AlertBox/index.tsx`

### Full Engineer Documentation

# AlertBox

## Import

```tsx
import { AlertBox } from '@gds/components';
```

## Basic Usage

```tsx
<AlertBox>Content</AlertBox>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `React.ReactNode` | Yes | - |
| `variant` | `Variant` | No | - |
| `nested` | `boolean` | No | - |
| `children` | `React.ReactNode` | No | - |
| `ariaLabelledById` | `string` | No | - |
| `ariaDescribedById` | `string` | No | - |
| `role` | `AriaRole` | No | - |


## Variants

Available variants: `Basic`, `Nested`, `WithFormattedTitle`, `WithChildren`, `WithCustomChildren`, `Warning`, `Success`, `Danger`, `PageWarning`, `Alert`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-alert-box--default)

## Source

`components/AlertBox/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe alertbox`
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

