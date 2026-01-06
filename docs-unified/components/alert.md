---
name: Alert
description: Unified documentation for Alert component
audiences:
  - design
  - vibe
lastUpdated: '2026-01-06'
category: atoms
status: stable
figmaNodeId: '10410:52040'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
tokens:
  colours:
    background: 'Spotlight #FFFFFF'
    text:
      title: 'Cosmos #121212'
      body: 'Cosmos #121212'
    status:
      error: 'Mars #EB0000'
      warning: 'Jupiter #FFB932'
      information: 'Neptune #024DDF'
      success: 'Earth #048851'
    button:
      primary: 'Neptune #024DDF'
      tertiary: 'Neptune #024DDF'
  spacing:
    containerPadding: Auditorium 16px
    iconTextGap: Auditorium 16px
    titleBodyGap: Club 8px
    buttonGap: Auditorium 16px
    mobileButtonGap: Lounge 4px
  typography:
    title: Boise
    body: Rainier
  elevation:
    - level-1: '0px 1px 4px 0px rgba(18,18,18,0.15)'
---
# Alert

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Alert |
| **Color Variants** | background, text, status, button |
| **Figma Node** | 10410:52040 |
| **Docs Available** | Design, Vibe |


---

## Design Documentation

> Query mode: `@design alert`

**An alert component that displays important messages to users, providing contextual feedback for errors, warnings, informational messages, and success confirmations.**

### Design Tokens

**Colors:**
- background: Spotlight #FFFFFF
- text.title: Cosmos #121212
- text.body: Cosmos #121212
- status.error: Mars #EB0000
- status.warning: Jupiter #FFB932
- status.information: Neptune #024DDF
- status.success: Earth #048851
- button.primary: Neptune #024DDF
- button.tertiary: Neptune #024DDF

**Spacing:**
- containerPadding: Auditorium 16px
- iconTextGap: Auditorium 16px
- titleBodyGap: Club 8px
- buttonGap: Auditorium 16px
- mobileButtonGap: Lounge 4px

**Typography:**
- title: Boise
- body: Rainier

### Full Design Specification


# Alert

An alert component that displays important messages to users, providing contextual feedback for errors, warnings, informational messages, and success confirmations.

## Overview

Alerts present essential information or notifications that users should notice and not ignore. They are designed to be easily identifiable and understood, with short, engaging content. The design system provides two alert types: on-page alerts for prominent page-level messages and nested alerts for inline feedback within other UI elements.

## Alert Types

### On-page Alert

A full-featured alert that sits directly on the page at the top of main content to provide important information users must be aware of.

**Features:**
- Color-coded status strip
- Status icon
- Title and optional body text
- Optional action buttons

### Nested Alert

A simplified inline alert used when surfacing feedback inside another UI element, such as a card or form section.

**Features:**
- Status icon
- Single line of text
- No buttons or color strip

## Anatomy

### On-page Alert

```
┌─────────────────────────────────────────────────────────┐
│ ┃  [Icon]  Title text (Semibold)                        │
│ ┃          Body text (Regular)              [Btn] [Btn] │
└─────────────────────────────────────────────────────────┘
  ↑
  Color strip (4px)
```

### Nested Alert

```
[Icon]  Alert message text
```

### Parts

