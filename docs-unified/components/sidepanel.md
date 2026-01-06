---
name: Sidepanel
description: Unified documentation for Sidepanel component
audiences:
  - engineer
  - vibe
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-side-panel--default'
sourceFile: components/SidePanel/SidePanel.tsx
---
# Sidepanel

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Sidepanel |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer, Vibe |


---

## Design Documentation

> Query mode: `@design sidepanel`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer sidepanel`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { SidePanel } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-side-panel--default)

### Source

`components/SidePanel/SidePanel.tsx`

### Full Engineer Documentation

# SidePanel

## Import

```tsx
import { SidePanel } from '@gds/components';
```

## Basic Usage

```tsx
<SidePanel>Content</SidePanel>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | - |
| `onClose` | `() => void` | Yes | - |
| `isOpen` | `boolean` | No | - |
| `placement` | `Placement` | No | - |
| `isContained` | `boolean` | No | - |
| `mobileMaxViewportWidth` | `string` | Yes | - |
| `showOverlay` | `boolean` | No | - |
| `ariaLabel` | `string` | Yes | - |
| `className` | `string` | No | - |
| `getPersistentElements` | `() => Iterable<Element>` | No | - |
| `extraWide` | `boolean` | No | - |


## Variants

Available variants: `Standard`, `LeftPlacement`, `WithTopWideContainerScrollable`, `WithTopWideContainerSticky`, `Contained`, `Scrollable`, `NoFooter`, `NestedPanels`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-side-panel--default)

## Source

`components/SidePanel/SidePanel.tsx`

---

## Vibe Documentation

> Query mode: `@vibe sidepanel`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- Side Panel Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<div class="p-4 rounded-lg">
  Side Panel Content
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

