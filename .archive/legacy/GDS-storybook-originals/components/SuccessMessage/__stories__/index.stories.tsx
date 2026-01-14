import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import SuccessMessage from "..";
import InputField from "../../InputField";

const meta: Meta<typeof SuccessMessage> = {
  component: SuccessMessage,
  title: "Components/SuccessMessage",
  args: {
    children: "Everything is going to plan",
  },
};

export default meta;

type Story = StoryObj<typeof SuccessMessage>;

export const Basic: Story = {};

export const MultipleMessages: Story = {
  args: { children: undefined },
  render: (args) => (
    <InputField id="successMessage-story">
      <InputField.Label>Enter codes</InputField.Label>
      <InputField.Textarea defaultValue="Something Correct" />
      <SuccessMessage {...args}>Success</SuccessMessage>
      <SuccessMessage {...args}>Success Again!</SuccessMessage>
    </InputField>
  ),
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
