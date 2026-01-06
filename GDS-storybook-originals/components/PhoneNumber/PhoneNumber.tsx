"use client";
import InputField from "../InputField";
import VisuallyHidden from "../utils/VisuallyHidden";
import ChevronIcon from "../../icons/dist/ChevronIcon";
import { CheckmarkIcon, MagnifyingGlassIcon } from "../../icons";
import { matchSorter, rankings } from "match-sorter";
import React, {
  ReactNode,
  startTransition,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Combobox,
  ComboboxItem,
  ComboboxList,
  ComboboxProvider,
  Select,
  SelectItem,
  SelectLabel,
  SelectPopover,
  SelectProvider,
  useSelectStore,
  useStoreState,
} from "@ariakit/react";
import styled from "styled-components";
import { buttonreset } from "../../utils/snippets";
import { elevation, minTapSize, spacing, textStyle } from "../../dimensions";
import { browserDefaultFocus } from "../../utils/focus";
import { usePortalElement } from "../../hooks/usePortalElement";

type Country = {
  name: string;
  countryCode: string;
  dialCode: string;
  stateFieldRequired: boolean;
  icon?: ReactNode;
};

type Props = {
  name?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  fullNumberDefault?: string;
  countries: Array<Country>;
  defaultSelectedCountry?: Country;
  defaultPhoneNumber?: string;
  onChange?: (value: string, dialCode?: string, phoneNumber?: string) => void;
  /** Visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").*/
  screenReaderErrorPrefix: string;
  errorMessage?: string;
  refTel?: React.ForwardedRef<HTMLInputElement>;
  label: React.ReactNode;
  labelDialCode: string;
  labelSearchForDialCode: string;
} & Omit<React.ComponentPropsWithoutRef<"input">, "onChange">;

const removeWhiteSpaces = (text: string) => {
  return text.replace(/\s/g, "");
};

