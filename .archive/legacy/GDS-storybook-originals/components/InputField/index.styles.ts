import styled, { DefaultTheme, css } from "styled-components";
import { hideVisually } from "polished";
import { inputReset } from "../../utils/snippets";
import { minTapSize, spacing, textStyle } from "../../dimensions";
import { browserDefaultFocus } from "../../utils/focus";
import { CheckmarkIcon, MinusIcon } from "../../icons";
import { dark } from "../../colors";

export const InputField = styled.div`
  /* div doesn't have default styles, but we reset styles in case a component using
 this "as" an element with styling eg fieldset  */
  margin: 0;
  padding: 0;
  border: 0;

  &:disabled {
    opacity: 0.5;
  }
`;

InputField.displayName = "InputField";

const disabledLabelStyles = css`
  color: ${(props) => props.theme.base.borderDark};
  cursor: not-allowed;
`;

export const Label = styled.label<{
  disabled?: boolean; // TODO: make into transient prop
  $readOnly?: boolean;
}>`
  ${textStyle.etna};

  display: block;
  color: ${(props) => props.theme.text.secondary};
  ${(props) => (props.disabled || props.$readOnly ? disabledLabelStyles : null)}
`;

Label.displayName = "InputField.Label";

export const Row = styled.div<{ marginTop?: keyof typeof spacing }>`
  position: relative;
  margin-top: ${(props) => (props.marginTop ? spacing[props.marginTop] : 0)};
`;

Row.displayName = "InputField.Row";

const Icon = styled.span`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
  color: ${(props) => props.theme.text.secondary};
  pointer-events: none;
`;

export const StartIcon = styled(Icon)`
  inset-inline-start: 0;
  margin-inline-start: ${spacing.auditorium};
`;

StartIcon.displayName = "InputField.StartIcon";

export const EndIcon = styled(Icon)`
  inset-inline-end: 0;
  margin-inline-end: ${spacing.auditorium};
`;

EndIcon.displayName = "InputField.EndIcon";

type InputCustomProps = {
  $isErrored?: boolean;
  isReadonlyDropdown?: boolean;
  $hasExtraPadding?: boolean;
  $isPillVariant?: boolean;
};

const disabledInput = css`
  border-color: ${(props) => props.theme.base.border};
  color: ${(props) => props.theme.base.borderDark};
  background-color: ${(props) => props.theme.base.borderLight};
`;

const erroredBorders = (props: {
  theme: DefaultTheme;
  $isErrored?: boolean;
}) => {
  return props.$isErrored
    ? css`
        border-color: ${props.theme.status.danger};
        border-width: 2px;
      `
    : null;
};

const baseInput = css`
  ${inputReset};
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.base.bg};
  appearance: none;

  &:disabled {
    ${disabledInput}
  }

  &:focus,
  &:focus-visible {
    ${browserDefaultFocus}
    outline-offset: -2px;
  }

  &::placeholder {
    color: ${(props) => props.theme.text.secondary};
  }
`;

const readOnlyStyles = css`
  &:read-only {
    ${disabledInput}
  }

  &:hover:not(:disabled):not(:read-only) {
    border-color: ${(props) => props.theme.base.primary};
  }
`;

export const Input = styled.input<InputCustomProps>`
  ${baseInput};
  height: ${minTapSize};
  padding-inline-end: ${(props) =>
    props.$hasExtraPadding ? minTapSize : spacing.auditorium};
  padding-inline-start: ${spacing.auditorium};
  border-color: ${(props) => props.theme.base.borderDark};

  ${erroredBorders};

  ${(props) => !(props.readOnly && props.isReadonlyDropdown) && readOnlyStyles};

  /* Add extra start padding when there's a StartIcon */
  ${StartIcon} ~ & {
    padding-inline-start: ${spacing.stadium};
  }
`;

Input.displayName = "InputField.Input";

export const Textarea = styled.textarea<{ $isErrored?: boolean }>`
  ${baseInput};
  padding: ${spacing.auditorium};
  border-color: ${(props) => props.theme.base.borderDark};
  resize: vertical;

  ${erroredBorders};

  &:read-only {
    ${disabledInput}
  }
`;

Textarea.displayName = "InputField.Textarea";

export const CustomCheckbox = styled.span`
  ${baseInput};

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-color: ${(props) => props.theme.base.borderDark};
  color: ${(props) => props.theme.text.inverse};
  cursor: pointer;
`;

export const Checkmark = styled(CheckmarkIcon)`
  display: none;
`;

export const IndeterminateMark = styled(MinusIcon)`
  display: none;
`;

