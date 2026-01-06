"use client";
import * as React from "react";
import styled from "styled-components";
import InputField from "../InputField";
import IconButton from "../utils/IconButton";
import VisuallyHidden from "../utils/VisuallyHidden";
import ShowIcon from "../../icons/dist/EyeShow";
import HideIcon from "../../icons/dist/EyeHide";

type Props = {
  className?: string;
  id: string;
  label: React.ReactNode;
  showLabel: string;
  hideLabel: string;
  value?: string;
  disabled?: boolean;
  /** Visually hidden prefix announced to screen readers before the error message (e.g., "Error: "). */
  screenReaderErrorPrefix: string;
  errorMessage?: string;
  required?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  function PasswordInput(
    {
      className,
      id,
      label,
      showLabel,
      hideLabel,
      screenReaderErrorPrefix,
      errorMessage = "",
      required = false,
      disabled = false,
      ...rest
    },
    ref,
  ) {
    const [show, setShow] = React.useState(false);
    const toggleShow = () => setShow((oldShow) => !oldShow);
    return (
      <InputField id={id} className={className}>
        <InputField.Label disabled={disabled}>{label}</InputField.Label>
        <InputField.Row marginTop="lounge">
          <Input
            inputRef={ref}
            {...rest}
            disabled={disabled}
            type={show ? "text" : "password"}
            required={required}
            isErrored={!!errorMessage}
            hasExtraPadding
          />
          <IconWrapper>
            <IconButton onClick={toggleShow}>
              <VisuallyHidden>{show ? hideLabel : showLabel}</VisuallyHidden>
              {show ? <HideIcon /> : <ShowIcon />}
            </IconButton>
          </IconWrapper>
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

// TODO: Delete these IE11 styles
const Input = styled(InputField.Input)`
  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }
`;

const IconWrapper = styled(InputField.EndIcon)`
  margin-inline-end: 0;
  pointer-events: auto;
`;

export default PasswordInput;
