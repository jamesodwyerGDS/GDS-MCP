"use client";

import React, {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { matchSorter, rankings } from "match-sorter";

import {
  Combobox,
  ComboboxProvider,
  useComboboxStore,
  VisuallyHidden,
} from "@ariakit/react";

import {
  ChevronIconWrapper,
  CountryNameInput,
  FlagWrapper,
  Popover,
  PopupCountriesList,
  Row,
  StyledChevronIcon,
  StyledIconButton,
  StyledSelectItem,
} from "./index.styles";

import InputField from "../InputField";
import { CrossIcon } from "../../icons";
import { allCodesToFlags } from "../../flag-icons/allCodesToFlags";
import { usePortalElement } from "../../hooks/usePortalElement";

export type Country = {
  id: string | number;
  name: string;
  [key: string]: unknown;
};

export type CountryPickerProps<T extends Country> = {
  countries: Array<T>;
  showFlag?: boolean;

  selectedItem?: T | null;

  /** The visual form element label  */
  label: React.ReactNode;
  /**
   * @default 'country-picker'
   */
  id?: string;
  /**
   * @default 'country'
   */
  name?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  /** The visually hidden a11y label in the button when Downshift is clearable and has a selected item  */
  labelClear: React.ReactNode;
  /**
   * @default false
   */
  required?: boolean;
  /** Visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").   */
  screenReaderErrorPrefix: string;
  /**
   * If set, the form field border colour will switch to red and the defined message will be displayed below the field
   */
  errorMessage?: React.ReactNode;
  onClear?: () => void;
  className?: string;
  /**
   * @default false
   */
  disabled?: boolean;
  /**
   * Toggles the `readOnly` attribute on the input field, which prevents typing in the field, but still allows to select options from the dropdown.
   * @default true
   */
  autocomplete?: boolean;
  /**
   * The property of the country object in the countries array that will be used as the Downshift and selected item visual display
   * The width of the Downshift is also altered by the value defined here (dialCode = 12ch, name = 100%)
   * @default 'name'
   * */
  visibleField?: "name" | "dialCode";

  /** id of element(s) that describe the country picker input */
  "aria-describedby"?: string;

  /**
   * Toggles the `clear` functionality, when set to false, the open/close buttons will be maintained on selection, no clear functionality and button will be suppressed
   * @default true
   * */
  canClearSelection?: boolean;
  onSelect?: (value: T | null) => void;

  popOverTranslateX?: string;
  isOpen?: boolean;
  /**
   * When set to false, the popover will be closed when the component is mounted
   * If set to true, the popover will be open
   * When set to false, the popover will be closed (useful for controlled components)
   * @default false
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Callback function that is called when the state of popover is changed from open to closed or vice versa
   */
};

const EMPTY_STATE: Country = {
  id: "",
  name: "",
};

const CountryPicker = <T extends Country>({
  countries,
  label,
  id = "country-picker",
  name = "country",
  selectedItem,
  inputRef,
  labelClear,
  required = false,
  screenReaderErrorPrefix,
  errorMessage,
  onSelect,
  onClear,
  className,
  visibleField = "name",
  disabled = false,
  autocomplete = true,
  canClearSelection = true,
  showFlag = false,
  popOverTranslateX,
  isOpen = false,
  onOpenChange,
  ...rest
}: CountryPickerProps<T>) => {
  const isUpdatingRef = useRef(false);
  const comboBoxRef = useRef<HTMLInputElement>(null);
  const inputFieldRef = useRef<HTMLDivElement>(null);

  const portalElement = usePortalElement();

  const [searchValue, setSearchValue] = useState<Country>({
    ...EMPTY_STATE,
    ...selectedItem,
  });

  const previousValidCountryRef = useRef<Country>(EMPTY_STATE);

  useEffect(() => {
    if (searchValue && countries.some((c) => c.id === searchValue.id)) {
      // If the searchValue is a valid country, update the previous valid country reference
      previousValidCountryRef.current = searchValue;
    }
  }, [searchValue, countries]);

  const isPickerClearable = !!searchValue.name && canClearSelection;

  const handleInputChange = useCallback(
    (value: string | string[]) => {
      if (!autocomplete) {
        return;
      }

      const code = Array.isArray(value) ? (value[0] ?? "") : value;

      const selectedCountry = countries.find(
        (country) => country.id === code,
      ) as T;

      // country not found yet
      if (!selectedCountry) {
        setSearchValue((prev) => ({
          ...prev,
          id: "",
          name: code,
          [visibleField]: code,
        }));
      } else {
        setSearchValue(selectedCountry);
      }
    },
    [autocomplete, countries, visibleField],
  );

  const onSelectValue = (value: string | string[]) => {
    // helper to prevent onBlur validation before onSelect is processed (iOS issue)
    isUpdatingRef.current = true;
    setTimeout(() => {
      const code = Array.isArray(value) ? (value[0] ?? "") : value;
      const selectedCountry = countries.find(
        (country) => country.id === code,
      ) as T;

      if (!selectedCountry) {
        return;
      }

      setSearchValue(selectedCountry);
      isUpdatingRef.current = false;

      if (onSelect) {
        onSelect(selectedCountry);
      }
    }, 0);
  };

  const comboboxStore = useComboboxStore({
    setOpen: onOpenChange,
    defaultSelectedValue: "",
    setSelectedValue: onSelectValue,
    setValue: handleInputChange,
  });

  // TODO: this shouldn't be the way to do it
  useEffect(() => {
    if (isOpen) {
      comboboxStore.show();
    } else {
      comboboxStore.hide();
    }
  }, [isOpen, comboboxStore]);

  const handleOnClearSelection = useCallback(() => {
    startTransition(() => {
      setSearchValue(EMPTY_STATE);
      comboboxStore.setValue("");
    });

    comboBoxRef.current?.focus();
  }, [comboboxStore]);

  const matches = useMemo(() => {
    if (!autocomplete) {
      return countries;
    }

    return matchSorter(countries, searchValue.name, {
      keys: [visibleField],
      threshold: rankings.ACRONYM,
    });

    // missing countries in deps to not make cache huge
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleField, searchValue.name]);

  const rowWidth = useMemo(() => {
    if (visibleField === "name") {
      return "100%";
    }

    return showFlag ? "14ch" : "12ch";
  }, [visibleField, showFlag]);

  const handleBlur = () => {
    //the setTimeout is needed to ensure that the Blur() event is fired after the onChange(), which only occurs on iOS devices
    setTimeout(() => {
      if (isUpdatingRef.current) {
        return;
      }
      // this reset is needed to prevent the input from being cleared when the user types a value that doesn't match any country
      // if the user types a value that doesn't match any country, we want to keep the previous valid country
      if (!countries.some((c) => c.id === searchValue.id)) {
        if (searchValue.name) {
          // If the searchValue is not empty, revert to the previous valid country
          setSearchValue(previousValidCountryRef.current);
        } else {
          // If the searchValue is empty, reset to EMPTY_STATE
          if (onSelect && !searchValue?.id) {
            setSearchValue(EMPTY_STATE);
            // Call onSelect with null if no valid country is selected
            // This is to ensure that the parent component can handle the case where no country is selected
            onSelect(null);
          }
        }
      }
    }, 0);
  };

  const handleFocus = () => {
    // set the cursor to the end of the input field when it is focused
    // the setTimeout is used to ensure that the input field is focused before setting the selection range
    setTimeout(() => {
      if (comboBoxRef.current) {
        const value = comboBoxRef.current.value;
        comboBoxRef.current.setSelectionRange(value.length, value.length);
      }
    }, 0);
  };

  return (
    <InputField id={id} className={className} ref={inputFieldRef}>
      <InputField.Label disabled={disabled}>{label}</InputField.Label>

      <Row width={rowWidth} marginTop="lounge">
        {showFlag && !!searchValue.id && (
          <FlagWrapper>{allCodesToFlags[searchValue.id]}</FlagWrapper>
        )}
        <ComboboxProvider store={comboboxStore}>
          <Combobox
            onBlur={handleBlur}
            disabled={disabled}
            render={(props) => (
              <CountryNameInput
                {...props}
                {...rest}
                onFocus={handleFocus}
                disabled={disabled}
                isErrored={!!errorMessage}
                name={name}
                autocomplete={autocomplete}
                showFlags={showFlag}
                selected={!!searchValue.id}
                required={required}
                value={`${searchValue[visibleField] || ""}`}
                ref={comboBoxRef}
              />
            )}
          />

          {!disabled && (
            <>
              {isPickerClearable ? (
                <StyledIconButton onClick={handleOnClearSelection} tabIndex={0}>
                  <VisuallyHidden>{labelClear}</VisuallyHidden>
                  <CrossIcon size="0.8em" />
                </StyledIconButton>
              ) : (
                <ChevronIconWrapper>
                  <StyledChevronIcon />
                </ChevronIconWrapper>
              )}
            </>
          )}

          {matches.length > 0 && (
            <Popover
              gutter={2}
              portal
              fixed
              portalElement={portalElement}
              sameWidth
              getAnchorRect={() => {
                if (!inputFieldRef.current) {
                  return null;
                }
                return inputFieldRef.current.getBoundingClientRect();
              }}
              $translateX={popOverTranslateX || "0"}
            >
              <PopupCountriesList>
                {matches.map((value) => (
                  <StyledSelectItem key={`${value.id}`} value={`${value.id}`}>
                    {showFlag &&
                      allCodesToFlags[`${value["countryCode"] || ""}`]}
                    {visibleField === "dialCode"
                      ? `${value.dialCode || ""} ${value.name}`
                      : `${value.name}`}
                  </StyledSelectItem>
                ))}
              </PopupCountriesList>
            </Popover>
          )}
        </ComboboxProvider>
      </Row>

      <InputField.Validation screenReaderErrorPrefix={screenReaderErrorPrefix}>
        {errorMessage}
      </InputField.Validation>
    </InputField>
  );
};

export default CountryPicker;
