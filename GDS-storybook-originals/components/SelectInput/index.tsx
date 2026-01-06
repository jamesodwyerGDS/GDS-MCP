"use client";
import * as React from "react";
import styled from "styled-components";
import InputField from "../InputField";
import ChevronIcon from "../../icons/dist/ChevronIcon";
import { _iconSize_, _spacing_, spacing } from "../../dimensions";

type Props = {
  className?: string;
  id: string;
  isPillVariant?: boolean;
  autoComplete?: string;
  label?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  value?: string | number;
  disabled?: boolean;
  required?: boolean;
  startIcon?: React.ReactNode;
  children: React.ReactNode;
  /** Visually hidden prefix announced to screen readers before the error message (e.g., "Error: "). */
  screenReaderErrorPrefix: string;
  errorMessage?: string;
} & React.ComponentPropsWithoutRef<"select">;

const SelectInput = React.forwardRef<HTMLSelectElement, Props>(
  function SelectInput(
    {
      autoComplete,
      className,
      id,
      isPillVariant,
      label,
      onChange,
      value,
      disabled = false,
      required = false,
      children,
      startIcon,
      screenReaderErrorPrefix,
      errorMessage,
      ...rest
    },
    ref,
  ) {
    const iconSpacing = `${_iconSize_.total + _spacing_.lounge}px`;

    return (
      <InputField id={id} className={className}>
        {label && (
          <InputField.Label disabled={disabled}>{label}</InputField.Label>
        )}
        <InputField.Row marginTop={label ? "lounge" : undefined}>
          {startIcon && (
            <InputField.StartIcon>{startIcon}</InputField.StartIcon>
          )}
          <Select
            {...rest}
            isErrored={!!errorMessage}
            isPillVariant={isPillVariant}
            autoComplete={autoComplete}
            onChange={onChange}
            value={value}
            disabled={disabled}
            required={required}
            ref={ref}
            iconSpacing={startIcon ? iconSpacing : undefined}
          >
            {children}
          </Select>
          <EndIcon>
            <ChevronIcon />
          </EndIcon>
        </InputField.Row>
        <InputField.Validation
          screenReaderErrorPrefix={screenReaderErrorPrefix}
        >
          {errorMessage}
        </InputField.Validation>
      </InputField>
    );
  },
);

const Select = styled(InputField.Select)<{
  iconSpacing?: string;
}>`
  ${({ iconSpacing }) => iconSpacing && `padding-inline-start: ${iconSpacing}`}
`;

const EndIcon = styled(InputField.EndIcon)`
  margin-inline-end: ${spacing.hall};
`;

export default SelectInput;
