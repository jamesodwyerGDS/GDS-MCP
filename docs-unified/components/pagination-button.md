---
name: PaginationButton
description: Unified documentation for PaginationButton component
audiences:
  - design
lastUpdated: '2026-01-06'
category: atoms
status: stable
figmaNodeId: '612:94302'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
tokens:
  colours:
    background:
      container: 'Lunar #F6F6F6'
    progress:
      track: 'Ammonite #D6D6D6'
      fill: 'Cosmos #121212'
    text:
      primary: 'Cosmos #121212'
    button:
      inactive:
        border: 'Cosmos #121212'
        text: 'Cosmos #121212'
        background: transparent
      hover:
        border: 'Cosmos #121212'
        text: 'Spotlight #FFFFFF'
        background: 'Cosmos #121212'
  spacing:
    containerPaddingX: 24px
    containerPaddingY: 12px
    gap: 12px
    buttonPaddingX: 16px
    buttonPaddingY: 10px
    progressBarHeight: 4px
  typography:
    description: 'Averta Regular 14px/20px, letter-spacing 0.28px'
    descriptionBold: 'Averta Semibold 14px/20px, letter-spacing 0.28px'
    button: 'Averta Semibold 16px/24px, letter-spacing 0.32px'
  borderRadius:
    container: 24px
    button: 24px
    progressBar: 8px
---
# PaginationButton

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | PaginationButton |
| **Color Variants** | background, progress, text, button |
| **Figma Node** | 612:94302 |
| **Docs Available** | Design |


---

## Design Documentation

> Query mode: `@design pagination-button`

**A load-more pagination component displaying progress of items loaded and a button to load additional content.**

### Design Tokens

**Colors:**
- background.container: Lunar #F6F6F6
- progress.track: Ammonite #D6D6D6
- progress.fill: Cosmos #121212
- text.primary: Cosmos #121212
- button.inactive: [object Object]
- button.hover: [object Object]

**Spacing:**
- containerPaddingX: 24px
- containerPaddingY: 12px
- gap: 12px
- buttonPaddingX: 16px
- buttonPaddingY: 10px
- progressBarHeight: 4px

**Typography:**
- description: Averta Regular 14px/20px, letter-spacing 0.28px
- descriptionBold: Averta Semibold 14px/20px, letter-spacing 0.28px
- button: Averta Semibold 16px/24px, letter-spacing 0.32px

### Full Design Specification


# Pagination Button

A load-more pagination component displaying progress of items loaded and a button to load additional content.

## Overview

The Pagination Button component is used within page designs to show users that more content is available. It typically sits at the bottom of listing pages on desktop and mobile. The component breaks up large content into manageable chunks, preventing users from feeling overwhelmed by long lists.

Using a pagination bar at the bottom of large content listings greatly improves user experience. It allows users to easily navigate through content by loading it incrementally when desired. The component provides a visual representation of where the user is in the content and how much remains to be viewed.

### When to use

- Use at the bottom of listing pages with large amounts of content
- Use when content should be loaded progressively rather than all at once
- Use when users need visibility into how much content remains
- Ideal for event listings, search results, and product catalogs

### When not to use

- Do not use for small lists that can display all content at once
- Do not use when traditional numbered pagination is more appropriate
- Do not use for content that requires random access to specific pages

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| Inactive | Outline button with border, ready for interaction | Default resting state |
| Hover | Filled button with dark background | User hovering over button |

## Anatomy

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                  ┌──────────────────────────┐                  │
│                  │  Showing 60 out of 1720  │  ← Description   │
│                  │         events           │                  │
│                  └──────────────────────────┘                  │
│                                                                │
│     ┌──────────────────────────────────────────────────┐       │
│     │██████████                                        │       │  ← Progress Bar
│     └──────────────────────────────────────────────────┘       │
│                                                                │
│                  ┌────────────────────┐                        │
│                  │  Show more    ▼    │                        │  ← Pill Button
│                  └────────────────────┘                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Parts

| Part | Description |
|------|-------------|
| Container | Rounded container with light background |
| Description | Text showing items displayed and total count |
| Progress Bar | Visual indicator of percentage loaded |
| Pill Button | Action button to load more content with chevron down icon |

## States

| State | Description | Visual |
|-------|-------------|--------|
| Inactive | Default state, ready for interaction | Outline button, border #121212, text #121212 |
| Hover | Mouse over the button | Filled button, background #121212, text #FFFFFF |

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `itemsShown` | `number` | - | Number of items currently displayed |
| `totalItems` | `number` | - | Total number of items available |
| `itemLabel` | `string` | `'events'` | Label for items (e.g., "events", "results", "products") |
| `buttonLabel` | `string` | `'Show more'` | Text displayed on the action button |
| `disabled` | `boolean` | `false` | Disables the load more button |

## Styling

### Typography

| Element | Font | Size | Line Height | Letter Spacing | Color |
|---------|------|------|-------------|----------------|-------|
| Description | Averta Regular | 14px | 20px | 0.28px | Cosmos #121212 |
| Bold numbers | Averta Semibold | 14px | 20px | 0.28px | Cosmos #121212 |
| Button text | Averta Semibold | 16px | 24px | 0.32px | Cosmos #121212 (inactive) / Spotlight #FFFFFF (hover) |

