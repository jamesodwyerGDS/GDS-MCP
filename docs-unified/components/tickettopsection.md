---
name: Tickettopsection
description: Unified documentation for Tickettopsection component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-ticket-top-section--default'
sourceFile: components/TicketTopSection/TicketTopSection.tsx
---
# Tickettopsection

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Tickettopsection |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design tickettopsection`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer tickettopsection`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { TicketTopSection } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-ticket-top-section--default)

### Source

`components/TicketTopSection/TicketTopSection.tsx`

### Full Engineer Documentation

# TicketTopSection

## Import

```tsx
import { TicketTopSection } from '@gds/components';
```

## Basic Usage

```tsx
<TicketTopSection>Content</TicketTopSection>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `accessibleTitle` | `string` | No | - |
| `headerTitle` | `string` | Yes | - |
| `row` | `SeatLocation` | No | - |
| `seat` | `SeatLocation` | No | - |
| `section` | `SeatLocation` | No | - |
| `ticketInfoButtonData` | `TicketInfoButtonData` | No | - |
| `type` | `TicketType` | Yes | - |
| `wayfindingColors` | `BrandColors` | No | - |
| `voucherDisclaimer` | `string` | No | - |


## Variants

Available variants: `Primary`, `Transfer`, `Resale`, `WithoutCtaButton`, `WithAccessibleTitle`, `WithAccessibleTitleAndNoHeaderTitle`, `Disabled`, `WithWayfindingLight`, `WithWayfindingDark`, `ShouldNotShowWayfinding`, `WithAddedValue`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-ticket-top-section--default)

## Source

`components/TicketTopSection/TicketTopSection.tsx`

---

## Vibe Documentation

> Query mode: `@vibe tickettopsection`
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

