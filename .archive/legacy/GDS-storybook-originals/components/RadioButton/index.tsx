"use client";
import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import styled from "styled-components";
import { spacing, textStyle } from "../../dimensions";
import InputField from "../InputField";

type Props = {
  className?: string;
  id: string;
  label: ReactNode;
  disabled?: boolean;
  /** Visually hidden prefix announced to screen readers before the error message (e.g., "Error: "). */
  screenReaderErrorPrefix: string;
  errorMessage?: ReactNode;
  required?: boolean;
  flipOrder?: boolean;
} & ComponentPropsWithoutRef<"input">;

const RadioButton = forwardRef<HTMLInputElement, Props>(function RadioButton(
  {
    className,
    id,
    label,
    screenReaderErrorPrefix,
    errorMessage,
    required = false,
    disabled = false,
    flipOrder = false,
    ...rest
  },
  ref,
) {
  return (
    <InputField id={id} className={className}>
      <Label disabled={disabled} $flipOrder={flipOrder}>
        <LabelText>{label}</LabelText>
        <RadioWrapper>
          <InputRadio
            {...rest}
            ref={ref}
            disabled={disabled}
            required={required}
            isErrored={!!errorMessage}
          />
        </RadioWrapper>
      </Label>
      <InputField.Validation screenReaderErrorPrefix={screenReaderErrorPrefix}>
        {errorMessage}
      </InputField.Validation>
    </InputField>
  );
});

export default RadioButton;

const gap = spacing.club;

const Label = styled(InputField.Label)<{ $flipOrder?: boolean }>`
  ${textStyle.rainier};
  display: flex;
  flex-direction: ${(props) => (props.$flipOrder ? "row" : "row-reverse")};
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
`;

const RadioWrapper = styled.div`
  flex-shrink: 0;
`;

const InputRadio = styled(InputField.Radio)`
  &:disabled ~ {
    cursor: not-allowed;
  }
`;
