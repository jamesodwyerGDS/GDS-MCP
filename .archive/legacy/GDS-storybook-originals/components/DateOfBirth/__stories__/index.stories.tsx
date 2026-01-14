import DateOfBirth from "..";
import { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof DateOfBirth> = {
  component: DateOfBirth,
  title: "Components/DateOfBirth",
  args: {
    label: "Date of birth",
    dayAriaLabel: "birthday day",
    monthAriaLabel: "birthday month",
    yearAriaLabel: "birthday year",
    dayProps: { name: "new name" },
    monthProps: { name: "new name" },
    yearProps: { name: "new name" },
    initialDate: "1990-01-31",
    errorMessage: "",
    required: true,
  },
  argTypes: {
    onChange: { action: "onChange" },
  },
};

export default meta;

type Story = StoryObj<typeof DateOfBirth>;

export const Basic: Story = {};

/**
 * `errorMessage` displays an inline validation message.
 * `screenReaderErrorPrefix` is a visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").
 */
export const WithError: Story = {
  args: {
    initialDate: "2986-01-31",
    screenReaderErrorPrefix: "Error:",
    errorMessage: "Are you coming from the future?",
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