export const HiddenCheckbox = styled.input<{ $isErrored?: boolean }>`
  ${hideVisually};

  &:disabled ~ ${CustomCheckbox}, &:disabled:indeterminate ~ ${CustomCheckbox} {
    ${disabledInput}
    cursor: not-allowed;
  }

  &:focus-visible ~ ${CustomCheckbox} {
    ${browserDefaultFocus};
  }

  @supports not selector(:focus-visible) {
    &:focus ~ ${CustomCheckbox} {
      ${browserDefaultFocus};
    }
  }

  &:checked ~ ${CustomCheckbox}, &:indeterminate ~ ${CustomCheckbox} {
    border-color: ${(props) => props.theme.base.bgInverse};
    background-color: ${(props) => props.theme.base.bgInverse};
  }

  &:hover:not(:checked):not(:indeterminate):not(:disabled) ~ ${CustomCheckbox} {
    border-color: ${({ theme, $isErrored }) =>
      $isErrored ? theme.status.danger : theme.colors.highlight};

    border-width: 2px;
    background-color: ${(props) => props.theme.base.bg};
  }

  &:active:not(:checked):not(:indeterminate):not(:disabled)
    ~ ${CustomCheckbox} {
    border-color: ${(props) => dark(props.theme.colors.highlight)};
    border-width: 2px;
  }

  &:hover:not(:disabled)
    ~ ${CustomCheckbox},
    &:indeterminate:hover:not(:disabled)
    ~ ${CustomCheckbox} {
    border-color: ${(props) => dark(props.theme.colors.highlight)};
    background-color: ${(props) => dark(props.theme.colors.highlight)};
  }

  &:disabled:checked
    ~ ${CustomCheckbox},
    &:disabled:indeterminate
    ~ ${CustomCheckbox} {
    ${disabledInput}
  }

  &:checked ~ ${CustomCheckbox} {
    & > ${Checkmark} {
      display: block;
    }
  }

  &:indeterminate ~ ${CustomCheckbox} {
    & > ${IndeterminateMark} {
      display: block;
    }
  }

  &:not(:disabled):not(:checked) ~ ${CustomCheckbox} {
    ${erroredBorders};
  }
`;

export const CustomRadio = styled.span`
  ${baseInput};

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-color: ${(props) => props.theme.base.borderDark};
  border-radius: 50%;
  cursor: pointer;
`;

export const HiddenRadio = styled.input<{ $isErrored?: boolean }>`
  ${hideVisually};

  &:disabled ~ ${CustomRadio} {
    ${disabledInput}
    cursor: not-allowed;
  }

  &:focus-visible ~ ${CustomRadio} {
    ${browserDefaultFocus};
  }

  @supports not selector(:focus-visible) {
    &:focus ~ ${CustomRadio} {
      ${browserDefaultFocus};
    }
  }

  &:not(:disabled) ~ ${CustomRadio} {
    ${erroredBorders};
  }

  &:checked ~ ${CustomRadio} {
    border-color: ${(props) => props.theme.colors.base.bgInverse};
    border-width: 6px;
    transition: border-width 0.15s;
  }

  &:hover:not(:checked):not(:disabled) ~ ${CustomRadio} {
    border-color: ${({ theme, $isErrored }) =>
      $isErrored ? theme.status.danger : theme.colors.highlight};
    border-width: 2px;
  }

  &:hover:not(:disabled) ~ ${CustomRadio} {
    border-color: ${(props) => dark(props.theme.colors.highlight)};
  }

  &:disabled:checked ~ ${CustomRadio} {
    border-color: ${(props) => props.theme.base.border};
    border-width: 1px;
    background-color: ${(props) => props.theme.base.border};
    box-shadow: inset 0 0 0 5px ${(props) => props.theme.base.borderLight};
  }
`;

export const Select = styled.select<{
  $isErrored?: boolean;
  $isPillVariant?: boolean;
}>`
  ${baseInput};
  height: ${minTapSize};
  padding-inline-end: ${spacing.stadium};
  padding-inline-start: ${spacing.auditorium};
  border-color: ${(props) => props.theme.base.borderDark};
  border-radius: ${({ $isPillVariant }) =>
    $isPillVariant && spacing.amphitheatre};

  ${erroredBorders};

  &:disabled {
    /* This is needed to counteract default browser opacity setting */
    opacity: 1;
  }

  &:not(:disabled) {
    + ${Icon} {
      /* match the chevron color to the text color */
      color: inherit;
    }

    &:hover,
    &:focus,
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.highlight};
      outline-offset: ${({ $isErrored }) => ($isErrored ? "4px" : "-2px")};

      + ${Icon} {
        color: ${({ theme }) => theme.colors.highlight};
      }
    }
  }
`;

Select.displayName = "InputField.Select";

export const Validation = styled.div`
  ${textStyle.etna};
  display: flex;
  color: ${(props) => props.theme.text.primary};
`;

Validation.displayName = "InputField.Validation";
