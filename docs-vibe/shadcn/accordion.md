---
component: Accordion
shadcn: true
gdsName: Accordion
variants:
  - default
---
# Accordion

## Import

```tsx
import { Accordion } from "@/components/ui/accordion"
```

## Usage

```tsx
<Accordion variant="default">
  Accordion content
</Accordion>
```

## Variants

- `default`

```tsx
// Examples
<Accordion variant="default">default</Accordion>
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
- background: undefined
- focus: Neptune #024DDF
- text: undefined
- icon: Cosmos #121212

**Spacing:**
- headerPaddingVertical: Auditorium 16px
- headerPaddingHorizontal: Amphitheatre 24px
- bodyPadding: Auditorium 16px
- iconGap: Club 8px

