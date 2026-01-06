---
name: SidePanel
description: Unified documentation for SidePanel component
audiences:
  - design
lastUpdated: '2026-01-06'
category: atoms
status: stable
figmaNodeId: '28112:6711'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
tokens:
  colours:
    background:
      token: popup.background.subtle
      hex: '#FFFFFF'
    overlay:
      token: color.cosmos
      hex: '#121212'
      opacity: 0.6
    border:
      token: color.ammonite
      hex: '#D6D6D6'
    text:
      primary:
        token: color.cosmos
        hex: '#121212'
      secondary:
        token: color.granite
        hex: '#646464'
    button:
      primary:
        token: colour.button-bg-blue
        hex: '#024DDF'
      content:
        token: colour.button-content-white
        hex: '#FFFFFF'
  spacing:
    panelWidth:
      desktop: 420px
      mobile: 375px
    padding:
      token: space
      value: 20px
  typography:
    headerTitle: font.fiji.semibold.18
    subtitle: font.etna.regular.14
    body: font.rainier.regular.16
  elevation:
    desktop:
      token: elevation-level-4
      value: '0px 8px 20px 0px rgba(0,0,0,0.35)'
    mobile:
      token: shadow-level-3
      value: '0px 3px 12px 0px rgba(18,18,18,0.18)'
  breakpoints:
    mobile: 375px
    desktop: 1440px
---
# SidePanel

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | SidePanel |
| **Color Variants** | background, overlay, border, text, button |
| **Figma Node** | 28112:6711 |
| **Docs Available** | Design |


---

## Design Documentation

> Query mode: `@design side-panel`

**An overlay that slides in from the left or right, showing extra details or actions related to an item on the page without leaving the current context.**

### Design Tokens

**Colors:**
- background.token: popup.background.subtle
- background.hex: #FFFFFF
- overlay.token: color.cosmos
- overlay.hex: #121212
- overlay.opacity: 0.6
- border.token: color.ammonite
- border.hex: #D6D6D6
- text.primary: [object Object]
- text.secondary: [object Object]
- button.primary: [object Object]
- button.content: [object Object]

**Spacing:**
- panelWidth: [object Object]
- padding: [object Object]

**Typography:**
- headerTitle: font.fiji.semibold.18
- subtitle: font.etna.regular.14
- body: font.rainier.regular.16

### Full Design Specification


# Side Panel

## Overview

A side panel is an overlay that slides in from the left or right, showing extra details or actions related to an item on the page. It allows users to view more information without leaving the current page.

### When to use

- **Secondary Actions or Information**: Side panels are ideal for showing additional or contextual information related to the selection on the main page. Example: Event, artist or venue info, basket etc.
- **Contextual editing**: Side panels can be useful for editing content without switching screens or disrupting the flow of the current page. Example: Upgrading tickets, updating settings and preferences.

### When not to use

- **Critical actions and user tasks**: Side panels aren't ideal for tasks that require users to stop and focus on something important, like critical alerts or completing key actions. In these cases, it's better to use a modal that blocks the background and grabs attention.
- **Complex or detailed content**: If the content you need to display is too detailed or complex, it's best to move it to a dedicated page for better readability.

## Modal vs Side Panel

While similar in functionality and interaction, the Side Panel and Modal are meant to be used in different scenarios and to express different types of content. There is a fair amount of overlap in their usage.

While each of these components is triggered by a user action, where they exist in the flow is fundamentally different:

- A **Modal** blocks the user from progressing further in the main flow, forcing them to take action or make a decision.
- A **Side Panel** extends or "branches" off from the main flow to add detail and highlight secondary features and functions.
- Rather than blocking the user from continuing in the main flow, a side panel enhances and adds detail to the flow to aid in the completion of a function.

## Anatomy

The side panel component consists of the following elements:

