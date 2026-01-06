---
component: Button
shadcn: true
gdsName: Button
variants:
  - primary
  - secondary
  - tertiary
  - ghost
---
# Button

## Import

```tsx
import { Button } from "@/components/ui/button"
```

## Usage

```tsx
<Button variant="primary">
  Button content
</Button>
```

## Variants

- `primary`
- `secondary`
- `tertiary`
- `ghost`

```tsx
// Examples
<Button variant="primary">primary</Button>
<Button variant="secondary">secondary</Button>
<Button variant="tertiary">tertiary</Button>
<Button variant="ghost">ghost</Button>
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
- transactional: undefined
- disabled: undefined
- content: undefined

**Spacing:**
- paddingHorizontal: Auditorium 16px
- paddingVertical: 10px
- paddingVerticalTransactional: 9px
- iconGap: Club 8px

