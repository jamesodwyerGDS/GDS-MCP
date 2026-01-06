---
component: Circlebutton
shadcn: true
gdsName: CircleButton
variants:
  - primary
  - secondary
  - tertiary
  - ghost
---
# Circlebutton

## Import

```tsx
import { Circlebutton } from "@/components/ui/circle-button"
```

## Usage

```tsx
<Circlebutton variant="primary">
  Circlebutton content
</Circlebutton>
```

## Variants

- `primary`
- `secondary`
- `tertiary`
- `ghost`

```tsx
// Examples
<Circlebutton variant="primary">primary</Circlebutton>
<Circlebutton variant="secondary">secondary</Circlebutton>
<Circlebutton variant="tertiary">tertiary</Circlebutton>
<Circlebutton variant="ghost">ghost</Circlebutton>
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
- primary: undefined
- secondary: undefined
- tertiary: undefined
- ghost: undefined
- inverse: undefined
- disabled: undefined

**Spacing:**
- size: 44px
- iconSize: 24px

