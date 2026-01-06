import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import Badge, { Props } from "..";
import { MapPinIcon, MegaphoneIcon, NoTaxIcon } from "../../../icons";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    textColor: { control: "color" },
    borderColor: { control: "color" },
    backgroundColor: { control: "color" },
  },
};

export default meta;

type Story = StoryObj<Props>;

export const Basic: Story = {
  args: {
    children: "Default badge",
  },
};

export const Sales: Story = {
  args: {
    children: "On sale: fri 23 jan - 10AM",
    textColor: "accent1",
  },
};

export const Label: Story = {
  args: {
    children: "Default label",
  },
};

export const Bordered: Story = {
  args: {
    children: "Bordered",
    borderColor: "default",
  },
};

export const Filled: Story = {
  args: {
    children: "On Partner Site",
    textColor: "inverse",
    backgroundColor: "inactive",
  },
};

export const BorderedWithIcon: Story = {
  args: {
    children: "With Icon",
    borderColor: "default",
    icon: <NoTaxIcon fillColor="danger" />,
  },
};

export const Required: Story = {
  args: {
    children: "required",
    textColor: "danger",
    borderColor: "danger",
  },
};

export const Confirmed: Story = {
  args: {
    children: "confirmed",
    borderColor: "bgInverse",
  },
};

export const NearYou: Story = {
  args: {
    children: "Near You",
    icon: <MapPinIcon />,
  },
};

export const Promoted: Story = {
  args: {
    children: "Promoted Badge",
    icon: <MegaphoneIcon />,
  },
};

export const PromotedInverse: Story = {
  args: {
    children: "Promoted Inverse Badge",
    textColor: "inverse",
    backgroundColor: "inactive",
    icon: <MegaphoneIcon fillColor="selected" />,
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
