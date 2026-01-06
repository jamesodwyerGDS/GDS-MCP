---
name: Date Picker
description: A calendar-based date selection component supporting single date and date range selection modes.
category: atoms
status: stable
version: 1.0.0
updated: 2026-01-06
tags:
  - date
  - calendar
  - picker
  - form
  - input
  - range
keywords:
  - date picker
  - calendar component
  - date range selector
  - date input
  - single date
  - date range
dependencies:
  - Button
  - Input Field
relatedComponents:
  - name: Input Field
    relationship: child
  - name: Button
    relationship: child
tokens:
  colours:
    primary:
      default: "Neptune #024DDF"
    text:
      primary: "Cosmos #121212"
      secondary: "Granite #646464"
      disabled: "Slate #949494"
    background:
      default: "Spotlight #FFFFFF"
    border:
      default: "Slate #949494"
      subtle: "Moonrock #BFBFBF"
    selection:
      active: "Neptune #024DDF"
      range: "Neptune Light rgba(2, 77, 223, 0.1)"
  spacing:
    cellSize: "44px"
    calendarWidth: "308px"
    inputPaddingLeft: "16px"
    inputPaddingRight: "12px"
    inputPaddingY: "10px"
    gap: "24px"
  typography:
    monthHeader: "Averta Semibold 16px/24px, letter-spacing 0.32px"
    dayNumber: "Averta Semibold 14px/20px, letter-spacing 0.28px"
    weekdayLabel: "Averta Semibold 14px/20px, letter-spacing 0.28px"
    inputLabel: "Averta Regular 14px/20px, letter-spacing 0.28px"
    inputText: "Averta Regular 16px/24px, letter-spacing 0.32px"
  borderRadius:
    input: "2px"
    button: "4px"
  elevation:
    calendar: "elevation-level-3 (0 3px 12px rgba(18, 18, 18, 0.18))"
accessibility:
  wcagLevel: AA
  keyboardNavigable: true
  ariaRoles:
    - grid
    - gridcell
    - button
figmaNodeId: "38818:15812"
figmaFileKey: "WU01oSRfSHpOxUn3ThcvC5"
---

# Date Picker

A calendar-based date selection component supporting single date and date range selection modes.

## Overview

The Date Picker allows users to select dates from a visual calendar interface. It supports two modes: single date selection for choosing one specific date, and date range selection for defining a start and end date. The component is fully responsive with optimized layouts for desktop and mobile viewports.

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| Single Date | One calendar with single selection | Birth dates, appointment dates, single deadlines |
| Date Range | Two calendars with start/end selection | Travel dates, booking periods, report ranges |

## Responsive Variants

| Viewport | Single Date | Date Range |
|----------|-------------|------------|
| Desktop | Single calendar (308px wide) | Two side-by-side calendars (640px wide) |
| Mobile | Full-width stacked layout (375px) | Stacked calendars with combined inputs |

## Anatomy

```
┌─────────────────────────────────────────────────────────────────────┐
│  Single Date                          Date Range                    │
│  ┌─────────────────┐                 ┌─────────────┬─────────────┐ │
│  │   Start Date    │                 │ Start Date  │  End Date   │ │
│  │  [DD/MM/YYYY]   │                 │ [DD/MM/YYYY]│ [DD/MM/YYYY]│ │
│  └─────────────────┘                 └─────────────┴─────────────┘ │
│  ┌─────────────────┐                 ┌──────────────────────────┐  │
│  │  ← JUN 2023  →  │                 │ ← JUN 2023   JUL 2023 →  │  │
│  │ Mo Tu We Th Fr Sa Su │             │    [Calendar Grid x2]    │  │
│  │    [Calendar Grid]   │             └──────────────────────────┘  │
│  └─────────────────┘                                               │
│  [Reset]        [Apply]              [Reset] [Cancel] [Apply]      │
└─────────────────────────────────────────────────────────────────────┘
```

### Parts

| Part | Description |
|------|-------------|
| Input Field(s) | Date entry with DD/MM/YYYY placeholder |
| Month Header | Navigation arrows and month/year display |
| Weekday Row | Mo, Tu, We, Th, Fr, Sa, Su labels |
| Day Grid | 7x5 or 7x6 grid of selectable day cells |
| Action Buttons | Reset, Cancel (range only), Apply |

## Day States

