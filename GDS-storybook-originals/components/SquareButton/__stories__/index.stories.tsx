import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import SquareButton from "..";
import {
  VenueIcon,
  TicketIcon,
  TrashcanIcon,
  CheckmarkIcon,
  CrossIcon,
} from "../../../icons";

const iconsMapping = {
  "No icon": undefined,
  "Trash Can": <TrashcanIcon />,
  Venue: <VenueIcon />,
  Checkmark: <CheckmarkIcon />,
  Ticket: <TicketIcon />,
};

const meta: Meta<typeof SquareButton> = {
  title: "Components/SquareButton",
  component: SquareButton,
  args: {
    variant: "primary",
    label: "Tells users of assistive technology what this button does",
    disabled: false,
    icon: "No icon",
    loading: { isLoading: false, hiddenLoadingMessage: "Form Submitting..." },
  },
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(iconsMapping),
      mapping: iconsMapping,
    },
  },
};

export default meta;

type Story = StoryObj<typeof SquareButton>;

export const Basic: Story = {};

export const Primary: Story = {
  args: { label: "Primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", label: "secondary" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary", label: "tertiary" },
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

export const Loading: Story = {
  args: {
    loading: { isLoading: true, hiddenLoadingMessage: "Form Submitting..." },
  },
};

export const Large: Story = {
  args: { size: "large" },
};

export const Ghost: Story = {
  args: { variant: "ghost", label: "ghost" },
};

export const WithCheckmarkIcon: Story = {
  args: { icon: <CheckmarkIcon /> },
};

export const WithTrashIcon: Story = {
  args: { variant: "secondary", icon: <TrashcanIcon /> },
};

export const WithCrossIcon: Story = {
  args: { variant: "tertiary", icon: <CrossIcon /> },
};

export const WithBigIcon: Story = {
  args: {
    icon: <CheckmarkIcon size="2em" />,
  },
};

export const WithRotatedIcon: Story = {
  args: {
    variant: "secondary",
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
