# GDS - Global Design System

The Global Design System provides consistent UI components for the Marketplace digital experience. Use these tokens and components to build accessible, on-brand interfaces.

---

## Tailwind Configuration

Copy this complete configuration to ensure Figma Make generates matching Tailwind CSS:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // ─────────────────────────────────────────────────────────────────
      // COLORS
      // ─────────────────────────────────────────────────────────────────
      colors: {
        // Primary
        neptune: '#024DDF',

        // Secondary
        cosmos: '#121212',
        granite: '#646464',
        spotlight: '#FFFFFF',

        // Tertiary
        earth: '#048851',
        mars: '#EB0000',
        jupiter: '#FFB932',
        callisto: '#A733FF',
        ganymede: '#21FFF2',
        titan: '#FBFF2C',

        // Dark Mode (for dark backgrounds)
        'neptune-bright': '#3074FE',
        'mars-bright': '#FF3838',
        'callisto-bright': '#BD66FF',

        // Structural
        slate: '#949494',
        moonrock: '#BFBFBF',
        ammonite: '#D6D6D6',
        diatomite: '#EBEBEB',
        lunar: '#F6F6F6',

        // Semantic Button Colors
        button: {
          primary: '#024DDF',
          'primary-hover': '#0141B8',
          'primary-pressed': '#033399',
          inverse: '#121212',
          'inverse-hover': '#2A2A2A',
          'inverse-pressed': '#3A3A3A',
          transactional: '#048851',
          'transactional-hover': '#018A57',
          'transactional-pressed': '#016B45',
          disabled: '#D6D6D6',
          'disabled-text': '#949494',
        }
      },

      // ─────────────────────────────────────────────────────────────────
      // SPACING (8px baseline grid)
      // ─────────────────────────────────────────────────────────────────
      spacing: {
        'lounge': '4px',      // Tight inline spacing, icon gaps
        'club': '8px',        // Small padding, tight component gaps
        'hall': '12px',       // Compact padding, form elements
        'auditorium': '16px', // Standard component padding
        'theatre': '20px',    // Medium padding, card content
        'amphitheatre': '24px', // Default spacing between elements
        'arena': '32px',      // Section gaps, card padding
        'stadium': '48px',    // Large section spacing
        'dome': '64px',       // Major section separation
        'field': '88px',      // Page section margins, hero spacing
      },

      // ─────────────────────────────────────────────────────────────────
      // TYPOGRAPHY
      // ─────────────────────────────────────────────────────────────────
      fontFamily: {
        primary: ['Averta', 'sans-serif'],
      },

      fontWeight: {
        regular: '400',
        semibold: '600',
        bold: '700',
        black: '900',      // Headings
      },

      fontSize: {
        // Display (Desktop) - Always uppercase, black weight
        'mauna': ['54px', { lineHeight: '54px', letterSpacing: '2.7px', fontWeight: '900' }],
        'everest': ['44px', { lineHeight: '44px', letterSpacing: '2.2px', fontWeight: '900' }],
        'kilimanjaro': ['32px', { lineHeight: '34px', letterSpacing: '1.6px', fontWeight: '900' }],
        'vinson': ['24px', { lineHeight: '28px', letterSpacing: '0.48px', fontWeight: '900' }],
        'blanc': ['20px', { lineHeight: '24px', letterSpacing: '0.4px', fontWeight: '900' }],

        // Display (Mobile) - Always uppercase, black weight
        'mauna-mobile': ['44px', { lineHeight: '44px', letterSpacing: '2.2px', fontWeight: '900' }],
        'everest-mobile': ['32px', { lineHeight: '32px', letterSpacing: '1.6px', fontWeight: '900' }],
        'kilimanjaro-mobile': ['24px', { lineHeight: '26px', letterSpacing: '1.2px', fontWeight: '900' }],
        'vinson-mobile': ['22px', { lineHeight: '24px', letterSpacing: '0.44px', fontWeight: '900' }],
        'blanc-mobile': ['18px', { lineHeight: '22px', letterSpacing: '0.36px', fontWeight: '900' }],

        // Body
        'rainier': ['16px', { lineHeight: '24px', letterSpacing: '0.32px', fontWeight: '400' }],
        'boise': ['16px', { lineHeight: '24px', letterSpacing: '0.32px', fontWeight: '600' }],
        'fiji': ['18px', { lineHeight: '26px', letterSpacing: '0.36px', fontWeight: '600' }],

        // Section
        'matterhorn': ['28px', { lineHeight: '34px', letterSpacing: '0.56px', fontWeight: '900' }],
      },

      // ─────────────────────────────────────────────────────────────────
      // BORDER RADIUS
      // ─────────────────────────────────────────────────────────────────
      borderRadius: {
        'none': '0',
        'xs': '2px',      // Inputs
        'sm': '4px',      // Badges, toasts, tooltips, buttons
        'DEFAULT': '4px', // Standard radius
        'md': '8px',      // Cards, larger buttons
        'lg': '8px',      // Deprecated: use md
        'pill': '24px',   // Pill buttons, filter chips
        'full': '9999px', // Circle buttons
      },

      // ─────────────────────────────────────────────────────────────────
      // BORDER WIDTH
      // ─────────────────────────────────────────────────────────────────
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '1': '1px',
        '2': '2px',
      },

      // ─────────────────────────────────────────────────────────────────
      // GAP (Grid gutters)
      // ─────────────────────────────────────────────────────────────────
      gap: {
        'gutter': '24px',
        'gutter-mobile': '16px',
      },

      // ─────────────────────────────────────────────────────────────────
      // COMPONENT HEIGHTS (Pixel-perfect sizing)
      // ─────────────────────────────────────────────────────────────────
      height: {
        'btn': '44px',           // Standard button height
        'btn-sm': '36px',        // Small button height
        'btn-lg': '52px',        // Large button height
        'input': '48px',         // Input field height
        'badge-sm': '20px',      // Small badge height
        'badge': '24px',         // Default badge height
        'badge-lg': '28px',      // Large badge height
        'checkbox': '20px',      // Checkbox/radio box height
        'toggle': '24px',        // Toggle switch height
      },

      // ─────────────────────────────────────────────────────────────────
      // COMPONENT WIDTHS (Minimum widths for consistency)
      // ─────────────────────────────────────────────────────────────────
      minWidth: {
        'btn': '100px',          // Standard button min-width
        'btn-transactional': '120px', // Transactional button min-width
        'input': '200px',        // Input field min-width
        'toast': '300px',        // Toast min-width
      },

      // ─────────────────────────────────────────────────────────────────
      // MAX WIDTH (Layout and components)
      // ─────────────────────────────────────────────────────────────────
      maxWidth: {
        'content': '1280px',
        'toast': '400px',        // Toast max-width
      },

      // ─────────────────────────────────────────────────────────────────
      // WIDTH (Fixed component widths)
      // ─────────────────────────────────────────────────────────────────
      width: {
        'btn-icon': '44px',      // Icon-only button width
        'checkbox': '20px',      // Checkbox/radio box width
        'toggle': '44px',        // Toggle switch width
      },
    }
  }
}
```

---

## Design Tokens Reference

### Colors

Use only these defined colors. Do not create tints, gradients, or new colors.

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| **Primary** | | | |
| `neptune` | `#024DDF` | `bg-neptune`, `text-neptune`, `border-neptune` | Primary CTAs, interactive elements, links |
| **Secondary** | | | |
| `cosmos` | `#121212` | `bg-cosmos`, `text-cosmos`, `border-cosmos` | Headlines, body text, dark backgrounds |
| `granite` | `#646464` | `text-granite` | Secondary text, icons |
| `spotlight` | `#FFFFFF` | `bg-spotlight`, `text-spotlight` | Light backgrounds, text on dark |
| **Tertiary** | | | |
| `earth` | `#048851` | `bg-earth` | Transactional/purchase buttons, success |
| `mars` | `#EB0000` | `text-mars`, `border-mars` | Error states only |
| `jupiter` | `#FFB932` | `bg-jupiter` | Warning states |
| `callisto` | `#A733FF` | `bg-callisto` | Accents |
| `ganymede` | `#21FFF2` | `bg-ganymede` | Filtering |
| **Structural** | | | |
| `slate` | `#949494` | `text-slate`, `border-slate` | Disabled states, subtle borders |
| `moonrock` | `#BFBFBF` | `border-moonrock` | Dividers, inactive elements |
| `ammonite` | `#D6D6D6` | `bg-ammonite`, `border-ammonite` | Light borders, disabled backgrounds |
| `diatomite` | `#EBEBEB` | `bg-diatomite` | Subtle backgrounds |
| `lunar` | `#F6F6F6` | `bg-lunar` | Page backgrounds, cards |
| **Dark Mode** | | | |
| `neptune-bright` | `#3074FE` | `text-neptune-bright` | CTAs on dark backgrounds |
| `mars-bright` | `#FF3838` | `text-mars-bright` | Errors on dark backgrounds |

