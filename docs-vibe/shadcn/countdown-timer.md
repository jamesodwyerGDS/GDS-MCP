---
component: Countdowntimer
shadcn: true
gdsName: CountdownTimer
variants:
  - default
---
# Countdowntimer

## Import

```tsx
import { Countdowntimer } from "@/components/ui/countdown-timer"
```

## Usage

```tsx
<Countdowntimer variant="default">
  Countdowntimer content
</Countdowntimer>
```

## Variants

- `default`

```tsx
// Examples
<Countdowntimer variant="default">default</Countdowntimer>
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
- tickInactive: rgba(255, 255, 255, 0.8)
- tickActive: Neptune #026CDF
- progressFill: Neptune #026CDF
- text: Spotlight #FFFFFF
- label: rgba(255, 255, 255, 0.7)

**Spacing:**
- gap: Club 8px
- gapSmall: 8px
- gapMini: 4px

