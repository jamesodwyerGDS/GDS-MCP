"use client";
import * as React from "react";
import InputField from "../InputField";

type Props = {
  className?: string;
  id: string;
  label: React.ReactNode;
  rows?: number;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  /** Visually hidden prefix announced to screen readers before the error message (e.g., "Error: "). */
  screenReaderErrorPrefix: string;
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
} & React.ComponentPropsWithoutRef<"textarea">;

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  {
    className,
    id,
    label,
    rows = 3,
    onChange,
    value,
    disabled = false,
    readOnly = false,
    required = false,
    screenReaderErrorPrefix,
    errorMessage,
    ...rest
  },
  ref,
) {
  return (
    <InputField id={id} className={className}>
      <InputField.Label disabled={disabled} readOnly={readOnly}>
        {label}
      </InputField.Label>
      <InputField.Row marginTop="lounge">
        <InputField.Textarea
          {...rest}
          ref={ref}
          rows={rows}
          onChange={onChange}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          isErrored={!!errorMessage}
        />
      </InputField.Row>
      <InputField.Validation screenReaderErrorPrefix={screenReaderErrorPrefix}>
        {errorMessage}
      </InputField.Validation>
    </InputField>
  );
});

export default TextArea;
