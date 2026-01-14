import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import InputField from "..";
import LoadingSpinner from "../../LoadingSpinner";
import { ChevronIcon, CreditCardIcon } from "../../../icons";
import ErrorMessage from "../../ErrorMessage";
import { spacing } from "../../../dimensions";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  args: {
    as: undefined,
    id: "firstName",
    screenReaderErrorPrefix: "",
  },
  tags: ["!dev"],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Basic: Story = {
  render: (args) => (
    <InputField {...args}>
      <InputField.Label>First name</InputField.Label>
      <InputField.Input style={{ marginTop: spacing.lounge }} />
    </InputField>
  ),
};

export const WithStartIcon: Story = {
  render: (args) => (
    <InputField {...args} id="firstName-3">
      <InputField.Label>Credit card number</InputField.Label>
      <InputField.Row marginTop="lounge">
        <InputField.StartIcon>
          <CreditCardIcon />
        </InputField.StartIcon>
        <InputField.Input value="a 16 digit number" />
      </InputField.Row>
    </InputField>
  ),
};

export const WithEndIcon: Story = {
  render: (args) => (
    <InputField {...args} id="firstName-3">
      <InputField.Label>First name</InputField.Label>
      <InputField.Row marginTop="lounge">
        <InputField.Input hasExtraPadding value="Logan" />
        <InputField.EndIcon>
          <LoadingSpinner />
        </InputField.EndIcon>
      </InputField.Row>
    </InputField>
  ),
};

/**
 * `errorMessage` displays an inline validation message.
 * `screenReaderErrorPrefix` is a visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").
 */
export const WithValidation: Story = {
  render: (args) => (
    <InputField {...args} id="firstName-3">
      <InputField.Label>First name</InputField.Label>
      <InputField.Row marginTop="lounge">
        <InputField.Input isErrored hasExtraPadding />
        <InputField.EndIcon>
          <LoadingSpinner />
        </InputField.EndIcon>
      </InputField.Row>
      <InputField.Validation screenReaderErrorPrefix="Error:">
        Please enter your first name
      </InputField.Validation>
    </InputField>
  ),
};

export const WithErrorMessages: Story = {
  render: (args) => (
    <InputField {...args} id="errorMessage-story">
      <InputField.Label>Enter codes</InputField.Label>
      <InputField.Textarea isErrored defaultValue="Code1 Code2Code2" />
      <ErrorMessage screenReaderErrorPrefix="Error:">
        Code1 is too short
      </ErrorMessage>
      <ErrorMessage screenReaderErrorPrefix="Error:">
        Code2Code2 is too long{" "}
      </ErrorMessage>
    </InputField>
  ),
};

export const TextArea: Story = {
  render: (args) => (
    <InputField {...args} id="firstName-4">
      <InputField.Label>First name</InputField.Label>
      <InputField.Textarea rows={5} style={{ marginTop: spacing.lounge }} />
    </InputField>
  ),
};

export const Select: Story = {
  render: (args) => (
    <InputField {...args} id="select-example">
      <InputField.Label>Job title</InputField.Label>
      <InputField.Row marginTop="lounge">
        <InputField.Select>
          <option>VP Engineering</option>
          <option>Senior Director of Engineering</option>
          <option>Director of Engineering</option>
          <option>Principal Engineer</option>
          <option>Lead Engineer</option>
          <option>Senior Engineer</option>
          <option>Engineer</option>
        </InputField.Select>
        <InputField.EndIcon>
          <ChevronIcon />
        </InputField.EndIcon>
      </InputField.Row>
    </InputField>
  ),
};

export const PillSelect: Story = {
  render: (args) => (
    <InputField {...args} id="select-example">
      <InputField.Row marginTop="lounge">
        <InputField.Select isPillVariant>
          <option>VP Engineering</option>
          <option>Senior Director of Engineering</option>
          <option>Director of Engineering</option>
          <option>Principal Engineer</option>
          <option>Lead Engineer</option>
          <option>Senior Engineer</option>
          <option>Engineer</option>
        </InputField.Select>
        <InputField.EndIcon>
          <ChevronIcon />
        </InputField.EndIcon>
      </InputField.Row>
    </InputField>
  ),
};

export const WithDescribedBy: Story = {
  render: (args) => (
    <div>
      <InputField {...args} id="firstName-5">
        <InputField.Label>First name</InputField.Label>
        <InputField.Input
          aria-describedby="hintText"
          style={{ marginTop: spacing.lounge }}
        />
      </InputField>
      <p id="hintText" style={{ fontSize: "14px" }}>
        Please enter your first name as it appears in your passport
      </p>
    </div>
  ),
};
