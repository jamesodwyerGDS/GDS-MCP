---
name: ShareCard
description: ShareCard component from the Global Design System
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-share-card--default'
storyId: components-share-card--default
sourceFile: components/ShareCard/index.tsx
---
# ShareCard

## Import

```tsx
import { ShareCard } from '@gds/components';
```

## Basic Usage

```tsx
<ShareCard>Content</ShareCard>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `imageUrl` | `string` | Yes | - |
| `cardTitle` | `string` | Yes | - |
| `pretext` | `string` | Yes | - |
| `text` | `string` | Yes | - |
| `subtext` | `string` | Yes | - |
| `headingLevel` | `"h1" | "h2" | "h3" | "h4" | "h5" | "h6"` | Yes | - |
| `onError` | `(e: React.SyntheticEvent<HTMLImageElement, Event>) => void` | No | - |


## Variants

Available variants: `Basic`, `Clamped`, `WithDownload`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-share-card--default)

## Source

`components/ShareCard/index.tsx`
