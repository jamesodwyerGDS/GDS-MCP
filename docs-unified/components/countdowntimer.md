---
name: Countdowntimer
description: Unified documentation for Countdowntimer component
audiences:
  - design
  - engineer
  - vibe
lastUpdated: '2026-01-06'
category: atoms
status: stable
figmaNodeId: '38818:13859'
figmaFileKey: WU01oSRfSHpOxUn3ThcvC5
tokens:
  colours:
    tickInactive: 'rgba(255, 255, 255, 0.8)'
    tickActive: 'Neptune #026CDF'
    progressFill: 'Neptune #026CDF'
    text: 'Spotlight #FFFFFF'
    label: 'rgba(255, 255, 255, 0.7)'
  spacing:
    gap: Club 8px
    gapSmall: 8px
    gapMini: 4px
  typography:
    timeLarge: Averta Semibold 24px tabular-nums
    timeSmall: Averta Semibold 20px tabular-nums
    timeMini: Averta Semibold 14px tabular-nums
    label: Averta 12px uppercase tracking-wider
package: '@gds/components'
storyUrl: 'http://localhost:6006/?path=/story/components-countdown-timer--default'
sourceFile: components/CountdownTimer/index.tsx
---
# Countdowntimer

> **Unified documentation** - All audiences in one file for easy comparison.
> - [@design](#design-documentation) - Design specs, use cases, Figma tokens
> - [@engineer](#engineer-documentation) - React code, TypeScript props, Storybook
> - [@vibe](#vibe-documentation) - Tailwind HTML, copy-paste snippets

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Component** | Countdowntimer |
| **Color Variants** | tickInactive, tickActive, progressFill, text, label |
| **Package** | `@gds/components` |
| **Figma Node** | 38818:13859 |
| **Docs Available** | Design, Engineer, Vibe |


---

## Design Documentation

> Query mode: `@design countdowntimer`

**A countdown timer component displaying remaining time with an animated radial progress indicator, used for checkout flows and time-limited offers.**

### Design Tokens

**Colors:**
- tickInactive: rgba(255, 255, 255, 0.8)
- tickActive: Neptune #026CDF
- progressFill: Neptune #026CDF
- text: Spotlight #FFFFFF
- label: rgba(255, 255, 255, 0.7)

**Spacing:**
- gap: Club 8px
- gapSmall: 8px
- gapMini: 4px

**Typography:**
- timeLarge: Averta Semibold 24px tabular-nums
- timeSmall: Averta Semibold 20px tabular-nums
- timeMini: Averta Semibold 14px tabular-nums
- label: Averta 12px uppercase tracking-wider

### Full Design Specification


# CountdownTimer

A countdown timer component displaying remaining time with an animated radial progress indicator, used for checkout flows and time-limited offers.

## Overview

The CountdownTimer creates urgency and informs users of time constraints in the Ticketmaster experience. It combines a digital time display with an animated radial dial that visually represents remaining time. As time counts down, the dial's tick marks progressively fill from white to blue, and an inner circle grows to indicate progress.

### When to use

- Checkout flows where session time is limited
- Time-limited promotional offers
- Queue waiting periods before ticket sales
- Reservation hold timers

### When not to use

- For countdowns longer than 60 minutes (use a different format)
- When time pressure could cause user anxiety inappropriately
- For non-time-critical informational displays

## Variants

| Variant | Dial Size | Layout | Label | Use Case |
|---------|-----------|--------|-------|----------|
| Large | 56px | Horizontal | "Time Left" shown | Desktop checkout header |
| Small | 48px | Horizontal | "Time Left" shown | Desktop inline placement |
| Mini | 24px | Vertical | Hidden | Mobile navigation |

## Anatomy

```
Large/Small (Horizontal):
┌─────────────────────────────────┐
│  Time Left      ╭───────╮       │
│    09:00        │ ◯◯◯◯◯ │       │
│                 ╰───────╯       │
└─────────────────────────────────┘

Mini (Vertical):
    ╭─────╮
    │ ◯◯◯ │
    ╰─────╯
     09:00
```

### Parts

| Part | Description |
|------|-------------|
| Time Display | MM:SS format, tabular numbers for alignment |
| Label | "Time Left" text (large/small only) |
| Radial Dial | Circular progress with tick marks |
| Tick Marks | 40 radial lines, fill white→blue as time decreases |
| Inner Circle | Grows and fills as countdown progresses |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'large' \| 'small' \| 'mini'` | `'large'` | Size variant |
| `initialTime` | `number` | `540` | Initial time in seconds (9 min) |
| `time` | `number` | - | Controlled time value (seconds) |
| `isRunning` | `boolean` | - | External running state control |
| `autoStart` | `boolean` | `false` | Start countdown on mount |
| `onComplete` | `() => void` | - | Callback when timer reaches zero |
| `onTick` | `(timeLeft: number) => void` | - | Callback on each second tick |
| `showLabel` | `boolean` | `true` | Show "Time Left" label |
| `className` | `string` | - | Additional CSS classes |

## Animation Behavior

The countdown timer has a progressive animation:

1. **Start State**: All 40 tick marks are white/light, inner circle is empty
2. **During Countdown**: Tick marks fill clockwise from top, turning Neptune blue
3. **Inner Circle**: Grows proportionally as time decreases
4. **Complete State**: All ticks are blue, inner circle is fully filled

```
Progress: 0%    25%    50%    75%    100%
          ○      ◔      ◑      ◕      ●
```

## Styling

### Size Dimensions

| Size | Dial | Container | Time Font |
|------|------|-----------|-----------|
| Large | 56×56px | ~145×56px | 24px semibold |
| Small | 48×48px | ~137×48px | 20px semibold |
| Mini | 24×24px | ~57×76px | 14px semibold |

### Colors

| Element | Token | Value |
|---------|-------|-------|
| Tick (inactive) | — | `rgba(255, 255, 255, 0.8)` |
| Tick (active) | Neptune | `#026CDF` |
| Progress fill | Neptune | `#026CDF` at 30-100% opacity |
| Time text | Spotlight | `#FFFFFF` |
| Label text | — | `rgba(255, 255, 255, 0.7)` |

## Accessibility

### ARIA Attributes

```tsx
<div
  role="timer"
  aria-live="polite"
  aria-label={`Time remaining: ${formattedTime}`}
>
```

### Screen Reader Considerations

- Timer announces changes politely (not assertively) to avoid interruption
- Full time remaining is conveyed in accessible label
- Visual progress indicator is marked `aria-hidden`

### Cognitive Considerations

- Clear MM:SS format is universally understood
- Visual progress reinforces the time display
- Consistent placement in checkout reduces cognitive load

## Do's and Don'ts

### Do's

- Use in checkout flows to show session time limits
- Place prominently in the header during time-sensitive flows
- Use the Large variant on desktop, Mini on mobile
- Pair with clear messaging about what happens when time expires

### Don'ts

- Don't use for countdowns over an hour
- Don't change the color scheme (Neptune blue is intentional)
- Don't hide the timer during active checkout
- Don't use multiple countdown timers on the same screen

## Usage Examples

### Basic Usage

```tsx
import { CountdownTimer } from '@gds/components';

function CheckoutHeader() {
  return (
    <CountdownTimer
      size="large"
      initialTime={540}
      autoStart
      onComplete={() => handleSessionExpired()}
    />
  );
}
```

### Controlled Timer

```tsx
import { CountdownTimer } from '@gds/components';
import { useState, useEffect } from 'react';

function ControlledTimer() {
  const [timeLeft, setTimeLeft] = useState(540);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CountdownTimer
      size="small"
      initialTime={540}
      time={timeLeft}
    />
  );
}
```

### Mobile Layout

```tsx
<CountdownTimer
  size="mini"
  initialTime={540}
  autoStart
  showLabel={false}
/>
```

### With Callbacks

```tsx
<CountdownTimer
  size="large"
  initialTime={300}
  autoStart
  onTick={(remaining) => console.log(`${remaining}s left`)}
  onComplete={() => {
    showModal('Session expired');
    redirectToHome();
  }}
/>
```

## Tailwind Implementation

```tsx
// Size configurations
const sizeConfig = {
  large: {
    dialSize: 56,
    container: 'flex items-center gap-3',
    time: 'text-2xl font-semibold tabular-nums text-white',
    label: 'text-xs text-white/70 uppercase tracking-wider',
  },
  small: {
    dialSize: 48,
    container: 'flex items-center gap-2',
    time: 'text-xl font-semibold tabular-nums text-white',
    label: 'text-xs text-white/70 uppercase tracking-wider',
  },
  mini: {
    dialSize: 24,
    container: 'flex flex-col items-center gap-1',
    time: 'text-sm font-semibold tabular-nums text-white',
    label: 'hidden',
  },
};
```

## Component Hook

The `useCountdown` hook can be used independently:

```tsx
import { useCountdown } from '@gds/components';

function CustomTimer() {
  const {
    timeLeft,
    progress,
    isRunning,
    start,
    pause,
    reset,
  } = useCountdown({
    initialTime: 300,
    autoStart: false,
    onComplete: () => console.log('Done!'),
  });

  return (
    <div>
      <p>{timeLeft} seconds remaining</p>
      <p>{Math.round(progress * 100)}% complete</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## Related Components

- [ProgressBar](./progress-bar.md) - Linear progress indication
- [Badge](./badge.md) - Can display time as text badge
- [Alert](./alert.md) - For session expiration warnings

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-05 | Initial release |

---

## Engineer Documentation

> Query mode: `@engineer countdowntimer`
> Styling: **styled-components** (CSS-in-JS)

### Import

```tsx
import { CountdownTimer } from '@gds/components';
```

### Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-countdown-timer--default)

### Source

`components/CountdownTimer/index.tsx`

### Full Engineer Documentation

# CountdownTimer

## Import

```tsx
import { CountdownTimer } from '@gds/components';
```

## Basic Usage

```tsx
<CountdownTimer>Content</CountdownTimer>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `date` | `string | number | Date` | Yes | - |
| `timeLeftLabel` | `string` | Yes | - |
| `colourVariant` | `ColorProps["$colourVariant"]` | No | - |
| `sizeVariant` | `SizingProps["$sizeVariant"]` | No | - |
| `textPosition` | `SizingProps["$textPosition"]` | No | - |
| `timeOnly` | `DisplayVariant["$timeOnly"]` | No | - |
| `onCountdownEnd` | `() => void` | No | - |
| `countdownEndA11yMessage` | `string` | No | - |
| `showDays` | `boolean` | No | - |
| `multiDay` | `boolean` | No | - |


## Variants

Available variants: `Basic`, `ShowDays`, `MultiDay`, `Dark`, `RTL`


## Storybook

[View in Storybook](http://localhost:6006/?path=/story/components-countdown-timer--default)

## Source

`components/CountdownTimer/index.tsx`

---

## Vibe Documentation

> Query mode: `@vibe countdowntimer`
> Styling: **Tailwind CSS** (utility classes)

### Tailwind HTML Snippets

Copy-paste ready for Lovable, Figma Make, v0.dev:

```html
<!-- CountdownTimer Component - Tailwind CSS -->
<!-- Copy-paste ready for Lovable, Figma Make, v0.dev -->

<!-- Primary / Default -->
<div class="p-4 rounded-lg">
  CountdownTimer Content
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
| **Status** | stable | In Storybook |
| **Styling** | Figma tokens, CSS vars | styled-components |
| **Package** | - | `@gds/components` |
| **Figma Node** | 38818:13859 | - |

> **Note:** Design docs use "transactional", code uses `colorVariant="transaction"`

