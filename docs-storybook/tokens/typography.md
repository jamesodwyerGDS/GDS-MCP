---
name: typography
type: tokens
---

# Typography Tokens

```typescript
import { addPx } from "./utils";
import { css } from "styled-components";

export const _fontSize_ = {
  /** @deprecated fontSize has been deprecated. Maybe **snowdon** textStyle instead */
  centi: 12,
  /** @deprecated fontSize has been deprecated. Maybe **etna** textStyle instead */
  uno: 14,
  /** @deprecated fontSize has been deprecated. Maybe **rainer** textStyle instead */
  hecto: 16,
  /** @deprecated fontSize has been deprecated. Maybe **blanc or fiji** textStyle instead */
  kilo: 18,
  /** @deprecated fontSize has been deprecated. Maybe **vinson or blancDesktop** textStyle instead */
  mega: 20,
  /** @deprecated fontSize has been deprecated. Maybe **kilimanjaro or matterhorn or vinsonDesktop** textStyle instead */
  giga: 23,
  /** @deprecated fontSize has been deprecated. Maybe **kilimanjaro or matterhorn or vinsonDesktop** textStyle instead */
  tera: 26,
  /** @deprecated fontSize has been deprecated. Maybe **everest or kilimanjaroDesktop** textStyle instead */
  peta: 32,
  /** @deprecated fontSize has been deprecated. Maybe **everestDesktop** textStyle instead */
  exa: 54,
} as const;

// I haven't found a way to get the deprecation warnings to work properly alongside
// the addPx function, hence the following are set up in a static object
export const fontSize = {
  /** @deprecated fontSize has been deprecated. Maybe **snowdon** textStyle instead */
  centi: "12px",
  /** @deprecated fontSize has been deprecated. Maybe **etna** textStyle instead */
  uno: "14px",
  /** @deprecated fontSize has been deprecated. Maybe **rainer** textStyle instead */
  hecto: "16px",
  /** @deprecated fontSize has been deprecated. Maybe **blanc or fiji** textStyle instead */
  kilo: "18px",
  /** @deprecated fontSize has been deprecated. Maybe **vinson or blancDesktop** textStyle instead */
  mega: "20px",
  /** @deprecated fontSize has been deprecated. Maybe **kilimanjaro or matterhorn or vinsonDesktop** textStyle instead */
  giga: "23px",
  /** @deprecated fontS
// ... truncated
```
