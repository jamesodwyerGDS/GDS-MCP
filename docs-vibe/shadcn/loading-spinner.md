---
component: LoadingSpinner
shadcn: true
gdsName: Loading Spinner
variants:
  - default
---
# LoadingSpinner

## Import

```tsx
import { LoadingSpinner } from "@/components/ui/loading-spinner"
```

## Usage

```tsx
<LoadingSpinner variant="default">
  LoadingSpinner content
</LoadingSpinner>
```

## Variants

- `default`

```tsx
// Examples
<LoadingSpinner variant="default">default</LoadingSpinner>
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
- secondary: #646464
- inverse: #FFFFFF
- labelPrimary: #121212
- labelInverse: #FFFFFF

**Spacing:**
- gap: 16px

