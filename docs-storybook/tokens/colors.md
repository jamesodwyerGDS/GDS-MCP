---
name: colors
type: tokens
---

# Colors Tokens

```typescript
// eslint-disable-next-line filenames/match-exported
import { dark } from "../colors/modifiers";
import type { Buttons, Theme } from "./types";

const palette = {
  // Primary
  neptune: "#024ddf",
  neutron: "#2A55D9",
  spotlight: "#ffffff",
  cosmos: "#121212",

  // Secondary
  callisto: "#a733ff",
  jupiter: "#ffb932",
  ganymede: "#21fff2",
  titan: "#fbff2c",
  earth: "#048851",
  mars: "#eb0000",

  // Grey
  granite: "#646464",
  slate: "#949494",
  moonrock: "#bfbfbf",
  ammonite: "#d6d6d6",
  diatomite: "#ebebeb",
  lunar: "#f6f6f6",

  // Inventory
  resale: "#d0006f",
  package: "#f36c0e",
};

const gradients = {
  mrBlueSky: {
    colorStops: ["#4675e8", palette.neptune],
    toDirection: "90deg",
    fallback: palette.neptune,
  },
  justLikeAPill: {
    colorStops: ["#922f90", palette.resale],
    toDirection: "90deg",
    fallback: palette.resale,
  },
  ticketFoil: {
    colorStops: [palette.neptune, "#7f6bf4"],
    toDirection: "35deg",
    fallback: palette.neptune,
  },
};

const s1 = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32,
  8: 48,
  9: 64,
  10: 88,
  11: 40,
};
const s2 = {
  lounge: s1[1],
  club: s1[2],
  hall: s1[3],
  auditorium: s1[4],
  theatre: s1[5],
  amphitheatre: s1[6],
  arena: s1[7],
  stadium: s1[8],
  dome: s1[9],
  field: s1[10],

  // TODO: Remove for next major version (see GDS-108)
  // deprecated
  compact: s1[1],
  moderate: s1[2],
  medium: s1[3],
  normal: s1[4],
  expanded: s1[6],
  spacious: s1[7],
  giant: s1[11],
};
const space = { ...s1, ...s2 };

const f1 = {
  0: 12,
  1: 14,
  2: 16,
  3: 18,
  4: 20,
  5: 23,
  6: 26,
  7: 32,
  8: 54,
};
const f2 = {
  centi: f1[0],
  uno: f1[1],
  hecto: f1[2],
  kilo: f1[3],
  mega: f1[4],
  giga: f1[5],
  tera: f1[6],
  peta: f1[7],
  exa: f1[8],
};
const fontSizes = { ...f1, ...f2 };

const _buttons: Buttons = {
  primary: {
    color: palette.spotlight,
    backgroundColor: palette.neptune,
  },
  secondary: {
    color: palette.spotlight,
 
// ... truncated
```
