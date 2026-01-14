import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import RadioButton from "..";
import styled from "styled-components";

const meta: Meta<typeof RadioButton> = {
  component: RadioButton,
  title: "Components/RadioButton",
  args: {
    id: "radio",
    label: "Select this option",
    disabled: false,
    screenReaderErrorPrefix: "",
    errorMessage: "",
  },
  argTypes: {
    onChange: { action: "Clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const RadioGroup: Story = {
  render: function Render() {
    return (
      <Fieldset>
        <legend>Choose Organization</legend>
        <RadioButton
          name="choose-org"
          id="ticketmaster-1"
          label="Ticketmaster"
          value="tm"
          screenReaderErrorPrefix="Error:"
        />
        <RadioButton
          name="choose-org"
          id="livenation-1"
          label="LiveNation"
          value="ln"
          screenReaderErrorPrefix="Error:"
        />
      </Fieldset>
    );
  },
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
  ...RadioGroup,
  globals: {
    addonRtl: "rtl",
  },
};

const Fieldset = styled.fieldset`
  display: grid;
  gap: 0.5rem;
`;
