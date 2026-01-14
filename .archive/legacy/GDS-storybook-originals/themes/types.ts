type Gradient = {
  colorStops: string[];
  toDirection: string;
  fallback: string;
};

export type Base = {
  primary: string;
  primaryAlt: string;
  secondary: string;
  border: string;
  borderLight: string;
  borderMidtone: string;
  borderDark: string;
  bg: string;
  bgAlt: string;
  bgInverse: string;
  overlay: string;
  overlayText: string;
  footerBg: string;
  headerContextBg: string;
};

export type TText = {
  primary: string;
  secondary: string;
  accent1: string;
  accent2: string;
  inverse: string;
  link: string;
  linkHover: string;
};

export type Status = {
  success: string;
  warning: string;
  danger: string;
  info: string;
  default: string;
};
type Icons = {
  primary: string;
  secondary: string;
  resale: string;
  selected: string;
  vip: string;
  collector: string;
};

type IsmUnavailable = {
  section: string;
  seat: string;
};

type Ism = {
  unavailable?: IsmUnavailable;
  available: string;
  selected: string;
};
export type BBadge = {
  active: string;
  inactive: string;
  package: string;
};

type ButtonColors = {
  color: string;
  backgroundColor: string;
};

export type Buttons = {
  primary: ButtonColors;
  secondary: ButtonColors;
  tertiary: ButtonColors;
  transaction: ButtonColors;
  inverse: ButtonColors;
  disabled: ButtonColors;
  pill: ButtonColors;
};

export type Theme = {
  gradients?: {
    mrBlueSky: Gradient;
    justLikeAPill: Gradient;
    ticketFoil: Gradient;
  };

  space: {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    /** @deprecated Use **lounge** instead */
    compact: number;
    /** @deprecated Use **club** instead */
    moderate: number;
    /** @deprecated Use **hall** instead */
    medium: number;
    /** @deprecated Use **auditorium** instead */
    normal: number;
    /** @deprecated Use **amphitheatre** instead */
    expanded: number;
    /** @deprecated Use **arena** instead */
    spacious: number;
    /** @deprecated No direct replacement */
    giant: number;
    lounge: number;
    club: number;
    hall: number;
    auditorium: number;
    theatre: number;
    amphitheatre: number;
    arena: number;
    stadium: number;
    dome: number;
    field: number;
  };

  fontSizes: {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    centi: number;
    uno: number;
    hecto: number;
    kilo: number;
    mega: number;
    giga: number;
    tera: number;
    peta: number;
    exa: number;
  };

  _buttons: Buttons;

  btn: {
    primary: string;
    checkout: string;
    inverse: string;
    link: string;
    vip: string;
    collector: string;
    text: string;
    iconPrimary: string;
    iconSecondary: string;
  };

  _header: {
    color: string;
    backgroundColor: string;
  };

  _links: {
    primary: { color: string };
    inverse: { color: string };
  };

  _footer: {
    color: string;
    backgroundColor: string;
  };

  logoSvg: {
    width: number;
    height: number;
    pathData: string;
    viewBox: string;
  };

  base: Base;
  text: TText;
  status: Status;
  icons: Icons;
  ism: Ism;
  badge: BBadge;

  colors: {
    resale: string;
    highlight: string;
    base: Base;
    text: TText;
    status: Status;
    icons: Icons;
    ism: Ism;
    badge: BBadge;
  };
};
