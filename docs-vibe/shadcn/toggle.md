---
component: Toggle
shadcn: true
gdsName: Toggle
variants:
  - default
---
# Toggle

## Import

```tsx
import { Toggle } from "@/components/ui/toggle"
```

## Usage

```tsx
<Toggle variant="default">
  Toggle content
</Toggle>
```

## Variants

- `default`

```tsx
// Examples
<Toggle variant="default">default</Toggle>
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
- onDefault: undefined
- offDefault: undefined
- hover: undefined
- disabled: undefined
- knob: undefined

**Spacing:**
- width: 40px
- height: 24px
- knobSize: 16px
- knobOffset: 10%

