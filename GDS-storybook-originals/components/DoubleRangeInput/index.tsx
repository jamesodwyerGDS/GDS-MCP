"use client";
import React, { ChangeEvent, useState } from "react";
import styled, { css } from "styled-components";
import InputValue from "./InputValue";
import VisuallyHidden from "../utils/VisuallyHidden";
import { spacing, textStyle } from "../../dimensions";
import { Range } from "./Range";
import ErrorMessage from "../ErrorMessage";

type DoubleRangeInputProps = {
  /** boolean to check if range is disabled
   * @default false
   */
  disabled?: boolean;
  /** boolean to check for an error with the max input value
   * @default false
   */
  errorMax?: boolean;
  /** boolean to check for an error with the min input value
   * @default false
   */
  errorMin?: boolean;
  /** string to identify what errored with the max input value
   * @default ''
   */
  errorMaxMessage?: string | JSX.Element;
  /** string to identify what errored with the min input value
   * @default ''
   */
  errorMinMessage?: string | JSX.Element;
  /** function to format the input values (i.e. adding a currency symbol) */
  formatValue?: (value: number, type: "min" | "max") => void;
  /** Visually hidden prefix announced to screen readers before the error message (e.g., "Error: "). */
  screenReaderErrorPrefix: string;
  /** string to identify the double range input by */
  id: string;
  /** number that determines the length of the input box
   * @default 4
   */
  inputSize?: number;
  /** max number set for the start value of the range
   * @default 100
   */
  max?: number;
  /**
   * Label for the end of the selected range.
   *
   * Used as the visible label for the max input,
   * rendered in a DOM element referenced by the slider thumb via aria-labelledby,
   * and included in a polite aria-live region for screen reader announcements.
   *
   * * If slider is used for pricing, include <VisuallyHidden>in {currency}</VisuallyHidden>
   */
  maxLabel: string | JSX.Element;
  /** min number set for the start value of the range
   * @default 0
   */
  min?: number;
  /**
   * Label for the start of the selected range.
   *
   * Used as the visible label for the min input,
   * rendered in a DOM element referenced by the slider thumb via aria-labelledby,
   * and included in a polite aria-live region for screen reader announcements.
   *
   * * If slider is used for pricing, include <VisuallyHidden>in {currency}</VisuallyHidden>
   */
  minLabel: string | JSX.Element;
  /** number to increment the range by
   * @default 1
   */
  step?: number;

  /** Currently selected range. When specified, makes the component a controlled component */
  value?: [start: number, end: number];

  /** Called with the new range when the range changes */
  onChange?: (value: [number, number]) => void;

  /** Parses the text entered into the input fields into a number. Defaults to (str) => Number(str) */
  parseValue?: (value: string | number) => number;

  /**
   * Renders a legend for the content of its parent fieldset
   *
   * **Note: Optional for now, but will be made into a required prop in the next major release**
   */

  legend?: string;

  /**
   * Called when an invalid value is entered in either input.
   *
   * @param attemptedRange - The attempted range as [min, max] when the user enters an invalid value.
   *
   * Example: If the min input is invalid, attemptedRange will be [enteredMin, currentMax].
   * If the max input is invalid, attemptedRange will be [currentMin, enteredMax].
   */
  onInvalidValue?: (attemptedRange?: [number, number]) => void;
};

function DoubleRangeInput({
  disabled = false,
  errorMax = false,
  errorMin = false,
  errorMaxMessage = "",
  errorMinMessage = "",
  screenReaderErrorPrefix,
  formatValue,
  id,
  inputSize = 4,
  legend,
  max = 100,
  maxLabel,
  min = 0,
  minLabel,
  onChange,
  onInvalidValue,
  parseValue,
  step = 1,
  value,
  ...rest
}: DoubleRangeInputProps) {
  // We allow the component to be used both as a controlled component when
  // `value` is passed in, and as an uncontrolled component when it is not.
  const [rangeState, setRangeState] = useState([min, max] as const);
  const [minValue, maxValue] = value ?? rangeState;

  const onRangeUpdate = (newValue: [number, number]) => {
    onChange?.(newValue);

    // If used as an uncontrolled component, we update the internal state
    if (value == null) {
      setRangeState(newValue);
    }
  };

  const onHandChange =
    (start: boolean) =>
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const inputValue = parseFloat(target.value);
      const newValue: [number, number] = start
        ? [Math.min(inputValue, maxValue), maxValue]
        : [minValue, Math.max(inputValue, minValue)];

      onRangeUpdate(newValue);
    };

  // calculates the position of each hand in the range
  const start = React.useMemo(
    () => 100 * ((minValue - min) / (max - min)) + "%",
    [minValue, min, max],
  );
  const end = React.useMemo(
    () => 100 * ((max - maxValue) / (max - min)) + "%",
    [maxValue, min, max],
  );

  const inputValueProps = {
    disabled,
    formatValue,
    initialMax: max,
    initialMin: min,
    inputSize,
    max: maxValue,
    min: minValue,
    onInvalidValue,
    parseValue,
    setRange: onRangeUpdate,
    screenReaderErrorPrefix,
  };

  const minError = errorMin || errorMinMessage;
  const maxError = errorMax || errorMaxMessage;

  return (
    <FieldSet>
      {legend ? <Legend>{legend}</Legend> : null}
      <Container id={`${id}-range`}>
        <InputValue
          {...inputValueProps}
          describedBy={`${id}-min-error`}
          error={!!minError}
          id={`${id}-min-value`}
          isMinInput={true}
          label={minLabel}
          labelId={`${id}-min-label`}
        />
        <Wrapper {...rest}>
          <MinRange
            aria-labelledby={`${id}-min-label`}
            disabled={disabled}
            id={`${id}-min`}
            max={max}
            min={min}
            onChange={onHandChange(true)}
            step={step}
            type="range"
            value={minValue}
            $isValueAtMax={minValue === max}
          />
          <RangeTrack />
          <Indicator
            $disabled={disabled}
            style={{ insetInlineStart: start, insetInlineEnd: end }}
          />
          <MaxRange
            aria-labelledby={`${id}-max-label`}
            disabled={disabled}
            id={`${id}-max`}
            max={max}
            min={min}
            onChange={onHandChange(false)}
            step={step}
            type="range"
            value={maxValue}
            $isValueAtMax={maxValue === max}
          />
        </Wrapper>
        <InputValue
          {...inputValueProps}
          describedBy={`${id}-max-error`}
          error={!!maxError}
          isMinInput={false}
          id={`${id}-max-value`}
          label={maxLabel}
          labelId={`${id}-max-label`}
        />
      </Container>
      <VisuallyHidden aria-live="polite">
        {minLabel}: {minValue}, {maxLabel}: {maxValue}
      </VisuallyHidden>
      <div role="status" aria-live="polite">
        {errorMin || errorMinMessage ? (
          <StyledErrorMessage
            id={`${id}-min-error`}
            screenReaderErrorPrefix={screenReaderErrorPrefix}
          >
            {errorMinMessage}
          </StyledErrorMessage>
        ) : null}
        {errorMax || errorMaxMessage ? (
          <StyledErrorMessage
            id={`${id}-max-error`}
            screenReaderErrorPrefix={screenReaderErrorPrefix}
          >
            {errorMaxMessage}
          </StyledErrorMessage>
        ) : null}
      </div>
    </FieldSet>
  );
}

