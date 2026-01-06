"use client";
import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import styled from "styled-components";
import { textStyle, spacing } from "../../dimensions";
import InputField from "../InputField";

type ErrorBase = {
  /**
   * Visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").
   */
  screenReaderErrorPrefix: string;
  errorMessage?: ReactNode;
};

type ErrorProps =
  | (ErrorBase & {
      errorWithoutMessage?: false;
      "aria-describedby"?: string;
    })
  | (ErrorBase & {
      errorWithoutMessage: true;
      /** required to link checkbox to the external error message for accessibility */
      "aria-describedby": string;
    });

type Props = {
  className?: string;
  id: string;
  label: ReactNode;
  disabled?: boolean;
  required?: boolean;
  flipOrder?: boolean;
  isIndeterminate?: boolean;
} & ErrorProps &
  ComponentPropsWithoutRef<"input">;

const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  {
    className,
    id,
    label,
    screenReaderErrorPrefix,
    errorMessage,
    errorWithoutMessage = false,
    required = false,
    disabled = false,
    flipOrder = false,
    isIndeterminate = false,
    ...rest
  },
  ref,
) {
  return (
    <InputField id={id} className={className}>
      <Label disabled={disabled} $flipOrder={flipOrder}>
        <CheckboxWrapper>
          <InputField.Checkbox
            {...rest}
            ref={ref}
            isIndeterminate={isIndeterminate}
            disabled={disabled}
            required={required}
            isErrored={!!errorMessage || errorWithoutMessage}
          />
        </CheckboxWrapper>
        <LabelText>{label}</LabelText>
      </Label>
      <InputField.Validation screenReaderErrorPrefix={screenReaderErrorPrefix}>
        {errorMessage}
      </InputField.Validation>
    </InputField>
  );
});

export default Checkbox;

const gap = spacing.club;

const Label = styled(InputField.Label)<{ $flipOrder?: boolean }>`
  ${textStyle.rainier};
  display: flex;
  flex-direction: ${(props) => (props.$flipOrder ? "row-reverse" : "row")};
  margin: -${gap};

  /* Override text colour of InputField.Label */
  color: ${(props) =>
    props.disabled ? props.theme.text.secondary : props.theme.text.primary};

  > * {
    padding: ${gap};
  }
`;

const LabelText = styled.span`
  display: block;
  flex-grow: 1;
  margin-top: auto;
  margin-bottom: auto;
  padding-inline-start: ${spacing.lounge};
`;

const CheckboxWrapper = styled.div`
  flex-shrink: 0;
`;
