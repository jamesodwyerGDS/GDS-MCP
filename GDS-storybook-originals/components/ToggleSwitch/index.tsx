"use client";
import * as React from "react";
import styled from "styled-components";
import { hideVisually } from "polished";
import { spacing } from "../../dimensions";
import { Theme } from "../../themes/types";
import { browserDefaultFocus } from "../../utils/focus";
import { dark } from "../../colors";

type ColorVariant = "default" | "resale";

type Props = {
  id: string;
  label: React.ReactElement | string;
  checked: boolean;
  disabled?: boolean;
  colorVariant?: ColorVariant;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  name?: string;
  fullWidth?: boolean;
};

const ToggleSwitch = React.forwardRef<HTMLInputElement, Props>(
  function ToggleSwitch(
    {
      id,
      label,
      checked,
      disabled = false,
      colorVariant = "default",
      onChange = () => {},
      className,
      name,
      fullWidth,
    },
    ref,
  ) {
    return (
      <Label htmlFor={id} className={className} $fullWidth={fullWidth}>
        {label}
        <HiddenCheckbox
          id={id}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
        />
        <VisibleToggle $colorVariant={colorVariant} />
      </Label>
    );
  },
);

const animationBezier = "cubic-bezier(.1, .85, .25, 1)";

type GetColorArg = {
  colorVariant?: ColorVariant;
  theme: Theme;
};

const getColor = (props: GetColorArg) =>
  props.colorVariant === "resale"
    ? props.theme.colors.resale
    : props.theme.colors.highlight;

const Label = styled.label<{ $fullWidth?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $fullWidth }) =>
    $fullWidth ? "space-between" : "normal"};
  color: ${(props) => props.theme.text.primary};
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  ${hideVisually};
`;

const VisibleToggle = styled.div<{ $colorVariant: "default" | "resale" }>`
  flex-shrink: 0;
  width: 40px;
  height: ${spacing.amphitheatre};
  margin-inline-start: ${spacing.auditorium};
  border: solid 1px;
  border-color: ${(props) => props.theme.base.borderDark};
  border-radius: ${spacing.amphitheatre};
  background-color: ${(props) => props.theme.base.bg};
  cursor: pointer;

  &::after {
    position: relative;
    top: 3px;
    inset-inline-start: ${spacing.lounge};
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.base.borderDark};
    transition: all 0.3s ${animationBezier};
    content: "";
  }

  ${/* sc-selector */ HiddenCheckbox}:checked ~ & {
    border-color: ${getColor};
    background-color: ${getColor};

    &::after {
      inset-inline-start: calc(50%);
      background-color: ${(props) => props.theme.base.bg};
    }

    &:hover {
      border-color: ${(props) => dark(getColor(props))};
      background-color: ${(props) => dark(getColor(props))};
    }
  }

  ${HiddenCheckbox}:focus-visible:not(:disabled) ~ & {
    ${browserDefaultFocus};
    outline-offset: 4px;
  }
  @supports not selector(:focus-visible) {
    ${HiddenCheckbox}:focus:not(:disabled) ~ & {
      ${browserDefaultFocus};
      outline-offset: 4px;
    }
  }

  ${/* sc-selector */ HiddenCheckbox}:hover:not(:checked) ~ & {
    border-color: ${(props) => props.theme.base.primary};
    box-shadow: 0 0 0 1px ${(props) => props.theme.base.primary};
  }

  ${/* sc-selector */ HiddenCheckbox}:disabled ~ & {
    border-color: ${(props) => props.theme.base.borderLight};
    background-color: ${(props) => props.theme.base.borderLight};
    cursor: not-allowed;

    &:hover {
      border-color: ${(props) => props.theme.base.borderLight};
      background-color: ${(props) => props.theme.base.borderLight};
    }
  }

  ${/* sc-selector */ HiddenCheckbox}:disabled:not(:checked) ~ & {
    border-color: ${(props) => props.theme.base.border};
    background-color: ${(props) => props.theme.base.borderLight};
    cursor: not-allowed;

    &::after {
      background-color: ${(props) => props.theme.base.border};
    }
  }
`;

export default ToggleSwitch;
