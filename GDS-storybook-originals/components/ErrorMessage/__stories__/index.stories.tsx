import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import ErrorMessage from "..";
import InputField from "../../InputField";

const meta: Meta<typeof ErrorMessage> = {
  component: ErrorMessage,
  title: "Components/ErrorMessage",
  args: {
    screenReaderErrorPrefix: "Error:",
    children: "There has been a terrible mistake",
  },
};

export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Basic: Story = {};

export const MultipleErrors: Story = {
  args: { children: undefined },
  render: (args) => (
    <InputField id="errorMessage-story">
      <InputField.Label>Enter codes</InputField.Label>
      <InputField.Textarea
        defaultValue="Code1 Code2Code2"
        aria-describedby="errorContainer"
        isErrored
      />
      <div id="errorContainer">
        <ErrorMessage {...args}>Code1 is too short</ErrorMessage>
        <ErrorMessage {...args}>Code2Code2 is too long </ErrorMessage>
      </div>
    </InputField>
  ),
};

export const LiveError: Story = {
  args: { screenReaderErrorPrefix: "Error:" },
  render: (args) => {
    const [value, setValue] = useState("");
    const hasError = value.length > 3;

    return (
      <InputField id="errorMessage-live-error-story">
        <InputField.Label>
          Enter more than 3 characters to trigger error
        </InputField.Label>
        <InputField.Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isErrored={hasError}
          aria-describedby="validationId"
        />

        <div role="status" aria-live="polite" id="validationId">
          {hasError && (
            <ErrorMessage
              screenReaderErrorPrefix={args.screenReaderErrorPrefix}
            >
              Please enter less than 3 characters
            </ErrorMessage>
          )}
        </div>
      </InputField>
    );
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