| State | Description | Visual |
|-------|-------------|--------|
| Default | Selectable day in current month | Black text (#121212) |
| Hover | Mouse over selectable day | Light blue background |
| Day Selected | Single selected date | Neptune blue circle (#024DDF), white text |
| Current Day | Today's date indicator | Neptune blue underline (4px) |
| Range Start | First date in range | Neptune blue circle, left edge |
| Range End | Last date in range | Neptune blue circle, right edge |
| Mid Range | Dates between start and end | Light blue background fill |
| Current Mid Range | Today within selected range | Blue underline with range fill |
| Outside Month | Days from adjacent months | Gray text (#949494) |
| Blank | Empty cell (no date) | No content |

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'single' \| 'range'` | `'single'` | Selection mode |
| `value` | `Date \| DateRange` | - | Selected date(s) |
| `minDate` | `Date` | - | Earliest selectable date |
| `maxDate` | `Date` | - | Latest selectable date |
| `disabled` | `boolean` | `false` | Disables interaction |
| `locale` | `string` | `'en-GB'` | Date format locale |
| `weekStartsOn` | `0-6` | `1` | Week start day (1 = Monday) |

## Styling

### Typography

| Element | Font | Size | Line Height | Letter Spacing | Color |
|---------|------|------|-------------|----------------|-------|
| Month Header | Averta Semibold | 16px | 24px | 0.32px | Cosmos #121212 |
| Weekday Labels | Averta Semibold | 14px | 20px | 0.28px | Granite #646464 |
| Day Numbers | Averta Semibold | 14px | 20px | 0.28px | Cosmos #121212 |
| Outside Month | Averta Semibold | 14px | 20px | 0.28px | Slate #949494 |
| Input Label | Averta Regular | 14px | 20px | 0.28px | Granite #646464 |
| Input Value | Averta Regular | 16px | 24px | 0.32px | Cosmos #121212 |
| Input Placeholder | Averta Regular | 16px | 24px | 0.32px | Granite #646464 |

### Spacing

| Area | Value |
|------|-------|
| Day cell size | 44 x 44px |
| Calendar width | 308px |
| Column gap (range) | 24px |
| Month header height | 44px (28px text + 16px bottom padding) |
| Weekday row height | 40px |
| Input padding | 16px left, 12px right, 10px vertical |
| Button gap | 8px between Cancel/Apply |

### Colors

| Element | State | Color |
|---------|-------|-------|
| Day number | Default | Cosmos #121212 |
| Day number | Outside month | Slate #949494 |
| Day number | Selected | Spotlight #FFFFFF |
| Selection background | Active | Neptune #024DDF |
| Selection background | Range fill | Neptune 10% opacity |
| Current day indicator | - | Neptune #024DDF (4px bar) |
| Border | Input | Slate #949494 |
| Navigation arrows | Active | Neptune #024DDF |
| Navigation arrows | Disabled | Slate #949494 |

### Elevation

The calendar dropdown uses `elevation-level-3`:
```css
box-shadow: 0 3px 12px rgba(18, 18, 18, 0.18);
```

## Accessibility

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move between input, calendar, and buttons |
| Arrow Keys | Navigate between days in grid |
| Enter/Space | Select focused day |
| Escape | Close calendar dropdown |
| Page Up | Previous month |
| Page Down | Next month |

### ARIA Attributes

```html
<div role="application" aria-label="Date picker">
  <div role="grid" aria-label="June 2023">
    <div role="row">
      <div role="columnheader">Mo</div>
      <!-- ... -->
    </div>
    <div role="row">
      <div role="gridcell" aria-selected="false" tabindex="-1">1</div>
      <div role="gridcell" aria-selected="true" tabindex="0">2</div>
      <!-- ... -->
    </div>
  </div>
</div>
```

### Screen Reader Considerations

- Selected dates announced when changed
- Month navigation announced
- Range selection states clearly communicated
- Current day identified as "today"

## Do's and Don'ts

### Do's

- Use Single Date for selecting one specific date
- Use Date Range for travel bookings, report periods, or any span of dates
- Show current month by default, centered on today
- Disable dates outside valid ranges (past dates for future bookings)
- Provide clear input format hints (DD/MM/YYYY)
- Allow manual date entry in the input field

### Don'ts

- Don't use for time selection (use Time Picker instead)
- Don't show more than 2 months at once on desktop
- Don't allow invalid date ranges (end before start)
- Don't hide the Apply button - always require confirmation
- Don't change date format based on user location without indication

## CSS Custom Properties

```css
:root {
  /* Date Picker Colors */
  --datepicker-text: var(--color-cosmos);
  --datepicker-text-secondary: var(--color-granite);
  --datepicker-text-disabled: var(--color-slate);
  --datepicker-bg: var(--color-spotlight);
  --datepicker-border: var(--color-slate);

  --datepicker-selection: var(--color-neptune);
  --datepicker-selection-text: var(--color-spotlight);
  --datepicker-range-fill: rgba(2, 77, 223, 0.1);
  --datepicker-current-indicator: var(--color-neptune);

  /* Date Picker Spacing */
  --datepicker-cell-size: 44px;
  --datepicker-calendar-width: 308px;
  --datepicker-gap: 24px;

  /* Date Picker Shape */
  --datepicker-input-radius: 2px;
  --datepicker-button-radius: 4px;
}
```

## Tailwind Configuration

```js
// tailwind.config.js (date picker specific utilities)
module.exports = {
  theme: {
    extend: {
      colors: {
        datepicker: {
          text: '#121212',
          'text-secondary': '#646464',
          'text-disabled': '#949494',
          selection: '#024DDF',
          'selection-text': '#FFFFFF',
          'range-fill': 'rgba(2, 77, 223, 0.1)',
          border: '#949494',
        }
      },
      spacing: {
        'datepicker-cell': '44px',
        'datepicker-width': '308px',
      },
      boxShadow: {
        'datepicker': '0 3px 12px rgba(18, 18, 18, 0.18)',
      }
    }
  }
}
```

## Figma Variables

| Variable | Type | Value |
|----------|------|-------|
| Primary/Neptune | COLOR | #024DDF |
| Secondary/Cosmos | COLOR | #121212 |
| Secondary/Granite | COLOR | #646464 |
| Secondary/Spotlight | COLOR | #FFFFFF |
| Borders & Fills/Slate | COLOR | #949494 |
| Borders & Fills/Moonrock | COLOR | #BFBFBF |
| Colour/button-bg-blue | COLOR | #024DDF |
| Colour/button-content-blue | COLOR | #024DDF |
| Colour/button-content-white | COLOR | #FFFFFF |
| Colour/button-border-blue | COLOR | #024DDF |
| Spacing/button-radius | NUMBER | 4 |
| Spacing/button-min-width | NUMBER | 100 |

## Related Components

- [Input Field](../atoms/input-field.md) - Used for date text entry
- [Button](../atoms/button.md) - Used for Reset, Cancel, Apply actions
- [Icon](../atoms/icon.md) - Arrow icons for navigation

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-06 | Initial release |
