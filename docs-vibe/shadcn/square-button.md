---
component: Squarebutton
shadcn: true
gdsName: SquareButton
variants:
  - primary
  - secondary
  - tertiary
  - ghost
---
# Squarebutton

## Import

```tsx
import { Squarebutton } from "@/components/ui/square-button"
```

## Usage

```tsx
<Squarebutton variant="primary">
  Squarebutton content
</Squarebutton>
```

## Variants

- `primary`
- `secondary`
- `tertiary`
- `ghost`

```tsx
// Examples
<Squarebutton variant="primary">primary</Squarebutton>
<Squarebutton variant="secondary">secondary</Squarebutton>
<Squarebutton variant="tertiary">tertiary</Squarebutton>
<Squarebutton variant="ghost">ghost</Squarebutton>
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
- 0: #024DDF
- 1: #0141B8
- 2: #033399
- 3: #FFFFFF
- 4: #024DDF
- 5: #121212
- 6: #EBEBEB
- 7: #949494

**Spacing:**
- 0: 44px
- 1: 24px
- 2: 0px

