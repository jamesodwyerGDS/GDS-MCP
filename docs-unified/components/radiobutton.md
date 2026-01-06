---
name: Radiobutton
description: Unified documentation for Radiobutton component
audiences:
  - engineer
  - vibe
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-radio-button--default'
sourceFile: components/RadioButton/index.tsx
---
# Radiobutton

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Radiobutton |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer, Vibe |


---

## Design Documentation

> Query mode: `@design radiobutton`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer radiobutton`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { RadioButton } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-radio-button--default)

### Source

`components/RadioButton/index.tsx`

### Full Engineer Documentation

# RadioButton

## Import

```tsx
import { RadioButton } from '@gds/components';
```

## Basic Usage

```tsx
<RadioButton>Content</RadioButton>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | - |
| `id` | `string` | Yes | - |
| `label` | `ReactNode` | Yes | - |
| `disabled` | `boolean` | No | - |
| `screenReaderErrorPrefix` | `string` | Yes | - |
| `errorMessage` | `ReactNode` | No | - |
| `required` | `boolean` | No | - |
| `flipOrder` | `boolean` | No | - |


## Variants

Available variants: `Basic`, `RadioGroup`, `WithError`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-radio-button--default)

## Source

`components/RadioButton/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe radiobutton`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- Radio Button Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<div class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#024DDF] text-white font-semibold rounded-lg hover:bg-[#0141B8] focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:ring-offset-2 transition-colors">
  Radio Button Content
</div>

<!-- Variants -->
<!-- primary -->
<div class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#024DDF] text-white font-semibold rounded-lg hover:bg-[#0141B8]">
  primary
</div>

<!-- secondary -->
<div class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded-lg border-2 border-[#024DDF] hover:bg-[#024DDF] hover:text-white">
  secondary
</div>

<!-- tertiary -->
<div class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded-lg hover:bg-[#024DDF]/10">
  tertiary
</div>

<!-- ghost -->
<div class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#646464] font-semibold rounded-lg hover:bg-[#D6D6D6]/20">
  ghost
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

