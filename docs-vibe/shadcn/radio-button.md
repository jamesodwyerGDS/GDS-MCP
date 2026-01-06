---
component: RadioButton
shadcn: true
gdsName: Radio Button
variants:
  - primary
  - secondary
  - tertiary
  - ghost
---
# RadioButton

## Import

```tsx
import { RadioButton } from "@/components/ui/radio-button"
```

## Usage

```tsx
<RadioButton variant="primary">
  RadioButton content
</RadioButton>
```

## Variants

- `primary`
- `secondary`
- `tertiary`
- `ghost`

```tsx
// Examples
<RadioButton variant="primary">primary</RadioButton>
<RadioButton variant="secondary">secondary</RadioButton>
<RadioButton variant="tertiary">tertiary</RadioButton>
<RadioButton variant="ghost">ghost</RadioButton>
```


## Tailwind Classes

```tsx
// Base styles
className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#024DDF] text-white font-semibold rounded-lg hover:bg-[#0141B8] focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:ring-offset-2 transition-colors"

// Variant styles
const variants = {
  primary: "inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#024DDF] text-white font-semibold rounded-lg hover:bg-[#0141B8]",
  secondary: "inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded-lg border-2 border-[#024DDF] hover:bg-[#024DDF] hover:text-white",
  tertiary: "inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#024DDF] font-semibold rounded-lg hover:bg-[#024DDF]/10",
  ghost: "inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[#646464] font-semibold rounded-lg hover:bg-[#D6D6D6]/20"
}
```

## GDS Token Mapping

**Colors:**
- default-border: #949494
- default-bg: #FFFFFF
- hover-border: #024DDF
- active-fill: #121212
- active-hover-base: #024DDF
- active-hover-overlay: #121212
- disabled-bg: #EBEBEB
- disabled-border: #BFBFBF
- disabled-text: #646464
- error-border: #EB0000
- label-text: #121212
- inner-dot: #FFFFFF

**Spacing:**
- radioSize: 24px
- innerDotActive: 12px
- innerDotDefault: 6px
- gap: 12px

