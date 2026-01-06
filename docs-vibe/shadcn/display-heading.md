---
component: DisplayHeading
shadcn: true
gdsName: Display Heading
variants:
  - default
---
# DisplayHeading

## Import

```tsx
import { DisplayHeading } from "@/components/ui/display-heading"
```

## Usage

```tsx
<DisplayHeading variant="default">
  DisplayHeading content
</DisplayHeading>
```

## Variants

- `default`

```tsx
// Examples
<DisplayHeading variant="default">default</DisplayHeading>
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
- text-inverse: #FFFFFF
- text-default: #121212
- stage: #024DDF

**Spacing:**
- underline-offset: 20%

