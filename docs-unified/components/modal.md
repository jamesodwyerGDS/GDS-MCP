---
name: Modal
description: Unified documentation for Modal component
audiences:
  - design
  - engineer
  - vibe
lastUpdated: '2026-01-06'
category: atoms
status: stable
figmaNodeId: '25353:1628'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
tokens:
  colours:
    background:
      container: 'Spotlight #FFFFFF'
      overlay: 'rgba(18, 18, 18, 0.6)'
    text:
      title: 'Cosmos #121212'
      body: 'Cosmos #121212'
      secondary: 'Granite #646464'
    accent:
      primary: 'Neptune #024DDF'
      warning: 'Jupiter #FFB932'
      error: 'Mars #D92D20'
  spacing:
    padding:
      desktop: 32px
      mobile: 24px
    gap:
      titleToContent: 16px
      contentToFooter: 16px
  typography:
    title:
      desktop: 'Averta Bold 28px/34px, letter-spacing 0.56px'
      mobile: 'Averta Bold 24px/30px, letter-spacing 0.48px'
    body: 'Averta Regular 16px/24px, letter-spacing 0.32px'
  elevation:
    shadow: '0px 2px 8px rgba(18, 18, 18, 0.15)'
  borderRadius: 0px (container)
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-modal--default'
sourceFile: components/Modal/Modal.tsx
---
# Modal

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Modal |
| **Color Variants** | background, text, accent |
| **Package** | `@gds/components` |
| **Figma Node** | 25353:1628 |
| **Docs Available** | Design, Engineer, Vibe |


---

## Design Documentation

> Query mode: `@design modal`

**A dialog overlay component that displays content requiring user attention or interaction, with multiple sizes and variants for different contexts.**

### Design Tokens

**Colors:**
- background.container: Spotlight #FFFFFF
- background.overlay: rgba(18, 18, 18, 0.6)
- text.title: Cosmos #121212
- text.body: Cosmos #121212
- text.secondary: Granite #646464
- accent.primary: Neptune #024DDF
- accent.warning: Jupiter #FFB932
- accent.error: Mars #D92D20

**Spacing:**
- padding: [object Object]
- gap: [object Object]

**Typography:**
- title: [object Object]
- body: Averta Regular 16px/24px, letter-spacing 0.32px

### Full Design Specification


# Modal

A dialog overlay component that displays content requiring user attention or interaction, with multiple sizes and variants for different contexts.

## Overview

Modals interrupt the user flow to capture attention for critical information or required actions. They overlay the page content with a semi-transparent backdrop and center the dialog on screen. Use modals sparingly and only when the content requires immediate user attention.

### When to Use

- Display critical information that needs acknowledgment
- Confirm destructive or irreversible actions
- Capture user input that blocks the main flow
- Show detailed content (images, forms) in context
- Present warning or error states requiring action

### When Not to Use

- For non-critical notifications (use Toast or Alert instead)
- For complex multi-step workflows (use full page)
- For content that users may need to reference while working
- When the modal content exceeds 70% viewport height (consider full page)

## Anatomy

### Standard Modal (No Image)

```
┌──────────────────────────────────────────────┐
│                                    [X] Close │
│  Title                                       │
│  ─────────────────────────────────────────   │
│                                              │
│  Body content or slot                        │
│                                              │
│  ─────────────────────────────────────────   │
│                    [Secondary]  [Primary]    │
└──────────────────────────────────────────────┘
```

### Modal with Image

```
┌──────────────────────────────────────────────┐
│  ┌────────────────────────────────────────┐  │
│  │            Image / Hero                │ [X]
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│  Title                                       │
│  ─────────────────────────────────────────   │
│  Body content                                │
│  ─────────────────────────────────────────   │
│                    [Secondary]  [Primary]    │
└──────────────────────────────────────────────┘
```

### Parts

| Part | Description |
|------|-------------|
| Container | White background with shadow |
| Overlay | Semi-transparent backdrop (60% opacity) |
| Title | Bold heading describing the modal purpose |
| Close Button | X icon button in top-right corner |
| Content | Body text, forms, or slot for custom content |
| Footer | Action buttons (primary and secondary) |
| Image (optional) | Hero image at top of modal |

## Props

### Modal

| Prop Name | Description | Type | Values | Default |
|-----------|-------------|------|--------|---------|
| `size` * | Controls the width of the modal | variant | Mobile, Small, Medium, Large | Mobile |
| `Type` * | Use case variant of the modal | variant | Standard, Warning, Error, With Image | Standard |
| `showCloseButton` * | Toggles visibility of close button | boolean | True, False | True |

### Modal Content

| Prop Name | Description | Type | Values | Default |
|-----------|-------------|------|--------|---------|
| `Content Type` * | Content display mode | variant | Slot, Text | Slot |
| `On Scroll` * | State for content overflow | boolean | True, False | False |
| `Body slot` * | Custom content container | instance swap | Slot | Slot |

### Modal Footer