### Typography

Font family: **Averta** (`font-primary`)

| Token | Size | Weight | Line Height | Letter Spacing | Tailwind Class | Usage |
|-------|------|--------|-------------|----------------|----------------|-------|
| **Display (Desktop)** - uppercase | | | | | | |
| `mauna` | 54px | 700 | 54px | 2.7px | `text-mauna uppercase` | Hero headlines |
| `everest` | 44px | 700 | 44px | 2.2px | `text-everest uppercase` | Page titles |
| `kilimanjaro` | 32px | 700 | 34px | 1.6px | `text-kilimanjaro uppercase` | Section titles |
| `vinson` | 24px | 700 | 28px | 0.48px | `text-vinson uppercase` | Subsection titles |
| `blanc` | 20px | 700 | 24px | 0.4px | `text-blanc uppercase` | Card titles |
| **Body** | | | | | | |
| `rainier` | 16px | 400 | 24px | 0.32px | `text-rainier` | Body text, paragraphs |
| `boise` | 16px | 600 | 24px | 0.32px | `text-boise` | Labels, emphasized text |
| `fiji` | 18px | 600 | 26px | 0.36px | `text-fiji` | Subtopics |
| **Section** | | | | | | |
| `matterhorn` | 28px | 700 | 34px | 0.56px | `text-matterhorn capitalize` | Section headers (title case) |