const PhoneNumber = ({
  name,
  className,
  required,
  disabled = false,
  fullNumberDefault,
  countries,
  defaultSelectedCountry,
  defaultPhoneNumber,
  onChange,
  screenReaderErrorPrefix,
  errorMessage,
  refTel,
  label,
  labelDialCode,
  labelSearchForDialCode,
  ...rest
}: Props) => {
  const portalElement = usePortalElement();
  const id = useId();
  const inputRowRef = useRef<HTMLDivElement>(null);
  const [dialCodeSearchValue, setDialCodeSearchValue] = useState("");
  const filteredCountries = useMemo(() => {
    return matchSorter(countries, dialCodeSearchValue, {
      keys: ["name", "dialCode"],
      threshold: rankings.ACRONYM,
    });
  }, [countries, dialCodeSearchValue]);

  const [phoneNumberState, setPhoneNumberState] = useState(() => {
    const defaultCountryElseUSAElseFirstOne =
      defaultSelectedCountry ??
      filteredCountries.find((c) => c.countryCode == "US") ??
      filteredCountries[0];

    return {
      ...defaultCountryElseUSAElseFirstOne,
      dialCode: removeWhiteSpaces(defaultCountryElseUSAElseFirstOne.dialCode),
      fullNumber: fullNumberDefault ?? "",
      localNumber: defaultPhoneNumber ?? "",
    };
  });

  const handleChangeRestOfPhoneNumber = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const cleanedInput = event.currentTarget.value.replace(/\D/g, ""); // only digits allowed.
    const fullNumber = phoneNumberState.dialCode + cleanedInput;
    const localNumber = cleanedInput;
    const dialCode = phoneNumberState.dialCode;

    setPhoneNumberState((prev) => ({
      ...prev,
      fullNumber: fullNumber,
      localNumber: localNumber,
    }));

    if (onChange) {
      onChange(fullNumber, dialCode, localNumber);
    }
  };

  const handleDialCodeChange = (countryCode: string) => {
    const selectedCountry = countries.find(
      (country) => country.countryCode === countryCode,
    ) as Country;
    const cleanedDialCode = removeWhiteSpaces(selectedCountry.dialCode);
    const fullNumber = cleanedDialCode + phoneNumberState.localNumber;
    const localNumber = phoneNumberState.localNumber;
    const dialCode = cleanedDialCode;

    setPhoneNumberState((prev) => ({
      ...prev,
      ...selectedCountry,
      dialCode,
      fullNumber: fullNumber,
    }));

    if (onChange) {
      onChange(fullNumber, dialCode, localNumber);
    }
  };

  const fullNumberWhenDisabled = fullNumberDefault
    ? `+${fullNumberDefault}`
    : "";

  /* When read-only, it means it's disabled but has a value (phone number) passed in,
  in which case, we remove the country picker input because (for now) we do not extract the country
  dial code from the full number, we just display the number as a whole.
  In the case the PhoneNumber component is disabled but no value is provided, we do show the
  country picker input and an empty input for the rest of the number.
   */
  const isReadOnly = disabled && !!fullNumberDefault;
  const selectStore = useSelectStore({
    defaultValue: phoneNumberState.countryCode,
  });

  const isOpen = useStoreState(selectStore, "open");

  return (
    <InputField id={id} as="fieldset" className={className}>
      <InputField.Label disabled={disabled}>{label}</InputField.Label>
      <RowInputField
        $disabled={disabled}
        $error={!!errorMessage}
        ref={inputRowRef}
      >
        {!isReadOnly && (
          <ComboboxProvider
            resetValueOnHide
            value={dialCodeSearchValue}
            setValue={(value) => {
              startTransition(() => {
                setDialCodeSearchValue(value);
              });
            }}
          >
            <SelectProvider setValue={handleDialCodeChange} store={selectStore}>
              <SelectLabel
                id={`${id}-select-label`}
                render={(props) => <VisuallyHidden {...props} />}
              >
                {labelDialCode}
              </SelectLabel>
              <DialCodeSelect disabled={disabled}>
                {phoneNumberState.icon}
                {phoneNumberState.dialCode}
                <StyledChevronIcon />
              </DialCodeSelect>
              <DialCodeSelectPopover
                portal
                portalElement={portalElement}
                gutter={4}
                sameWidth
                // Ref: https://ariakit.org/reference/select-popover#getanchorrect
                getAnchorRect={() => {
                  if (!inputRowRef.current) {
                    return null;
                  }
                  return inputRowRef.current.getBoundingClientRect();
                }}
              >
                <Combobox
                  autoSelect
                  placeholder={labelDialCode}
                  render={({ ref, ...restOfProps }) => (
                    <InputField id={`${id}-search`}>
                      {labelSearchForDialCode && (
                        <VisuallyHidden>
                          <InputField.Label>
                            {labelSearchForDialCode}
                          </InputField.Label>
                        </VisuallyHidden>
                      )}
                      <DialCodeInputWrapper>
                        <MagnifyingGlassIconWrapper>
                          <MagnifyingGlassIcon
                            fillColor="primary"
                            size="1.25em"
                          />
                        </MagnifyingGlassIconWrapper>
                        <DialCodeInput {...restOfProps} inputRef={ref} />
                      </DialCodeInputWrapper>
                    </InputField>
                  )}
                />

                <DialCodesList aria-labelledby={`${id}-select-label`}>
                  {isOpen &&
                    filteredCountries.map((country) => {
                      return (
                        <StyledSelectItem
                          key={country.countryCode}
                          value={country.countryCode}
                          render={<ComboboxItem />}
                        >
                          <SelectItemContent>
                            {country.icon} {country.name}
                            <DialCodeText>{country.dialCode}</DialCodeText>
                            <StyledCheckMark size="1em" />
                          </SelectItemContent>
                        </StyledSelectItem>
                      );
                    })}
                </DialCodesList>
              </DialCodeSelectPopover>
            </SelectProvider>
          </ComboboxProvider>
        )}
        <PhoneNumberInput
          {...rest}
          name={name}
          type="tel"
          onChange={handleChangeRestOfPhoneNumber}
          pattern={`\\d{3,${15 - phoneNumberState.dialCode.length}}`}
          required={required}
          inputRef={refTel}
          value={
            disabled ? fullNumberWhenDisabled : phoneNumberState.localNumber
          }
          disabled={disabled}
        />
      </RowInputField>
      <InputField.Validation screenReaderErrorPrefix={screenReaderErrorPrefix}>
        {errorMessage}
      </InputField.Validation>
    </InputField>
  );
};

