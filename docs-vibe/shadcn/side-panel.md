---
component: SidePanel
shadcn: true
gdsName: Side Panel
variants:
  - default
---
# SidePanel

## Import

```tsx
import { SidePanel } from "@/components/ui/side-panel"
```

## Usage

```tsx
<SidePanel variant="default">
  SidePanel content
</SidePanel>
```

## Variants

- `default`

```tsx
// Examples
<SidePanel variant="default">default</SidePanel>
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
- background: #FFFFFF
- overlay: #121212
- border: #D6D6D6
- text: undefined
- button: undefined

**Spacing:**
- panelWidth: undefined
- padding: 20px

