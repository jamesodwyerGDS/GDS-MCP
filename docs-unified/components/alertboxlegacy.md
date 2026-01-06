---
name: Alertboxlegacy
description: Unified documentation for Alertboxlegacy component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-alert-box-legacy--default'
sourceFile: components/AlertBoxLegacy/index.tsx
---
# Alertboxlegacy

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Alertboxlegacy |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design alertboxlegacy`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer alertboxlegacy`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { AlertBoxLegacy } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-alert-box-legacy--default)

### Source

`components/AlertBoxLegacy/index.tsx`

### Full Engineer Documentation

# AlertBoxLegacy

## Import

```tsx
import { AlertBoxLegacy } from '@gds/components';
```

## Basic Usage

```tsx
<AlertBoxLegacy>Content</AlertBoxLegacy>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `"info" | "success" | "warning" | "danger"` | No | - |
| `size` | `"moderate" | "normal"` | No | - |
| `title` | `React.ReactNode` | Yes | - |
| `children` | `React.ReactNode` | No | - |
| `dismissable` | `{` | No | - |
| `onDismiss` | `() => void` | Yes | - |
| `dismissLabel` | `string` | Yes | - |
| `dismissRef` | `React.Ref<HTMLButtonElement>` | No | - |


## Variants

Available variants: `Basic`, `WithChildren`, `WithCustomChildren`, `DismissableWarning`, `DismissableDanger`, `Warning`, `Success`, `Danger`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-alert-box-legacy--default)

## Source

`components/AlertBoxLegacy/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe alertboxlegacy`
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

