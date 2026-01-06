import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Button from "..";
import CheckmarkIcon from "../../../icons/dist/CheckmarkIcon";
import TicketIcon from "../../../icons/dist/TicketIcon";
import WarningIcon from "../../../icons/dist/ExclamationMarkDiamondIcon";

const options = {
  colorVariant: ["primary", "secondary", "transaction", "tertiary", "inverse"],
  fillVariant: ["fill", "outline", "ghost"],
};

const icons = ["No icon", "Checkmark", "Ticket", "Warning"];
const iconsMapping = {
  "No icon": undefined,
  Checkmark: <CheckmarkIcon />,
  Ticket: <TicketIcon />,
  Warning: <WarningIcon />,
};

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Click Me!",
    disabled: false,
    hasChevron: false,
    fullWidth: false,
    loading: { isLoading: false, hiddenLoadingMessage: "Form Submitting..." },
  },
  argTypes: {
    colorVariant: {
      control: "radio",
      options: options.colorVariant,
    },
    fillVariant: {
      control: "radio",
      options: options.fillVariant,
    },
    endIcon: {
      control: "select",
      options: icons,
      mapping: iconsMapping,
    },
    startIcon: {
      control: "select",
      options: icons,
      mapping: iconsMapping,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {};

export const Secondary: Story = {
  args: { colorVariant: "secondary", children: "secondary" },
};

export const Tertiary: Story = {
  args: { colorVariant: "tertiary", children: "tertiary" },
};

export const Transaction: Story = {
  args: { colorVariant: "transaction", children: "transaction" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

export const Inverse: Story = {
  args: { colorVariant: "inverse", children: "inverse" },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const InverseDisabled: Story = {
  args: {
    colorVariant: "inverse",
    disabled: true,
    children: "inverse disabled",
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

export const Outline: Story = {
  args: {
    colorVariant: "transaction",
    fillVariant: "outline",
    children: "Transaction with outline",
  },
};

export const Ghost: Story = {
  args: { fillVariant: "ghost", children: "ghost" },
};

export const Loading: Story = {
  args: {
    loading: { isLoading: true, hiddenLoadingMessage: "Form Submitting..." },
  },
};

export const WithStartIcon: Story = {
  args: {
    startIcon: <CheckmarkIcon />,
  },
};

export const WithEndIcon: Story = {
  args: {
    endIcon: <CheckmarkIcon />,
  },
};

export const WithBigIcon: Story = {
  args: {
    startIcon: <CheckmarkIcon size="2em" />,
  },
  tags: ["!dev"],
};

export const WithRotatedIcon: Story = {
  args: {
    colorVariant: "secondary",
    endIcon: <CheckmarkIcon size="5em" rotate="-90" />,
  },
  tags: ["!dev"],
};

export const WithSmallIcon: Story = {
  args: { fillVariant: "ghost", endIcon: <CheckmarkIcon size="0.5em" /> },
  tags: ["!dev"],
};

export const Submit: Story = {
  args: { type: "submit", children: "Submit" },
};

export const Link: Story = {
  args: {
    href: "#",
    as: "a",
  },
};

export const DisabledLink: Story = {
  args: {
    ...Link.args,
    "aria-disabled": "true",
  },
};

export const WithChevron: Story = {
  args: {
    hasChevron: true,
    href: "#",
    endIcon: <CheckmarkIcon />, // is ignored
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
