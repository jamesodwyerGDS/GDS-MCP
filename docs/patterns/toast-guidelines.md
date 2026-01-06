---
name: Toast Guidelines
description: Comprehensive usage guidelines for implementing toast notifications in the Global Design System, including anatomy, variations, positioning, motion, and anti-patterns.
category: patterns
status: stable
version: 1.0.0
updated: 2025-01-06
tags:
  - toast
  - notification
  - guidelines
  - patterns
  - feedback
keywords:
  - toast usage
  - notification guidelines
  - toast placement
  - toast animation
  - toast best practices
relatedComponents:
  - name: Toast
    relationship: parent
figmaNodeId: "38852:11803"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Toast Guidelines

Comprehensive usage guidelines for implementing toast notifications in the Global Design System.

## What is a Toast?

A toast is a design element used in user interfaces. It is a small, temporary notification that appears on the screen to inform the fan of an event or action. Toasts are used to confirm that an action has been completed successfully or to provide the fan with additional information.

In the Ticketmaster user interface, a toast is typically represented by a small box or rectangle that appears at a fixed position on the screen. It contains a brief message, such as "Your personal information has been updated" and may include an icon to indicate the type of notification. The toast disappears after a few seconds or can be dismissed by the user.

## Toast Anatomy

The toast component consists of the following structural elements:

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│    [Icon]     Message Text                         [✕]     │
│   (24px)      (Rainier 16px)                     (16px)    │
│                                                            │
└────────────────────────────────────────────────────────────┘
     ↑              ↑                                  ↑
   Optional      Required                          Required
   Success       Content                            Close
    Icon         Area                               Button