### Spacing (8px Baseline Grid)

| Token | Value | Tailwind Classes | Usage |
|-------|-------|------------------|-------|
| `lounge` | 4px | `p-lounge`, `m-lounge`, `gap-lounge` | Tight inline spacing, icon gaps |
| `club` | 8px | `p-club`, `m-club`, `gap-club` | Small padding, tight component gaps |
| `hall` | 12px | `p-hall`, `m-hall`, `gap-hall` | Compact padding, form elements |
| `auditorium` | 16px | `p-auditorium`, `m-auditorium`, `gap-auditorium` | Standard component padding |
| `theatre` | 20px | `p-theatre`, `m-theatre`, `gap-theatre` | Medium padding, card content |
| `amphitheatre` | 24px | `p-amphitheatre`, `m-amphitheatre`, `gap-amphitheatre` | Default spacing between elements |
| `arena` | 32px | `p-arena`, `m-arena`, `gap-arena` | Section gaps, card padding |
| `stadium` | 48px | `p-stadium`, `m-stadium`, `gap-stadium` | Large section spacing |
| `dome` | 64px | `p-dome`, `m-dome`, `gap-dome` | Major section separation |
| `field` | 88px | `p-field`, `m-field`, `gap-field` | Page section margins, hero spacing |

### Border Radius

| Context | Value | Tailwind Class |
|---------|-------|----------------|
| Inputs | `2px` | `rounded-xs` or `rounded-[2px]` |
| Buttons | `4px` | `rounded` or `rounded-sm` |
| Badges, Toasts, Tooltips | `4px` | `rounded-sm` |
| Cards | `8px` | `rounded-md` |
| Pill shapes (filterbar) | `24px` | `rounded-pill` |
| Circle buttons | `9999px` | `rounded-full` |

### Border Colors

