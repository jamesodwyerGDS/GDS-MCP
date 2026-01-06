---
name: Pill Button Guidelines
description: Usage guidelines, applied examples, and best practices for implementing Pill Button components in search and filter interfaces.
category: patterns
status: stable
version: 1.0.0
updated: 2025-01-06
tags:
  - guidelines
  - pill button
  - search
  - filter
  - patterns
keywords:
  - pill button usage
  - filter patterns
  - search ui
  - button guidelines
  - filter bar patterns
dependencies:
  - Pill Button
relatedComponents:
  - name: Pill Button
    relationship: parent
  - name: Button
    relationship: alternative
  - name: Circle Button
    relationship: variant
  - name: Filterbar
    relationship: parent
figmaNodeId: "33403:2365"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Pill Button Guidelines

Comprehensive usage guidelines for the Pill Button component in search, filter, and navigation contexts.

## Overview

The Pill Button component is a button with a rounded rectangle shape used specifically for search and filter functions in page designs. It should not be confused with CTA buttons or circle icon buttons. This guide covers when and how to apply pill buttons effectively.

## Purpose

Pill buttons serve a distinct purpose in the design system:

- **Search interfaces**: Location, date, and keyword inputs
- **Filter controls**: Category selection and refinement
- **Navigation context**: Directional movement within content
- **Selection states**: Showing active filters or selections

## Anatomy

The pill button has a clear, consistent structure:

```
┌─────────────────────────────────────────────┐
│                                             │
│   [Icon]    Label Text    [Icon]            │
│                                             │
│   Container with 24px border radius         │
│                                             │
└─────────────────────────────────────────────┘
```

| Element | Description |
|---------|-------------|
| Container | Pill-shaped wrapper with border and optional fill |
| Label | Descriptive text indicating the filter or action |
| Icon (Optional) | ChevronLeft or ChevronRight for directional context |

## Styling Relationship

The style and design of the pill button closely resembles search components. This similarity is intentional:

- **Visual cohesion**: Pill buttons integrate seamlessly with search bars
- **User recognition**: Users understand these are filter/search related
- **Design efficiency**: Shared styling reduces cognitive load

### Search Bar Integration

```
┌──────────────────────────────────────────────────────────────────┐
│ [Location Icon] Location | [Calendar] Date | Keyword...  [Search]│
└──────────────────────────────────────────────────────────────────┘
         ↑                        ↑                    ↑
    Pill Button            Pill Button          Pill Button
```

## States Reference

The pill button supports five interaction states to provide clear feedback:

| State | Appearance | When Applied |
|-------|------------|--------------|
| Default | Outlined, transparent fill | Resting, not interacted |
| Hover | Filled background, inverted text | Mouse over the button |
| Pressed | Darker filled background | Active click/tap |
| Selected | Filled background, inverted text | Active filter applied |
| Disabled | Muted colors, no interaction | Unavailable option |

## Colour Variants

### Light Theme (Light Backgrounds)

Use on white or light-colored surfaces:

| State | Border | Background | Text |
|-------|--------|------------|------|
| Default | Neptune `#024DDF` | Transparent | Cosmos `#121212` |
| Hover | — | Neptune `#024DDF` | White |
| Selected | — | Neptune `#024DDF` | White |
| Disabled | Ammonite `#D6D6D6` | Transparent | Slate `#949494` |

### Inverse Theme (Dark Backgrounds)

Use on dark surfaces, hero images, or dark UI sections:

| State | Border | Background | Text |
|-------|--------|------------|------|
| Default | White `#FFFFFF` | Transparent | White |
| Hover | — | White `#FFFFFF` | Cosmos `#121212` |
| Selected | — | White `#FFFFFF` | Cosmos `#121212` |
| Disabled | Slate `#646464` | Transparent | Slate `#646464` |

## Size Guidelines

### Medium (Default)

- **Height**: 44px
- **Use when**: Standard spacing is available
- **Context**: Desktop filter bars, search headers

### Small

- **Height**: 32px
- **Use when**: Space is constrained
- **Context**: Mobile interfaces, dense filter groups, compact layouts

## Things to Avoid

Common mistakes to avoid when implementing pill buttons:

### 1. Multi-line Text

**Problem**: Text wrapping to multiple lines

**Why it's wrong**: Breaks the pill shape, inconsistent heights

**Solution**: Keep labels concise, single line only

### 2. Custom Colors

