"use client";
import React, { ComponentPropsWithRef, ElementType } from "react";

import ChevronIcon from "../../icons/dist/ChevronIcon";
import styled, { css } from "styled-components";
import { Theme } from "../../themes/types";
import VisuallyHidden from "../utils/VisuallyHidden";
import { minTapSize } from "../../dimensions";
import { buttonreset } from "../../utils/snippets";
import { dark, darker, muted, weakest } from "../../colors";
import { getButtonType } from "../../utils/getButtonType";
import LoadingSpinner from "../LoadingSpinner";

type SquareButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "inverse";

type SharedProps<E extends ElementType> = {
  as?: E;
  variant?: SquareButtonVariant;
  label: React.ReactNode; // required for accessibility
  icon?: React.ReactNode;
  loading?: {
    isLoading: boolean;
    hiddenLoadingMessage: string;
  };
};

type Props<E extends ElementType> = SharedProps<E> &
  Omit<ComponentPropsWithRef<E>, keyof SharedProps<E>>;

const BaseSquareButton = <E extends ElementType = "button">(
  props: Props<E>,
) => {
  const { icon, variant = "primary", label, loading, ...rest } = props;

  // Conditionally set href to undefined when [aria-disabled="true"]
  const href = props["aria-disabled"] === "true" ? undefined : props.href;

  const showLoadingState =
    loading?.isLoading &&
    !(props.disabled || props["aria-disabled"] === "true");

  const getLoadingColorVariant = () => {
    if (variant === "secondary" || variant === "ghost") {
      return "primary";
    }

    if (variant === "tertiary") {
      return "secondary";
    }

    return "inverse";
  };

  return (
    <StyledSquareButton
      $variant={variant}
      $showLoadingState={showLoadingState}
      {...rest}
      // Conditionally add type only when the component is used as a button
      type={getButtonType(props)}
      href={href}
    >
      <IconWrapper>
        {showLoadingState ? (
          <LoadingSpinner colorVariant={getLoadingColorVariant()} />
        ) : (
          icon || <ChevronIcon rotate={-90} size="2em" />
        )}
      </IconWrapper>
      {!showLoadingState && <VisuallyHidden>{label}</VisuallyHidden>}
      {loading && (
        <VisuallyHidden aria-live="assertive" role="status">
          {showLoadingState && loading.hiddenLoadingMessage}
        </VisuallyHidden>
      )}
    </StyledSquareButton>
  );
};

const SquareButton = React.forwardRef((props, ref) => (
  // @ts-expect-error - I'm not sure how to fix the ref type
  <BaseSquareButton {...props} ref={ref} />
)) as unknown as typeof BaseSquareButton;

export default SquareButton;

type StyledButtonProps = {
  $variant: SquareButtonVariant;
  theme: Theme;
  $showLoadingState?: boolean;
};

const variantStyles = ({ $variant, theme }: StyledButtonProps) => {
  switch ($variant) {
    case "primary":
      return css`
        color: ${theme._buttons.primary.color};
        background-color: ${theme._buttons.primary.backgroundColor};
      `;
    case "secondary":
      return css`
        border: solid;
        border-color: ${theme._buttons.primary.backgroundColor};
        color: ${theme._buttons.primary.backgroundColor};
        background-color: transparent;
      `;
    case "tertiary":
      return css`
        border: solid;
        border-color: ${theme._buttons.tertiary.backgroundColor};
        color: ${theme._buttons.tertiary.backgroundColor};
        background-color: transparent;
      `;
    case "ghost":
      return css`
        border-color: transparent;
        color: ${theme._buttons.primary.backgroundColor};
        background-color: transparent;
      `;
    case "inverse":
      return css`
        border: solid;
        border-color: ${theme._buttons.inverse.backgroundColor};
        color: ${theme._buttons.inverse.backgroundColor};
        background-color: transparent;
      `;
  }
};

const hoverStyles = ({ $variant, theme }: StyledButtonProps) => {
  switch ($variant) {
    case "primary":
      return css`
        background-color: ${dark(theme._buttons.primary.backgroundColor)};
      `;
    case "secondary":
      return css`
        color: ${dark(theme._buttons.primary.backgroundColor)};
        background-color: ${muted(theme._buttons.primary.backgroundColor)};
      `;
    case "tertiary":
      return css`
        color: ${theme._buttons.tertiary.color};
        background-color: ${theme._buttons.tertiary.backgroundColor};
      `;
    case "ghost":
      return css`
        color: ${dark(theme._buttons.primary.backgroundColor)};
        background-color: ${muted(theme._buttons.primary.backgroundColor)};
      `;
    case "inverse":
      return css`
        background-color: ${weakest(theme._buttons.inverse.backgroundColor)};
      `;
  }
};

const disabledStyles = (props: StyledButtonProps) => {
  switch (props.$variant) {
    case "inverse":
      return css`
        border-color: ${props.theme._buttons.inverse.backgroundColor};
        background-color: transparent;
        opacity: 0.3;
      `;
    case "secondary":
      return css`
        border-color: ${props.theme._buttons.disabled.color};
        color: ${props.theme._buttons.disabled.color};
        background-color: transparent;
      `;
    case "tertiary":
      return css`
        border-color: ${props.theme._buttons.disabled.color};
        color: ${props.theme._buttons.disabled.color};
        background-color: transparent;
      `;
    case "ghost":
      return css`
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

const activeStyles = css`
  border-color: ${(props) =>
    darker(props.theme._buttons.primary.backgroundColor)};
  color: ${(props) => props.theme._buttons.primary.color};
  background-color: ${(props) =>
    darker(props.theme._buttons.primary.backgroundColor)};
`;

const StyledSquareButton = styled.button<StyledButtonProps>`
  ${buttonreset};
  ${variantStyles};
  display: inline-block;

  width: ${minTapSize};
  height: ${minTapSize};

  border-width: 1px;
  border-radius: 4px;

  text-align: center;

  /* Link Styling 
     Applied when using SquareButton as a link --> as="a" 
  */
  text-decoration: none;

  transition: background-color 0.2s;

  &:disabled {
    ${disabledStyles}
    cursor: not-allowed;
  }

  &:not(:disabled) {
    cursor: ${(props) => (props.$showLoadingState ? "wait" : "pointer")};
  }

  &:focus {
    outline-offset: 4px;
  }

  &:not(:disabled):hover {
    ${(props) => !props.$showLoadingState && hoverStyles};
  }

  &:not(:disabled):active {
    ${(props) => !props.$showLoadingState && activeStyles}
  }

  &[aria-disabled="true"] {
    ${disabledStyles};
    cursor: not-allowed;

    &:hover,
    &:focus {
      ${disabledStyles};
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100%;
`;
