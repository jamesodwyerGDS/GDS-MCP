import React from "react";
import TextAreaLimited from "..";
import { Meta, StoryObj } from "@storybook/react-webpack5";

const renderCharacterLimit = (limit: number) => {
  return `Characters Remaining: ${limit}`;
};

const meta: Meta<typeof TextAreaLimited> = {
  component: TextAreaLimited,
  title: "Components/TextAreaLimited",
  args: {
    id: "textareaLimited",
    label: "Put some information in here",
    rows: 5,
    placeholder: "Some placeholder text",
    disabled: false,
    readOnly: false,
    required: true,
    errorMessage: "",
    "aria-describedby": "otherComponent",
    characterLimit: 30,
    renderCharacterLimit,
  },
};

export default meta;

type Story = StoryObj<typeof TextAreaLimited>;

export const Basic: Story = {};

export const TranslatedCharacterLimit: Story = {
  args: {
    renderCharacterLimit: (limit: number) =>
      `Translated string displaying the limit (${limit}) using a suitable phrase`,
  },
};

export const StyledCharacterLimit: Story = {
  args: {
    renderCharacterLimit: (limit: number) => (
      <p>
        You have <span style={{ fontWeight: "bold" }}>{limit}</span> characters
        remaining
      </p>
    ),
  },
};

export const NoRenderCharacterLimit: Story = {
  args: {
    renderCharacterLimit: undefined,
  },
};

export const Disabled: Story = {
  args: {
    value: "This textarea is disabled",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    value: "This textarea is read-only",
    readOnly: true,
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
