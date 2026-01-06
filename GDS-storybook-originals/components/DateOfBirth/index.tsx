"use client";
import * as React from "react";
import InputField from "../InputField";
import { Container, Input, Divider } from "./index.styles";

type InputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: fix this
  [key: string]: any;
};

type Props = {
  className?: string;
  required?: boolean;
  initialDate?: string;
  label: React.ReactNode;
  dayAriaLabel: string;
  monthAriaLabel: string;
  yearAriaLabel: string;
  dayProps?: InputProps;
  monthProps?: InputProps;
  yearProps?: InputProps;
  onChange?: (value: string) => void;
  /** Visually hidden prefix announced to screen readers before the error message (e.g., "Error: "). */
  screenReaderErrorPrefix: string;
  errorMessage?: string;
};

type State = {
  day: string;
  month: string;
  year: string;
};

class DateOfBirth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if (!props.initialDate) {
      this.state = {
        day: "",
        month: "",
        year: "",
      };
    } else {
      const initDate = new Date(props.initialDate);

      this.state = {
        day: padNum(initDate.getDate()),
        month: padNum(initDate.getMonth() + 1),
        year: padNum(initDate.getFullYear(), 4),
      };
    }
  }

  inputRefs = [
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
  ];

  moveFocus = (index: number = 0) => {
    const input = this.inputRefs[index].current;
    if (input) input.focus();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: fix this
  internalSetState = (update: any, cb: () => void) => {
    this.setState(update, () => {
      const { onChange } = this.props;
      if (onChange) {
        const stringDate = getStringDate(this.state);
        onChange(stringDate);
      }
      cb();
    });
  };

  handleChange =
    (index: number) =>
    ({ currentTarget: input }: React.SyntheticEvent<HTMLInputElement>) => {
      this.internalSetState({ [input.name]: input.value }, () => {
        if (input.value.length >= input.maxLength) {
          const nextInputIndex = index + 1;
          const finalInputFocused = nextInputIndex >= this.inputRefs.length;
          if (!finalInputFocused) this.moveFocus(nextInputIndex);
        }
      });
    };

  handleKeyDown =
    (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Backspace" && event.currentTarget.value.length === 0) {
        event.preventDefault();
        this.moveFocus(index - 1);
      }
    };

  render() {
    const [dayRef, monthRef, yearRef] = this.inputRefs;
    const {
      className,
      label,
      required,
      dayAriaLabel,
      monthAriaLabel,
      yearAriaLabel,
      dayProps,
      monthProps,
      yearProps,
      screenReaderErrorPrefix,
      errorMessage,
    } = this.props;
    const { day, month, year } = this.state;
    const maxDay = getMaxDay(this.state);
    return (
      <InputField
        as="fieldset"
        id={false}
        aria-describedby="dob-error"
        className={className}
      >
        <InputField.Label as="legend">{label}</InputField.Label>
        <Container marginTop="lounge" errorMessage={errorMessage}>
          <Input
            autoComplete="off"
            placeholder="dd"
            name="day"
            aria-label={dayAriaLabel}
            {...dayProps} // nothing below this should be overwritten
            required={required || someFieldsHaveValue(this.state)}
            value={day}
            onChange={this.handleChange(0)}
            ref={dayRef}
            type="number"
            pattern="[0-9]*"
            inputMode="numeric"
            min={1}
            max={maxDay}
            maxLength={2}
          />
          <Divider aria-hidden="true">/</Divider>
          <Input
            placeholder="mm"
            autoComplete="off"
            name="month"
            aria-label={monthAriaLabel}
            {...monthProps} // nothing below this should be overwritten
            required={required || someFieldsHaveValue(this.state)}
            value={month}
            onChange={this.handleChange(1)}
            onKeyDown={this.handleKeyDown(1)}
            ref={monthRef}
            type="number"
            pattern="[0-9]*"
            inputMode="numeric"
            min={1}
            max={12}
            maxLength={2}
          />
          <Divider aria-hidden="true">/</Divider>
          <Input
            placeholder="yyyy"
            autoComplete="off"
            name="year"
            aria-label={yearAriaLabel}
            {...yearProps} // nothing below this should be overwritten
            required={required || someFieldsHaveValue(this.state)}
            value={year}
            onChange={this.handleChange(2)}
            onKeyDown={this.handleKeyDown(2)}
            ref={yearRef}
            type="number"
            pattern="[0-9]*"
            inputMode="numeric"
            min={1900}
            max={new Date().getFullYear() - 1} // This will invalidate users between 0 and 1 year old. Seems reasonable!
            maxLength={4}
          />
        </Container>
        <InputField.Validation
          id="dob-error"
          screenReaderErrorPrefix={screenReaderErrorPrefix}
        >
          {errorMessage}
        </InputField.Validation>
      </InputField>
    );
  }
}

const padNum = (num: string | number, digits = 2) => {
  const stringNum = String(num);
  let pad = "";
  for (let i = 0; i < digits - 1; i++) {
    pad += "0";
  }
  return (pad + stringNum).slice(digits * -1);
};

const getStringDate = ({ day, month, year }: State): string => {
  const paddedDay = padNum(day);
  const paddedMonth = padNum(month);
  const paddedYear = padNum(year, 4);
  if (day && month && year) return `${paddedYear}-${paddedMonth}-${paddedDay}`;
  return "";
};

const getMaxDay = ({ month, year }: State): number => {
  const numMonth = parseInt(month, 10);
  const numYear = parseInt(year, 10);
  const leapYear = numYear
    ? numYear % 4 !== 0
      ? false
      : numYear % 100 !== 0
        ? true
        : numYear % 400 === 0
    : true;
  const thirty = [4, 6, 9, 11];
  const maxDay =
    numMonth === 2 ? (leapYear ? 29 : 28) : thirty.includes(numMonth) ? 30 : 31;
  return maxDay;
};

const someFieldsHaveValue = ({ day, month, year }: State) => {
  return [day, month, year].some(Boolean);
};

export default DateOfBirth;
