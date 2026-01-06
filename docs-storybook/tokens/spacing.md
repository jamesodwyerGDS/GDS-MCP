---
name: spacing
type: tokens
---

# Spacing Tokens

```typescript
import { addPx } from "./utils";

export const _spacingDeprecated_ = {
  /** @deprecated Use **lounge** instead */
  compact: 4,
  /** @deprecated Use **club** instead */
  moderate: 8,
  /** @deprecated Use **hall** instead */
  medium: 12,
  /** @deprecated Use **auditorium** instead */
  normal: 16,
  /** @deprecated Use **amphitheatre** instead */
  expanded: 24,
  /** @deprecated Use **arena** instead */
  spacious: 32,
  /** @deprecated No direct replacement */
  giant: 40,
} as const;

// I haven't found a way to get the deprecation warnings to work properly alongside
// the addPx function, hence the following are set up in a static object
const spacingDeprecated = {
  /** @deprecated Use **lounge** instead */
  compact: "4px",
  /** @deprecated Use **club** instead */
  moderate: "8px",
  /** @deprecated Use **hall** instead */
  medium: "12px",
  /** @deprecated Use **auditorium** instead */
  normal: "16px",
  /** @deprecated Use **amphitheatre** instead */
  expanded: "24px",
  /** @deprecated Use **arena** instead */
  spacious: "32px",
  /** @deprecated No direct replacement */
  giant: "40px",
} as const;

export const _spacing_ = {
  lounge: 4,
  club: 8,
  hall: 12,
  auditorium: 16,
  theatre: 20,
  amphitheatre: 24,
  arena: 32,
  stadium: 48,
  dome: 64,
  field: 88,
  ..._spacingDeprecated_,
} as const;

export const spacing = {
  ...addPx(_spacing_),
  ...spacingDeprecated,
} as const;

export const _grid_ = {
  gutter: {
    small: _spacing_.club,
    large: _spacing_.club,
    xLarge: _spacing_.auditorium,
    xxLarge: _spacing_.auditorium,
  },
  margin: {
    small: _spacing_.auditorium,
    large: _spacing_.auditorium,
    xLarge: _spacing_.giant,
    xxLarge: _spacing_.giant,
  },
} as const;
export const grid = addPx(_grid_);

```
