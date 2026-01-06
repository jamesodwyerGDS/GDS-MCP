---
name: Accordion
description: Accordion component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-accordion--default'
storyId: components-accordion--default
sourceFile: components/Accordion/Accordion.tsx
---
# Accordion

## Import

```tsx
import { Accordion } from '@gds/components';
```

## Basic Usage

```tsx
<Accordion>Content</Accordion>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactElement | React.ReactElement[]` | Yes | - |
| `type` | `AccordionType` | No | - |
| `showTopBorder` | `boolean` | No | - |
| `showBottomBorder` | `boolean` | No | - |


## Variants

Available variants: `Single`, `Multi`, `DefaultOpen`, `WithMaxWidthOveridden`, `LeadingIcon`, `WithoutTopAndBottomBorders`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-accordion--default)

## Source

`components/Accordion/Accordion.tsx`
