---
component: Toast
shadcn: true
gdsName: Toast
variants:
  - default
---
# Toast

## Import

```tsx
import { Toast } from "@/components/ui/toast"
```

## Usage

```tsx
<Toast variant="default">
  Toast content
</Toast>
```

## Variants

- `default`

```tsx
// Examples
<Toast variant="default">default</Toast>
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
- background: Cosmos #121212
- text: Spotlight #FFFFFF
- icon: undefined

**Spacing:**
- containerPadding: Auditorium 16px
- iconTextGap: Theatre 12px
- textCloseGap: Theatre 12px