| Prop Name | Description | Type | Values | Default |
|-----------|-------------|------|--------|---------|
| `Stacking` * | Button layout direction | variant | Horizontal, Vertical | Vertical |
| `Show primary button` * | Toggles primary button | boolean | True, False | True |
| `Show secondary button` * | Toggles secondary button | boolean | True, False | True |

## Size Variations

Modal widths are fixed based on the size property:

| Size | Width | Use Case |
|------|-------|----------|
| Small | 400px | Brief messages, alerts, confirmations |
| Medium | 600px | Moderate content, images, simple forms |
| Large | 740px | Complex forms, detailed content, data tables |
| Mobile | 320px | Mobile viewport modals |

### Choosing the Right Size

- **Small (400px)**: Use for short alerts, user confirmations, or brief messages. Avoid long titles.
- **Medium (600px)**: Use for moderate content, modals with images/illustrations, or simple user interactions.
- **Large (740px)**: Use for complex content, forms with multiple fields, or content requiring more horizontal space.
- **Mobile (320px)**: Automatically used for mobile viewports.

## Height and Scrolling

Modal height adjusts automatically to content. When content exceeds viewport limits:

- **Desktop**: Scrolling activates at 70% viewport height
- **Mobile**: Scrolling activates at 80% viewport height

### Scroll Behavior

When scrolling is needed:
- Content area becomes scrollable
- Header and footer remain fixed
- Scroll indicators appear
- Top and bottom borders indicate scroll position

> **Note**: Minimize long scrolling within modals whenever possible. If content exceeds viewport height, consider using the next available modal size. Scrolling is intended as a fallback for small screens, localization overflow, or unexpected content expansion.

## Types

### Standard Modal

Default modal for general content, forms, and user interactions.

### Warning Modal

Used for actions that need user awareness before proceeding:
- Amber/yellow accent color
- Warning icon (optional)
- Clear description of consequences

### Error Modal

Used for error states that require user acknowledgment:
- Red accent color
- Error icon (optional)
- Clear error message and recovery steps

### Modal with Image

Features a hero image above the content:
- Image spans full width
- Close button overlays image with dark background
- Ideal for "view from seat" or product imagery

## States

| State | Description |
|-------|-------------|
| Default | Modal displayed with overlay active |
| Scrolling | Content area scrollable, borders visible |
| Loading | Button in loading state during async operations |

## Styling

### Typography

| Element | Desktop | Mobile |
|---------|---------|--------|
| Title | Averta Bold 28px/34px | Averta Bold 24px/30px |
| Body | Averta Regular 16px/24px | Averta Regular 16px/24px |
| Letter Spacing | 0.56px (title), 0.32px (body) | 0.48px (title), 0.32px (body) |

### Spacing

| Area | Desktop | Mobile |
|------|---------|--------|
| Container padding | 32px | 24px |
| Title to content gap | 16px | 16px |
| Content to footer gap | 16px | 16px |
| Button gap | 12px | 12px |

### Colours

| Element | Token | Hex |
|---------|-------|-----|
| Container background | Spotlight | #FFFFFF |
| Overlay background | — | rgba(18, 18, 18, 0.6) |
| Title text | Cosmos | #121212 |
| Body text | Cosmos | #121212 |
| Close button icon | Neptune | #024DDF |
| Primary button | Neptune | #024DDF |
| Secondary button border | Neptune | #024DDF |
| Warning accent | Jupiter | #FFB932 |
| Error accent | Mars | #D92D20 |

### Elevation

| Property | Value |
|----------|-------|
| Box shadow | 0px 2px 8px rgba(18, 18, 18, 0.15) |

## Accessibility

### Focus Management

- When the modal opens, set initial focus to the first interactive element (close button or input field)
- Keep focus contained within the modal while open
- Tab and Shift+Tab cycle through elements without escaping
- When closed, return focus to the triggering element

### Keyboard Accessibility

- **Tab**: Navigate to next focusable element
- **Shift+Tab**: Navigate to previous focusable element
- **Escape**: Close the modal
- **Enter/Space**: Activate buttons
- **Arrow keys**: Scroll content when scrollable area is focused

### ARIA Attributes

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <div id="modal-description">
    Modal content description
  </div>
