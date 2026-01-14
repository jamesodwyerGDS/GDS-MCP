// eslint-disable-next-line filenames/match-exported
import { dark } from "../colors/modifiers";
import type { Buttons, Theme } from "./types";

const palette = {
  white: "#fff",
  black: "#000",

  // Neutral Colors
  lnBlack: "#191919",
  onyx: "#262626",
  onyx70: "#646464",
  slate: "#919191",
  moonrock: "#bfbfbf",
  ammonite: "#d6d6d6",
  diatomite: "#ebebeb",
  quartz: "#f6f6f6",

  // Primary Colors
  rainier: "#e21836",

  // Accent colors
  teal: "#20837f",
  turquoise: "#2cb3ad",
  ganymede: "#21fff2",

  // Secondary Colors
  azure: "#026cdf",
  ruby: "#d93a3a",
  amber: "#f2bd2a",
  emerald: "#078a09",

  // Inventory colors
  resale: "#d0006f",
  package: "#f36c0e",
  vip: "#f2bd2a",
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
    color: palette.white,
    backgroundColor: palette.teal,
  },
  secondary: {
    color: palette.white,
    backgroundColor: palette.teal,
  },
  tertiary: {
    color: palette.white,
    backgroundColor: palette.black,
  },
  inverse: {
    color: palette.white,
    backgroundColor: palette.white,
  },
  disabled: {
    color: palette.slate,
    backgroundColor: palette.quartz,
  },
  transaction: {
    color: palette.white,
    backgroundColor: palette.rainier,
  },
  // TODO: Finalize these once we start using pill buttons in LN branded pages
  pill: {
    color: palette.black,
    backgroundColor: palette.ganymede,
  },
};

const _header = {
  color: palette.white,
  backgroundColor: palette.rainier,
};

const _links = {
  primary: { color: palette.teal },
  inverse: { color: palette.white },
};

const _footer = {
  color: palette.white,
  backgroundColor: palette.lnBlack,
};

const l1 = {
  width: 782,
  height: 168,
  pathData:
    "<path d='M6.34 7.04h769v153h-769z' style='fill:#fefefe'/><path d='M55.05 45.84h24.78v52.95h34.84v21.18H55.05V45.84ZM120.28 45.84h24.78v74.13h-24.78V45.84ZM148.34 45.84h27.74l14.4 41.62 14.4-41.62h27.32l-30.07 74.66h-23.72l-30.07-74.66ZM233.16 45.84h63.22v20.33h-38.86v7.52h36.22v17.9h-36.22v8.05h39.39v20.33h-63.75V45.84Z' style='fill:#e21836'/><path style='fill:#000' d='M326.25 45.84h23.19l26.37 32.72V45.84h24.57v74.13h-22.03l-27.53-34.2v34.2h-24.57V45.84Z'/><path style='fill:#000' d='M430.45 45.31h24.57l31.24 74.66h-26.9l-3.92-9.95H429.5l-3.81 9.95h-26.47l31.24-74.66Zm18.85 47.12-6.78-18-6.78 18h13.55ZM490.28 66.81h-21.81V45.84h68.41v20.97h-21.81v53.16h-24.78V66.81ZM540.58 45.84h24.78v74.13h-24.78V45.84ZM570.23 83.11v-.21c0-21.5 17.68-38.65 40.56-38.65s40.35 16.94 40.35 38.44v.21c0 21.5-17.69 38.65-40.56 38.65s-40.35-16.94-40.35-38.44Zm55.91 0v-.21c0-8.79-6.04-16.73-15.57-16.73s-15.35 7.84-15.35 16.52v.21c0 8.79 6.04 16.73 15.57 16.73s15.35-7.84 15.35-16.52ZM653.67 45.84h23.19l26.37 32.72V45.84h24.57v74.13h-22.03l-27.53-34.2v34.2h-24.57V45.84Z'/><path style='fill:#e21836' d='M781.5 166.4H0V0h781.5v166.4ZM16.43 149.97h748.64V16.43H16.43v133.54Z'/>",
};
const l2 = {
  viewBox: `0 0 ${l1.width} ${l1.height}`,
};
const logoSvg = { ...l1, ...l2 };

const base = {
  primary: palette.rainier,
  primaryAlt: dark(palette.rainier),
  secondary: palette.teal,
  border: palette.moonrock,
  borderLight: palette.diatomite,
  borderMidtone: palette.ammonite,
  borderDark: palette.slate,
  bg: palette.white,
  bgAlt: palette.quartz,
  bgInverse: palette.onyx,
  overlay: "rgba(0, 0, 0, 0.75)",
  overlayText: "rgba(0, 0, 0, 0.50)",
  footerBg: palette.lnBlack,
  headerContextBg: palette.lnBlack,
};

const text = {
  primary: palette.onyx,
  secondary: palette.onyx70,
  accent1: palette.rainier,
  accent2: palette.rainier,
  inverse: palette.white,
  link: palette.teal,
  linkHover: dark(palette.teal),
};

const status = {
  success: palette.emerald,
  warning: palette.amber,
  danger: palette.ruby,
  info: palette.teal,
  default: palette.onyx70,
};

const btn = {
  primary: palette.teal,
  checkout: palette.emerald,
  inverse: palette.white,
  link: palette.teal,
  vip: palette.vip,
  collector: palette.onyx,
  text: palette.white,
  iconPrimary: palette.teal,
  iconSecondary: palette.onyx70,
};

const icons = {
  primary: palette.rainier,
  secondary: palette.onyx70,
  resale: palette.resale,
  selected: palette.white,
  vip: palette.vip,
  collector: palette.onyx,
};

const ism = {
  unavailable: {
    section: palette.slate,
    seat: palette.moonrock,
  },
  available: palette.turquoise,
  selected: palette.emerald,
};

const badge = {
  active: palette.emerald,
  inactive: palette.onyx,
  package: palette.package,
};

const colors = {
  resale: palette.resale,
  highlight: palette.teal,
  base: base,
  text: text,
  status: status,
  icons: icons,
  ism: ism,
  badge: badge,
};

const theme: Theme = {
  space,
  fontSizes,
  _buttons,
  _header,
  _links,
  _footer,
  logoSvg,
  base,
  text,
  status,
  btn,
  icons,
  ism,
  badge,
  colors,
};

export default theme;
