---
name: Inputfield
description: Unified documentation for Inputfield component
audiences:
  - engineer
  - vibe
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-input-field--default'
sourceFile: components/InputField/index.tsx
---
# Inputfield

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Inputfield |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer, Vibe |


---

## Design Documentation

> Query mode: `@design inputfield`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer inputfield`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { InputField } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-input-field--default)

### Source

`components/InputField/index.tsx`

### Full Engineer Documentation

# InputField

## Import

```tsx
import { InputField } from '@gds/components';
```

## Basic Usage

```tsx
<InputField>Content</InputField>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | No | - |
| `children` | `React.ReactNode` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `type` | `"error" | "success"` | No | - |


## Variants

Available variants: `Basic`, `WithStartIcon`, `WithEndIcon`, `WithValidation`, `WithErrorMessages`, `TextArea`, `Select`, `PillSelect`, `WithDescribedBy`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-input-field--default)

## Source

`components/InputField/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe inputfield`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- Input Field Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<div class="w-full px-4 py-3 text-base border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:border-transparent placeholder:text-[#949494]">
  Input Field Content
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

