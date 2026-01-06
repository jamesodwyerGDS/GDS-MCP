---
name: Badge
description: Unified documentation for Badge component
audiences:
  - design
  - engineer
  - vibe
lastUpdated: '2026-01-06'
category: atoms
status: stable
figmaNodeId: '612:40429'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
tokens:
  colours:
    badge:
      vipAccess: 'Cosmos #121212'
      resale: 'Nebula #D0006F'
      soldOut: 'Cosmos #121212'
      cancelled: 'Mars #EB0000'
      postponed: 'Jupiter #FFB932'
      onSale: 'Earth #048851'
      presale: 'Neptune #024DDF'
      promoted: 'Callisto #A733FF'
      healthCheck: 'Earth #048851'
      lowAvailability: 'Jupiter #FFB932'
      newDate: 'Earth #048851'
    text:
      dark: 'Cosmos #121212'
      light: 'Spotlight #FFFFFF'
    border: 'Ammonite #D6D6D6'
  spacing:
    paddingVertical: Lounge 4px
    paddingHorizontal: Club 8px
    iconGap: Lounge 4px
  typography:
    label: Snowdon
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-badge--default'
sourceFile: components/Badge/index.tsx
---
# Badge

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Badge |
| **Color Variants** | badge, text, border |
| **Package** | `@gds/components` |
| **Figma Node** | 612:40429 |
| **Docs Available** | Design, Engineer, Vibe |


---

## Design Documentation

> Query mode: `@design badge`

**A badge component used to provide information on item statuses and notifications, drawing attention to significant information that might otherwise be missed.**

### Design Tokens

**Colors:**
- badge.vipAccess: Cosmos #121212
- badge.resale: Nebula #D0006F
- badge.soldOut: Cosmos #121212
- badge.cancelled: Mars #EB0000
- badge.postponed: Jupiter #FFB932
- badge.onSale: Earth #048851
- badge.presale: Neptune #024DDF
- badge.promoted: Callisto #A733FF
- badge.healthCheck: Earth #048851
- badge.lowAvailability: Jupiter #FFB932
- badge.newDate: Earth #048851
- text.dark: Cosmos #121212
- text.light: Spotlight #FFFFFF
- border: Ammonite #D6D6D6

**Spacing:**
- paddingVertical: Lounge 4px
- paddingHorizontal: Club 8px
- iconGap: Lounge 4px

**Typography:**
- label: Snowdon

### Full Design Specification


# Badge

A badge component used to provide information on item statuses and notifications. Badges draw a user's attention to significant information that might otherwise be missed.

## Overview

Badges are standalone UI elements with a designated color and purpose. They are used with other components and cannot be used alone. A badge is rendered with or without an icon but always sits next to other text. When used with other components, it can help draw a fan's attention to significant information that might be missed.

## Badge Types

Each badge has its own text and associated color. There are two style variants:
- **Bordered** - White background with colored border
- **Filled** - Solid color background

### Available Types

| Type | Color | Use Case |
|------|-------|----------|
| VIP Access | Cosmos (`#121212`) | Premium/exclusive access |
| Resale | Nebula (`#D0006F`) | Resale tickets |
| Sold Out | Cosmos (`#121212`) | No availability |
| Limited Availability | Jupiter (`#FFB932`) | Few tickets remaining |
| Low Availability | Jupiter (`#FFB932`) | Stock running low |
| On Sale | Earth (`#048851`) | Currently available |
| Package | Callisto (`#A733FF`) | Bundled offering |
| Postponed | Jupiter (`#FFB932`) | Event rescheduled |
| Presale | Neptune (`#024DDF`) | Early access sale |
| Health Check | Earth (`#048851`) | Health verification |
| Cancelled | Mars (`#EB0000`) | Event cancelled |
| On Partner Site | Neptune (`#024DDF`) | External partner |
| Livestream | Neptune (`#024DDF`) | Virtual event |
| Tax Exempt | Granite (`#646464`) | Tax-free purchase |
| New Date | Earth (`#048851`) | Updated event date |
| Near You | Neptune (`#024DDF`) | Location-based |
| Promoted | Callisto (`#A733FF`) | Featured/promoted |
| Required | Mars (`#EB0000`) | Mandatory action |
| Complete | Earth (`#048851`) | Task finished |

