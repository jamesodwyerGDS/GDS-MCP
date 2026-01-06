"use client";
import React, { ComponentPropsWithRef, ElementType } from "react";

import ChevronIcon from "../../icons/dist/ChevronIcon";
import styled, { css } from "styled-components";
import { Theme } from "../../themes/types";
import VisuallyHidden from "../utils/VisuallyHidden";
import { minTapSize } from "../../dimensions";
import { buttonreset } from "../../utils/snippets";
import { dark, darker } from "../../colors";
import { getButtonType } from "../../utils/getButtonType";

type CircleButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "inverse";
type CircleButtonSize = "normal" | "large";

type SharedProps<E extends ElementType> = {
  as?: E;
  variant?: CircleButtonVariant;
  label: React.ReactNode; // required for accessibility
  icon?: React.ReactNode;
  size?: CircleButtonSize;
};

type Props<E extends ElementType> = SharedProps<E> &
  Omit<ComponentPropsWithRef<E>, keyof SharedProps<E>>;

const BaseCircleButton = <E extends ElementType = "button">(
  props: Props<E>,
) => {
  const { icon, variant = "primary", label, size = "normal", ...rest } = props;

  // Conditionally set href to undefined when [aria-disabled="true"]
  const href = props["aria-disabled"] === "true" ? undefined : props.href;

  return (
    <StyledCircleButton
      $variant={variant}
      $size={size}
      {...rest}
      type={getButtonType(props)}
      href={href}
    >
      <IconWrapper>
        {icon ? icon : <ChevronIcon rotate={-90} size="2em" />}
      </IconWrapper>
      <VisuallyHidden>{label}</VisuallyHidden>
    </StyledCircleButton>
  );
};

const CircleButton = React.forwardRef((props, ref) => (
  // @ts-expect-error - I'm not sure how to fix the ref type
  <BaseCircleButton {...props} ref={ref} />
)) as unknown as typeof BaseCircleButton;

export default CircleButton;

type StyledButtonProps = {
  $variant: CircleButtonVariant;
  $size: CircleButtonSize;
  theme: Theme;
};

const variantStyles = ({ $variant, theme }: StyledButtonProps) => {
  switch ($variant) {
    case "primary":
      return css`
        color: ${theme._buttons.primary.color};
        background-color: ${theme._buttons.primary.backgroundColor};

        &:not(:disabled):hover {
          background-color: ${dark(theme._buttons.primary.backgroundColor)};
        }
      `;
    case "secondary":
      return css`
        border: solid;
        border-color: ${theme._buttons.secondary.backgroundColor};
        color: ${theme._buttons.secondary.backgroundColor};
        background-color: transparent;

        &:not(:disabled):hover {
          color: ${theme._buttons.secondary.color};
          background-color: ${theme._buttons.secondary.backgroundColor};
        }
      `;
    case "tertiary":
      return css`
        border: solid;
        border-color: ${theme._buttons.tertiary.backgroundColor};
        color: ${theme._buttons.tertiary.backgroundColor};
        background-color: transparent;

        &:not(:disabled):hover {
          color: ${theme._buttons.tertiary.color};
          background-color: ${theme._buttons.tertiary.backgroundColor};
        }
      `;
    case "ghost":
      return css`
        border-color: transparent;
        color: ${theme._buttons.primary.backgroundColor};
        background-color: transparent;

        &:not(:disabled):hover {
          color: ${theme._buttons.primary.color};
          background-color: ${theme._buttons.primary.backgroundColor};
        }
      `;
    case "inverse":
      return css`
        border: solid;
        border-color: ${theme._buttons.inverse.backgroundColor};
        color: ${theme._buttons.inverse.backgroundColor};
        background-color: transparent;

        &:not(:disabled):hover {
          color: ${theme._buttons.inverse.color};
          background-color: ${theme._buttons.inverse.backgroundColor};
        }
      `;
  }
};

const disabledStyles = (props: StyledButtonProps) => {
  switch (props.$variant) {
    case "inverse":
      return css`
        border-color: ${props.theme._buttons.disabled.color};
        color: ${props.theme._buttons.disabled.color};
        background-color: transparent;
      `;

    default:
      return css`
        border-color: ${props.theme._buttons.disabled.backgroundColor};
        color: ${props.theme._buttons.disabled.color};
        background-color: ${props.theme._buttons.disabled.backgroundColor};
      `;
  }
};

const largeSize = "64px";

const StyledCircleButton = styled.button<StyledButtonProps>`
  ${buttonreset};
  ${variantStyles};
  display: inline-block;
  flex-shrink: 0;

  width: ${(props) => (props.$size === "large" ? largeSize : minTapSize)};
  height: ${(props) => (props.$size === "large" ? largeSize : minTapSize)};

  border-width: 1px;
  border-radius: 50%;

  text-align: center;

  /* Link Styling 
     Applied when using CircleButton as a link --> as="a" 
  */
  text-decoration: none;

  transition: background-color 0.2s;

  &:disabled {
    ${disabledStyles}
    cursor: not-allowed;
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  &:focus {
    outline-offset: 4px;
  }

  &:not(:disabled):active {
    border-color: ${(props) =>
      darker(props.theme._buttons.primary.backgroundColor)};
    color: ${(props) => props.theme._buttons.primary.color};
    background-color: ${(props) =>
      darker(props.theme._buttons.primary.backgroundColor)};
  }

  &[aria-disabled="true"] {
    ${disabledStyles}
    cursor: not-allowed;

    &:focus,
    &:hover {
      ${disabledStyles}
      cursor: not-allowed;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100%;
`;