| Part | Description |
|------|-------------|
| Container | White background with elevation shadow |
| Color Strip | 4px left border indicating status |
| Status Icon | 24px filled icon matching status color |
| Title | Primary message text (Semibold) |
| Body Text | Additional description (Regular, optional) |
| Buttons | Action buttons (optional, right-aligned) |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'error' \| 'warning' \| 'information' \| 'success'` | `'error'` | Alert severity type |
| `device` | `'desktop' \| 'mobile'` | `'desktop'` | Responsive variant |
| `nested` | `boolean` | `false` | Simplified inline variant |
| `alertText` | `string` | required | Main alert message |
| `body` | `boolean` | `true` | Show body text section |
| `bodyText` | `string` | - | Additional description text |
| `buttons` | `boolean` | `true` | Show action buttons |
| `tertiaryButton` | `boolean` | `true` | Show secondary text button |
| `onPrimaryClick` | `() => void` | - | Primary button callback |
| `onTertiaryClick` | `() => void` | - | Tertiary button callback |
| `primaryLabel` | `string` | `'Button'` | Primary button text |
| `tertiaryLabel` | `string` | `'Button'` | Tertiary button text |

## Status Types

| Status | Color | Icon | Use Case |
|--------|-------|------|----------|
| Error | Mars (`#EB0000`) | ErrorFilled | Critical issues requiring immediate attention |
| Warning | Jupiter (`#FFB932`) | WarningFilled | Potential problems or risks to be aware of |
| Information | Neptune (`#024DDF`) | InfoFilled | Non-critical, informative messages |
| Success | Earth (`#048851`) | SuccessFilled | Successful completion of a task or action |

## Styling

### Typography

| Element | Style | Desktop | Mobile |
|---------|-------|---------|--------|
| Title | Boise (Semibold) | 16px / 24px | 16px / 22px |
| Body | Rainier (Regular) | 16px / 24px | 16px / 22px |
| Letter Spacing | - | 0.32px (2%) | 0.32px (2%) |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| Container padding | Auditorium | 16px |
| Icon to text gap | Auditorium | 16px |
| Title to body gap | Club | 8px |
| Button gap (desktop) | Auditorium | 16px |
| Button gap (mobile) | Lounge | 4px |

### Color Strip

The left border indicates status:
- Width: 4px
- Color: Matches status color token

### Elevation

On-page alerts use Level 1 elevation:
```css
box-shadow: 0px 1px 4px 0px rgba(18, 18, 18, 0.15);
```

## Responsive Behavior

### Desktop
- Buttons displayed inline, right-aligned
- Tertiary button appears before primary button
- Horizontal layout for icon, text, and buttons

### Mobile
- Buttons stacked vertically, full-width
- Primary button on top, tertiary below
- Reduced line-height (22px vs 24px)

## Accessibility

### ARIA Attributes

```tsx
// On-page alert (important notifications)
<div
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
>

// Informational alert (non-urgent)
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
```

### Focus Management

- Action buttons are keyboard accessible
- Focus visible state with Neptune outline
- Tab order: tertiary button → primary button

### Screen Reader Considerations

- Status is conveyed through icon alt text
- Alert content is announced when it appears
- Button labels should be descriptive

## Do's and Don'ts

### Do's
- Use the appropriate status for the message type
- Keep alert text concise and actionable
- Place on-page alerts at top of main content area
- Use nested alerts inside cards, forms, or other containers
- Provide clear action buttons when user response is needed

### Don'ts
- Don't change the background colors
- Don't change the text sizes
- Don't use nested alerts directly on the page
- Don't use on-page alerts inside other UI elements
- Don't mix button layouts between device sizes
- Don't use alerts for non-important information

## CSS Custom Properties

```css
:root {
  /* Alert Colors */
  --alert-bg: var(--color-spotlight);
  --alert-text-title: var(--color-cosmos);
  --alert-text-body: var(--color-cosmos);

  /* Status Colors */
  --alert-status-error: var(--color-mars);
  --alert-status-warning: var(--color-jupiter);
  --alert-status-information: var(--color-neptune);
  --alert-status-success: var(--color-earth);

  /* Alert Spacing */
  --alert-padding: var(--space-auditorium);
  --alert-icon-gap: var(--space-auditorium);
  --alert-text-gap: var(--space-club);
  --alert-button-gap: var(--space-auditorium);
  --alert-button-gap-mobile: var(--space-lounge);

  /* Alert Elevation */
  --alert-shadow: var(--elevation-level-1);
}
```

## Tailwind Configuration

```js
// tailwind.config.js (alert-specific utilities)
module.exports = {
  theme: {
    extend: {
      // Status border colors already defined in color tokens
    }
  }
}
```

