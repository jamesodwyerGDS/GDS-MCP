import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import SelectInput from "..";
import { FiltersIcon } from "../../../icons";

const options = [
  { name: "United Kingdom", value: "GB" },
  { name: "United States", value: "US" },
  { name: "Germany", value: "DE" },
];

const meta: Meta<typeof SelectInput> = {
  component: SelectInput,
  title: "Components/SelectInput",
  args: {
    id: "selectinput-story",
    label: "Country",
    disabled: false,
    required: true,
    screenReaderErrorPrefix: "",
    errorMessage: "",
    "aria-describedby": "otherComponent",
  },
  render: (args) => (
    <SelectInput {...args}>
      {options.map(({ name, value }) => (
        <option key={name} value={value}>
          {name}
        </option>
      ))}
    </SelectInput>
  ),
};

export default meta;

type Story = StoryObj<typeof SelectInput>;

export const Basic: Story = {};

/** Use the `startIcon` prop to render an icon at the start of the input. The icon should be a React node. The colour and rotation can be adjusted to suit, but the size should stay consistent with the text.*/
export const WithStartIcon: Story = {
  args: { startIcon: <FiltersIcon /> },
};

/**
 * `errorMessage` displays an inline validation message.
 * `screenReaderErrorPrefix` is a visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").
 *
 * #### Form Validation
 * For guidance on validation patterns, error messages (`screenReaderErrorPrefix`, `errorMessage`) , accessibility, and recommended ARIA usage when displaying validation errors, see [Form Validation](?path=/docs/patterns-form-validation--docs) under the **Patterns** section.
 */
export const WithError: Story = {
  args: {
    screenReaderErrorPrefix: "Error:",
    errorMessage: "This is an error message",
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
