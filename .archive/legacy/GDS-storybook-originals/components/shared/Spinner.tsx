import React from "react";
import styled, { keyframes, useTheme } from "styled-components";
import { weakest } from "../../colors";

const innerCircleSizes = {
  small: "24px",
  medium: "32px",
  large: "72px",
} as const;

const spin = keyframes`
  to {transform: rotate(360deg);}
`;

const transitionTime = "0.75s";

export type Size = keyof typeof innerCircleSizes;
export type ColorVariant = "primary" | "secondary" | "inverse";

type Props = {
  size?: Size;
  colorVariant?: ColorVariant;
};

/** This Spinner is not exported for use by consumers, only used internally in GDS.
 * For a full-featured documented spinner, please use the LoadingSpinner component.
 */
export const Spinner = ({
  size = "small",
  colorVariant = "primary",
}: Props) => {
  const theme = useTheme();

  const colors = {
    primary: theme._links.primary.color, // should update w co-branding
    secondary: theme.text.primary,
    inverse: theme.text.inverse,
  };

  const spinnerColor = colors[colorVariant];

  return <AnimatedSpinner $size={size} $spinnerColor={spinnerColor} />;
};

const AnimatedSpinner = styled.span<{
  $size: Size;
  $spinnerColor: string;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => innerCircleSizes[props.$size]};
  height: ${(props) => innerCircleSizes[props.$size]};
  color: ${(props) => props.$spinnerColor};

  &::before {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    border-color: ${(props) => props.$spinnerColor};
    border-style: solid;
    border-width: calc(${(props) => innerCircleSizes[props.$size]} / 10);
    border-inline-start-color: ${(props) => weakest(props.$spinnerColor)};
    border-radius: 50%;

    /* 
    We add important here so that the spinner still spins, even when the user prefers-reduced-motion
    Classifying this as an essential animation: 
    https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html#dfn-essential */
    animation: ${spin} ${transitionTime} linear infinite !important;
    content: "";
  }
`;
