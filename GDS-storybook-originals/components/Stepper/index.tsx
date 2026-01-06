"use client";
import React from "react";
import styled, { css } from "styled-components";
import MinusIcon from "../../icons/dist/MinusIcon";
import PlusIcon from "../../icons/dist/PlusIcon";
import IconButton from "../utils/IconButton";
import { spacing, textStyle, elevation } from "../../dimensions";
import { dark, darker } from "../../colors";
import { Theme } from "../../themes/types";

type Context = {
  options: Array<number>;
  internalValue: number;
  setValue: (arg0: number) => void;
  currentIndex: number;
};

const StepperContext = React.createContext<Context | null | undefined>(
  undefined,
);

function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper children must be rendered within a <Stepper>");
  }
  return context;
}

type ValueProps = {
  ariaLabel: string;
} & DisabledProp;

function Value(props: ValueProps) {
  const { internalValue, setValue, options, currentIndex } = useStepper();
  const noOptions = options.length === 0;
  const minIndex = 0;
  const maxIndex = options.length - 1;

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (props.disabled) {
      return;
    }

    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        return setValue(Math.min(currentIndex + 1, maxIndex));
      case "ArrowDown":
        event.preventDefault();
        return setValue(Math.max(currentIndex - 1, minIndex));
      case "Home":
        event.preventDefault();
        return setValue(minIndex);
      case "End":
        event.preventDefault();
        return setValue(maxIndex);
      default:
        return;
    }
  }
  return (
    <Option
      {...props}
      onKeyDown={handleKeyDown}
      role="spinbutton"
      aria-label={props.ariaLabel}
      aria-valuenow={internalValue}
      aria-valuetext={internalValue.toString()}
      aria-valuemin={options[minIndex]}
      aria-valuemax={options[maxIndex]}
      tabIndex={noOptions ? undefined : 0}
      aria-disabled={props.disabled}
    >
      {noOptions ? "-" : internalValue}
    </Option>
  );
}

type DecrementProps = VariantProp &
  DisabledProp &
  React.ComponentPropsWithoutRef<"button">;

function Decrement({ disabled, ...props }: DecrementProps) {
  const { setValue, options, currentIndex } = useStepper();
  const noOptions = options.length === 0;
  const minIndex = 0;

  return (
    <MinusButton
      {...props}
      type="button"
      onClick={() => setValue(Math.max(currentIndex - 1, minIndex))}
      disabled={disabled || noOptions || currentIndex === minIndex}
      tabIndex={-1}
      aria-hidden="true"
      width={36}
      height={36}
    >
      <MinusIcon size={20} />
    </MinusButton>
  );
}

type IncrementProps = VariantProp &
  DisabledProp &
  React.ComponentPropsWithoutRef<"button">;

function Increment({ disabled, ...props }: IncrementProps) {
  const { setValue, options, currentIndex } = useStepper();
  const noOptions = options.length === 0;
  const maxIndex = options.length - 1;

  return (
    <PlusButton
      {...props}
      type="button"
      onClick={() => setValue(Math.min(currentIndex + 1, maxIndex))}
      disabled={disabled || noOptions || currentIndex === maxIndex}
      tabIndex={-1}
      aria-hidden="true"
      width={36}
      height={36}
    >
      <PlusIcon size={20} />
    </PlusButton>
  );
}

type Props = {
  /** The options to cycle through */
  options: Array<number>;

  /** The value to start at */
  defaultValue?: number;

  /** Function called with updated value when value changes */
  onChange?: (arg0: number) => void;

  /** Controlled value */
  value?: number;

  /** The value aria label */
  ariaLabel: string;
} & VariantProp &
  DisabledProp;

