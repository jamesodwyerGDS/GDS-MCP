import React, { ElementType } from "react";
import styled, { css } from "styled-components";
import { media } from "../../dimensions";

type Size = "medium";

type Props = {
  /**
   * Changes element tag
   * @default h1
   */
  as?: ElementType;
  /**
   * Changes text color to inverse
   * @default false
   */
  inverse?: boolean;
  /** Font size of text */
  /**
   * Font size of text
   * @default medium
   */
  size: Size;
  /**
   * Changes text to be all uppercase
   * @default false
   */
  uppercase?: boolean;
} & React.ComponentProps<"h1">;

/**
 * @beta
 * This component is subject to breaking changes as we test and gather feedback.
 * It will be updated after the design typography changes are implemented.
 */
const DisplayHeading = ({
  inverse = false,
  size = "medium",
  uppercase = false,
  ...rest
}: Props) => {
  return (
    <Heading $inverse={inverse} $uppercase={uppercase} $size={size} {...rest} />
  );
};

export default DisplayHeading;

const textSizeDesktop = {
  medium: "56px",
};

const textSizeMobile = {
  medium: "32px",
};

const textSize = ({ $size = "medium" }: { $size?: Size }) => css`
  font-size: ${textSizeMobile[$size]};
  line-height: ${textSizeMobile[$size]};

  @media (${media.medium}) {
    font-size: ${textSizeDesktop[$size]};
    line-height: ${textSizeDesktop[$size]};
  }
`;

const Heading = styled.h1<{
  $inverse?: boolean;
  $uppercase?: boolean;
  $size: Size;
}>`
  ${({ $size }) => textSize({ $size })}

  position: relative;
  display: inline;
  width: fit-content;
  margin: 0;
  padding-bottom: 0.2em;
  color: ${({ $inverse, theme }) =>
    $inverse ? theme.text.inverse : theme.text.primary};
  font-weight: 900;
  letter-spacing: -0.03em;
  text-transform: ${({ $uppercase = false }) =>
    $uppercase ? "uppercase" : "none"};

  &::after {
    position: absolute;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 0.2em;
    background: ${({ theme }) => theme.base.primary};
    content: "";
  }
`;
