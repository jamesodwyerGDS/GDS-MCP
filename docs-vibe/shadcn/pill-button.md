---
component: PillButton
shadcn: true
gdsName: Pill Button
variants:
  - primary
  - secondary
  - tertiary
  - ghost
---
# PillButton

## Import

```tsx
import { PillButton } from "@/components/ui/pill-button"
```

## Usage

```tsx
<PillButton variant="primary">
  PillButton content
</PillButton>
```

## Variants

- `primary`
- `secondary`
- `tertiary`
- `ghost`

```tsx
// Examples
<PillButton variant="primary">primary</PillButton>
<PillButton variant="secondary">secondary</PillButton>
<PillButton variant="tertiary">tertiary</PillButton>
<PillButton variant="ghost">ghost</PillButton>
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
- light: undefined
- inverse: undefined
- text: undefined

**Spacing:**
- paddingHorizontal: Auditorium 16px
- paddingVertical: 10px
- iconGap: Club 8px