## Anatomy

```
Badge
├── Icon (optional)
└── Label Text
```

### Parts

| Part | Description |
|------|-------------|
| Container | Rounded rectangle with border or fill |
| Icon | Optional leading icon matching badge type |
| Label | Badge text describing the status |

### Container Variants

| Variant | Background | Border | Text Color |
|---------|------------|--------|------------|
| Bordered | Spotlight (`#FFFFFF`) | Type color | Type color |
| Filled | Type color | None | Spotlight (`#FFFFFF`) or Cosmos (`#121212`) |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `BadgeType` | required | The badge type (see types above) |
| `filled` | `boolean` | `false` | Use solid color variant |
| `className` | `string` | - | Additional CSS classes |

### BadgeType

```typescript
type BadgeType =
  | 'VIP Access'
  | 'Resale'
  | 'Sold Out'
  | 'Limited Availability'
  | 'Low Availability'
  | 'On Sale'
  | 'Package'
  | 'Postponed'
  | 'Presale'
  | 'Health Check'
  | 'Cancelled'
  | 'On Partner Site'
  | 'Livestream'
  | 'Tax Exempt'
  | 'New Date'
  | 'Near You'
  | 'Promoted'
  | 'Required'
  | 'Complete';
```

## Styling

### Typography

| Element | Style | Specs |
|---------|-------|-------|
| Label | Snowdon | 12px, Semibold 600, uppercase |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| Vertical padding | Lounge | 4px |
| Horizontal padding | Club | 8px |
| Icon to text gap | Lounge | 4px |

### Border Radius

All badges use a small border radius: `4px`

### Color Mapping

| Badge Type | Fill Color | Border Color | Text on Fill |
|------------|------------|--------------|--------------|
| VIP Access | Cosmos | Cosmos | White |
| Resale | Nebula | Nebula | White |
| Sold Out | Cosmos | Cosmos | White |
| Cancelled | Mars | Mars | White |
| Postponed | Jupiter | Jupiter | Cosmos |
| On Sale | Earth | Earth | White |
| Presale | Neptune | Neptune | White |
| Health Check | Earth | Earth | White |
| Promoted | Callisto | Callisto | White |
| Low Availability | Jupiter | Jupiter | Cosmos |
| Limited Availability | Jupiter | Jupiter | Cosmos |
| New Date | Earth | Earth | White |
| Package | Callisto | Callisto | White |

## Badges in Use

Badges can be used in a variety of places. Examples show how a badge can help make content stand out or add extra context to other pieces of information:

- **Event cards** - Show ticket availability status
- **Product listings** - Highlight special offers or limited stock
- **Checkout flows** - Indicate required actions or completion status
- **Search results** - Filter and categorize results

## Do's and Don'ts

### Do's
- Use badges to highlight important status information
- Pair badges with relevant content they describe
- Use the appropriate badge type for the context
- Maintain consistent badge usage across similar content

### Don'ts
- Don't change the badge colours
- Don't add more than one icon to a badge
- Don't change the text sizes
- Don't use badges for non-status information
- Don't create custom badge types outside the defined set

## CSS Custom Properties

