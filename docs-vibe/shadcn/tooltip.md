---
component: Tooltip
shadcn: true
gdsName: Tooltip
variants:
  - default
---
# Tooltip

## Import

```tsx
import { Tooltip } from "@/components/ui/tooltip"
```

## Usage

```tsx
<Tooltip variant="default">
  Tooltip content
</Tooltip>
```

## Variants

- `default`

```tsx
// Examples
<Tooltip variant="default">default</Tooltip>
```


## Tailwind Classes

```tsx
// Base styles
className="p-4 rounded-lg"

// Variant styles
const variants = {
  default: "p-4 rounded-lg"
}
```

## GDS Token Mapping

**Colors:**
- background: Spotlight #FFFFFF
- text: Granite #646464
- border: Slate #949494

**Spacing:**
- paddingX: Auditorium 16px
- paddingY: Theatre 12px

