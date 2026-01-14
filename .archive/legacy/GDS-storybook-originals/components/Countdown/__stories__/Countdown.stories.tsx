import { Meta, StoryObj } from "@storybook/react-webpack5";
import Countdown from "../Countdown";
import React from "react";

const meta: Meta<typeof Countdown> = {
  component: Countdown,
  title: "Components/Countdown",
  args: {
    date: new Date(Date.now() + 1728000),
    labels: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    timeLeftLabel: "Time Left",
  },
  render: (args) => (
    <div style={{ width: "60%" }}>
      <Countdown {...args} />
    </div>
  ),
  tags: ["beta"],
};

export default meta;

type Story = StoryObj<typeof Countdown>;

export const Responsive: Story = {
  args: {
    fillVariant: "outline",
    size: "responsive",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Overrides the other size options and resizes the prop by screen size. This is to avoid the countdown overflowing the screen size on small devices, while also allowing set sizes for larger screens (i.e. small and medium on desktop).",
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    fillVariant: "ghost",
  },
  globals: { backgrounds: { value: "light" } },
};

export const Outline: Story = {
  args: {
    fillVariant: "outline",
  },
  globals: { backgrounds: { value: "light" } },
};

export const Fill: Story = {
  args: {
    fillVariant: "fill",
  },
  globals: { backgrounds: { value: "light" } },
};

export const InverseGhost: Story = {
  args: {
    fillVariant: "ghost",
    inverse: true,
  },
  globals: { backgrounds: { value: "dark" } },
};

export const InverseOutline: Story = {
  args: {
    fillVariant: "outline",
    inverse: true,
  },
  globals: { backgrounds: { value: "dark" } },
};

export const InverseFill: Story = {
  args: {
    fillVariant: "fill",
    inverse: true,
  },
  globals: { backgrounds: { value: "dark" } },
};

export const HideDays: Story = {
  args: {
    hideDays: true,
  },
  globals: { backgrounds: { value: "light" } },
};

export const HideDaysAndSeconds: Story = {
  args: {
    hideDays: true,
    hideSeconds: true,
  },
  globals: { backgrounds: { value: "light" } },
};

export const HideDaysAndHours: Story = {
  args: {
    hideDays: true,
    hideHours: true,
  },
  globals: { backgrounds: { value: "light" } },
};

export const HideSeconds: Story = {
  args: {
    hideSeconds: true,
  },
  globals: { backgrounds: { value: "light" } },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  globals: { backgrounds: { value: "light" } },
};

export const Small: Story = {
  args: {
    fillVariant: "outline",
    size: "small",
  },
  globals: {
    backgrounds: { value: "light" },
    viewport: { value: "mobile2", isRotated: false },
  },
  tags: ["!autodocs"],
  render: (args) => <Countdown {...args} />,
};

export const Medium: Story = {
  args: {
    fillVariant: "outline",
    size: "medium",
  },
  globals: {
    backgrounds: { value: "light" },
    viewport: { value: "tablet", isRotated: false },
  },
  tags: ["!autodocs"],
};

export const Large: Story = {
  args: {
    fillVariant: "outline",
    size: "large",
  },
  globals: {
    backgrounds: { value: "light" },
    viewport: { value: "desktop", isRotated: false },
  },
  tags: ["!autodocs"],
};
