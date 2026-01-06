---
name: Tooltip Guidelines
description: Comprehensive usage guidelines for implementing tooltips in the Global Design System, including anatomy, configurations, positioning, and anti-patterns.
category: patterns
status: stable
version: 1.0.0
updated: 2025-01-06
tags:
  - tooltip
  - overlay
  - guidelines
  - patterns
  - contextual
keywords:
  - tooltip usage
  - tooltip guidelines
  - tooltip placement
  - tooltip positioning
  - tooltip best practices
relatedComponents:
  - name: Tooltip
    relationship: parent
figmaNodeId: "10737:3504"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Tooltip Guidelines

Comprehensive usage guidelines for implementing tooltips in the Global Design System.

## What is a Tooltip?

A tooltip is a small pop-up box that appears when fans hover their cursor over a specific element on a page. It typically contains additional information or context about the element, such as a definition of a term or an explanation of a function. Tooltips are commonly used in our interfaces to provide extra information to fans without cluttering the page with excessive text.

## Tooltip Anatomy

A tooltip, a core UI component, comprises two key elements: an arrow for direction and concise text for contextual information. The arrow points to the associated element, while the text offers hints or explanations, improving user interaction and comprehension.

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   Porem ipsum dolor sit amet, consectetur       │
│   adipiscing elit. Nunc vulputate libero        │
│   et velit interdum, ac aliquet odio mattis.    │
│                                                 │
└────────────────────────┬────────────────────────┘
                         │
                      ◢──┴──◣
                        ▽
                      Arrow
```

### Structural Parts

| Part | Description |
|------|-------------|
| Container | White background with slate border (1px), 4px border radius |
| Tooltip text | Grey text (Granite #646464) with contextual information |
| Arrow | 16px × 9px directional indicator pointing to trigger element |

### Spacing

| Area | Token | Value |
|------|-------|-------|
| Container horizontal padding | Auditorium | 16px |
| Container vertical padding | Theatre | 12px |
| Arrow horizontal padding | Auditorium | 16px |

## Tooltip Configurations

Tooltip configurations provide flexibility for arrow positioning, which can be at the top or bottom and centred, left, or right. This versatility allows designers to align tooltips with their interface's visual hierarchy effectively.

### Top Positions (Arrow on Top)

Use top arrow positions when the tooltip appears **below** the trigger element.

| Configuration | Arrow Location | Use Case |
|---------------|----------------|----------|
| Top Left | Arrow at left edge | When trigger is near left edge of viewport |
| Top Centre | Arrow centered | Default position, balanced layout |
| Top Right | Arrow at right edge | When trigger is near right edge of viewport |

```
     ◢──◣                    ◢──◣                          ◢──◣
┌────┴───────────────┐  ┌────────┴─────────┐  ┌───────────────┴────┐
│ Tooltip content... │  │ Tooltip content...│  │ Tooltip content... │
└────────────────────┘  └──────────────────┘  └────────────────────┘
     Top Left               Top Centre              Top Right
```

### Bottom Positions (Arrow on Bottom)

Use bottom arrow positions when the tooltip appears **above** the trigger element.

| Configuration | Arrow Location | Use Case |
|---------------|----------------|----------|
| Bottom Left | Arrow at left edge | When trigger is near left edge of viewport |
| Bottom Centre | Arrow centered | Default position when above trigger |
| Bottom Right | Arrow at right edge | When trigger is near right edge of viewport |

```
┌────────────────────┐  ┌──────────────────┐  ┌────────────────────┐
│ Tooltip content... │  │ Tooltip content...│  │ Tooltip content... │
└────┬───────────────┘  └────────┬─────────┘  └───────────────┬────┘
     ◥──◤                    ◥──◤                          ◥──◤
    Bottom Left            Bottom Centre            Bottom Right
```

## Tooltip Positioning

Tooltips are activated when users hover over or select an icon on the page. The tooltip's position is inherently tied to this icon, appearing adjacent to it, with a **4px gap**. This behaviour ensures a clear and intuitive connection between the icon and the supplementary information provided by the tooltip.

### Gap Specification

```
┌────────────────────────────┐
│ The tooltip is 4px from    │
│ the icon.                  │
└──────┬─────────────────────┘
       ▽
   ◄─ 4px ─►
       (?)  ← Trigger Element (icon, button, etc.)