| Element | Required | Description |
|---------|----------|-------------|
| Overlay | Required | Cosmos (#121212) at 60% opacity behind the panel |
| Close button | Required | Close action is mandatory |
| Header title | Required | Primary heading for the panel content |
| Subtitle | Optional | Secondary descriptive text below the header |
| Image slot | Optional | Container for images or illustrations |
| Content slot | Required | Main content area for custom components |
| Footer slot | Optional | Container for user actions related to the panel |

## Variants

### Device

| Variant | Width | Description |
|---------|-------|-------------|
| Desktop | 420px | Standard side panel for desktop viewports |
| Mobile | 375px (full width) | Full-screen panel for mobile devices |

### Position

| Position | Description |
|----------|-------------|
| Right | Panel slides in from the right edge (default) |
| Left | Panel slides in from the left edge |

## States

| State | Description |
|-------|-------------|
| Closed | Panel is not visible, no overlay |
| Open | Panel slides in from edge, overlay visible |
| Animating | Transition state during open/close |

## Properties

### Side Panel Props

| Prop Name | Description | Type | Values | Default |
|-----------|-------------|------|--------|---------|
| Device | Shows the responsive layout of the side panel | variant | Desktop, Mobile | Desktop |
| Position | Shows position of the side panel on the screen | variant | Right, Left | Right |
| Image slot | Toggles visibility of image slot | boolean | True, False | True |
| Image slot | Instance slot to replace image | instance swap | Slot | NA |
| Content slot | Instance slot to replace panel content | instance swap | Slot | NA |
| Show footer | Toggles visibility of footer | boolean | True, False | True |

### Side Panel Header Props

| Prop Name | Description | Type | Values | Default |
|-----------|-------------|------|--------|---------|
| Show subtitle | Toggles visibility of subtitle | boolean | True, False | True |

### Side Panel Footer Props

| Prop Name | Description | Type | Values | Default |
|-----------|-------------|------|--------|---------|
| Show footer slot | Toggles visibility of footer slot | boolean | True, False | False |
| Footer slot | Instance slot to replace footer content | instance swap | Slot | NA |

## Dismissing Side Panel

The side panel can be dismissed in two ways:

1. **Clicking on overlay**: Clicking anywhere on the semi-transparent overlay area dismisses the panel
2. **Clicking close button**: Using the close button in the header dismisses the panel

Both actions should trigger the same close animation (slide out).

## Slot Examples

### Image Slot

The recommended image aspect ratio is **16:9**. The slot can support images and illustrations.

### Content Slot

The content slot accommodates custom local components. Replace the placeholder with your own content wrapped in a Frame using Auto Layout.

### Footer Slot

Include user actions related to the side panel content, such as primary action buttons.

## Styling

### Typography

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| Header Title | Averta | 18px | Semibold (600) | 26px | 0.36px |
| Subtitle | Averta | 14px | Regular (400) | 20px | 0.28px |
| Body | Averta | 16px | Regular (400) | 24px | 0.32px |

### Spacing

| Area | Value |
|------|-------|
| Panel padding | 20px |
| Header/Content gap | 12px |
| Title/Subtitle gap | 4px |

### Colours

| Element | Token | Hex |
|---------|-------|-----|
| Panel background | Spotlight | #FFFFFF |
| Overlay background | Cosmos @ 60% | rgba(18, 18, 18, 0.6) |
| Header border | Ammonite | #D6D6D6 |
| Footer border | Ammonite | #D6D6D6 |
| Title text | Cosmos | #121212 |
| Subtitle text | Granite | #646464 |
| Primary button | Neptune | #024DDF |

### Elevation

| Device | Shadow |
|--------|--------|
| Desktop | 0px 8px 20px 0px rgba(0,0,0,0.35) |
| Mobile | 0px 3px 12px 0px rgba(18,18,18,0.18) |

## Accessibility

- **Keyboard navigation**: Close button accessible via Tab, panel can be closed with Escape key
- **Screen readers**: Includes proper ARIA dialog role and labels
- **Focus management**: Focus should be trapped within the panel when open
- **Focus indicators**: Close button has visible focus ring meeting WCAG requirements
- **Color contrast**: All text meets 4.5:1 contrast ratio

## Do's and Don'ts

### Do's

- Use side panels for contextual information related to the main page
- Always include a close button for accessibility
- Use appropriate content for the panel width
- Provide clear header titles describing the panel content
- Allow dismissal by clicking the overlay

### Don'ts

- Do not use for critical actions requiring user attention (use Modal instead)
- Do not overload with too much complex content
- Do not disable the close button or overlay click dismissal
- Do not use for navigation flows
- Do not nest multiple side panels

## CSS Custom Properties

```css
:root {
  --sidepanel-width: 420px;
  --sidepanel-width-mobile: 375px;
  --sidepanel-padding: 20px;
  --sidepanel-overlay: rgba(18, 18, 18, 0.6);
  --sidepanel-bg: var(--color-spotlight);
  --sidepanel-border: var(--color-ammonite);
  --sidepanel-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.35);
  --sidepanel-shadow-mobile: 0px 3px 12px 0px rgba(18, 18, 18, 0.18);
  --sidepanel-header-title-size: 18px;
  --sidepanel-header-title-weight: 600;
  --sidepanel-subtitle-size: 14px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        sidepanel: {
          bg: '#FFFFFF',
          overlay: 'rgba(18, 18, 18, 0.6)',
          border: '#D6D6D6',
          text: '#121212',
          'text-secondary': '#646464',
          button: '#024DDF',
        }
      },
      spacing: {
        'sidepanel-width': '420px',
        'sidepanel-width-mobile': '375px',
        'sidepanel-padding': '20px',
      },
      boxShadow: {
        'sidepanel': '0px 8px 20px 0px rgba(0, 0, 0, 0.35)',
        'sidepanel-mobile': '0px 3px 12px 0px rgba(18, 18, 18, 0.18)',
      }
    }
  }
}
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| popup.background.subtle | COLOR | #FFFFFF |
| colour.button-bg-blue | COLOR | #024DDF |
| colour.button-content-white | COLOR | #FFFFFF |
| color.cosmos | COLOR | #121212 |
| color.granite | COLOR | #646464 |
| color.ammonite | COLOR | #D6D6D6 |
| spacing.button-radius | NUMBER | 4 |
| elevation-level-4 | EFFECT | 0px 8px 20px rgba(0,0,0,0.35) |

## Related Components

- [Modal](../organisms/modal.md) - For critical actions requiring user focus
- [Button](../atoms/button.md) - For footer actions
- [Accordion](../atoms/accordion.md) - For expandable content within the panel

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2023-10-02 | Initial release |

---

## Engineer Documentation

> Query mode: `@engineer side-panel`
> Styling: **styled-components** (CSS-in-JS)

*No engineer documentation available for this component.*


---

## Vibe Documentation

> Query mode: `@vibe side-panel`
> Styling: **Tailwind CSS** (utility classes)

*No vibe documentation available for this component.*


---

## Comparison: Design vs Code

| Aspect | Design (@design) | Code (@engineer) |
|--------|------------------|------------------|
| **Status** | stable | - |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `-` |
| **Figma Node** | 28112:6711 | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

