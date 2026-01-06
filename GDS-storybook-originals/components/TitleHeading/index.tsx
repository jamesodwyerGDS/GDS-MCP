import React, { ElementType } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";
import { textStyle } from "../../dimensions";

type Size = "xLarge" | "large" | "medium" | "small" | "xSmall";

type Props = {
  as?: ElementType;
  size?: Size;
  className?: string;
} & React.ComponentProps<"h1">;

const textStyleMap = {
  xLarge: textStyle.mauna,
  large: textStyle.everest,
  medium: textStyle.kilimanjaro,
  small: textStyle.vinson,
  xSmall: textStyle.blanc,
};

export default function TitleHeading({
  size = "xLarge",
  className,
  ...rest
}: Props) {
  return (
    <Heading
      $size={size}
      className={className}
      $textStyle={textStyleMap[size]}
      {...rest}
    />
  );
}

const Heading = styled.h1<{ $textStyle: FlattenSimpleInterpolation }>`
  ${(props) => props.$textStyle};

  position: relative;
  z-index: 1;
  display: inline;
  /* For now this component is only for use on dark/inverse backgrounds */
  color: ${(props) => props.theme.text.inverse};
  overflow-wrap: break-word;
  hyphens: auto;

  /* Blue Stage block underline */
  ::after {
    position: absolute;
    bottom: 0;
    inset-inline-start: 0.7em;
    z-index: -1;
    display: block;
    width: 100%;
    height: 0.5em;
    background-color: ${(props) => props.theme.base.primary};
    content: "";

    /* We hide the blue underline for Firefox because it doesn't underline the last line correctly (see GDISCO-1596) */
    /* stylelint-disable-next-line at-rule-prelude-no-invalid */
    @-moz-document url-prefix() {
      display: none;
    }
  }
`;
