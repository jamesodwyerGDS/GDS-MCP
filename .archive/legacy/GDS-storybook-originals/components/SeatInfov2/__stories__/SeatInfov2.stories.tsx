import type { Meta, StoryObj } from "@storybook/react-webpack5";
import SeatInfov2 from "..";

const meta: Meta<typeof SeatInfov2> = {
  component: SeatInfov2,
  title: "Components/SeatInfov2",
  args: {
    row: { title: "row", value: "GAO" },
    seat: { title: "seat", value: "29" },
    section: { title: "section", value: "LAWN33" },
    type: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof SeatInfov2>;

export const Default: Story = {};

export const LongValues: Story = {
  args: {
    row: { title: "row", value: "GA0" },
    seat: { title: "seat", value: "299" },
    section: { title: "section", value: "INDGANG A" },
  },
};

export const Disabled: Story = {
  args: {
    type: "disabled",
  },
};

export const Transfer: Story = {
  args: {
    type: "transfer",
  },
};

export const Resale: Story = {
  args: {
    type: "resale",
  },
};

export const WithWayfindingLight: Story = {
  args: {
    wayfindingColors: {
      background: "#FEB3B3",
      foreground: "#000",
    },
  },
};

export const WithWayfindingDark: Story = {
  globals: {
    backgrounds: { value: "dark" },
  },
  args: {
    wayfindingColors: {
      background: "#267554",
      foreground: "#fff",
    },
  },
};

export const TransferShouldNotShowWayfinding: Story = {
  args: {
    wayfindingColors: {
      background: "#267554",
      foreground: "#fff",
    },
    type: "transfer",
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