```css
:root {
  /* Badge Colors */
  --badge-vip: var(--color-cosmos);
  --badge-resale: #D0006F;
  --badge-sold-out: var(--color-cosmos);
  --badge-cancelled: var(--color-mars);
  --badge-postponed: var(--color-jupiter);
  --badge-on-sale: var(--color-earth);
  --badge-presale: var(--color-neptune);
  --badge-health-check: var(--color-earth);
  --badge-promoted: var(--color-callisto);
  --badge-low-availability: var(--color-jupiter);
  --badge-new-date: var(--color-earth);
  --badge-package: var(--color-callisto);

  /* Badge Spacing */
  --badge-padding-y: var(--space-lounge);
  --badge-padding-x: var(--space-club);
  --badge-icon-gap: var(--space-lounge);
  --badge-border-radius: 4px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js (badge-specific)
module.exports = {
  theme: {
    extend: {
      colors: {
        nebula: '#D0006F',
      }
    }
  }
}
```

## Usage Examples

### React Component

```tsx
// Filled badges
<Badge type="VIP Access" filled />
<Badge type="Sold Out" filled />
<Badge type="On Sale" filled />

// Bordered badges (default)
<Badge type="Health Check" />
<Badge type="Presale" />
<Badge type="Postponed" />

// In context - Event card
<div className="flex flex-col gap-club">
  <img src={eventImage} alt={eventName} />
  <div className="flex gap-lounge">
    <Badge type="Presale" />
    <Badge type="VIP Access" filled />
  </div>
  <h3>{eventName}</h3>
</div>

// Multiple status badges
<div className="flex flex-wrap gap-lounge">
  <Badge type="Low Availability" filled />
  <Badge type="Near You" />
</div>
```

### Styling with Tailwind

```tsx
// Badge base styles
const badgeBaseClasses = cn(
  "inline-flex items-center gap-lounge",
  "px-club py-lounge",
  "rounded text-[12px] font-semibold uppercase tracking-wide"
);

// Bordered variant
<span className={cn(
  badgeBaseClasses,
  "bg-spotlight border",
  type === "Presale" && "border-neptune text-neptune",
  type === "Cancelled" && "border-mars text-mars",
  type === "On Sale" && "border-earth text-earth"
)}>
  {icon && <Icon className="size-3" />}
  {label}
</span>

// Filled variant
<span className={cn(
  badgeBaseClasses,
  type === "VIP Access" && "bg-cosmos text-spotlight",
  type === "Cancelled" && "bg-mars text-spotlight",
  type === "Postponed" && "bg-jupiter text-cosmos",
  type === "On Sale" && "bg-earth text-spotlight"
)}>
  {icon && <Icon className="size-3" />}
  {label}
</span>
```

## Component Reference

| Context | Recommended Types |
|---------|------------------|
| Ticket availability | Sold Out, Low Availability, On Sale |
| Event status | Cancelled, Postponed, New Date |
| Purchase type | VIP Access, Presale, Package, Resale |
| Special features | Health Check, Livestream, Near You |
| Promotional | Promoted, Required, Complete |

---

## Engineer Documentation

> Query mode: `@engineer badge`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { Badge } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-badge--default)

### Source

`components/Badge/index.tsx`

### Full Engineer Documentation

# Badge

## Import

```tsx
import { Badge } from '@gds/components';
```

## Basic Usage

```tsx
<Badge>Content</Badge>
```



## Variants

Available variants: `Basic`, `Sales`, `Label`, `Bordered`, `Filled`, `BorderedWithIcon`, `Required`, `Confirmed`, `NearYou`, `Promoted`, `PromotedInverse`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-badge--default)

## Source

`components/Badge/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe badge`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- Badge Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-[#024DDF] text-white">
  Badge Content
</span>

<!-- States -->
<!-- Hover: Add hover: prefix to classes -->
<!-- Focus: Add focus: prefix to classes -->
<!-- Disabled: Add disabled:opacity-50 disabled:cursor-not-allowed -->

```


---

## Comparison: Design vs Code

| Aspect | Design (@design) | Code (@engineer) |
|--------|------------------|------------------|
| **Status** | stable | In Storybook |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `@gds/components` |
| **Figma Node** | 612:40429 | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

