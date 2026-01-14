"use client";
import React, { ComponentPropsWithRef, ElementType } from "react";
import { mix } from "polished";
import styled, { css } from "styled-components";
import { Theme } from "../../themes/types";
import { buttonreset } from "../../utils/snippets";
import { getButtonType } from "../../utils/getButtonType";
import { dark } from "../../colors";
import { minTapSize, spacing } from "../../dimensions";

type SharedProps<E extends ElementType> = {
  as?: E;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  inverse?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  selected?: boolean;
  small?: boolean;
};

type Props<E extends ElementType> = SharedProps<E> &
  Omit<ComponentPropsWithRef<E>, keyof SharedProps<E>>;

const BasePillButton = <E extends ElementType = "button">(props: Props<E>) => {
  const {
    icon,
    children,
    startIcon,
    endIcon,
    inverse,
    selected,
    small,
    ...rest
  } = props;

  // Conditionally set href to undefined when [aria-disabled="true"]
  const href = props["aria-disabled"] === "true" ? undefined : props.href;
  const btnHeight = small ? spacing.arena : minTapSize;

  return (
    <StyledPillButton
      {...rest}
      type={getButtonType(props)}
      href={href}
      $inverse={inverse}
      $selected={selected}
      $height={btnHeight}
    >
      <FlexWrapper $height={btnHeight}>
        {startIcon}
        <Text>{children}</Text>
        {endIcon}
      </FlexWrapper>
    </StyledPillButton>
  );
};

const PillButton = React.forwardRef((props, ref) => (
  // @ts-expect-error - I'm not sure how to fix the ref type
  <BasePillButton {...props} ref={ref} />
)) as unknown as typeof BasePillButton;

export default PillButton;

type StyledButtonProps = {
  theme: Theme;
  $height?: string;
  $inverse?: boolean;
  $selected?: boolean;
};

const disabledStyles = ({ theme, $inverse }: StyledButtonProps) => {
  return css`
    border-color: ${$inverse
      ? theme._buttons.disabled.color
      : theme.base.borderLight};
    color: ${theme._buttons.disabled.color};
    background-color: ${$inverse ? "transparent" : theme.base.borderLight};
  `;
};

const hoverStyles = ({ $inverse, theme, $selected }: StyledButtonProps) => {
  const hoverBackground = () => {
    /* The pill needs slighly different mixes than the existing "dark" and "darker" modifiers */
    if ($selected)
      return mix(0.15, "#000", theme._buttons.pill.backgroundColor);

    if ($inverse) return theme._buttons.inverse.backgroundColor;

    return theme._buttons.tertiary.backgroundColor;
  };

  return css`
    border-color: ${hoverBackground};
    color: ${$inverse || $selected
      ? theme._buttons.pill.color
      : theme._buttons.primary.color};
    background-color: ${hoverBackground};
  `;
};

const StyledPillButton = styled.button<StyledButtonProps>`
  ${buttonreset};
  display: inline-block;
  height: ${({ $height }) => $height};
  padding: 0 ${spacing.auditorium};
  border: solid 1px;

  border-color: ${(props) => {
    if (props.$selected) {
      return dark(props.theme._buttons.pill.backgroundColor);
    }

    if (props.$inverse) {
      return props.theme._buttons.inverse.backgroundColor;
    }

    return props.theme._buttons.pill.color;
  }};

  border-radius: 24px;

  color: ${({ $inverse, $selected, theme }) => {
    if ($inverse && !$selected) return theme._buttons.inverse.backgroundColor;

    return theme._buttons.pill.color;
  }};
  font-weight: 600;
  text-align: center;

  /* Link Styling 
    Applied when using PillButton as a link --> as="a" 
    */
  text-decoration: none;

  background-color: ${({ $selected, theme }) =>
    $selected ? theme._buttons.pill.backgroundColor : "transparent"};

  transition: all 0.2s;

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

  &:not(:disabled):hover {
    ${hoverStyles}
  }

  &:not(:disabled):active {
    /* The pill needs slighly different mixes than the existing "dark" and "darker" modifiers */
    border-color: ${({ theme }) =>
      mix(0.3, "#000", theme._buttons.pill.backgroundColor)};
    color: ${({ theme }) => theme._buttons.pill.color};
    background-color: ${({ theme }) =>
      mix(0.3, "#000", theme._buttons.pill.backgroundColor)};
  }

  &[aria-disabled="true"] {
    ${disabledStyles}
    cursor: not-allowed;

    &:focus,
    &:hover {
      ${disabledStyles}
    }
  }
`;

const Text = styled.span`
  /* To ensure the correct vertical alignment for span and p children elements */
  & > p {
    margin: 0;
  }
`;

const FlexWrapper = styled.span<StyledButtonProps>`
  display: flex;
  gap: ${spacing.club};
  align-items: center;
  justify-content: center;
  /* To ensure the correct vertical alignment of Text when used for both <button> and <a> */
  line-height: calc(${({ $height }) => $height} - 2px);
`;
