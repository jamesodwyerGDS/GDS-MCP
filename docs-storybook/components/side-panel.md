---
name: SidePanel
description: SidePanel component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-side-panel--default'
storyId: components-side-panel--default
sourceFile: components/SidePanel/SidePanel.tsx
---
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