| Context | Color | Tailwind Class |
|---------|-------|----------------|
| Primary interactive | Neptune `#024DDF` | `border-neptune` |
| Default container | Cosmos `#121212` | `border-cosmos` |
| Subtle/divider | Ammonite `#D6D6D6` | `border-ammonite` |
| Inactive | Moonrock `#BFBFBF` | `border-moonrock` |
| Disabled | Slate `#949494` | `border-slate` |
| Error | Mars `#EB0000` | `border-mars` |

---

## Component Specifications

**CRITICAL: These specs ensure pixel-perfect component rendering. Always include all dimensions.**

### Button Specifications

| Property | Standard | Transactional | Icon-Only |
|----------|----------|---------------|-----------|
| **Height** | 44px | 44px | 44px |
| **Min-Width** | 100px | 120px | 44px |
| **Padding X** | 16px | 16px | 10px |
| **Padding Y** | 10px | 9px | 10px |
| **Border Radius** | 4px | 4px | 4px / full |
| **Border Width** | 1px (outlined variants) | 1px | 1px |
| **Icon Size** | 24px | 24px | 24px |
| **Icon Gap** | 8px | 8px | 0 |
| **Font Size** | 16px | 18px | — |
| **Font Weight** | 600 | 600 | — |
| **Line Height** | 24px | 26px | — |
| **Letter Spacing** | 0.32px | 0.36px | — |

#### Button Tailwind Classes (Copy-Paste Ready)

```css
/* Standard Button */
.btn-standard {
  @apply h-[44px] min-w-[100px] px-auditorium py-[10px] rounded-sm gap-club
         inline-flex items-center justify-center
         font-primary font-semibold text-[16px] leading-[24px] tracking-[0.32px];
}

/* Transactional Button */
.btn-transactional {
  @apply h-[44px] min-w-[120px] px-auditorium py-[9px] rounded-sm gap-club
         inline-flex items-center justify-center
         font-primary font-semibold text-[18px] leading-[26px] tracking-[0.36px] capitalize;
}

/* Icon-Only Button */
.btn-icon {
  @apply h-[44px] w-[44px] p-[10px] rounded-sm
         inline-flex items-center justify-center;
}

/* Icon-Only Circle Button */
.btn-icon-circle {
  @apply h-[44px] w-[44px] p-[10px] rounded-full
         inline-flex items-center justify-center;
}
```

### Input Field Specifications

| Property | Default | With Label |
|----------|---------|------------|
| **Height** | 48px | 48px (input only) |
| **Min-Width** | 200px | 200px |
| **Padding X** | 12px | 12px |
| **Padding Y** | 12px | 12px |
| **Border Width** | 1px | 1px |
| **Border Radius** | 2px | 2px |
| **Font Size** | 16px | 16px |
| **Line Height** | 24px | 24px |
| **Label Gap** | — | 8px |
| **Label Font Size** | — | 16px |

#### Input Tailwind Classes (Copy-Paste Ready)

```css
/* Input Field */
.input-field {
  @apply h-[48px] min-w-[200px] px-hall py-hall
         border border-ammonite rounded-[2px]
         font-primary text-[16px] leading-[24px] text-cosmos
         placeholder:text-granite
         focus:border-neptune focus:outline-none focus:ring-2 focus:ring-neptune/20
         disabled:bg-lunar disabled:border-slate disabled:text-slate;
}

/* Input with Error */
.input-field-error {
  @apply border-mars focus:border-mars focus:ring-mars/20;
}

/* Input Label */
.input-label {
  @apply block mb-club font-primary text-rainier text-cosmos;
}
```

### Badge Specifications

| Property | Small | Default | Large |
|----------|-------|---------|-------|
| **Height** | 20px | 24px | 28px |
| **Min-Width** | — | — | — |
| **Padding X** | 8px | 8px | 12px |
| **Padding Y** | 2px | 4px | 4px |
| **Border Radius** | 4px | 4px | 4px |
| **Font Size** | 12px | 14px | 14px |
| **Font Weight** | 600 | 600 | 600 |
| **Line Height** | 16px | 16px | 20px |

#### Badge Tailwind Classes (Copy-Paste Ready)

