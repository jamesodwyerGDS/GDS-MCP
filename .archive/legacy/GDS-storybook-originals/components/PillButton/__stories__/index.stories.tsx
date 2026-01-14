import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import PillButton from "..";
import {
  VenueIcon,
  TicketIcon,
  TrashcanIcon,
  CheckmarkIcon,
  ChevronIcon,
  PrinterIcon,
  CrossIcon,
} from "../../../icons";

const icons = [
  "No icon",
  "Trash Can",
  "Venue",
  "Checkmark",
  "Ticket",
  "Chevron",
];
const iconsMapping = {
  "No icon": undefined,
  "Trash Can": <TrashcanIcon />,
  Venue: <VenueIcon />,
  Checkmark: <CheckmarkIcon />,
  Ticket: <TicketIcon />,
  Chevron: <ChevronIcon />,
};

const meta: Meta<typeof PillButton> = {
  title: "Components/PillButton",
  component: PillButton,
  args: {
    children: "Click Me!",
    disabled: false,
    selected: false,
    inverse: false,
  },
  argTypes: {
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

type Story = StoryObj<typeof PillButton>;

export const Basic: Story = {};

export const Small: Story = {
  args: { small: true },
};

export const Selected: Story = {
  args: { selected: true, children: "Selected" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

export const Inverse: Story = {
  args: { inverse: true, children: "inverse" },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const InverseSelected: Story = {
  args: { inverse: true, selected: true, children: "inverseSelected" },
  globals: {
    backgrounds: { value: "dark" },
  },
};
export const InverseDisabled: Story = {
  args: { inverse: true, disabled: true, children: "inverseDisabled" },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const WithStartIcon: Story = {
  args: {
    startIcon: <PrinterIcon />,
    children: "Print",
  },
};

export const WithEndIcon: Story = {
  args: {
    selected: true,
    endIcon: <ChevronIcon />,
    children: "All Ticket Types",
  },
};

export const WithBothIcons: Story = {
  args: {
    startIcon: <CrossIcon />,
    endIcon: <CrossIcon />,
    disabled: true,
    children: "Do not do this please it looks silly",
  },
  tags: ["!dev"],
};

export const Link: Story = {
  args: {
    href: "#",
    as: "a",
    startIcon: <CheckmarkIcon />,
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