</div>
```

### Screen Reader Considerations

- Use `role="dialog"` to identify the modal
- Use `aria-modal="true"` to indicate page content is inert
- Associate title with `aria-labelledby`
- Associate description with `aria-describedby`
- Announce modal opening and closing

## Do's and Don'ts

### Do's

- Use modals for content requiring immediate attention
- Provide clear, action-oriented button labels
- Include a close button for dismissal
- Keep content concise and focused
- Use appropriate size for content amount
- Test with keyboard navigation

### Don'ts

- Don't use modals for complex multi-step processes
- Don't nest modals within modals
- Don't block the close button or escape key
- Don't use for non-critical notifications
- Don't exceed recommended content length
- Don't use multiple primary actions

## CSS Custom Properties

```css
:root {
  /* Modal Overlay */
  --modal-overlay-bg: rgba(18, 18, 18, 0.6);

  /* Modal Container */
  --modal-container-bg: var(--color-spotlight);
  --modal-shadow: 0px 2px 8px rgba(18, 18, 18, 0.15);

  /* Modal Sizes */
  --modal-width-small: 400px;
  --modal-width-medium: 600px;
  --modal-width-large: 740px;
  --modal-width-mobile: 320px;

  /* Modal Spacing */
  --modal-padding-desktop: 32px;
  --modal-padding-mobile: 24px;
  --modal-gap: 16px;
  --modal-button-gap: 12px;

  /* Modal Typography */
  --modal-title-size-desktop: 28px;
  --modal-title-size-mobile: 24px;
  --modal-title-line-height-desktop: 34px;
  --modal-title-line-height-mobile: 30px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        modal: {
          overlay: 'rgba(18, 18, 18, 0.6)',
          bg: '#FFFFFF',
        }
      },
      spacing: {
        'modal-padding': '32px',
        'modal-padding-mobile': '24px',
        'modal-gap': '16px',
      },
      width: {
        'modal-sm': '400px',
        'modal-md': '600px',
        'modal-lg': '740px',
        'modal-mobile': '320px',
      },
      boxShadow: {
        'modal': '0px 2px 8px rgba(18, 18, 18, 0.15)',
      }
    }
  }
}
```

## Usage with Tailwind

```html
<!-- Modal Overlay -->
<div class="fixed inset-0 bg-[rgba(18,18,18,0.6)] flex items-center justify-center z-50">

  <!-- Modal Container - Small -->
  <div
    class="bg-white w-[400px] shadow-[0px_2px_8px_rgba(18,18,18,0.15)] relative"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <!-- Close Button -->
    <button
      class="absolute top-[26px] right-[26px] w-11 h-11 flex items-center justify-center"
      aria-label="Close modal"
    >
      <svg class="w-4 h-4 text-neptune"><!-- X icon --></svg>
    </button>

    <!-- Title -->
    <div class="pt-8 pb-4 px-8">
      <h2
        id="modal-title"
        class="font-averta-bold text-[28px] leading-[34px] tracking-[0.56px] text-cosmos capitalize"
      >
        Modal Title
      </h2>
    </div>

    <!-- Content -->
    <div class="px-8 pb-4">
      <p class="font-averta text-[16px] leading-[24px] tracking-[0.32px] text-cosmos">
        Modal body content goes here.
      </p>
    </div>

    <!-- Footer -->
    <div class="px-8 pb-8 pt-4 flex justify-end gap-3">
      <button class="px-4 py-[10px] border border-neptune text-neptune rounded-lg min-w-[100px]">
        Secondary
      </button>
      <button class="px-4 py-[10px] bg-neptune text-white rounded-lg min-w-[100px]">
        Primary
      </button>
    </div>
  </div>
</div>
```

## Image Container Guidelines

When using modals with images:

| Aspect Ratio | Recommended For |
|--------------|-----------------|
| 16:9 | Landscape photos, view from seat |
| 1:1 | Product images, icons |
| 4:3 | General photography |

### Image Best Practices

- Use high-quality images that scale well
- Ensure text overlays have sufficient contrast
- Consider lazy loading for performance
- Provide alt text for accessibility

## Related Components

- [Button](../atoms/button.md) - Action buttons in footer
- [Slot](../../patterns/slot.md) - Custom content pattern
- [Alert](../atoms/alert.md) - Non-modal notifications

## Figma References

| Page | Node ID | Description |
|------|---------|-------------|
| Main | 25353:1628 | Modal anatomy and structure |
| Variations | 25353:1862 | Size variations |
| Properties | 25353:1979 | Component props |
| Accessibility | 25353:1938 | A11y guidelines |
| Usage | 25353:1762 | Usage guidelines |

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial documentation |

---

## Engineer Documentation

> Query mode: `@engineer modal`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { Modal } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-modal--default)

### Source

`components/Modal/Modal.tsx`

### Full Engineer Documentation

# Modal

## Import

```tsx
import { Modal } from '@gds/components';
```

## Basic Usage

```tsx
<Modal>Content</Modal>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | - |
| `onClose` | `() => void` | Yes | - |
| `isOpen` | `boolean` | No | - |
| `role` | `"dialog" | "alertdialog"` | No | - |
| `ariaLabel` | `string` | Yes | - |
| `variant` | `Variant` | No | - |
| `size` | `Size` | No | - |
| `hasImage` | `boolean` | No | - |
| `mobileMaxViewportWidth` | `string` | Yes | - |


## Variants

Available variants: `Standard`, `Warning`, `Error`, `Loading`, `WithImage`, `NotCloseable`, `Scrollable`, `WithCustomAutoFocus`, `WithNoFooterActions`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-modal--default)

## Source

`components/Modal/Modal.tsx`

---

## Vibe Documentation

> Query mode: `@vibe modal`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- Modal Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<dialog class="w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
  Modal Content
</dialog>

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
| **Figma Node** | 25353:1628 | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

