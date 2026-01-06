---
name: "Stepper Guidelines"
description: "Usage guidelines and best practices for the Stepper component, including anatomy, placement rules, and examples of correct and incorrect usage."
category: "patterns"
status: "stable"
version: "1.0.0"
updated: "2026-01-06"

tags: ["guidelines", "patterns", "usage", "stepper"]
keywords: ["stepper", "quantity", "guidelines", "best practices", "placement", "anatomy"]

relatedComponents:
  - name: "Stepper"
    relationship: "parent"

figmaNodeId: "612:94499"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Stepper Guidelines

## Overview

Steppers are frequently used to let users change a value within a given range. The current value is shown in the stepper's centre and can also be represented numerically. Steppers are easy-to-use tools that allow users to filter/refine their search or preferences by adjusting numerical selections.

## Stepper Anatomy

The stepper component consists of four key parts working together:

| Part | Description |
|------|-------------|
| **Text Field (Quantity)** | Displays the current numeric value in the centre |
| **Icon (Minus)** | Decrease button positioned on the left side |
| **Icon (Add)** | Increase button positioned on the right side |
| **Container** | Wrapper element holding all stepper parts together |

```
┌─────────────────────────────────────┐
│  [−]    │ Quantity │    [+]        │
│  Icon   │   Text   │    Icon       │
│ (Minus) │  Field   │   (Add)       │
└─────────────────────────────────────┘
          └── Container ──┘
```

## Stepper States

The stepper component supports multiple states to provide clear feedback to users:

### Primary Variant States

| State | Minus Button | Number | Plus Button | Description |
|-------|--------------|--------|-------------|-------------|
| **Default** | Active (Neptune icon) | Enabled | Active (Neptune filled) | Standard interactive state |
| **Plus Hover** | Active | Enabled | Hover effect | Mouse over plus button |
| **Plus Pressed** | Active | Enabled | Pressed effect | Click/tap on plus button |
| **Lowest** | Disabled (grayed) | Shows "0" | Active | Minimum value reached |
| **Maximum** | Active | Shows max value | Disabled (Diatomite bg) | Maximum value reached |
| **Disabled** | Disabled | Disabled text | Disabled | Entire component non-interactive |

### Secondary Variant States

| State | Minus Button | Number | Plus Button | Description |
|-------|--------------|--------|-------------|-------------|
| **Default** | Active (Neptune icon) | Enabled | Active (Neptune icon) | Standard interactive state |
| **Plus Hover** | Active | Enabled | Hover effect | Mouse over plus button |
| **Plus Pressed** | Active | Enabled | Pressed effect | Click/tap on plus button |
| **Lowest** | Disabled (Moonrock) | Shows "0" | Active | Minimum value reached |
| **Maximum** | Active | Shows max value | Disabled (Moonrock) | Maximum value reached |
| **Disabled** | Disabled | Disabled text | Disabled | Entire component non-interactive |

## Placement Text With Stepper

Text accompanying steppers should always be positioned **to the left of the stepper**. This enables the user to quickly scan the text before deciding what value to set by adjusting the stepper's value.

### Correct Placement Examples

**Desktop Layout:**
```
┌────────────────────────────────────────────────┐
│ Quantity title         [−]  1  [+]             │
│                                                │
│ Describe label text to add ex. delivery       │
│                                                │
│ Quantity title         [−]  1  [+]             │
│                                                │
│ Describe detailed instructions and stepper    │
└────────────────────────────────────────────────┘
```

**Mobile Layout:**
```
┌──────────────────────────┐
│ Quantity title           │
│                 [−] 1 [+]│
│                          │
│ Describe above selection │
│ to assist the settings   │
└──────────────────────────┘
```

### Placement Rules

1. **Label Position**: Always place descriptive text to the left of the stepper
2. **Vertical Alignment**: Center-align the stepper with the primary label text
3. **Helper Text**: Position any additional descriptive text below the label
4. **Mobile Adaptation**: On narrow viewports, text may stack above with stepper right-aligned

## Things To Not Do

Avoid these common mistakes when implementing or using steppers:

### Don't: Change the Primary Style

```
❌ INCORRECT
[−]  1  [+]  ← Do not modify button styles or colours
```

Keep the stepper appearance consistent with the design system. Do not change button backgrounds, icons, or overall styling.

### Don't: Change the Colour of the Number/Value

```
❌ INCORRECT
[−]  1  [+]  ← Number should always be Cosmos (#121212)
     ↑
     Red, blue, or other colours
```

The quantity value must remain in the standard text colour (Cosmos #121212) for consistency and accessibility.

### Don't: Add Text Into the Input Field

```
❌ INCORRECT
[−]  "Qty"  [+]  ← Do not add labels or text inside
```

The number display area should only contain numeric values, never labels or descriptive text.

### Don't: Add Text to Left of Stepper Without Spacing

```
❌ INCORRECT
Label[−]  1  [+]  ← Insufficient spacing
```

Always maintain proper spacing between accompanying text and the stepper component.

### Don't: Change the Stepper Sizes

```
❌ INCORRECT
[−−−]  1  [+++]  ← Do not resize buttons
```

Maintain the standard 36px x 36px button size for consistent touch targets and visual appearance.

### Don't: Change the Orientation

```
❌ INCORRECT
    [+]
     1
    [−]
```

Steppers should always maintain horizontal orientation with minus on the left and plus on the right.

## Stepper Applied

### Example: Event Ticketing

The stepper is commonly used in ticketing flows to select quantity:

```
┌────────────────────────────────────────────────┐
│ PRICE                                          │
│ ┌──────────────────────────────────────────┐   │
│ │ 🎫 Ticketfast Tickets Another Purchase    │   │
│ │                                          │   │
│ │ CAR PARK                                 │   │
│ │ £10.00                                   │   │
│ │                                          │   │
│ │ Resale not yet available    [−]  0  [+] │   │
│ │ £30.00                                   │   │
│ │                                          │   │
│ │ x with booking              [−]  0  [+] │   │
│ │ £100.00                                  │   │
│ └──────────────────────────────────────────┘   │
└────────────────────────────────────────────────┘
```

### Example: E-commerce Product Selection

```
┌────────────────────────────────────────────────┐
│  ┌──────────┐                                  │
│  │  🌟      │  Product Title                   │
│  │  ⭐⭐⭐⭐  │  Category details               │
│  │          │                                  │
│  │          │  Quantity          [−]  1  [+]  │
│  └──────────┘                                  │
│                                                │
│              Add to Cart                       │
└────────────────────────────────────────────────┘
```

### Example: Filter Refinement

```
┌────────────────────────────────────────────────┐
│ FILTERS                                        │
│                                                │
│ Number of bedrooms       [−]  2  [+]          │
│                                                │
│ Number of bathrooms      [−]  1  [+]          │
│                                                │
│ Maximum guests           [−]  4  [+]          │
└────────────────────────────────────────────────┘
```

## Implementation Checklist

When implementing the stepper component, verify:

- [ ] Minus button disables at minimum value
- [ ] Plus button disables at maximum value
- [ ] Both buttons disable when component is disabled
- [ ] Visual feedback on hover and press states
- [ ] Correct colour tokens applied
- [ ] Proper spacing from accompanying text
- [ ] Accessible keyboard navigation
- [ ] ARIA attributes for screen readers
- [ ] Touch targets meet 36px minimum

## Related Documentation

- [Stepper Component](../components/atoms/stepper.md) - Component specification and tokens
- [Input Field](../components/atoms/input-field.md) - Alternative for direct numeric input
- [Button Guidelines](./button-guidelines.md) - General button interaction patterns

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-06 | Initial release |