export default PhoneNumber;

const RowInputField = styled(InputField.Row)<{
  $disabled?: boolean;
  $error?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: ${spacing.lounge};
  border-color: ${(props) =>
    props.$error ? props.theme.status.danger : props.theme.base.borderDark};
  border-style: solid;
  border-width: ${(props) => (props.$error ? "2px" : "1px")};
  border-radius: 2px;
  background-color: ${(props) =>
    props.$disabled ? props.theme.base.borderLight : props.theme.base.bg};

  &:hover {
    border-color: ${({ theme }) => theme.colors.highlight};
  }

  &:focus-within {
    ${browserDefaultFocus}
    outline-offset: -2px;
  }
`;

const PhoneNumberInput = styled(InputField.Input)`
  padding-inline-end: ${spacing.club};
  border: 0;

  &:focus {
    outline: none;
  }

  &:disabled {
    /* The PhoneNumberInput is only rendered when in the read-only state, where we
           want the phone number text to be accessible so not the typical 50% opacity */
    color: ${(props) => props.theme.text.primary};
  }
`;

const DialCodeSelect = styled(Select)`
  ${buttonreset};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 13ch;
  /* Same as the input */
  height: ${minTapSize};
  margin: 2px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.colors.base.bgAlt};

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.base.borderMidtone};
  }
`;

const StyledChevronIcon = styled(ChevronIcon)`
  ${DialCodeSelect}[aria-expanded="true"] & {
    transform: rotate(-180deg);
  }
`;

const DialCodeSelectPopover = styled(SelectPopover)`
  ${elevation.level3};
  margin: ${spacing.lounge} 0 0;
  border: 1px solid ${(props) => props.theme.base.borderDark};
  border-radius: 2px;
  background-color: ${(props) => props.theme.base.bg};
  transform: translateY(-3%);
  opacity: 0;
  transition: all 200ms cubic-bezier(0.3, 0, 0.2, 1);

  &[data-enter] {
    transform: translateY(0);
    opacity: 1;
  }
`;

const DialCodeInputWrapper = styled.div`
  display: flex;
  border-bottom: ${(props) =>
    `1px solid ${props.theme.colors.base.borderMidtone}`};
  border-radius: 2px 2px 0 0;
  background-color: ${(props) => props.theme.colors.base.bg};

  &:disabled {
    background-color: ${(props) => props.theme.colors.base.borderMidtone};
  }

  &:focus-within {
    ${browserDefaultFocus}
    outline-offset: -1px;
  }
`;

const DialCodeInput = styled(InputField.Input)`
  padding: 0;
  border: none;

  &:focus {
    outline: none;
  }
`;

const MagnifyingGlassIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6ch;
`;

const DialCodesList = styled(ComboboxList)`
  max-height: min(var(--popover-available-height, 300px), 300px);
  padding: ${spacing.club};
  overflow-y: auto;
`;

const SelectItemContent = styled.div`
  ${textStyle.etna}
  display: flex;
  gap: ${spacing.club};
  align-items: center;
  justify-content: flex-start;
  padding: ${spacing.club};
  border-radius: 0;
`;

const StyledSelectItem = styled(SelectItem)`
  padding: 2px;
  user-select: none;

  &[aria-selected="true"] ${SelectItemContent} {
    color: ${(props) => props.theme.text.inverse};
    background-color: ${(props) => props.theme.base.primary};
  }

  &:not([aria-selected="true"]):hover ${SelectItemContent} {
    background-color: ${(props) => props.theme.base.bgAlt};
  }

  &[data-focus-visible="true"] {
    ${browserDefaultFocus}
    outline-offset: -1px;
  }
`;

const DialCodeText = styled.span`
  ${textStyle.boising};
`;

const StyledCheckMark = styled(CheckmarkIcon)`
  display: none;
  margin-inline-start: auto;

  ${StyledSelectItem}[aria-selected="true"] & {
    display: revert;
  }
`;