```

### Structural Parts

| Part | Size | Required | Description |
|------|------|----------|-------------|
| Container | Min 280px, Max 400px | Yes | Dark background (Cosmos #121212) with 4px border radius |
| Icon | 24px × 24px | No | Success checkmark (Earth #048851) when enabled |
| Message | Flexible width | Yes | White text (Spotlight #FFFFFF), Rainier typography |
| Close Button | 16px × 16px | Yes | Dismiss control, always visible |
| Padding | 16px (Auditorium) | Yes | Internal spacing on all sides |

### Spacing Breakdown

| Gap | Token | Value |
|-----|-------|-------|
| Icon to Text | Theatre | 12px |
| Text to Close | Theatre | 12px |
| Container Padding | Auditorium | 16px |

## Toast Variations

### With Icon

The primary variant includes a success checkmark icon to reinforce positive feedback.

**Use when:**
- Confirming successful completion of important actions
- The visual reinforcement adds value to the message
- Standard success confirmations

**Specifications:**
- Icon: SuccessFilled (24px)
- Icon Color: Earth (#048851)
- Message Width: 240px

### Without Icon

A simplified text-only variant that focuses on the message content.

**Use when:**
- Space is constrained
- The icon would be redundant
- Secondary or less critical confirmations

**Specifications:**
- No icon present
- Message Width: 276px
- Same close button and padding

## Positioning and Placement

Toast messages are always positioned within a **safe zone** to avoid interfering with the main page content.

### Primary Position: Bottom Center

```
┌─────────────────────────────────────────────┐
│                                             │
│              Page Content                   │
│                                             │
│                                             │
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│           ┌─────────────────┐               │
│           │   Toast Here    │               │
│           └─────────────────┘               │
│                 Safe Zone                   │
└─────────────────────────────────────────────┘
```

### Alternative Position: Top Right (Desktop)

```
┌─────────────────────────────────────────────┐
│                    │ ┌─────────────────┐    │
│                    │ │   Toast Here    │    │
│                    │ └─────────────────┘    │
│              Page Content                   │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```

### Placement Rules

1. **Never obscure navigation** - Toast must not cover primary nav elements
2. **Maintain consistent position** - Use the same position throughout the application
3. **Respect viewport margins** - Minimum 16px from screen edges
4. **Mobile considerations** - Bottom center is preferred for touch interfaces
5. **Sticky positioning** - Toast should remain visible during scroll

### Z-Index Hierarchy

| Layer | Z-Index | Element |
|-------|---------|---------|
| 1 | 1000 | Navigation |
| 2 | 1100 | Toast Notifications |
| 3 | 1200 | Modal Overlays |

## Motion

Toast notifications use purposeful animation to draw attention without causing distraction.

### Entry Animation

| Property | Value |
|----------|-------|
| Direction | Slide up from below viewport |
| Duration | 300ms |
| Easing | ease-out (decelerate) |
| Transform | translateY(100%) → translateY(0) |
| Opacity | 0 → 1 |

```css
@keyframes toast-enter {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### Exit Animation

| Property | Value |
|----------|-------|
| Direction | Fade and slide down |
| Duration | 200ms |
| Easing | ease-in (accelerate) |
| Transform | translateY(0) → translateY(100%) |
| Opacity | 1 → 0 |

```css
@keyframes toast-exit {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
```

### Timing Specifications

| Event | Duration | Notes |
|-------|----------|-------|
| Entry animation | 300ms | Smooth entrance |
| Display duration | 5000ms | Default auto-dismiss |
| Exit animation | 200ms | Quick departure |
| User dismiss | Immediate | No delay on close click |

### Stacking Animation

When multiple toasts appear:
- New toasts enter below existing ones
- Existing toasts shift up with 150ms transition
- Gap between stacked toasts: 8px

## Things To Not Do

### Content Anti-Patterns

| Don't | Why | Do Instead |
|-------|-----|------------|
| Use for error messages | Errors require acknowledgment | Use Alert component |
| Include images in toast | Toasts are for text only | Keep content to icon + text |
| Write long messages | Must be readable in ~5 seconds | Keep under 50 characters |
| Use for warnings | Warnings need more attention | Use Alert component |

### Visual Anti-Patterns

| Don't | Why | Do Instead |
|-------|-----|------------|
| Change background colors | Consistency aids recognition | Always use Cosmos (#121212) |
| Modify text sizes | Maintains readability | Use Rainier (16px) |
| Add extra UI elements | Keeps component lightweight | Stick to icon, text, close |
| Remove close button | Users must have dismiss control | Always include close |

### Interaction Anti-Patterns

| Don't | Why | Do Instead |
|-------|-----|------------|
| Require user action | Toasts are non-blocking | Use Alert for actions |
| Stack more than 3 | Overwhelms the user | Queue additional toasts |
| Auto-dismiss too fast | Users can't read content | Minimum 3 seconds |
| Block underlying content | Toasts shouldn't obstruct | Position in safe zone |

### Positioning Anti-Patterns

```
      ❌ DON'T                           ✓ DO
┌────────────────────┐           ┌────────────────────┐
│ ┌──────────────┐   │           │                    │
│ │    Toast     │   │           │                    │
│ └──────────────┘   │           │                    │
│  ↑ Covers header   │           │                    │
│                    │           │  ┌──────────────┐  │
│                    │           │  │    Toast     │  │
│                    │           │  └──────────────┘  │
└────────────────────┘           └────────────────────┘
```

## Implementation Checklist

### Before Launch

- [ ] Toast positioned in safe zone (not over nav or key content)
- [ ] Auto-dismiss timing set (minimum 3 seconds)
- [ ] Close button functional
- [ ] Animation smooth (entry 300ms, exit 200ms)
- [ ] Stacking behavior handles multiple toasts
- [ ] Mobile responsive positioning
- [ ] Keyboard accessible (Tab to close, optional Escape)
- [ ] Screen reader announces content (aria-live="polite")

### Content Review

- [ ] Message under 50 characters
- [ ] Positive/success messaging only
- [ ] No error, warning, or critical content
- [ ] Clear, actionable language
- [ ] Icon usage appropriate (success confirmations)

## Accessibility Requirements

### ARIA Implementation

```html
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="toast"
>
  <span class="sr-only">Success notification:</span>
  Your Personal Information has been Updated
  <button aria-label="Dismiss notification">
    <svg aria-hidden="true"><!-- close icon --></svg>
  </button>
</div>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| Tab | Move focus to close button |
| Enter/Space | Activate close button |
| Escape | Dismiss toast (optional) |

### Screen Reader Behavior

- Toast content announced when it appears
- Uses `aria-live="polite"` to avoid interrupting
- Close button has descriptive label
- Icon is decorative (aria-hidden)

## Related Documentation

- [Toast Component](../components/atoms/toast.md) - Full component specification
- [Alert Component](../components/atoms/alert.md) - For errors and warnings
- [Color Tokens](../foundations/color.md) - Cosmos, Spotlight, Earth colors
- [Spacing Tokens](../foundations/spacing.md) - Auditorium, Club spacing

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-06 | Initial guidelines release |
