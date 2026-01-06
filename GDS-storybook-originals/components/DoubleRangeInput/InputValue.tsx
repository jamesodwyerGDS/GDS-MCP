import React, { useRef, useState } from "react";
import styled from "styled-components";
import InputField from "../InputField";
import { spacing, textStyle } from "../../dimensions";

type InputValueProps = {
  disabled?: boolean;
  describedBy?: string;
  error?: boolean;
  formatValue?: (value: number, type: "min" | "max") => void;
  id: string;
  initialMax: number;
  initialMin: number;
  inputSize?: number;
  isMinInput?: boolean;
  label: string | JSX.Element;
  labelId: string;
  max: number;
  min: number;
  onInvalidValue?: (attemptedRange?: [number, number]) => void;
  parseValue?: (value: string | number) => number;
  setRange: (range: [number, number]) => void;
};

const InputValue = ({
  id,
  error,
  formatValue,
  describedBy,
  disabled,
  initialMax,
  initialMin,
  inputSize,
  isMinInput = false,
  label,
  labelId,
  max,
  min,
  onInvalidValue,
  parseValue = (value) => Number(value),
  setRange,
}: InputValueProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [updateInput, setUpdateInput] = useState(false);
  const [value, setValue] = useState<number | string>(isMinInput ? min : max);

  const handleFocus = () => {
    setUpdateInput(true);
    setValue(`${isMinInput ? min : max}`);
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  };

  const isValidMinInput = (numericValue: number) => {
    return numericValue >= initialMin && numericValue <= max;
  };

  const isValidMaxInput = (numericValue: number) => {
    return numericValue <= initialMax && numericValue >= min;
  };

  const handleBlur = () => {
    const numericValue = parseValue(value);
    const isValidMin = isMinInput && isValidMinInput(numericValue);
    const isValidMax = !isMinInput && isValidMaxInput(numericValue);
    if (value) {
      if (isValidMin) {
        setRange([numericValue, max]);
      } else if (isValidMax) {
        setRange([min, numericValue]);
      } else if (
        onInvalidValue &&
        (!isValidMinInput(numericValue) || !isValidMaxInput(numericValue))
      ) {
        const attemptedRange: [number, number] = isMinInput
          ? [numericValue, max]
          : [min, numericValue];
        onInvalidValue(attemptedRange);
      }
    } else {
      setValue(isMinInput ? min : max);
    }
    setUpdateInput(false);
  };

  const finalValue = isMinInput ? min : max;

  return (
    <InputFieldContainer id={id}>
      <InputField.Row>
        <Input
          id={id}
          aria-describedby={describedBy}
          disabled={disabled}
          isErrored={error && !disabled}
          inputRef={inputRef}
          onBlur={handleBlur}
          onChange={(e) => setValue(e.target.value.replace(/[^0-9+.]/g, ""))}
          onFocus={handleFocus}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleBlur();
              inputRef.current?.blur();
            }
          }}
          size={inputSize}
          value={
            updateInput
              ? value
              : `${formatValue ? formatValue(finalValue, isMinInput ? "min" : "max") : finalValue}`
          }
        />
      </InputField.Row>
      <Label htmlFor={id} id={labelId} disabled={disabled}>
        {label}
      </Label>
    </InputFieldContainer>
  );
};

export default InputValue;

const InputFieldContainer = styled(InputField)`
  position: relative;
  max-width: 88px;
`;

const Input = styled(InputField.Input)`
  padding: 0px ${spacing.club};
  text-align: center;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Label = styled(InputField.Label)`
  ${textStyle.etna};
  margin-bottom: ${spacing.lounge};
  padding-top: ${spacing.lounge};
  text-align: start;
  overflow-wrap: break-word;
`;