```

### Positioning Rules

1. **Fixed Gap**: Always maintain exactly 4px between tooltip and trigger element
2. **Arrow Alignment**: Arrow must point directly at the trigger element
3. **Viewport Awareness**: Tooltip should not extend beyond viewport boundaries
4. **Content Overlap**: Tooltip must not obscure related content

### Position Selection Guidelines

| Trigger Location | Recommended Position |
|------------------|---------------------|
| Near top of viewport | Bottom arrow (tooltip below) |
| Near bottom of viewport | Top arrow (tooltip above) |
| Near left edge | Right-aligned arrow |
| Near right edge | Left-aligned arrow |
| Center of viewport | Centered arrow |

## Device Sizing

### Desktop

| Property | Value |
|----------|-------|
| Max width | 320px |
| Line height | 20px |
| Arrow size | 16px × 9px |

### Mobile

| Property | Value |
|----------|-------|
| Max width | 240px |
| Line height | 18px |
| Arrow size | 16px × 9px |

## Do's and Don'ts

When incorporating tooltips, adherence to established guidelines is crucial. Avoiding the following practices is essential to maintain consistency and ensure users don't miss vital information. Violating these guidelines may result in an inconsistent user experience.

### Colour Modifications

| Don't | Why |
|-------|-----|
| Change the background color | Consistency aids recognition |
| Modify the text color | Maintains readability and contrast |
| Alter the border color | Part of the component's identity |

**Incorrect Example:**
```
❌ Yellow background with red text and red border
```

**Correct Example:**
```
✓ White background (#FFFFFF) with grey text (#646464) and slate border (#949494)
```

### Typography Modifications

| Don't | Why |
|-------|-----|
| Change font size | Maintains consistent hierarchy |
| Change font weight | Bold text is not appropriate for tooltips |
| Use uppercase text | Reduces readability |

**Incorrect Example:**
```
❌ POREM IPSUM DOLOR SIT AMET (Bold, 20px, Uppercase)
```

**Correct Example:**
```
✓ Porem ipsum dolor sit amet (Regular, 14px, Sentence case)
```

### Interactive Elements

| Don't | Why |
|-------|-----|
| Add buttons to tooltips | Tooltips are informational only |
| Include links | Creates accessibility issues |
| Add form elements | Use popovers for interactive content |

**Incorrect Example:**
```
❌ Tooltip with "Button" action inside
```

**Correct Example:**
```
✓ Plain text content only
```

### Positioning Errors

| Don't | Why |
|-------|-----|
| Place tooltip further than 4px from trigger | Breaks visual connection |
| Misalign arrow with trigger | Confuses which element is described |
| Hide the tooltip arrow | Users lose directional context |

**Incorrect: 16px Gap**
```
❌ Tooltip
      ↓
  ← 16px →

      (?)
```

**Correct: 4px Gap**
```
✓ Tooltip
      ↓
  ← 4px →
      (?)
```

### Arrow Alignment Errors

| Don't | Why |
|-------|-----|
| Point arrow away from trigger | Misleading visual indicator |
| Remove arrow entirely | Loses directional context |
| Use inconsistent arrow positioning | Creates confusion |

**Incorrect: Misaligned Arrow**
```
❌ ┌────────────────┐
   │ Tooltip text   │
   └────────────┬───┘
                ▽
           (?) ← Icon is here, but arrow points elsewhere
```

**Correct: Aligned Arrow**
```
✓ ┌────────────────┐
   │ Tooltip text   │
   └─┬──────────────┘
     ▽
    (?) ← Arrow points to icon
```

## Implementation Checklist

### Before Launch

- [ ] Tooltip positioned 4px from trigger element
- [ ] Arrow pointing directly at trigger
- [ ] Content is concise and helpful
- [ ] Correct device sizing applied (Desktop: 320px, Mobile: 240px)
- [ ] Tooltip does not extend beyond viewport
- [ ] Hover and focus both trigger tooltip
- [ ] Keyboard accessible (shows on focus)
- [ ] Screen reader compatible (aria-describedby)

### Content Review

- [ ] Text is informational, not actionable
- [ ] No interactive elements (buttons, links)
- [ ] Message provides helpful context
- [ ] Standard typography applied (Etna 14px)
- [ ] Standard colours maintained

### Visual Review

- [ ] Background is white (#FFFFFF)
- [ ] Text is grey (#646464)
- [ ] Border is slate (#949494)
- [ ] Shadow applied (elevation-level-2)
- [ ] Arrow visible and correctly positioned
- [ ] 4px border radius on container

## Accessibility Requirements

### ARIA Implementation

```html
<button
  aria-describedby="tooltip-example"
  class="trigger-element"
>
  <svg aria-hidden="true"><!-- Question icon --></svg>
  <span class="sr-only">More information</span>
</button>

<div
  id="tooltip-example"
  role="tooltip"
  class="tooltip hidden"
>
  The tooltip is 4px from the icon.
</div>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| Tab | Focus trigger, show tooltip |
| Tab (again) | Move focus away, hide tooltip |
| Escape | Dismiss tooltip (optional) |

### Screen Reader Behavior

- Tooltip content announced after trigger label
- Uses `role="tooltip"` for proper semantics
- Connected via `aria-describedby` attribute
- Icon in trigger should be `aria-hidden="true"`

## Related Documentation

- [Tooltip Component](../components/atoms/tooltip.md) - Full component specification
- [Toast Guidelines](./toast-guidelines.md) - For transient notifications
- [Alert Component](../components/atoms/alert.md) - For persistent messages
- [Color Tokens](../foundations/color.md) - Spotlight, Granite, Slate colors
- [Spacing Tokens](../foundations/spacing.md) - Auditorium, Theatre spacing

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial guidelines release |
