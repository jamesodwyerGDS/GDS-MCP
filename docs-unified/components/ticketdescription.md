---
name: Ticketdescription
description: Unified documentation for Ticketdescription component
audiences:
  - engineer
lastUpdated: '2026-01-06'
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-ticket-description--default'
sourceFile: components/TicketDescription/TicketDescription.tsx
---
# Ticketdescription

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Ticketdescription |
| **Package** | `@gds/components` |
| **Docs Available** | Engineer |


---

## Design Documentation

> Query mode: `@design ticketdescription`

*No design documentation available for this component.*


---

## Engineer Documentation

> Query mode: `@engineer ticketdescription`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { TicketDescription } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-ticket-description--default)

### Source

`components/TicketDescription/TicketDescription.tsx`

### Full Engineer Documentation

# TicketDescription

## Import

```tsx
import { TicketDescription } from '@gds/components';
```

## Basic Usage

```tsx
<TicketDescription>Content</TicketDescription>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | - |


## Variants

Available variants: `Postal`, `WillCall`, `Print`, `TransferComplete`, `Cancelled`, `AppOnly`, `ResaleSold`, `TransferPending`, `ResaleWithShareListing`, `TicketError`, `TicketInfo`, `ResaleWarning`, `AppOnlyWithAppleWallet`, `AppOnlyWithGoogleWallet`, `ResaleListing`, `WithCustomIcon`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-ticket-description--default)

## Source

`components/TicketDescription/TicketDescription.tsx`

---

## Vibe Documentation

> Query mode: `@vibe ticketdescription`
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