export default DoubleRangeInput;

const Container = styled.div`
  display: flex;
  gap: ${spacing.club};
  align-items: flex-start;
  width: 100%;
  min-width: 210px;
`;

// We use `z-index: 0` to make sure the z-index of the child components leak outside and end up on top of other components
const Wrapper = styled.div`
  position: relative;
  top: ${spacing.hall};
  z-index: 0;
  display: flex;
  flex: 1;
  align-items: center;
  height: 1.5rem;

  @media (forced-colors: active) {
    flex-wrap: wrap;
    height: auto;
  }
`;

const positionStyles = css`
  position: absolute;
  top: 0;
  inset-inline-start: 0;
  display: block;
  width: 100%;

  &::-webkit-slider-thumb {
    position: relative;
  }

  &::-moz-range-thumb {
    transform: scale(1);
  }

  @media (forced-colors: active) {
    position: static;
    top: auto;
    inset-inline-start: auto;

    &::-webkit-slider-thumb {
      position: static;
    }

    &::-moz-range-thumb {
      transform: none;
    }
  }
`;

const MinRange = styled(Range)<{ $isValueAtMax: boolean }>`
  ${positionStyles};

  /* stylelint-disable-next-line at-rule-prelude-no-invalid -- Firefox specific styling */
  @-moz-document url-prefix() {
    z-index: ${({ $isValueAtMax }) => ($isValueAtMax ? 3 : 2)};
    &::-moz-range-progress,
    &::-moz-range-track {
      visibility: hidden;
    }
  }

  &::-webkit-slider-thumb {
    z-index: 2;
  }

  &::-moz-range-thumb {
    z-index: 2;
    pointer-events: all;
  }

  @media (forced-colors: active) {
    &::-webkit-slider-thumb {
      z-index: auto;
    }
    &::-moz-range-thumb {
      z-index: auto;
    }
  }
`;

const MaxRange = styled(Range)<{ $isValueAtMax: boolean }>`
  ${positionStyles};

  /* stylelint-disable-next-line at-rule-prelude-no-invalid -- Firefox specific styling */
  @-moz-document url-prefix() {
    z-index: 2;
    pointer-events: none;
    &::-moz-range-progress,
    &::-moz-range-track {
      visibility: hidden;
    }
  }

  &::-webkit-slider-thumb {
    z-index: ${({ $isValueAtMax }) => ($isValueAtMax ? 1 : 2)};
  }

  &::-moz-range-thumb {
    z-index: 2;
    pointer-events: all;
  }

  @media (forced-colors: active) {
    &::-webkit-slider-thumb {
      z-index: auto;
    }
    &::-moz-range-thumb {
      z-index: auto;
    }
  }
`;

const Indicator = styled.span<{ $disabled: boolean }>`
  position: absolute;
  z-index: 1;
  height: ${spacing.lounge};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.base.bgInverse};
  pointer-events: none; /* allow the track below to be clicked */

  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      background-color: ${theme.base.border};
    `}

  @media (forced-colors: active) {
    position: static;
    z-index: auto;
    height: auto;
    background-image: none;
    box-shadow: none;
  }
`;

const RangeTrack = styled.span`
  display: none;

  /* stylelint-disable-next-line at-rule-prelude-no-invalid -- Decorative requirement for Firefox to display the range backing line */
  @-moz-document url-prefix() {
    display: block;
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.base.border};
  }
`;

const FieldSet = styled.fieldset`
  width: 100%;
  padding: 0;
  border: none;
`;

const Legend = styled.legend`
  ${textStyle.snowdon};
  padding-bottom: ${spacing.lounge};
  padding-inline-start: 0;
  color: ${({ theme }) => theme.text.secondary};
`;

const StyledErrorMessage = styled(ErrorMessage)`
  padding-top: ${spacing.lounge};
`;
