---
component: Stepper
shadcn: true
gdsName: Stepper
variants:
  - default
---
# Stepper

## Import

```tsx
import { Stepper } from "@/components/ui/stepper"
```

## Usage

```tsx
<Stepper variant="default">
  Stepper content
</Stepper>
```

## Variants

- `default`

```tsx
// Examples
<Stepper variant="default">default</Stepper>
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
- primary: #024DDF
- primaryDisabled: #EBEBEB
- secondary: #024DDF
- secondaryDisabled: #BFBFBF
- text: #121212
- textDisabled: #BFBFBF
- background: #F6F6F6
- iconPrimary: #FFFFFF
- iconSecondary: #024DDF
- iconDisabled: #949494

**Spacing:**
- buttonPadding: 4px
- iconPadding: 14px

