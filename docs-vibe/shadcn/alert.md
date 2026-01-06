---
component: Alert
shadcn: true
gdsName: Alert
variants:
  - default
---
# Alert

## Import

```tsx
import { Alert } from "@/components/ui/alert"
```

## Usage

```tsx
<Alert variant="default">
  Alert content
</Alert>
```

## Variants

- `default`

```tsx
// Examples
<Alert variant="default">default</Alert>
```


## Tailwind Classes

```tsx
// Base styles
className="flex items-center gap-3 p-4 rounded-lg bg-[#024DDF]/10 text-[#024DDF]"

// Variant styles
const variants = {
  default: "flex items-center gap-3 p-4 rounded-lg"
}
```

## GDS Token Mapping

**Colors:**
- background: Spotlight #FFFFFF
- text: undefined
- status: undefined
- button: undefined

**Spacing:**
- containerPadding: Auditorium 16px
- iconTextGap: Auditorium 16px
- titleBodyGap: Club 8px
- buttonGap: Auditorium 16px
- mobileButtonGap: Lounge 4px

