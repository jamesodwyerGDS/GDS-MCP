import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import BrandLogo from "..";

const meta: Meta<typeof BrandLogo> = {
  component: BrandLogo,
  title: "Components/BrandLogo",
};

export default meta;

type Story = StoryObj<typeof BrandLogo>;

export const Dark: Story = {
  render: () => (
    <div style={{ height: "30px" }}>
      <BrandLogo color="#000" />
    </div>
  ),
};

export const Light: Story = {
  globals: {
    backgrounds: { value: "dark" },
  },
  render: () => (
    <div style={{ height: "30px" }}>
      <BrandLogo />
    </div>
  ),
};