```css
/* Badge Small */
.badge-sm {
  @apply h-[20px] px-club py-[2px] rounded-sm
         inline-flex items-center justify-center
         font-primary font-semibold text-[12px] leading-[16px];
}

/* Badge Default */
.badge {
  @apply h-[24px] px-club py-[4px] rounded-sm
         inline-flex items-center justify-center
         font-primary font-semibold text-[14px] leading-[16px];
}

/* Badge Large */
.badge-lg {
  @apply h-[28px] px-hall py-[4px] rounded-sm
         inline-flex items-center justify-center
         font-primary font-semibold text-[14px] leading-[20px];
}
```

### Toast Specifications

| Property | Value |
|----------|-------|
| **Min-Width** | 300px |
| **Max-Width** | 400px |
| **Padding X** | 16px |
| **Padding Y** | 12px |
| **Border Radius** | 4px |
| **Icon Size** | 24px |
| **Icon Gap** | 12px |
| **Title Font Size** | 16px |
| **Title Font Weight** | 600 |
| **Body Font Size** | 14px |

#### Toast Tailwind Classes (Copy-Paste Ready)

```css
/* Toast Container */
.toast {
  @apply min-w-[300px] max-w-[400px] px-auditorium py-hall rounded-sm
         flex items-start gap-hall
         bg-spotlight shadow-lg;
}

/* Toast Icon */
.toast-icon {
  @apply w-[24px] h-[24px] flex-shrink-0;
}

/* Toast Title */
.toast-title {
  @apply font-primary font-semibold text-[16px] leading-[24px] text-cosmos;
}

/* Toast Body */
.toast-body {
  @apply font-primary text-[14px] leading-[20px] text-granite;
}
```

### Card Specifications

| Property | Default | Compact | Featured |
|----------|---------|---------|----------|
| **Padding** | 24px | 16px | 32px |
| **Border Radius** | 8px | 8px | 8px |
| **Border Width** | 1px (optional) | 1px | 0 |
| **Shadow** | none / sm | none | md |
| **Min-Width** | — | — | — |

#### Card Tailwind Classes (Copy-Paste Ready)

```css
/* Card Default */
.card {
  @apply p-amphitheatre rounded-md bg-spotlight;
}

/* Card with Border */
.card-bordered {
  @apply p-amphitheatre rounded-md bg-spotlight border border-ammonite;
}

/* Card Compact */
.card-compact {
  @apply p-auditorium rounded-md bg-spotlight;
}

/* Card Featured */
.card-featured {
  @apply p-arena rounded-md bg-spotlight shadow-md;
}
```

### Checkbox & Radio Specifications

| Property | Checkbox | Radio |
|----------|----------|-------|
| **Box Size** | 20px × 20px | 20px × 20px |
| **Border Width** | 2px | 2px |
| **Border Radius** | 4px | full (circle) |
| **Check/Dot Size** | 14px | 10px |
| **Label Gap** | 8px | 8px |
| **Label Font Size** | 16px | 16px |

#### Checkbox/Radio Tailwind Classes (Copy-Paste Ready)

```css
/* Checkbox Box */
.checkbox-box {
  @apply h-[20px] w-[20px] border-2 border-cosmos rounded-sm
         flex items-center justify-center
         checked:bg-neptune checked:border-neptune
         focus:ring-2 focus:ring-neptune/20;
}

/* Radio Box */
.radio-box {
  @apply h-[20px] w-[20px] border-2 border-cosmos rounded-full
         flex items-center justify-center
         checked:border-neptune
         focus:ring-2 focus:ring-neptune/20;
}

/* Radio Inner Dot (when checked) */
.radio-dot {
  @apply w-[10px] h-[10px] rounded-full bg-neptune;
}

/* Checkbox/Radio Label */
.checkbox-label, .radio-label {
  @apply ml-club font-primary text-[16px] leading-[24px] text-cosmos;
}
```

### Heading Specifications

**CRITICAL: All headings use font-weight 900 (black), text-cosmos color, text-align left, and include a decorative bar above.**

#### Heading Bar (Decorative Element)

All display headings include a short decorative bar above the text:

