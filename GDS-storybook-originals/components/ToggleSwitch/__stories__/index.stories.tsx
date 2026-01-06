import { Meta, StoryObj } from "@storybook/react-webpack5";
import ToggleSwitch from "..";
import { useArgs } from "storybook/preview-api";
import React from "react";

const meta: Meta<typeof ToggleSwitch> = {
  title: "Components/ToggleSwitch",
  component: ToggleSwitch,
  args: {
    checked: false,
    disabled: false,
    label: "See Tickets",
    colorVariant: "default",
  },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();
    const toggle = () => updateArgs({ checked: !checked });

    return <ToggleSwitch {...args} checked={checked} onChange={toggle} />;
  },
};

export default meta;

type Story = StoryObj<typeof ToggleSwitch>;

export const Basic: Story = {};

export const Resale: Story = {
  args: { colorVariant: "resale", label: "See resale tickets" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