### Spacing

| Area | Value |
|------|-------|
| Container width | 343px (default) |
| Container padding | 24px horizontal, 12px vertical |
| Container border radius | 24px |
| Gap between elements | 12px |
| Progress bar height | 4px |
| Progress bar border radius | 8px |
| Button padding | 16px horizontal, 10px vertical |
| Button border radius | 24px |
| Button icon gap | 8px |

### Colors

| Element | State | Color |
|---------|-------|-------|
| Container background | Default | Lunar #F6F6F6 |
| Progress bar track | Default | Ammonite #D6D6D6 |
| Progress bar fill | Default | Cosmos #121212 |
| Description text | Default | Cosmos #121212 |
| Button border | Inactive | Cosmos #121212 |
| Button text | Inactive | Cosmos #121212 |
| Button background | Hover | Cosmos #121212 |
| Button text | Hover | Spotlight #FFFFFF |
| Chevron icon | Inactive | Cosmos #121212 |
| Chevron icon | Hover | Spotlight #FFFFFF |

## Accessibility

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Focus the load more button |
| Enter/Space | Trigger load more action |

### ARIA Attributes

```html
<div class="pagination-button" role="region" aria-label="Pagination">
  <p aria-live="polite">Showing 60 out of 1720 events</p>
  <div
    role="progressbar"
    aria-valuenow="60"
    aria-valuemin="0"
    aria-valuemax="1720"
    aria-label="Loading progress"
  ></div>
  <button aria-label="Show more events">
    Show more
  </button>
</div>
```

### Screen Reader Considerations

- Progress information announced via `aria-live="polite"` when updated
- Progress bar includes proper `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`
- Button label clearly indicates action

## Do's and Don'ts

### Do's

- Use at the bottom of content listings
- Show accurate count of items displayed vs total
- Update progress bar proportionally to items loaded
- Maintain consistent styling across the application
- Provide clear feedback when loading new content

### Don'ts

- Don't change the text sizes
- Don't change the colour of the progress bar
- Don't change the button style (outline vs filled)
- Don't use without showing item counts
- Don't hide the progress bar
- Don't change the chevron icon direction

## CSS Custom Properties

```css
:root {
  /* Pagination Button Colors */
  --pagination-bg: var(--color-lunar);
  --pagination-text: var(--color-cosmos);
  --pagination-progress-track: var(--color-ammonite);
  --pagination-progress-fill: var(--color-cosmos);
  --pagination-button-border: var(--color-cosmos);
  --pagination-button-text: var(--color-cosmos);
  --pagination-button-hover-bg: var(--color-cosmos);
  --pagination-button-hover-text: var(--color-spotlight);

  /* Pagination Button Spacing */
  --pagination-padding-x: 24px;
  --pagination-padding-y: 12px;
  --pagination-gap: 12px;
  --pagination-button-padding-x: 16px;
  --pagination-button-padding-y: 10px;
  --pagination-progress-height: 4px;

  /* Pagination Button Shape */
  --pagination-radius: 24px;
  --pagination-progress-radius: 8px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js (pagination button specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        pagination: {
          bg: '#F6F6F6',           // Lunar
          text: '#121212',         // Cosmos
          'progress-track': '#D6D6D6',  // Ammonite
          'progress-fill': '#121212',   // Cosmos
          'button-border': '#121212',
          'button-hover': '#121212',
          'button-hover-text': '#FFFFFF',
        }
      },
      spacing: {
        'pagination-px': '24px',
        'pagination-py': '12px',
        'pagination-gap': '12px',
        'pagination-btn-px': '16px',
        'pagination-btn-py': '10px',
      },
      borderRadius: {
        'pagination': '24px',
        'pagination-progress': '8px',
      },
      height: {
        'pagination-progress': '4px',
      },
      width: {
        'pagination': '343px',
      }
    }
  }
}
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Grey/Lunar | COLOR | #F6F6F6 |
| Grey/Ammonite | COLOR | #D6D6D6 |
| Core/Cosmos | COLOR | #121212 |
| Secondary/Spotlight | COLOR | #FFFFFF |
| Desktop/Small Body - Etna | TYPOGRAPHY | Averta Regular 14px/20px |
| Desktop/Body Bold - Boising | TYPOGRAPHY | Averta Semibold 16px/24px |

## Related Components

- [Button](../atoms/button.md) - Base button component
- [Pill Button](../atoms/pill-button.md) - Used for the load more action
- [Loading Spinner](../atoms/loading-spinner.md) - For showing loading state

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-06 | Initial release |

---

## Engineer Documentation

> Query mode: `@engineer pagination-button`
> Styling: **styled-components** (CSS-in-JS)

*No engineer documentation available for this component.*


---

## Vibe Documentation

> Query mode: `@vibe pagination-button`
> Styling: **Tailwind CSS** (utility classes)

*No vibe documentation available for this component.*


---

## Comparison: Design vs Code

| Aspect | Design (@design) | Code (@engineer) |
|--------|------------------|------------------|
| **Status** | stable | - |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `-` |
| **Figma Node** | 612:94302 | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

