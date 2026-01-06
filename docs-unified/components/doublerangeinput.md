---
name: Doublerangeinput
description: Unified documentation for Doublerangeinput component
audiences:
  - engineer
  - vibe
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-double-range-input--default'
sourceFile: components/DoubleRangeInput/index.tsx
---
# Doublerangeinput

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Doublerangeinput |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer, Vibe |


---

## Design Documentation

> Query mode: `@design doublerangeinput`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer doublerangeinput`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { DoubleRangeInput } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-double-range-input--default)

### Source

`components/DoubleRangeInput/index.tsx`

### Full Engineer Documentation

# DoubleRangeInput

## Import

```tsx
import { DoubleRangeInput } from '@gds/components';
```

## Basic Usage

```tsx
<DoubleRangeInput>Content</DoubleRangeInput>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `disabled` | `boolean` | No | - |
| `errorMax` | `boolean` | No | - |
| `errorMin` | `boolean` | No | - |
| `errorMaxMessage` | `string | JSX.Element` | No | - |
| `errorMinMessage` | `string | JSX.Element` | No | - |
| `formatValue` | `(value: number, type: "min" | "max") => void` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `id` | `string` | Yes | - |
| `inputSize` | `number` | No | - |
| `max` | `number` | No | - |


## Variants

Available variants: `Price`, `Disabled`, `VariableInputValues`, `ErrorOnMinInput`, `ErrorOnMaxInput`, `Controlled`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-double-range-input--default)

## Source

`components/DoubleRangeInput/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe doublerangeinput`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- Double Range Input Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<div class="w-full px-4 py-3 text-base border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:border-transparent placeholder:text-[#949494]">
  Double Range Input Content
</div>

<!-- States -->
<!-- Hover: Add hover: prefix to classes -->
<!-- Focus: Add focus: prefix to classes -->
<!-- Disabled: Add disabled:opacity-50 disabled:cursor-not-allowed -->

```


---

## Comparison: Design vs Code

| Aspect | Design (@design) | Code (@engineer) |
|--------|------------------|------------------|
| **Status** | - | In Storybook |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `@gds/components` |
| **Figma Node** | - | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