// https://www.w3.org/TR/wai-aria-1.1/#spinbutton
function Stepper({
  options = [],
  onChange,
  value,
  defaultValue = options[0],
  ariaLabel,
  variant = "primary",
  disabled = false,
  ...rest
}: Props) {
  const [_value, _setValue] = React.useState(defaultValue);

  const internalValue = value !== undefined ? value : _value;

  // useCallback stops the function being recreated every render
  // since we're passing it via context we need it to be consistent
  const setValue = React.useCallback(
    (newIndex: number) => {
      const newValue = options[newIndex];

      // always call onChange if we have it to inform parent of state updates
      if (onChange) {
        onChange(newValue);
      }
      // only update internal state if the component isn't controlled
      if (value === undefined) {
        _setValue(newValue);
      }
    },
    [value, onChange, options],
  );

  // we need the index to inc/dec when the user interacts
  // only recalculate when options/value change since this might get expensive
  const currentIndex = React.useMemo(
    () => options.indexOf(internalValue),
    [options, internalValue],
  );

  // Only recreate context value when the values we're passing change
  // otherwise context consumers all re-render every render of this comp
  const context = React.useMemo(
    () => ({
      options,
      setValue,
      internalValue,
      currentIndex,
    }),
    [options, setValue, internalValue, currentIndex],
  );

  return (
    <StepperContext.Provider value={context}>
      <Wrapper {...rest} disabled={disabled}>
        <Decrement disabled={disabled} variant={variant} />
        <Value disabled={disabled} ariaLabel={ariaLabel} />
        <Increment disabled={disabled} variant={variant} />
      </Wrapper>
    </StepperContext.Provider>
  );
}

export default Stepper;

type VariantProp = {
  variant?: "primary" | "secondary";
};

type DisabledProp = {
  disabled?: boolean;
};

type PropsAndTheme = VariantProp & {
  theme: Theme;
};

const borderWidth = 1;
const valueDimension = 36;

const Wrapper = styled.div<DisabledProp>`
  ${elevation.level1};
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  padding: calc(${spacing.lounge} - ${borderWidth}px);
  border: ${({ theme }) => `${borderWidth}px solid ${theme.base.border}`};
  border-radius: ${spacing.arena};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "default")};
`;

const disabledStyles = css<DisabledProp>`
  color: ${({ disabled, theme }) =>
    disabled ? theme.base.border : theme.text.primary};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "default")};
`;

const Option = styled.span<DisabledProp>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${valueDimension}px;
  height: ${valueDimension}px;
  margin: 0 ${spacing.lounge};
  ${textStyle.boising}
  border-radius: ${spacing.lounge};
  text-align: center;
  background-color: ${({ theme }) => theme.base.bgAlt};
  ${disabledStyles}
`;

const buttonStyles = css`
  border: 1px solid;
  border-radius: 50%;
  outline: 0; /* Buttons should not be focusable */
  touch-action: manipulation; /* Disable double tap to zoom on mobile */

  &:disabled {
    border: 1px solid transparent;
    cursor: not-allowed;
  }

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const variantStyles = ({ variant, theme }: PropsAndTheme) => {
  const primaryBg = theme._buttons.primary.backgroundColor;
  const darkBg = dark(primaryBg);
  const darkerBg = darker(primaryBg);

  switch (variant) {
    case "secondary":
      return css`
        border-color: transparent;
        color: ${primaryBg};
        background-color: transparent;

        &:disabled {
          color: ${theme.base.border};
        }

        &:not(:disabled):hover {
          border-color: ${primaryBg};
          color: ${theme.text.inverse};
          background-color: ${primaryBg};
        }

        &:not(:disabled):active {
          border-color: ${darkBg};
          color: ${theme.text.inverse};
          background-color: ${darkBg};
        }
      `;
    case "primary":
    default:
      return css`
        border-color: ${primaryBg};
        color: ${theme._buttons.primary.color};
        background-color: ${primaryBg};

        &:disabled {
          border-color: ${theme.base.borderLight};
          color: ${theme.base.borderDark};
          background-color: ${theme.base.borderLight};
        }

        &:not(:disabled):hover {
          border-color: ${darkBg};
          background-color: ${darkBg};
        }

        &:not(:disabled):active {
          border-color: ${darkerBg};
          background-color: ${darkerBg};
        }
      `;
  }
};

const MinusButton = styled(IconButton)`
  ${buttonStyles};
  border-color: transparent;
  color: ${({ theme }) => theme._buttons.primary.backgroundColor};
  background-color: transparent;

  &:disabled {
    color: ${({ theme }) => theme.base.border};
  }
`;

const PlusButton = styled(IconButton)`
  ${buttonStyles};
  ${variantStyles}
`;
