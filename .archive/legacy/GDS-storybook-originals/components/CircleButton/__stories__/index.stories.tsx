import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import CircleButton from "..";
import {
  VenueIcon,
  TicketIcon,
  TrashcanIcon,
  CheckmarkIcon,
  CrossIcon,
} from "../../../icons";

const icons = ["No icon", "Trash Can", "Venue", "Checkmark", "Ticket"];
const iconsMapping = {
  "No icon": undefined,
  "Trash Can": <TrashcanIcon />,
  Venue: <VenueIcon />,
  Checkmark: <CheckmarkIcon />,
  Ticket: <TicketIcon />,
};

const meta: Meta<typeof CircleButton> = {
  title: "Components/CircleButton",
  component: CircleButton,
  args: {
    label: "Tells users of assistive technology what this button does",
    disabled: false,
    variant: "primary",
    size: "normal",
  },
  argTypes: {
    variant: { control: "radio" },
    size: { control: "radio" },
    icon: {
      control: "select",
      options: icons,
      mapping: iconsMapping,
    },
  },
};

export default meta;

type Story = StoryObj<typeof CircleButton>;

export const Basic: Story = {};

export const Primary: Story = {
  args: { label: "Primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", label: "Secondary" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary", label: "tertiary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", label: "ghost" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" },
};

export const Inverse: Story = {
  args: { variant: "inverse", label: "inverse" },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const InverseDisabled: Story = {
  args: { variant: "inverse", disabled: true, label: "inverse disabled" },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const Large: Story = {
  args: { size: "large" },
};

export const WithCheckmarkIcon: Story = {
  args: { icon: <CheckmarkIcon /> },
};

export const WithTrashIcon: Story = {
  args: { variant: "tertiary", icon: <TrashcanIcon /> },
};

export const WithCrossIcon: Story = {
  args: { variant: "ghost", icon: <CrossIcon /> },
};

export const WithBigIcon: Story = {
  args: {
    icon: <CheckmarkIcon size="2em" />,
  },
};

export const WithRotatedIcon: Story = {
  args: {
    variant: "tertiary",
    icon: <CheckmarkIcon size="1.5em" rotate="-90" />,
  },
};

export const Link: Story = {
  args: {
    href: "#",
    as: "a",
    icon: <CheckmarkIcon />,
  },
};

export const DisabledLink: Story = {
  args: {
    ...Link.args,
    "aria-disabled": "true",
  },
};

export const DisabledLinkInverse: Story = {
  args: {
    ...Link.args,
    variant: "inverse",
    label: "variant for dark backgrounds, disabled",
    "aria-disabled": "true",
  },
};
