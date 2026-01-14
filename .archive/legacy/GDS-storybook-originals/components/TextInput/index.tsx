"use client";
import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import styled from "styled-components";
import InputField from "../InputField";
import { minTapSize } from "../../dimensions";
import { buttonreset } from "../../utils/snippets";
import { DeleteIcon } from "../../icons";

type Props = {
  className?: string;
  id: string;
  label: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  /** Visually hidden prefix announced to screen readers before the error message (e.g., "Error: "). */
  screenReaderErrorPrefix: string;
  errorMessage?: ReactNode;
  successMessage?: ReactNode;
  required?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClearButtonClick?: () => void;
  clearButtonLabel?: string;
} & ComponentPropsWithoutRef<"input">;

const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  {
    className,
    id,
    label,
    screenReaderErrorPrefix,
    errorMessage,
    successMessage,
    required = false,
    startIcon,
    endIcon,
    disabled = false,
    readOnly = false,
    onClearButtonClick,
    clearButtonLabel,
    ...rest
  },
  ref,
) {
  const validationType = errorMessage ? "error" : "success";
  const validationMessage = errorMessage ? errorMessage : successMessage;

  const showClearButton =
    onClearButtonClick &&
    clearButtonLabel &&
    rest.value &&
    !disabled &&
    !readOnly;

  const hasExtraPadding = !!(endIcon || showClearButton);

  return (
    <InputField id={id} className={className}>
      <InputField.Label disabled={disabled} readOnly={readOnly}>
        {label}
      </InputField.Label>
      <InputField.Row marginTop="lounge">
        {startIcon && <InputField.StartIcon>{startIcon}</InputField.StartIcon>}
        <InputField.Input
          {...rest}
          inputRef={ref}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          isErrored={!!errorMessage}
          hasExtraPadding={hasExtraPadding}
        />
        {endIcon && !onClearButtonClick && (
          <InputField.EndIcon>{endIcon}</InputField.EndIcon>
        )}
        {showClearButton && (
          <ClearButton onClick={onClearButtonClick} label={clearButtonLabel} />
        )}
      </InputField.Row>
      <InputField.Validation
        type={validationType}
        screenReaderErrorPrefix={screenReaderErrorPrefix}
      >
        {validationMessage}
      </InputField.Validation>
    </InputField>
  );
});

export default TextInput;

type ClearButtonProps = {
  onClick: () => void;
  label: string;
};

const ClearButton = ({ onClick, label }: ClearButtonProps) => {
  // tabIndex -1 to make this not keyboard focusable. See the link in the docs page for this component for an explanation.
  return (
    <BaseClearButton tabIndex={-1} onClick={onClick} aria-label={label}>
      <DeleteIcon />
    </BaseClearButton>
  );
};

export const BaseClearButton = styled.button`
  ${buttonreset};
  position: absolute;
  top: 0;
  inset-inline-end: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${minTapSize};
  height: ${minTapSize};

  color: ${(props) => props.theme.base.borderDark};
`;
