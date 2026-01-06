---
name: Slot
description: A Figma-only component pattern that allows designers to nest and build custom content within components without detaching them.
category: patterns
status: stable
version: 1.0.0
updated: 2025-01-06
tags:
  - slot
  - figma
  - pattern
  - nested-content
  - customization
keywords:
  - slot component
  - figma slot
  - instance swap
  - nested content
  - custom content
  - local component
dependencies: []
relatedComponents:
  - name: Modal
    relationship: parent
  - name: Card
    relationship: parent
figmaNodeId: "25353:2146"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Slot

A Figma-only pattern that enables designers to nest custom content within components without detaching them.

## Overview

Slots are a concept exclusive to the Figma UI-kit. They allow you to nest and build out patterns within components without detaching. Instead of creating multiple variations for every possible use, slots offer flexibility and endless possibilities while keeping the component intact.

### Important Note

Slots are **not an actual coded component** in the design system. They exist only in Figma as a mechanism for swapping content. When you see a slot in a component, it's a signal to replace it with your own local component.

## Identifying Slots

You can identify slots in two ways:

1. **Properties Panel**: Look for properties labeled as "Slot" in the component's properties panel
2. **Layer Names**: Check the layer panel for elements named "Slot" within a component

## When to Use

Slots enable you to nest content within components like modals or cards without detaching them. Common use cases include:

- Custom form content inside a modal
- Dynamic card body content
- Flexible list items
- Custom panel content

## How to Use Slots

### Step 1: Locate the Slot

Find the slot property in the properties panel of the component you're working with.

### Step 2: Create Your Content

1. Design your custom content (form elements, lists, text, etc.)
2. Frame the content and name it appropriately
3. Add Auto Layout to the frame
4. Convert it to a local component using `CMD+K` (Mac) or `Ctrl+K` (Windows)

### Step 3: Replace the Slot

1. Select the slot property from the properties panel
2. Use the instance swap feature to replace it with your local component

## Common Pitfalls

When things don't look right after replacing a slot, check the following:

### Auto Layout Issues

- Ensure your component has Auto Layout applied
- Verify the Auto Layout direction matches the expected layout

### Sizing Problems

- Check the nested component's sizing mode
- Use "Fill Container" for components that should stretch to fit
- Use "Hug Contents" for components that should size to their content

## Best Practices

### Do's

- Always frame your content before converting to a local component
- Use descriptive names for your local components
- Apply Auto Layout to ensure proper resizing
- Test your slot content at different container sizes

### Don'ts

- Don't leave slots as placeholders in production designs
- Don't create overly complex nested structures
- Don't forget to set proper sizing constraints
- Don't ignore Auto Layout alignment settings

## Technical Details

### Slot Component Structure

```
Slot (Instance Swap Target)
├── Border: Dashed, #DFC0DF
├── Background: rgba(223, 192, 223, 0.2)
└── Placeholder Text
    ├── "Replace this instance"
    └── "By your own local component"
```

### Visual Appearance

| Property | Value |
|----------|-------|
| Border Style | Dashed |
| Border Color | `#DFC0DF` |
| Background | `rgba(223, 192, 223, 0.2)` |
| Border Radius | 4px |
| Padding | 24px horizontal, 40px vertical |

## Slot in Context

### Modal with Slot

Modals use slots for body content, allowing you to:
- Insert custom forms
- Add event information
- Include ticket selection interfaces
- Display confirmation content

### Card with Slot

Cards can use slots for:
- Custom media content
- Dynamic product information
- Variable action areas

## Related Patterns

- [Modal](../components/organisms/modal.md) - Primary use case for slots
- [Card](../components/molecules/card.md) - Alternative use case

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial documentation |
