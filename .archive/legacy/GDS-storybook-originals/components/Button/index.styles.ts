import styled, { css, DefaultTheme } from "styled-components";
import { Buttons } from "../../themes/types";
import { dark } from "../../colors";
import { buttonreset } from "../../utils/snippets";
import { lineHeight, minTapSize, spacing } from "../../dimensions";
import { darker, muted, light, weakest } from "../../colors/modifiers";

export type ColorVariant = keyof Buttons;
export type FillVariant = "fill" | "outline" | "ghost";

type Props = {
  $fullWidth?: boolean;
  $colorVariant: ColorVariant;
  $fillVariant?: FillVariant;
  $showLoadingState?: boolean;
};

type PropsAndTheme = Props & {
  theme: DefaultTheme;
};

const variantStyles = ({
  $fillVariant,
  $colorVariant,
  theme,
}: PropsAndTheme) => {
  const fg = theme._buttons[$colorVariant].color;
  const bg = theme._buttons[$colorVariant].backgroundColor;

  // inverse colorVariant overrides any fillVariant
  if ($colorVariant === "inverse") {
    return css`
      border-color: ${bg};
      color: ${bg};
      background-color: transparent;
    `;
  }

  switch ($fillVariant) {
    case "outline":
      return css`
        border-color: ${$colorVariant === "tertiary" ? muted(bg) : bg};
        color: ${bg};
        background-color: transparent;
      `;

    case "ghost":
      return css`
        border-color: transparent;
        color: ${bg};
        background-color: transparent;

        /**
        Force extra horizontal padding for high-contrast mode because the 
        transparent borders become visible and we don't want them touching the 
        text
        */
        @media (-ms-high-contrast: active), (forced-colors: active) {
          padding-inline-end: ${spacing.amphitheatre};
          padding-inline-start: ${spacing.amphitheatre};
        }
      `;

    case "fill":
    default:
      return css`
        border-color: transparent;
        color: ${fg};
        background-color: ${bg};
      `;
  }
};

const hoverStyles = ({ $fillVariant, $colorVariant, theme }: PropsAndTheme) => {
  const fg = theme._buttons[$colorVariant].color;
  const bg = theme._buttons[$colorVariant].backgroundColor;
  const darkBg = dark(bg);

  // inverse colorVariant overrides any fillVariant
  if ($colorVariant === "inverse") {
    return css`
      color: ${fg};
      background-color: ${bg};
    `;
  }

  switch ($fillVariant) {
    case "outline":
      return css`
        border-color: ${darkBg};
        color: ${fg};
        background-color: ${darkBg};
      `;

    case "ghost":
      return css`
        color: ${darkBg};
        background-color: ${weakest(light(bg))};
      `;

    case "fill":
    default:
      return css`
        border-color: ${darkBg};
        color: ${fg};
        background-color: ${darkBg};
      `;
  }
};

const fontSize = css<Props>`
  font-size: ${(props) => {
    // Designs have different font sizes for the "Transactional" buttons
    // This is for accessibility reasons as white text on green background is slightly
    // harder to read, so we make the text a bit bigger to mitigate that.
    return props.$colorVariant === "transaction"
      ? props.theme.fontSizes[3]
      : props.theme.fontSizes[2];
  }}px;
`;

const buttonActiveStyles = ({
  $colorVariant,
  $fillVariant,
  theme,
}: PropsAndTheme) => {
  const fg = theme._buttons[$colorVariant].color;
  const bg = theme._buttons[$colorVariant].backgroundColor;

  const getColor = () => {
    if ($colorVariant === "inverse") {
      return bg;
    }

    if ($fillVariant === "ghost") {
      return fg;
    }

    return;
  };

  const activeColor =
    $colorVariant === "transaction"
      ? theme._buttons["transaction"].backgroundColor
      : theme._buttons["primary"].backgroundColor;

  return css`
    border-color: ${darker(activeColor)};
    color: ${getColor()};
    background-color: ${darker(activeColor)};
  `;
};

const buttonDisabledStyles = (props: PropsAndTheme) => {
  const { $colorVariant, $fillVariant } = props;

  const getDisabledGhostStyles = () => {
    return css`
      border-color: transparent;
      color: ${props.theme._buttons.disabled.color};
      background-color: transparent;
      cursor: not-allowed;
    `;
  };

  const getDisabledOutlineStyles = () => {
    return css`
      border-color: ${props.theme._buttons.disabled.color};
      color: ${props.theme._buttons.disabled.color};
      background-color: transparent;
      cursor: not-allowed;
    `;
  };

  if ($fillVariant === "ghost") {
    return getDisabledGhostStyles();
  }

  if ($fillVariant === "outline") {
    return getDisabledOutlineStyles();
  }

  switch ($colorVariant) {
    case "inverse":
      return css`
        opacity: 0.6;
      `;

    default:
      return css`
        border-color: ${props.theme._buttons.disabled.backgroundColor};
        color: ${props.theme._buttons.disabled.color};
        background-color: ${props.theme._buttons.disabled.backgroundColor};
        cursor: not-allowed;
      `;
  }
};

const baseButtonStyles = css<Props>`
  ${buttonreset};
  ${variantStyles};
  position: relative;
  display: inline-block;
  width: ${(props) => (props.$fullWidth === true ? "100%" : "auto")};
  min-height: ${minTapSize};
  padding: ${spacing.club} ${spacing.auditorium};
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  font-weight: 600;
  ${fontSize}
  line-height: ${lineHeight.default};
  white-space: nowrap;
  text-align: center;
  text-wrap: auto;
  @supports (text-wrap: pretty) {
    text-wrap: pretty;
  }
  transition: background-color 0.2s;

  &:disabled {
    ${buttonDisabledStyles}
  }

  &:not(:disabled) {
    cursor: ${(props) => (props.$showLoadingState ? "wait" : "pointer")};
  }

  &:focus {
    outline-offset: 4px;
  }

  &:not(:disabled):hover {
    ${(props) => !props.$showLoadingState && hoverStyles}
  }

  &:not(:disabled):active {
    ${(props) => !props.$showLoadingState && buttonActiveStyles}
  }
`;

const linkStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: none;
  }

  &[aria-disabled="true"] {
    ${buttonDisabledStyles};

    &:focus,
    &:hover {
      ${buttonDisabledStyles}
    }
  }
`;

export const StyledButton = styled.button<Props>`
  ${baseButtonStyles};

  /* Apply link styles if there is no button type applied */
  ${(props) => !props.type && linkStyles};
`;

export const FlexWrapper = styled.span<{ $isLoading?: boolean }>`
  display: flex;
  gap: ${spacing.club};
  align-items: center;
  justify-content: center;

  /* While loading, we want to hide the content without affecting the width of the button */
  visibility: ${(props) => (props.$isLoading ? "hidden" : "visible")};
`;

export const LoadingContainer = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