| Property | Value | Tailwind |
|----------|-------|----------|
| **Width** | 32px | `w-[32px]` |
| **Height** | 4px | `h-[4px]` |
| **Color** | Cosmos (#121212) | `bg-cosmos` |
| **Border Radius** | 2px | `rounded-sm` |
| **Gap Below Bar** | 8px | `mb-club` |

#### Display Headings (Desktop)

| Level | Token | Size | Weight | Line Height | Letter Spacing | Transform | Usage |
|-------|-------|------|--------|-------------|----------------|-----------|-------|
| H1 | `mauna` | 54px | 900 | 54px | 2.7px | uppercase | Hero headlines, landing pages |
| H2 | `everest` | 44px | 900 | 44px | 2.2px | uppercase | Page titles, major sections |
| H3 | `kilimanjaro` | 32px | 900 | 34px | 1.6px | uppercase | Section titles |
| H4 | `vinson` | 24px | 900 | 28px | 0.48px | uppercase | Subsection titles |
| H5 | `blanc` | 20px | 900 | 24px | 0.4px | uppercase | Card titles, minor headings |

#### Display Headings (Mobile)

| Level | Token | Size | Weight | Line Height | Letter Spacing | Transform |
|-------|-------|------|--------|-------------|----------------|-----------|
| H1 | `mauna-mobile` | 44px | 900 | 44px | 2.2px | uppercase |
| H2 | `everest-mobile` | 32px | 900 | 32px | 1.6px | uppercase |
| H3 | `kilimanjaro-mobile` | 24px | 900 | 26px | 1.2px | uppercase |
| H4 | `vinson-mobile` | 22px | 900 | 24px | 0.44px | uppercase |
| H5 | `blanc-mobile` | 18px | 900 | 22px | 0.36px | uppercase |

#### Section & Content Headings

| Type | Token | Size | Weight | Line Height | Letter Spacing | Transform | Usage |
|------|-------|------|--------|-------------|----------------|-----------|-------|
| Section Header | `matterhorn` | 28px | 900 | 34px | 0.56px | capitalize | Section headers (title case) |
| Subtopic | `fiji` | 18px | 600 | 26px | 0.36px | none | Subtopic headings |

#### Heading Tailwind Classes (Copy-Paste Ready)

```css
/* Heading Bar - decorative element above all display headings */
.heading-bar {
  @apply w-[32px] h-[4px] bg-cosmos rounded-sm mb-club;
}

/* Base heading styles - ALL headings use these */
.heading-base {
  @apply font-primary font-black text-cosmos text-left;
}

/* Display H1 - Hero (with bar) */
.heading-h1 {
  @apply font-primary font-black text-cosmos text-left
         text-mauna leading-[54px] tracking-[2.7px] uppercase;
}

/* Display H2 - Page Title (with bar) */
.heading-h2 {
  @apply font-primary font-black text-cosmos text-left
         text-everest leading-[44px] tracking-[2.2px] uppercase;
}

/* Display H3 - Section Title (with bar) */
.heading-h3 {
  @apply font-primary font-black text-cosmos text-left
         text-kilimanjaro leading-[34px] tracking-[1.6px] uppercase;
}

/* Display H4 - Subsection Title (with bar) */
.heading-h4 {
  @apply font-primary font-black text-cosmos text-left
         text-vinson leading-[28px] tracking-[0.48px] uppercase;
}

/* Display H5 - Card Title (with bar) */
.heading-h5 {
  @apply font-primary font-black text-cosmos text-left
         text-blanc leading-[24px] tracking-[0.4px] uppercase;
}

/* Section Header (with bar) */
.heading-section {
  @apply font-primary font-black text-cosmos text-left
         text-matterhorn leading-[34px] tracking-[0.56px] capitalize;
}

/* Mobile Responsive Headings */
@screen md {
  .heading-h1-responsive { @apply text-mauna leading-[54px] tracking-[2.7px]; }
  .heading-h2-responsive { @apply text-everest leading-[44px] tracking-[2.2px]; }
  .heading-h3-responsive { @apply text-kilimanjaro leading-[34px] tracking-[1.6px]; }
}
@screen sm {
  .heading-h1-responsive { @apply text-mauna-mobile leading-[44px] tracking-[2.2px]; }
  .heading-h2-responsive { @apply text-everest-mobile leading-[32px] tracking-[1.6px]; }
  .heading-h3-responsive { @apply text-kilimanjaro-mobile leading-[26px] tracking-[1.2px]; }
}
```

#### Heading HTML Structure

Display headings require the decorative bar element:

```html
<!-- Standard heading with bar -->
<div class="heading-wrapper">
  <div class="heading-bar"></div>
  <h1 class="heading-h1">TITLE HEADER</h1>
</div>

<!-- Or using before pseudo-element -->
<h1 class="heading-h1-with-bar">TITLE HEADER</h1>
```

```css
/* Alternative: Using pseudo-element for the bar */
.heading-h1-with-bar::before,
.heading-h2-with-bar::before,
.heading-h3-with-bar::before,
.heading-h4-with-bar::before,
.heading-h5-with-bar::before {
  content: '';
  @apply block w-[32px] h-[4px] bg-cosmos rounded-sm mb-club;
}
```

#### Heading Rules

| Rule | Requirement |
|------|-------------|
| **Decorative Bar** | All display headings MUST include a 32px × 4px cosmos bar above |
| **Bar Gap** | 8px (`mb-club`) between bar and heading text |
| **Font Weight** | Always 900 (black) - never use lighter weights for headings |
| **Text Color** | Always `text-cosmos` (#121212) on light backgrounds |
| **Text Alignment** | Always `text-left` - never center or right align headings |
| **Transform** | Display headings: `uppercase`, Section headers: `capitalize` |
| **Font Family** | Always Averta (`font-primary`) |
| **Spacing Below** | Use `mb-amphitheatre` (24px) after major headings, `mb-auditorium` (16px) after minor |

### Icon Specifications

| Context | Size | Tailwind Class |
|---------|------|----------------|
| Button icon | 24px | `w-6 h-6` |
| Input icon | 20px | `w-5 h-5` |
| Toast icon | 24px | `w-6 h-6` |
| Navigation icon | 24px | `w-6 h-6` |
| Small icon | 16px | `w-4 h-4` |
| Large icon | 32px | `w-8 h-8` |

---

## Component Patterns

### Button Styling

All buttons share these base styles:

```
Base: rounded-sm px-auditorium gap-club font-primary font-semibold
Standard padding: py-[10px]
Transactional padding: py-[9px]
```

| Variant | Background | Text | Border | Hover |
|---------|------------|------|--------|-------|
| Primary | `bg-neptune` | `text-spotlight` | none | `hover:bg-[#0141B8]` |
| Secondary | `bg-spotlight` | `text-neptune` | `border border-neptune` | `hover:bg-neptune hover:text-spotlight` |
| Tertiary | `bg-spotlight` | `text-cosmos` | `border border-cosmos` | `hover:bg-neptune hover:text-spotlight` |
| Ghost | `bg-transparent` | `text-cosmos` | none | `hover:bg-neptune hover:text-spotlight` |
| Inverse | `bg-cosmos` | `text-spotlight` | none | `hover:bg-[#2A2A2A]` |
| Transactional | `bg-earth` | `text-spotlight` | none | `hover:bg-[#018A57]` |
| Disabled | `bg-ammonite` | `text-slate` | — | — |

### Input Field Styling

```
Container: bg-spotlight border border-ammonite rounded-[2px] p-hall h-[48px]
Focus: border-neptune outline-none ring-2 ring-neptune/20
Error: border-mars
Disabled: bg-lunar border-slate text-slate
Label: text-rainier text-cosmos mb-club
Placeholder: text-granite
```

### Card Styling

```
Container: bg-spotlight rounded-md p-amphitheatre
With shadow: shadow-sm
With border: border border-ammonite
```

---

## Critical Rules

### Colors
- Use `neptune` for primary CTAs only - do not overuse
- Use `earth` exclusively for transactional/purchase buttons
- Use `mars` only for error states - never for decoration
- Do not create color tints or gradients
- Do not introduce new colors

### Typography
- Display titles (mauna, everest, kilimanjaro, vinson, blanc) must be uppercase
- Body text uses Rainier (16px regular) by default
- Section headers use Matterhorn in title case

### Headings (CRITICAL)
- **Decorative Bar**: All display headings MUST include a 32px × 4px cosmos bar above
- **Bar Gap**: 8px (`mb-club`) between bar and heading text
- **Font Weight**: Always 900 (black) - never use lighter weights for headings
- **Text Color**: Always `text-cosmos` (#121212) on light backgrounds
- **Text Alignment**: Always `text-left` - never center or right-align headings
- **Text Transform**: Display headings use `uppercase`, section headers use `capitalize`
- **Spacing**: Use `mb-amphitheatre` (24px) after H1-H3, `mb-auditorium` (16px) after H4-H5

### Spacing
- Always use spacing tokens, not arbitrary values
- Button horizontal padding: `auditorium` (16px)
- Button vertical padding: `10px` (standard) or `9px` (transactional)
- Icon gaps: `club` (8px)
- Card padding: `amphitheatre` (24px)

### Borders
- Button border-radius: `4px` (`rounded-sm`)
- Card border-radius: `8px` (`rounded-md`)
- Pill border-radius: `24px` (`rounded-pill`)
- Default border width: `1px`
- Standard border color: `ammonite` for containers, `neptune` for interactive

### Dimensions (CRITICAL for pixel-perfect rendering)
- **Always include height** on interactive components (buttons, inputs, badges)
- **Always include min-width** on buttons to prevent text-wrapping issues
- **Buttons**: Use `h-[44px]` (or `h-btn`) - never omit height
- **Inputs**: Use `h-[48px]` (or `h-input`) - never omit height
- **Badges**: Use appropriate height token (`h-badge-sm`, `h-badge`, `h-badge-lg`)
- **Icon-only buttons**: Use both `h-[44px]` and `w-[44px]` for square buttons
- **Never use `h-auto`** on components with defined heights in the design system
- Refer to Component Specifications section for exact values per component

### Accessibility
- Maintain AA contrast: 4.5:1 for small text, 3:1 for large text
- All interactive elements must be keyboard navigable
- Focus ring: 2px Neptune outline, 2px offset

---

## CSS Custom Properties

```css
:root {
  /* Colors */
  --color-neptune: #024DDF;
  --color-cosmos: #121212;
  --color-granite: #646464;
  --color-spotlight: #FFFFFF;
  --color-earth: #048851;
  --color-mars: #EB0000;
  --color-jupiter: #FFB932;
  --color-callisto: #A733FF;
  --color-ganymede: #21FFF2;
  --color-titan: #FBFF2C;
  --color-neptune-bright: #3074FE;
  --color-mars-bright: #FF3838;
  --color-slate: #949494;
  --color-moonrock: #BFBFBF;
  --color-ammonite: #D6D6D6;
  --color-diatomite: #EBEBEB;
  --color-lunar: #F6F6F6;

  /* Typography */
  --font-family: 'Averta', sans-serif;
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-black: 900;

  /* Spacing */
  --space-lounge: 4px;
  --space-club: 8px;
  --space-hall: 12px;
  --space-auditorium: 16px;
  --space-theatre: 20px;
  --space-amphitheatre: 24px;
  --space-arena: 32px;
  --space-stadium: 48px;
  --space-dome: 64px;
  --space-field: 88px;

  /* Border Radius */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-pill: 24px;

  /* Component Dimensions */
  --height-btn: 44px;
  --height-btn-sm: 36px;
  --height-btn-lg: 52px;
  --height-input: 48px;
  --height-badge-sm: 20px;
  --height-badge: 24px;
  --height-badge-lg: 28px;
  --height-checkbox: 20px;
  --width-checkbox: 20px;
  --width-btn-icon: 44px;

  /* Component Min/Max Widths */
  --min-width-btn: 100px;
  --min-width-btn-transactional: 120px;
  --min-width-input: 200px;
  --min-width-toast: 300px;
  --max-width-toast: 400px;
  --max-width-content: 1280px;
}
```
