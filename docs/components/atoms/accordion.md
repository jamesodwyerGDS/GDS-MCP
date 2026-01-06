---
name: Accordion
description: An accordion component that allows users to expand and collapse content sections, useful for organizing information in a compact, scannable format.
category: atoms
status: stable
version: 1.0.0
updated: 2025-01-05
tags:
  - accordion
  - expandable
  - collapse
  - disclosure
keywords:
  - accordion component
  - expandable sections
  - collapsible content
  - disclosure widget
  - FAQ
dependencies: []
relatedComponents:
  - divider
tokens:
  colours:
    background:
      default: "Spotlight #FFFFFF"
      hover: "Lunar #F6F6F6"
    focus: "Neptune #024DDF"
    text:
      title: "Cosmos #121212"
      body: "Granite #646464"
    icon: "Cosmos #121212"
  spacing:
    headerPaddingVertical: "Auditorium 16px"
    headerPaddingHorizontal: "Amphitheatre 24px"
    bodyPadding: "Auditorium 16px"
    iconGap: "Club 8px"
  typography:
    title: "Boise"
    body: "Rainier"
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - button
    - region
frameworks:
  - framework: React
    package: "@gds/components"
    import: "import { Accordion, AccordionItem } from '@gds/components'"
figmaNodeId: "36820:5752"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Accordion

An accordion component that allows users to expand and collapse content sections, useful for organizing information in a compact, scannable format.

## Overview

The Accordion component consists of a parent container and multiple accordion items. Each item has a clickable header that toggles the visibility of its associated content panel.

## Anatomy

```
Accordion
├── AccordionItem
│   ├── Header (clickable)
│   │   ├── Start Icon (optional)
│   │   ├── Title
│   │   └── Chevron Icon
│   ├── Divider (optional)
│   └── Body (collapsible)
│       ├── Body Text
│       └── Body Slot (custom content)
```

### Parts

| Part | Description |
|------|-------------|
| Header | Clickable trigger area containing title and icons |
| Start Icon | Optional icon displayed before the title |
| Title | Text label describing the section content |
| Chevron | Indicator showing expand/collapse state (rotates 180°) |
| Divider | Optional separator between items |
| Body | Collapsible content area |

## Props

### Accordion (Parent)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showIcon` | `boolean` | `false` | Show chevron icons on all items |
| `children` | `ReactNode` | required | AccordionItem components |

### AccordionItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isExpanded` | `boolean` | `false` | Whether content is visible |
| `onToggle` | `() => void` | - | Callback when header is clicked |
| `showStartIcon` | `boolean` | `false` | Display icon before title |
| `icon` | `ReactNode` | - | Custom start icon element |
| `title` | `string` | required | Header text |
| `showBodySlot` | `boolean` | `false` | Use custom slot instead of text |
| `bodySlot` | `ReactNode` | - | Custom body content |
| `bodyText` | `string` | - | Default body text content |
| `showTopDivider` | `boolean` | `false` | Show divider above item |
| `showBottomDivider` | `boolean` | `true` | Show divider below item |

## States

### Collapsed States

| State | Background | Border | Description |
|-------|-----------|--------|-------------|
| Default | Spotlight (`#FFFFFF`) | none | Base resting state |
| Hover | Lunar (`#F6F6F6`) | none | Mouse over header |
| Focused | Spotlight (`#FFFFFF`) | 2px Neptune (`#024DDF`) | Keyboard focus ring |

### Expanded States

| State | Background | Border | Description |
|-------|-----------|--------|-------------|
| Default | Spotlight (`#FFFFFF`) | none | Content visible, at rest |
| Hover | Lunar (`#F6F6F6`) | none | Mouse over header |
| Focused | Spotlight (`#FFFFFF`) | 2px Neptune (`#024DDF`) | Keyboard focus |

## Styling

### Typography

| Element | Style | Specs |
|---------|-------|-------|
| Title | Boise | 16px, Semibold 600, Cosmos |
| Body Text | Rainier | 16px, Regular 400, Granite |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| Header vertical padding | Auditorium | 16px |
| Header horizontal padding | Amphitheatre | 24px |
| Body padding | Auditorium | 16px |
| Icon to title gap | Club | 8px |
| Title to chevron gap | Club | 8px |

### Focus Ring

- Width: 2px
- Color: Neptune (`#024DDF`)
- Offset: 0px (inset)
- Border radius: 4px

## Accessibility

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next focusable element |
| `Shift + Tab` | Move focus to previous focusable element |
| `Enter` / `Space` | Toggle expanded state of focused item |
| `Arrow Down` | Move focus to next accordion header |
| `Arrow Up` | Move focus to previous accordion header |
| `Home` | Move focus to first accordion header |
| `End` | Move focus to last accordion header |

### ARIA Attributes

