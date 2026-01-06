---
component: InputField
shadcn: true
gdsName: Input Field
variants:
  - default
---
# InputField

## Import

```tsx
import { InputField } from "@/components/ui/input-field"
```

## Usage

```tsx
<InputField variant="default">
  InputField content
</InputField>
```

## Variants

- `default`

```tsx
// Examples
<InputField variant="default">default</InputField>
```


## Tailwind Classes

```tsx
// Base styles
className="w-full px-4 py-3 text-base border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024DDF] focus:border-transparent placeholder:text-[#949494]"

// Variant styles
const variants = {
  default: "w-full px-4 py-3 text-base border border-[#D6D6D6] rounded-lg"
}
```

## GDS Token Mapping

**Colors:**
- label: undefined
- input: undefined
- background: undefined
- border: undefined
- validation: undefined

**Spacing:**
- paddingLeft: Auditorium 16px
- paddingRight: 12px
- paddingY: 10px
- labelGap: 4px
- iconGap: 10px

