---
component: PaginationButton
shadcn: true
gdsName: Pagination Button
variants:
  - primary
  - secondary
  - tertiary
  - ghost
---
# PaginationButton

## Import

```tsx
import { PaginationButton } from "@/components/ui/pagination-button"
```

## Usage

```tsx
<PaginationButton variant="primary">
  PaginationButton content
</PaginationButton>
```

## Variants

- `primary`
- `secondary`
- `tertiary`
- `ghost`

```tsx
// Examples
<PaginationButton variant="primary">primary</PaginationButton>
<PaginationButton variant="secondary">secondary</PaginationButton>
<PaginationButton variant="tertiary">tertiary</PaginationButton>
<PaginationButton variant="ghost">ghost</PaginationButton>
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
- background: undefined
- progress: undefined
- text: undefined
- button: undefined

**Spacing:**
- containerPaddingX: 24px
- containerPaddingY: 12px
- gap: 12px
- buttonPaddingX: 16px
- buttonPaddingY: 10px
- progressBarHeight: 4px

