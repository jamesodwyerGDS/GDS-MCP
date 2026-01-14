"use client";
import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { buttonreset } from "../../utils/snippets";
import { _minTapSize_ } from "../../dimensions/sizes";

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  width?: number;
  height?: number;
  className?: string;
} & React.ComponentPropsWithRef<"button">;

export const IconButton = React.forwardRef(
  ({ type = "button", width, height, className, ...rest }: Props, _ref) => {
    return (
      // TODO: Add compulsory visually hidden label to improve accessibility (GDS-266)
      <Button
        type={type}
        $width={width}
        $height={height}
        className={className}
        {...rest}
      />
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;

const Button = styled.button<{
  // Should these be strings to allow users to set width and height with non-px units eg ems?
  $width?: number;
  $height?: number;
}>`
  ${buttonreset};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$width || _minTapSize_}px;
  height: ${(props) => props.$height || _minTapSize_}px;
`;
