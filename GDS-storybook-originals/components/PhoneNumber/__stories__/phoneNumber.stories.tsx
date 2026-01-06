import { Meta } from "@storybook/react-webpack5";
import countries from "../../CountryPicker/data";
import PhoneNumber from "..";
import { allCodesToFlags } from "../../../flag-icons/allCodesToFlags";

const countriesWithFlags = countries.map((country) => ({
  ...country,
  icon: allCodesToFlags[country.countryCode],
}));

const meta: Meta<typeof PhoneNumber> = {
  component: PhoneNumber,
  title: "Components/PhoneNumber",
  args: {
    required: false,
    placeholder: "",
    defaultSelectedCountry: countriesWithFlags.find(
      (c) => c.countryCode == "GB",
    ),
    countries: countriesWithFlags,
    label: "Contact Number",
    labelDialCode: "Dial code",
    labelSearchForDialCode: "Search for Dial code",
    screenReaderErrorPrefix: "",
    errorMessage: "",
  },
};

export default meta;

export const Basic = {
  args: {
    defaultSelectedCountry: undefined,
  },
};
export const WithDefaultPhoneNumber = {
  args: {
    defaultSelectedCountry: countriesWithFlags.find(
      (c) => c.countryCode == "NL",
    ),
    defaultPhoneNumber: "613869682",
  },
};

export const WithNoFlagIcons = {
  args: {
    countries,
    defaultSelectedCountry: countries.find((c) => c.countryCode == "GB"),
  },
};

export const WithDefault = {};

/**
 * `errorMessage` displays an inline validation message.
 * `screenReaderErrorPrefix` is a visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").
 */
export const WithError = {
  args: {
    screenReaderErrorPrefix: "Error:",
    errorMessage: "Number cannot be empty",
  },
};

export const Disabled = {
  args: { disabled: true },
};

export const ReadOnly = {
  args: { disabled: true, fullNumberDefault: "1235243230" },
};

export const RTL = {
  globals: {
    addonRtl: "rtl",
  },
};
