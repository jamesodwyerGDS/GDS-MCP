import type { Meta, StoryObj } from "@storybook/react-webpack5";
import SimpleSeatInfo from "..";

const meta: Meta<typeof SimpleSeatInfo> = {
  component: SimpleSeatInfo,
  title: "Components/SimpleSeatInfo",
  args: {
    row: { title: "row", value: "GAO" },
    seat: { title: "seat", value: "29" },
    section: { title: "section", value: "LAWN33" },
  },
};

export default meta;

type Story = StoryObj<typeof SimpleSeatInfo>;

export const Default: Story = {};

export const OnlySection: Story = {
  args: {
    section: {
      title: "section",
      value: "254",
    },
    row: undefined,
    seat: undefined,
  },
};
