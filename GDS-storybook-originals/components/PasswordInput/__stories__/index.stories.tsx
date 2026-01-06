import { Meta } from "@storybook/react-webpack5";
import PasswordInput from "..";

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
  title: "Components/PasswordInput",
  args: {
    id: "passwordinput-story",
    label: "Password",
    placeholder: "",
    showLabel: "Show",
    hideLabel: "Hide",
    disabled: false,
    readOnly: false,
    required: true,
    screenReaderErrorPrefix: "Error:",
    errorMessage: "",
    "aria-describedby": "otherComponent",
  },
};

export default meta;

export const Basic = {};

/**
 * `errorMessage` displays an inline validation message.
 * `screenReaderErrorPrefix` is a visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").
 *
 * #### Form Validation
 * For guidance on validation patterns, error messages (`screenReaderErrorPrefix`, `errorMessage`) , accessibility, and recommended ARIA usage when displaying validation errors, see [Form Validation](?path=/docs/patterns-form-validation--docs) under the **Patterns** section.
 */
export const WithError = {
  args: {
    screenReaderErrorPrefix: "Error:",
    errorMessage: "This is an error message",
  },
};

export const RTL = {
  globals: {
    addonRtl: "rtl",
  },
};
