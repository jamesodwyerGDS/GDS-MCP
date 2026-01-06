---
component: Badge
shadcn: true
gdsName: Badge
variants:
  - default
---
# Badge

## Import

```tsx
import { Badge } from "@/components/ui/badge"
```

## Usage

```tsx
<Badge variant="default">
  Badge content
</Badge>
```

## Variants

- `default`

```tsx
// Examples
<Badge variant="default">default</Badge>
```


## Tailwind Classes

```tsx
// Base styles
className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-[#024DDF] text-white"

// Variant styles
const variants = {
  default: "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-[#024DDF] text-white"
}
```

## GDS Token Mapping

**Colors:**
- badge: undefined
- text: undefined
- border: Ammonite #D6D6D6

**Spacing:**
- paddingVertical: Lounge 4px
- paddingHorizontal: Club 8px
- iconGap: Lounge 4px