## Usage Examples

### React Component

```tsx
// Error alert with buttons
<Alert
  status="error"
  alertText="Your payment could not be processed."
  bodyText="Please check your card details and try again."
  buttons
  tertiaryButton
  primaryLabel="Try Again"
  tertiaryLabel="Cancel"
  onPrimaryClick={handleRetry}
  onTertiaryClick={handleCancel}
/>

// Warning alert without buttons
<Alert
  status="warning"
  alertText="Your session will expire in 5 minutes."
  bodyText="Please save your work to avoid losing changes."
  buttons={false}
/>

// Success alert, body text hidden
<Alert
  status="success"
  alertText="Your order has been confirmed!"
  body={false}
  buttons
  tertiaryButton={false}
  primaryLabel="View Order"
/>

// Nested alert (inline)
<Alert
  status="information"
  alertText="Tickets are selling fast for this event."
  nested
/>

// Mobile variant
<Alert
  status="error"
  device="mobile"
  alertText="Unable to complete purchase."
  bodyText="The selected seats are no longer available."
  buttons
/>
```

### Styling with Tailwind

```tsx
// On-page alert container
<div
  role="alert"
  className={cn(
    "bg-spotlight rounded shadow-elevation-1",
    "flex flex-col gap-auditorium p-auditorium",
    "border-l-4",
    status === "error" && "border-l-mars",
    status === "warning" && "border-l-jupiter",
    status === "information" && "border-l-neptune",
    status === "success" && "border-l-earth"
  )}
>
  {/* Icon + Text row */}
  <div className="flex items-start gap-auditorium">
    <StatusIcon status={status} className="size-6 shrink-0" />
    <div className="flex flex-col gap-club flex-1">
      <p className="text-boise text-cosmos">{alertText}</p>
      {body && <p className="text-rainier text-cosmos">{bodyText}</p>}
    </div>
  </div>

  {/* Buttons row - Desktop */}
  {buttons && device === "desktop" && (
    <div className="flex items-center justify-end gap-auditorium">
      {tertiaryButton && (
        <button className="px-auditorium py-[10px] text-boise text-neptune">
          {tertiaryLabel}
        </button>
      )}
      <button className="px-auditorium py-[10px] bg-neptune text-spotlight text-boise rounded">
        {primaryLabel}
      </button>
    </div>
  )}

  {/* Buttons row - Mobile */}
  {buttons && device === "mobile" && (
    <div className="flex flex-col gap-lounge w-full">
      <button className="w-full px-auditorium py-[10px] bg-neptune text-spotlight text-boise rounded">
        {primaryLabel}
      </button>
      {tertiaryButton && (
        <button className="w-full px-auditorium py-[10px] text-boise text-neptune">
          {tertiaryLabel}
        </button>
      )}
    </div>
  )}
</div>

// Nested alert
<div className="flex items-center gap-auditorium">
  <StatusIcon status={status} className="size-6 shrink-0" />
  <p className="text-rainier text-cosmos">{alertText}</p>
</div>
```

## Component Reference

| Use Case | Type | Buttons | Body |
|----------|------|---------|------|
| Payment failure | On-page, Error | Yes | Yes |
| Session timeout warning | On-page, Warning | No | Yes |
| Order confirmation | On-page, Success | Optional | Optional |
| Form validation error | Nested, Error | No | No |
| Low stock notice | Nested, Warning | No | No |
| Feature tip | Nested, Information | No | No |

---

## Engineer Documentation

> Query mode: `@engineer alert`
> Styling: **styled-components** (CSS-in-JS)

*No engineer documentation available for this component.*


---

## Vibe Documentation

> Query mode: `@vibe alert`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- Alert Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<div class="flex items-center gap-3 p-4 rounded-lg bg-[#024DDF]/10 text-[#024DDF]">
  Alert Content
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
| **Status** | stable | - |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `-` |
| **Figma Node** | 10410:52040 | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

