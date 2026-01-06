# GDS Design System - Vibe Coding Reference

> Single-file reference for AI coding tools (Lovable, Figma Make, v0.dev)

## Quick Start

Use these Tailwind classes to build GDS-compliant UIs.

## Design Tokens

### Colors

| Token | Hex | Tailwind |
|-------|-----|----------|
| Neptune (Primary) | #024DDF | `bg-[#024DDF]` |
| Cosmos (Dark) | #121212 | `bg-[#121212]` |
| Earth (Success) | #01A469 | `bg-[#01A469]` |
| Mars (Error) | #EB0000 | `bg-[#EB0000]` |
| Granite (Gray) | #646464 | `bg-[#646464]` |
| Slate (Light Gray) | #949494 | `bg-[#949494]` |
| Lunar (Border) | #D6D6D6 | `bg-[#D6D6D6]` |
| Spotlight (White) | #FFFFFF | `bg-white` |

### Spacing Scale

| Token | Value | Tailwind |
|-------|-------|----------|
| lounge | 4px | `p-1` |
| club | 8px | `p-2` |
| hall | 12px | `p-3` |
| auditorium | 16px | `p-4` |
| theatre | 20px | `p-5` |
| amphitheatre | 24px | `p-6` |
| arena | 32px | `p-8` |
| stadium | 48px | `p-12` |
| dome | 64px | `p-16` |
| field | 88px | `p-22` |

### Typography

| Token | Size | Tailwind |
|-------|------|----------|
| mauna | 64px | `text-7xl` |
| everest | 48px | `text-5xl` |
| kilimanjaro | 40px | `text-4xl` |
| matterhorn | 32px | `text-3xl` |
| vinson | 24px | `text-2xl` |
| blanc | 20px | `text-xl` |
| rainier | 18px | `text-lg` |
| fiji | 16px | `text-base` |

### Border Radius

```
rounded-none  → 0px
rounded-sm    → 4px
rounded       → 8px (default)
rounded-lg    → 12px
rounded-full  → 9999px
```

## Component Patterns

### Button

```html
<!-- Primary -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#024DDF] text-white font-semibold rounded-lg hover:bg-[#0141B8] focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:ring-offset-2 disabled:bg-[#D6D6D6] disabled:text-[#949494] disabled:cursor-not-allowed transition-colors">
  Button Label
</button>

<!-- Secondary -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded-lg border-2 border-[#024DDF] hover:bg-[#024DDF] hover:text-white transition-colors">
  Secondary
</button>

<!-- Ghost -->
<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded-lg hover:bg-[#024DDF]/10 transition-colors">
  Ghost
</button>
```

### Input

```html
<input
  type="text"
  class="w-full px-4 py-3 text-base border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:border-transparent placeholder:text-[#949494]"
  placeholder="Enter text..."
/>
```

### Badge

```html
<span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-[#024DDF] text-white">
  Badge
</span>
```

### Card

```html
<div class="p-6 bg-white rounded-xl shadow-md border border-[#D6D6D6]">
  <h3 class="text-lg font-semibold text-[#121212]">Card Title</h3>
  <p class="mt-2 text-[#646464]">Card content goes here.</p>
</div>
```

### Alert

```html
<!-- Info -->
<div class="flex items-center gap-3 p-4 rounded-lg bg-[#024DDF]/10 text-[#024DDF]">
  <span>ℹ️</span>
  <p>Information message</p>
</div>

<!-- Success -->
<div class="flex items-center gap-3 p-4 rounded-lg bg-[#01A469]/10 text-[#01A469]">
  <span>✓</span>
  <p>Success message</p>
</div>

<!-- Error -->
<div class="flex items-center gap-3 p-4 rounded-lg bg-[#EB0000]/10 text-[#EB0000]">
  <span>⚠</span>
  <p>Error message</p>
</div>
```

### Modal

```html
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div class="w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
    <h2 class="text-xl font-semibold text-[#121212]">Modal Title</h2>
    <p class="mt-4 text-[#646464]">Modal content</p>
    <div class="flex justify-end gap-3 mt-6">
      <button class="px-4 py-2 text-[#646464] hover:bg-[#D6D6D6]/20 rounded-lg">Cancel</button>
      <button class="px-4 py-2 bg-[#024DDF] text-white rounded-lg hover:bg-[#0141B8]">Confirm</button>
    </div>
  </div>
</div>
```

## Components Index

- **Accordion**: An accordion component that allows users to expand and collapse content sections, useful for organizing information in a compact, scannable format.
- **Alert**: An alert component that displays important messages to users, providing contextual feedback for errors, warnings, informational messages, and success confirmations.
- **Badge**: A badge component used to provide information on item statuses and notifications, drawing attention to significant information that might otherwise be missed.
- **Button**: A versatile button component for triggering actions, with multiple variants for different contexts and emphasis levels.
- **CircleButton**: A circular icon button for navigation and actions, optimized for space-constrained areas like cards, carousels, and mobile interfaces.
- **CountdownTimer**: A countdown timer component displaying remaining time with an animated radial progress indicator, used for checkout flows and time-limited offers.
- **Date Picker**: A calendar-based date selection component supporting single date and date range selection modes.
- **Display Heading**: A high-impact typographic component for page headers, artist names, and attraction titles with distinctive stage underline styling
- **Double Range Input**: A dual-handle slider component with min/max input fields for selecting a value range, commonly used for price filtering.
- **Dropdown**: A form control that allows users to select a single option from a collapsible list of choices.
- **Filterbar**: A segmented toggle control for switching between different view modes or filter options, typically used to alternate between list view, favorites, and calendar views.
- **Image**: Guidelines for using images consistently across the Marketplace Design System, including aspect ratios, fill modes, gradients, and accessibility requirements.
- **Input Field**: A text input component for capturing user data, with support for labels, icons, validation states, and accessibility features.
- **Loading Spinner**: A component with a looping animation that communicates a process or action is ongoing
- **Modal**: A dialog overlay component that displays content requiring user attention or interaction, with multiple sizes and variants for different contexts.
- **Pagination Button**: A load-more pagination component displaying progress of items loaded and a button to load additional content.
- **Pill Button**: A rounded pill-shaped button used for search and filter functions, with optional chevron icons for navigation context.
- **Radio Button**: Radio buttons allow users to select one option from a group of mutually exclusive choices
- **Side Panel**: An overlay that slides in from the left or right, showing extra details or actions related to an item on the page without leaving the current context.
- **SquareButton**: A square icon button for navigation and actions, optimized for carousels and space-constrained areas requiring directional navigation.
- **Stepper**: A quantity stepper component used to increment or decrement numeric values within a given range. Steppers are easy-to-use tools that allow users to filter/refine their search or preferences by adjusting numerical selections.
- **Toast**: A transient notification component that provides short, informative feedback confirming an action was successful. Toasts appear briefly and auto-dismiss without requiring user interaction.
- **Toggle**: A switch control for toggling between two mutually exclusive options, such as on/off or enabled/disabled states.
- **Toolbox**: A vertical zoom control component for the Interactive Seat Map (ISM) that allows users to zoom in, zoom out, and reset the view.
- **Tooltip**: A brief, informative message that appears when a user hovers over or focuses on an element. Tooltips provide contextual information without cluttering the interface.

---

Generated for GDS (Global Design System) | GitMCP: gitmcp.io/jamesodwyerGDS/GDS-MCP
