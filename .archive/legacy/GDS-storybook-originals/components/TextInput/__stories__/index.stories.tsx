import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import TextInput from "..";
import WarningIcon from "../../../icons/dist/ExclamationMarkDiamondIcon";
import { CreditCardIcon } from "../../../icons";

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: "Components/TextInput",
  args: {
    id: "textinput-story",
    label: "Your name",
    placeholder: "",
    disabled: false,
    readOnly: false,
    required: true,
    screenReaderErrorPrefix: "",
    errorMessage: "",
    successMessage: "",
    "aria-describedby": "otherComponent",
    startIcon: undefined,
    endIcon: undefined,
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Basic = {};

export const WithClearButton = {
  args: {
    label:
      "Edit the value in the story's controls to hide and show the clear button",
    clearButtonLabel: "clear field",
    value: "test value",
  },
  argTypes: {
    onClearButtonClick: {
      action:
        "Clear button clicked! This should be wired up to a function that clears the value in the parent component state.",
    },
    onChange: { action: "onChange" },
  },
};

const link = (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid -- this doesnt matter here in the story
  <a href="#" target="_blank">
    link
  </a>
);

/**
 * `errorMessage` displays an inline validation message.
 * `screenReaderErrorPrefix` is a visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").
 */
export const WithLinkInError = {
  args: {
    screenReaderErrorPrefix: "Error:",
    errorMessage: <span>An error message with a {link} in it.</span>,
  },
};

export const WithStartIcon = {
  args: {
    label: "Card number",
    startIcon: <CreditCardIcon />,
  },
};

export const WithEndIcon = {
  args: {
    endIcon: <WarningIcon />,
  },
};

export const Disabled: Story = {
  args: {
    value: "This input is disabled",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    value: "This input is read-only",
    readOnly: true,
  },
};

export const RTL = {
  globals: {
    addonRtl: "rtl",
  },
};