**Problem**: Changing button colors outside the design tokens

**Why it's wrong**: Breaks visual consistency, accessibility issues

**Solution**: Use only Light or Inverse variants

### 3. Gradients

**Problem**: Adding custom gradient backgrounds

**Why it's wrong**: Conflicts with brand guidelines, inconsistent states

**Solution**: Use solid colors from the design system

### 4. Using as CTA

**Problem**: Using pill buttons for transactional actions

**Why it's wrong**: Wrong visual hierarchy, user confusion

**Solution**: Use the standard Button component for CTAs

### 5. Modified Corner Radius

**Problem**: Changing the 24px border radius

**Why it's wrong**: Loses the distinctive pill shape

**Solution**: Always use the standard 24px radius

## Applied Examples

### Search Header

The primary use case for pill buttons is the main search interface:

```
┌────────────────────────────────────────────────────────────────┐
│ Logo    [Location ▼] | [Date ▼] | Search for events...  [🔍]  │
└────────────────────────────────────────────────────────────────┘
```

- Location pill with dropdown indicator
- Date pill with calendar integration
- Search input styled to match pill buttons

### Filter Bar

Below search results, pill buttons provide refinement options:

```
┌─────────────────────────────────────────────────────────────┐
│ [Filter Icon] 10 results    [Lowest Price ▼] [Best Seats ▼]│
├─────────────────────────────────────────────────────────────┤
│ [Rock & Pop]  [Hip-hop]  [Price: $50-$200]                 │
└─────────────────────────────────────────────────────────────┘
```

- Selected filters shown with filled state
- Available filters in default state
- Clear visual indication of active filters

### Mobile Filter Row

On mobile, pill buttons enable horizontal scrolling filters:

```
┌──────────────────────────────────────┐
│ ← [Rock & Pop] [Hip-hop] [Jazz] →   │
└──────────────────────────────────────┘
```

- Horizontally scrollable container
- Touch-friendly 44px height (medium)
- Or 32px height (small) for compact views

### Hero Section (Inverse)

On dark hero images, use inverse variant:

```
┌────────────────────────────────────────────┐
│  Dark Hero Image Background                │
│                                            │
│  [← Previous]  01/03  [Next →]            │
│                                            │
│  Event Title                               │
│  [Find Tickets]                            │
└────────────────────────────────────────────┘
```

- Inverse pill buttons for navigation
- White border and text on dark backgrounds
- Paired with CTA Button for main action

## Decision Tree

Use this guide to choose the right button type:

```
Is it for search/filter functions?
├─ Yes → Use Pill Button
│   ├─ Light background? → Use Light variant
│   └─ Dark background? → Use Inverse variant
│
└─ No → Is it a primary action?
    ├─ Yes → Use Button (Primary/Transactional)
    └─ No → Is it icon-only?
        ├─ Yes → Use Circle Button
        └─ No → Use Button (Secondary/Tertiary)
```

## Spacing Guidelines

### Between Pill Buttons

| Context | Spacing |
|---------|---------|
| Horizontal group | 8px (Club) |
| Filter bar | 12px |
| Mobile scrolling | 8px (Club) |

### Within Layouts

| Context | Margin |
|---------|--------|
| Below search bar | 16px (Auditorium) |
| Above results | 16px (Auditorium) |
| Section separation | 24px (Arena) |

## Accessibility Checklist

When implementing pill buttons, ensure:

- [ ] All buttons are keyboard accessible
- [ ] Focus states are clearly visible
- [ ] Selected state is announced to screen readers
- [ ] Disabled buttons have appropriate ARIA attributes
- [ ] Color contrast meets WCAG AA standards
- [ ] Touch targets are at least 44px

## Integration with Other Components

### Pill Button + Stepper

Quantity selection in filters:

```
[Quantity]  [- 1 +]
   ↑          ↑
Pill Button  Stepper
```

### Pill Button + Search Input

Combined search interface:

```
[Location] | [Date] | [___Search___] [🔍]
```

### Pill Button + Results Count

Filter feedback:

```
[Filter] 10 results
```

## Related Documentation

- [Pill Button Component](../components/atoms/pill-button.md) - Component specification
- [Button Component](../components/atoms/button.md) - Standard button documentation
- [Circle Button Component](../components/atoms/circle-button.md) - Icon-only buttons
- [Filterbar Component](../components/atoms/filterbar.md) - Filter bar container

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial release |