```tsx
// Header button
<button
  aria-expanded={isExpanded}
  aria-controls={`panel-${id}`}
  id={`header-${id}`}
>

// Content panel
<div
  role="region"
  aria-labelledby={`header-${id}`}
  id={`panel-${id}`}
  hidden={!isExpanded}
>
```

## Do's and Don'ts

### Do's
- Use clear, concise titles that describe the content
- Keep accordion content focused and relevant to the title
- Use consistent divider patterns within an accordion group
- Provide visual feedback on hover and focus states
- Allow multiple items to be expanded simultaneously when appropriate

### Don'ts
- Don't nest accordions within accordions
- Don't use accordions for critical content that users must see
- Don't hide primary navigation or essential actions in accordions
- Don't use excessively long titles that wrap to multiple lines
- Don't remove focus indicators for keyboard accessibility

## CSS Custom Properties

```css
:root {
  /* Accordion Colors */
  --accordion-bg-default: var(--color-spotlight);
  --accordion-bg-hover: var(--color-lunar);
  --accordion-focus-ring: var(--color-neptune);
  --accordion-title-color: var(--color-cosmos);
  --accordion-body-color: var(--color-granite);
  --accordion-icon-color: var(--color-cosmos);
  --accordion-divider-color: var(--color-ammonite);

  /* Accordion Spacing */
  --accordion-header-padding-y: var(--space-auditorium);
  --accordion-header-padding-x: var(--space-amphitheatre);
  --accordion-body-padding: var(--space-auditorium);
  --accordion-icon-gap: var(--space-club);

  /* Accordion Animation */
  --accordion-transition-duration: 200ms;
  --accordion-transition-easing: ease-in-out;
}
```

## Tailwind Configuration

```js
// tailwind.config.js (accordion-specific utilities)
module.exports = {
  theme: {
    extend: {
      animation: {
        'accordion-down': 'accordion-down 200ms ease-in-out',
        'accordion-up': 'accordion-up 200ms ease-in-out',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--accordion-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
      },
    },
  },
}
```

## Usage Examples

### React Component

```tsx
// Basic accordion
<Accordion showIcon>
  <AccordionItem
    title="What is the refund policy?"
    bodyText="You can request a refund within 30 days of purchase."
    showBottomDivider
  />
  <AccordionItem
    title="How do I contact support?"
    bodyText="Email us at support@example.com or call 1-800-EXAMPLE."
    showBottomDivider
  />
  <AccordionItem
    title="Where can I find my order?"
    bodyText="Check your account dashboard under 'My Orders'."
  />
</Accordion>

// Accordion with custom content
<Accordion showIcon>
  <AccordionItem
    title="Event Details"
    showStartIcon
    icon={<CalendarIcon />}
    showBodySlot
    bodySlot={
      <div className="flex flex-col gap-auditorium">
        <p className="text-rainier text-granite">
          Join us for an unforgettable evening of live music.
        </p>
        <button className="py-club px-auditorium bg-neptune text-spotlight rounded">
          Get Tickets
        </button>
      </div>
    }
  />
</Accordion>

// Controlled accordion
const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

<Accordion showIcon>
  {items.map((item) => (
    <AccordionItem
      key={item.id}
      title={item.title}
      bodyText={item.content}
      isExpanded={expandedItems.has(item.id)}
      onToggle={() => toggleItem(item.id)}
      showBottomDivider
    />
  ))}
</Accordion>
```

### Styling with Tailwind

```tsx
// AccordionItem header styling
<button
  className={cn(
    "w-full flex items-center justify-between",
    "py-auditorium px-amphitheatre",
    "bg-spotlight hover:bg-lunar",
    "focus:outline-none focus:ring-2 focus:ring-neptune focus:ring-inset",
    "transition-colors duration-200"
  )}
>
  <div className="flex items-center gap-club">
    {showStartIcon && icon}
    <span className="text-boise text-cosmos">{title}</span>
  </div>
  <ChevronIcon
    className={cn(
      "w-5 h-5 text-cosmos transition-transform duration-200",
      isExpanded && "rotate-180"
    )}
  />
</button>

// AccordionItem body styling
<div
  className={cn(
    "overflow-hidden transition-all duration-200",
    isExpanded ? "animate-accordion-down" : "animate-accordion-up"
  )}
>
  <div className="p-auditorium text-rainier text-granite">
    {showBodySlot ? bodySlot : bodyText}
  </div>
</div>
```

## Component Reference

| Component | Recommended Level | Use Case |
|-----------|------------------|----------|
| FAQ sections | Single page | Common questions and answers |
| Settings panels | Dashboard | Grouped configuration options |
| Product details | E-commerce | Specifications, reviews, shipping |
| Navigation menus | Mobile | Collapsible menu sections |
| Form sections | Multi-step forms | Grouped input fields |
