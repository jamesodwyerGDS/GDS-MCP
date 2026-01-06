import { Meta, StoryObj } from "@storybook/react-webpack5";
import Checkbox from "..";
import React from "react";
import { useArgs } from "storybook/preview-api";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Components/Checkbox",
  args: {
    id: "id-checkbox",
    label: "Check the box",
  },
  argTypes: {
    onChange: { action: "Checked" },
  },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();
    const toggle = () => updateArgs({ checked: !checked });

    return <Checkbox {...args} checked={checked} onChange={toggle} />;
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * `errorMessage` displays an inline validation message.
 * `screenReaderErrorPrefix` is a visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").
 *
 * #### Form Validation
 * For guidance on validation patterns, error messages (`screenReaderErrorPrefix`, `errorMessage`) , accessibility, and recommended ARIA usage when displaying validation errors, see [Form Validation](?path=/docs/patterns-form-validation--docs) under the **Patterns** section.
 */
export const WithErrorMessage: Story = {
  args: {
    screenReaderErrorPrefix: "Error:",
    errorMessage: "There's been a terrible mistake",
  },
};

export const ErrorWithoutMessage: Story = {
  args: {
    screenReaderErrorPrefix: "Error:",
    errorWithoutMessage: true,
    "aria-describedby": "external-error-message-id",
  },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
